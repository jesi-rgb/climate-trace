<script lang="ts">
	import { Fire } from 'phosphor-svelte';
	import { Card } from '$lib/components/ui';
	import Heading from '$lib/components/type/Heading.svelte';
	import Body from '$lib/components/type/Body.svelte';
	import { onMount } from 'svelte';
	import type { SourceDetails } from '$lib/api';
	import { Graticule, Plot, Sphere } from 'svelteplot';
	import Map from '../ui/Map.svelte';
	import { streamCountrySources } from '$lib/api/stream';
	import SourcesTable from './SourcesTable.svelte';

	interface Props {
		countryCode: string;
		countryName: string;
	}

	let { countryCode }: Props = $props();

	let sources = $state<SourceDetails[]>([]);
	let loading = $state(true);
	let streaming = $state(true);

	const rotate: [number, number, number] = $state([0, 0, 0]);
	let rotationInterval: NodeJS.Timeout | null = null;

	onMount(() => {
		rotationInterval = setInterval(() => {
			rotate[0] += 1;
			rotate[1] += 1;
			rotate[2] += 1;
		}, 100);

		return () => {
			if (rotationInterval) clearInterval(rotationInterval);
		};
	});

	onMount(async () => {
		try {
			console.log('GeoSources: Starting to stream sources for', countryCode);
			streaming = true;

			const BATCH_SIZE = 150;
			let batch: SourceDetails[] = [];

			for await (const source of streamCountrySources(countryCode)) {
				batch.push(source);

				if (batch.length >= BATCH_SIZE) {
					sources.push(...batch);
					batch = [];
				}
			}

			if (batch.length > 0) {
				sources.push(...batch);
			}

			if (rotationInterval) clearInterval(rotationInterval);
			streaming = false;
		} catch (error) {
			console.error('GeoSources: Failed to load sources:', error);
		} finally {
			loading = false;
		}
	});

	let globeSources = $derived.by(() => {
		if (!sources) return [];
		return sources
			.filter(
				(s) =>
					s.centroid.latitude !== null &&
					s.centroid.longitude !== null &&
					s.centroid.latitude !== undefined &&
					s.centroid.longitude !== undefined
			)
			.map((s) => ({
				id: s.id,
				name: s.name,
				lat: s.centroid.latitude,
				lon: s.centroid.longitude,
				emissionsQuantity: s.emissions.reduce((sum, e) => sum + e.emissionsQuantity, 0)
			}));
	});

	let centerCoords = $derived.by(() => {
		if (globeSources.length === 0) return { lat: 0, lon: 0 };
		const avgLat =
			globeSources.reduce((sum: number, s: any) => sum + s.lat, 0) / globeSources.length;
		const avgLon =
			globeSources.reduce((sum: number, s: any) => sum + s.lon, 0) / globeSources.length;
		return { lat: avgLat, lon: avgLon };
	});

	function convertToGeoJSON(data: typeof globeSources) {
		return {
			type: 'FeatureCollection',
			features: data.map((item) => ({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [item.lon, item.lat]
				},
				properties: {
					id: item.id,
					name: item.name,
					emissionsQuantity: item.emissionsQuantity
				}
			}))
		};
	}
</script>

<Card>
	{#snippet title()}
		<div class="flex items-center gap-2">
			<Fire size={24} weight="fill" class="text-primary" />
			<Heading size="h3">Sources Map</Heading>
		</div>
	{/snippet}
	{#snippet content()}
		{#if loading && globeSources.length === 0}
			<Plot
				inset={2}
				projection={{
					type: 'orthographic',
					rotate: rotate
				}}
			>
				<Sphere stroke="currentColor" />
				<Graticule strokeOpacity={0.3} stepX={10} stepY={5} />
			</Plot>
		{:else if globeSources.length > 0}
			<div class="px-4 py-2">
				<Map
					{streaming}
					initialLat={centerCoords.lat}
					initialLon={centerCoords.lon}
					data={convertToGeoJSON(globeSources)}
				/>
			</div>
		{:else}
			<div class="relative flex items-center justify-center h-full">
				<div class="absolute inset-0 opacity-10">
					<Plot
						inset={2}
						projection={{
							type: 'orthographic',
							rotate: rotate
						}}
					>
						<Sphere stroke="currentColor" />
						<Graticule strokeOpacity={0.3} stepX={10} stepY={5} />
					</Plot>
				</div>
				<Heading size="h3" class="font-semibold"
					>Couln't find any emission sources for {countryCode}</Heading
				>
			</div>
		{/if}
	{/snippet}
	{#snippet footnote()}
		<Body size="12" class="text-muted text-center">
			{streaming && globeSources.length > 0 ? 'Streaming' : ''}
			{globeSources.length == 0 ? 'Loading' : globeSources.length} emission sources over {countryCode}
		</Body>
	{/snippet}
</Card>

{#if globeSources.length > 0}
	<SourcesTable {globeSources} countryName={countryCode} />
{/if}
