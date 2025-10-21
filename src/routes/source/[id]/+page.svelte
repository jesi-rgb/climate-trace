<script lang="ts">
	import { page } from '$app/state';
	import { fN, formatSector } from '$lib/utils';
	import { getSourceById } from '../../api/source.remote';
	import { Factory, Globe, MapPin, ChartLine, XCircle, Flame } from 'phosphor-svelte';
	import { Plot, LineY, Dot } from 'svelteplot';
	import { Pagination } from '$lib/components/ui';

	const ITEMS_PER_PAGE = 20;

	let sourceId = $derived(Number(page.params.id));
	let source = $derived(await getSourceById({ id: sourceId }));

	let currentPage = $state(1);

	let emissionsTimeseries = $derived.by(() => {
		if (!source?.emissions) return [];
		const yearlyData = new Map<number, number>();
		source.emissions.forEach((e) => {
			const year = new Date(e.date).getFullYear();
			const current = yearlyData.get(year) || 0;
			yearlyData.set(year, current + e.emissionsQuantity);
		});
		return Array.from(yearlyData.entries())
			.sort((a, b) => a[0] - b[0])
			.map(([year, emissions]) => ({ year, emissions }));
	});

	let totalEmissions = $derived.by(() => {
		if (!source?.emissions) return 0;
		return source.emissions.reduce((sum, e) => sum + e.emissionsQuantity, 0);
	});

	let gasBreakdown = $derived.by(() => {
		if (!source?.emissions) return [];
		const gasMap = new Map<string, number>();
		source.emissions.forEach((e) => {
			const current = gasMap.get(e.gas) || 0;
			gasMap.set(e.gas, current + e.emissionsQuantity);
		});
		return Array.from(gasMap.entries())
			.map(([gas, quantity]) => ({
				gas,
				quantity,
				percentage: (quantity / totalEmissions) * 100
			}))
			.sort((a, b) => b.quantity - a.quantity);
	});

	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentEmissions = $derived(source?.emissions.slice(startIndex, endIndex) || []);
</script>

{#if $effect.pending()}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center">
			<div class="loading loading-spinner loading-lg text-primary"></div>
			<p class="mt-4 text-xs opacity-60">Loading source data...</p>
		</div>
	</div>
{:else if !source}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="alert alert-error max-w-md">
			<XCircle size={24} weight="bold" />
			<div>
				<h3 class="font-bold">Source not found</h3>
				<a href="/sources" class="link link-hover">Return to sources</a>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<div class="mb-4">
			<div class="breadcrumbs text-sm mb-2">
				<ul>
					<li><a href="/" class="link link-hover">Home</a></li>
					<li><a href="/sources" class="link link-hover">Sources</a></li>
					<li>{source.name || 'Unknown Source'}</li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<h1 class="text-4xl font-bold">{source.name || 'Unknown Source'}</h1>
				<div class="badge badge-primary badge-lg">{source.subsector}</div>
			</div>
			<p class="text-lg opacity-70 mt-2">{formatSector(source.sector)}</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 join-horizontal mb-4">
			<div class="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Flame size={20} weight="fill" class="text-warning" />
						<h2 class="card-title text-sm font-medium opacity-70">Total Emissions</h2>
					</div>
					<p class="text-4xl font-bold mb-1">{fN(totalEmissions)}</p>
					<p class="text-sm opacity-60">tonnes CO₂e</p>
				</div>
			</div>

			<div class="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Globe size={20} weight="fill" class="text-info" />
						<h2 class="card-title text-sm font-medium opacity-70">Country</h2>
					</div>
					<p class="text-4xl font-bold mb-1">
						<a href="/country/{source.country}" class="link link-hover">
							{source.country}
						</a>
					</p>
					<p class="text-sm opacity-60">location</p>
				</div>
			</div>

			<div
				class="card bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
			>
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Factory size={20} weight="fill" class="text-secondary" />
						<h2 class="card-title text-sm font-medium opacity-70">Sector</h2>
					</div>
					<p class="text-2xl font-bold mb-1">
						<a href="/sector/{source.sector}" class="link link-hover">
							{formatSector(source.sector)}
						</a>
					</p>
					<p class="text-sm opacity-60">industry type</p>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			{#if emissionsTimeseries.length > 0}
				<div class="card bg-base-200 border border-base-300">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-4">
							<ChartLine size={24} weight="bold" class="text-accent" />
							<h2 class="card-title">Emissions Timeline</h2>
						</div>

						<Plot
							inset={10}
							height={250}
							y={{
								grid: true,
								nice: true,
								tickFormat(d) {
									return fN(d.valueOf() as number);
								}
							}}
							x={{
								grid: true,
								nice: true
							}}
						>
							<LineY
								data={emissionsTimeseries}
								x="year"
								y="emissions"
								curve="monotone-x"
								stroke="var(--color-primary)"
								strokeDasharray="2"
								strokeWidth={2}
							/>

							<Dot data={emissionsTimeseries} x="year" y="emissions" fill="var(--color-primary)" />
						</Plot>

						<div class="text-xs opacity-60 mt-2">Emissions in tonnes CO₂e</div>
					</div>
				</div>
			{/if}

			{#if gasBreakdown.length > 0}
				<div class="card bg-base-200 border border-base-300">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-4">
							<Flame size={24} weight="fill" class="text-error" />
							<h2 class="card-title">Gas Breakdown</h2>
						</div>

						<div class="space-y-3">
							{#each gasBreakdown as gas}
								<div>
									<div class="flex justify-between items-center mb-1">
										<span class="text-sm font-medium">{gas.gas}</span>
										<span class="text-sm font-bold tabular-nums">{fN(gas.quantity)}</span>
									</div>
									<div class="flex items-center gap-2">
										<progress
											class="progress progress-error w-full"
											value={gas.percentage}
											max="100"
										></progress>
										<span class="text-xs opacity-60 tabular-nums min-w-[3rem]"
											>{gas.percentage.toFixed(1)}%</span
										>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="card bg-base-200 border border-base-300">
			<div class="card-body py-2 px-0">
				<div class="flex items-center gap-2 ml-3">
					<MapPin size={14} weight="fill" class="text-primary" />
					<h2 class="card-title text-lg">Detailed Emissions Timeline</h2>
				</div>

				<div class="overflow-x-auto">
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Date</th>
								<th class="text-right">Emissions</th>
								<th>Gas</th>
							</tr>
						</thead>
						<tbody>
							{#each currentEmissions as emission}
								<tr class="hover">
									<td>{emission.date}</td>
									<td class="text-right tabular-nums">{fN(emission.emissionsQuantity)}</td>
									<td class="text-sm opacity-70">{emission.gas}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-4 mb-2">
					<Pagination
						count={source.emissions.length}
						perPage={ITEMS_PER_PAGE}
						bind:page={currentPage}
					/>
				</div>
			</div>
		</div>
	</div>
{/if}
