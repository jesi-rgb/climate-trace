<script lang="ts">
	import { page } from '$app/state';
	import { fN, formatSector } from '$lib/utils';
	import { getSectorDetails, getSectorEmissions, getSectorSources } from '../../api/sector.remote';
	import { Lightning, Factory, XCircle, Stack, Buildings } from 'phosphor-svelte';

	let sector = $derived(page.params.sector!);
	let details = $derived(await getSectorDetails(sector));
	let emissions = $derived(await getSectorEmissions(sector));
	let sources = $derived(await getSectorSources({ sector, limit: 50 }));

	let totalEmissions = $derived(emissions.subsectors.summaries[0]?.emissionsQuantity ?? 0);
	let subsectorCount = $derived(details.subSectors.length);

	let topSubsectors = $derived.by(() => {
		if (!emissions.subsectors.summaries) return [];
		return emissions.subsectors.summaries
			.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity)
			.slice(0, 5);
	});
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
				<h3 class="font-bold">Sector not found</h3>
				<a href="/" class="link link-hover">Return to home</a>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<div class="mb-4">
			<div class="breadcrumbs text-sm mb-2">
				<ul>
					<li><a href="/" class="link link-hover">Home</a></li>
					<li><a href="/sectors" class="link link-hover">Sectors</a></li>
					<li>{formatSector(details.name)}</li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<h1 class="text-4xl font-bold">{formatSector(details.name)}</h1>
				<div class="badge badge-primary badge-lg">{subsectorCount} subsectors</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 join-horizontal mb-4">
			<div class="card bg-gradient-to-br from-error/10 to-error/5 border border-error/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Lightning size={20} weight="fill" class="text-error" />
						<h2 class="card-title text-sm font-medium opacity-70">Total Emissions</h2>
					</div>
					<p class="text-4xl font-bold mb-1">{fN(totalEmissions)}</p>
					<p class="text-sm opacity-60">tonnes CO₂e</p>
				</div>
			</div>

			<div class="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Stack size={20} weight="fill" class="text-info" />
						<h2 class="card-title text-sm font-medium opacity-70">Subsectors</h2>
					</div>
					<p class="text-4xl font-bold mb-1">{subsectorCount}</p>
					<p class="text-sm opacity-60">categories</p>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			{#if topSubsectors.length > 0}
				<div class="card bg-base-200 border border-base-300">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-4">
							<Factory size={24} weight="fill" class="text-secondary" />
							<h2 class="card-title">Top Subsectors by Emissions</h2>
						</div>

						<div class="space-y-3">
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
					</div>
				</div>
			{/if}

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-4">
						<Buildings size={24} weight="fill" class="text-accent" />
						<h2 class="card-title">All Subsectors</h2>
					</div>

					<div class="flex flex-wrap gap-2">
						{#each details.subSectors as subsector}
							<div class="badge badge-lg">{formatSector(subsector)}</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		{#if sources.length > 0}
			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-4">
						<Factory size={24} weight="bold" class="text-warning" />
						<h2 class="card-title">Top Emission Sources</h2>
					</div>

					<div class="overflow-x-auto">
						<table class="table table-sm">
							<thead>
								<tr>
									<th>Source Name</th>
									<th>Country</th>
									<th>Subsector</th>
									<th class="text-right">Emissions</th>
								</tr>
							</thead>
							<tbody>
								{#each sources as source}
									<tr class="hover">
										<td>
											<a href="/source/{source.id}" class="link link-hover">
												{source.name || 'Unknown'}
											</a>
										</td>
										<td>
											<a href="/country/{source.country}" class="link link-hover">
												{source.country}
											</a>
										</td>
										<td class="text-sm opacity-70">{formatSector(source.subsector)}</td>
										<td class="text-right tabular-nums">{fN(source.emissionsQuantity)}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}
