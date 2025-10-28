<script lang="ts">
	import { Plot, Dot, Geo, Sphere, Graticule } from 'svelteplot';
	import { onMount } from 'svelte';
	// @ts-ignore
	import { feature } from 'topojson-client';
	// @ts-ignore
	import { geoCircle } from 'd3-geo';

	interface EmissionSource {
		id: number;
		name: string;
		lat: number;
		lon: number;
		emissionsQuantity: number;
	}

	interface Props {
		countryId: string;
		sources: EmissionSource[];
		centerLat?: number;
		centerLon?: number;
	}

	let {
		countryId,
		sources,
		centerLat: initialLat = 0,
		centerLon: initialLon = 0
	}: Props = $props();

	let land = $state<any>(null);
	let targetCountry = $state<any>(null);
	let zoom = $state(3);
	let [centerLat, centerLon] = $state([initialLat, initialLon]);

	onMount(async () => {
		const response = await fetch('/data/countries-110m.json');
		const data = await response.json();
		land = feature(data, data.objects.land);

		const countries = feature(data, data.objects.countries);
		if ('features' in countries) {
			const country = (countries as any).features.find((f: any) => f.id === countryId);
			if (country) {
				targetCountry = country;
			}
		}
	});

	let maxEmissions = $derived(
		sources.length > 0 ? Math.max(...sources.map((s) => s.emissionsQuantity)) : 1
	);

	function handleScroll(e: Event) {
		e.preventDefault();

		console.log(e);
	}
</script>

{#if land}
	<div class="relative" onscrollcapture={handleScroll}>
		<Plot
			r={{ range: [2, 20] }}
			height={(w) => w * 0.19}
			projection={{
				type: 'orthographic',
				inset: 10,
				domain: geoCircle().center([centerLon, centerLat]).radius(zoom)(),
				rotate: [-centerLon, -centerLat]
			}}
		>
			<Sphere fill="var(--color-base-300)" stroke="var(--color-base-content)" strokeWidth={2} />
			<Graticule stroke="var(--color-base-content)" strokeWidth={0.5} opacity="0.2" />
			<Geo
				data={[land]}
				fill="var(--color-base-content)"
				fillOpacity={0.3}
				stroke="var(--color-base-content)"
				strokeWidth={0.8}
			/>

			{#if targetCountry}
				<Geo
					data={[targetCountry]}
					fill="var(--color-primary)"
					fillOpacity={0.7}
					stroke="var(--color-primary)"
					strokeWidth={2}
				/>
			{/if}

			<Dot
				data={sources}
				onclick={(e) => {
					[centerLat, centerLon] = [e.dataX, e.dataY];
				}}
				stroke="var(--color-error)"
				fill="var(--color-error)"
				fillOpacity={0.1}
				strokeWidth={0.5}
				x={(d: any) => d.lon}
				y={(d: any) => d.lat}
				r={(d: any) => d.emissionsQuantity / maxEmissions}
			/>
		</Plot>
		<input
			class="absolute bottom-3 left-3 range range-xs z-10"
			type="range"
			bind:value={zoom}
			min={0.01}
			max={20}
			step={0.1}
		/>
	</div>
{:else}
	<div class="flex items-center justify-center">
		<div class="loading loading-spinner loading-lg"></div>
	</div>
{/if}
