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
							<Factory size={24} weight="fill" class="text-secondary" />
							<Heading as="h2" class="card-title">Top Subsectors by Emissions</Heading>
						</div>
					{/snippet}

					{#snippet content()}
						<div class="px-4 pb-4 space-y-3">
							{#each topSubsectors as subsector}
								<div>
									<div class="flex justify-between items-center mb-1">
										<span class="text-sm font-medium">{formatSector(subsector.subsector)}</span>
										<span class="text-sm font-bold tabular-nums"
											>{fN(subsector.emissionsQuantity)}</span
										>
									</div>
									<div class="flex items-center gap-2">
										<progress
											class="progress progress-secondary w-full"
											value={subsector.percentage}
											max="100"
										></progress>
										<span class="text-xs opacity-60 tabular-nums min-w-[3rem]"
											>{subsector.percentage.toFixed(1)}%</span
										>
									</div>
								</div>
							{/each}
						</div>
					{/snippet}
				</Card>
			{/if}

			{#if sources && sources.length > 0}
				<EmissionSources {sources} subsectors={subsectorNames} />
			{/if}
		</div>
	</div>
{/if}
