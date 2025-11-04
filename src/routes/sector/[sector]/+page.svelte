<script lang="ts">
	import { page } from '$app/state';
	import { fN, formatSector } from '$lib/utils';
	import { getSectorDetails, getSectorEmissions, getSectorSources } from '../../api/sector.remote';
	import { Lightning, Factory, XCircle, Stack } from 'phosphor-svelte';
	import EmissionSources from '$lib/components/sector/EmissionSources.svelte';
	import Heading from '$lib/components/type/Heading.svelte';
	import Body from '$lib/components/type/Body.svelte';
	import Figure from '$lib/components/type/Figure.svelte';
	import { Card } from '$lib/components/ui';
	import EmissionsBarChart from '$lib/components/charts/EmissionsBarChart.svelte';
	import { Plot, Pointer, RuleX, RuleY } from 'svelteplot';
	import { BarY } from 'svelteplot';

	let sector = $derived(page.params.sector!);
	let details = $derived(await getSectorDetails(sector));
	let emissions = $derived(await getSectorEmissions(sector));
	let sources = $derived(await getSectorSources({ sector, limit: 50 }));

	let totalEmissions = $derived(emissions.subsectors.summaries[0]?.emissionsQuantity ?? 0);
	let subsectorCount = $derived(details.subSectors.length);

	let topSubsectors = $derived.by(() => {
		if (!emissions.subsectors.summaries) return [];
		return emissions.subsectors.summaries.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity);
	});

	let subsectorNames = $derived(details.subSectors);
</script>

{#if $effect.pending()}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center">
			<div class="loading loading-spinner loading-lg text-primary"></div>
			<p class="mt-4 text-xs opacity-60">Loading sector data...</p>
		</div>
	</div>
{:else if !details}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="alert alert-error max-w-md">
			<XCircle size={24} weight="bold" />
			<div>
				<Heading as="h3">Sector not found</Heading>
				<a href="/" class="link link-hover">Return to home</a>
			</div>
		</div>
	</div>
{:else}
	<div class="px-section-x py-section-y">
		<div class="mb-4">
			<div class="breadcrumbs text-sm mb-2">
				<ul>
					<li><a href="/" class="link link-hover">Home</a></li>
					<li><a href="/sectors" class="link link-hover">Sectors</a></li>
					<li>{formatSector(details.name)}</li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<Heading size="h1">{formatSector(details.name)}</Heading>
				<div class="badge badge-primary badge-lg">{subsectorCount} subsectors</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
			<Figure
				icon={Lightning}
				title="Total Emissions"
				value={fN(totalEmissions)}
				subtitle="tonnes CO₂e"
				color="primary"
			/>

			<Figure
				icon={Stack}
				title="Subsectors"
				value={subsectorCount}
				subtitle="categories"
				color="info"
			/>

			{#if topSubsectors.length > 0}
				<Card>
					{#snippet title()}
						<div class="flex items-center gap-2">
							<Factory size={24} weight="fill" class="text-primary" />
							<Heading as="h2">Top Subsectors by Emissions</Heading>
						</div>
					{/snippet}

					{#snippet content()}
						<div class="px-4 h-full">
							<Plot
								height={800}
								inset={20}
								y={{
									tickFormat(d) {
										return fN(d.valueOf() as number);
									},
									grid: true,
									nice: true
								}}
								x={{
									tickRotate: -40,
									tickFormat(d) {
										return formatSector(d.valueOf() as string);
									}
								}}
							>
								<BarY
									fill="var(--color-primary)"
									fillOpacity={0.2}
									stroke="var(--color-primary)"
									strokeWidth={2}
									data={topSubsectors}
									x="subsector"
									y="emissionsQuantity"
									sort={{ channel: '-y' }}
								/>
								<Pointer data={topSubsectors} y="emissionsQuantity" maxDistance={3}>
									{#snippet children({ data })}
										<RuleY {data} y="emissionsQuantity" />
									{/snippet}
								</Pointer>
							</Plot>
						</div>
					{/snippet}

					{#snippet footnote()}
						<Body size="12" class="opacity-60">Emissions in tonnes CO₂e</Body>
					{/snippet}
				</Card>
			{/if}

			{#if sources && sources.length > 0}
				<EmissionSources {sources} subsectors={subsectorNames} />
			{/if}
		</div>
	</div>
{/if}
