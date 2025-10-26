<script lang="ts">
	import { page } from '$app/state';
	import { fN, formatDate, formatSector } from '$lib/utils';
	import { getSourceById } from '../../api/source.remote';
	import {
		Factory,
		Globe,
		MapPin,
		ChartLine,
		XCircle,
		Flame,
		Users,
		Gauge,
		Lightning
	} from 'phosphor-svelte';
	import { Plot, LineY, Dot, formatMonth } from 'svelteplot';
	import { Pagination } from '$lib/components/ui';

	const ITEMS_PER_PAGE = 10;

	let sourceId = $derived(Number(page.params.id));

	const years = [2021, 2022, 2023, 2024];
	let yearlyData = $derived(
		await Promise.all(
			years.map((year) =>
				getSourceById({
					id: sourceId,
					timeGranularity: 'month',
					start: `${year}-01`,
					end: `${year}-12`
				})
			)
		)
	);

	let source = $derived(yearlyData[yearlyData.length - 1]);

	let currentPage = $state(1);

	let allEmissions = $derived.by(() => {
		return yearlyData.flatMap((data) => {
			if (!data?.emissions || !Array.isArray(data.emissions)) return [];
			return data.emissions;
		});
	});

	let emissionsTimeseries = $derived.by(() => {
		return allEmissions.map((e) => ({
			date: `${e.year}-${String(e.month || 1).padStart(2, '0')}`,
			year: e.year,
			month: e.month,
			emissions: e.emissionsQuantity
		}));
	});

	let totalEmissions = $derived.by(() => {
		return allEmissions.reduce((sum, e) => sum + e.emissionsQuantity, 0);
	});

	let gasBreakdown = $derived.by(() => {
		const gasMap = new Map<string, number>();
		allEmissions.forEach((e) => {
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
	const currentEmissions = $derived(allEmissions.slice(startIndex, endIndex));
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
	<div class="px-section-x py-section-y">
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

		<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 join-horizontal mb-4">
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

			{#if source.totals?.capacity}
				<div class="card bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-2">
							<Gauge size={20} weight="fill" class="text-accent" />
							<h2 class="card-title text-sm font-medium opacity-70">Capacity</h2>
						</div>
						<p class="text-4xl font-bold mb-1">{fN(source.totals.capacity)}</p>
						<p class="text-sm opacity-60">{source.totals.capacityUnits || 'units'}</p>
					</div>
				</div>
			{/if}
		</div>

		{#if source.owners && source.owners.length > 0}
			<div class="card bg-base-200 border border-base-300 mb-6">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-4">
						<Users size={24} weight="fill" class="text-info" />
						<h2 class="card-title">Owners</h2>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each source.owners as owner}
							<a href="/owners?id={owner.id}" class="badge badge-lg badge-outline">{owner.name}</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
			{#if source.totals?.activity}
				<div class="stat bg-base-200 border border-base-300 rounded-lg">
					<div class="stat-figure text-primary">
						<Lightning size={32} weight="fill" />
					</div>
					<div class="stat-title">Activity</div>
					<div class="stat-value text-2xl">{fN(source.totals.activity)}</div>
					<div class="stat-desc">{source.totals.activityUnits || 'units'}</div>
				</div>
			{/if}
			{#if source.totals?.capacityFactor !== undefined}
				<div class="stat bg-base-200 border border-base-300 rounded-lg">
					<div class="stat-figure text-secondary">
						<Gauge size={32} weight="fill" />
					</div>
					<div class="stat-title">Capacity Factor</div>
					<div class="stat-value text-2xl">
						{(source.totals.capacityFactor * 100).toFixed(1)}%
					</div>
					<div class="stat-desc">efficiency</div>
				</div>
			{/if}
			{#if source.totals?.emissionsFactor}
				<div class="stat bg-base-200 border border-base-300 rounded-lg">
					<div class="stat-figure text-warning">
						<Flame size={32} weight="fill" />
					</div>
					<div class="stat-title">Emissions Factor</div>
					<div class="stat-value text-2xl">{fN(source.totals.emissionsFactor)}</div>
					<div class="stat-desc">{source.totals.emissionsFactorUnits || 'units'}</div>
				</div>
			{/if}
			{#if gasBreakdown.length === 1}
				<div class="stat bg-base-200 border border-base-300 rounded-lg">
					<div class="stat-figure text-error">
						<Flame size={32} weight="fill" />
					</div>
					<div class="stat-title">Gas Type</div>
					<div class="stat-value text-2xl">{gasBreakdown[0].gas}</div>
					<div class="stat-desc">{fN(gasBreakdown[0].quantity)} tonnes</div>
				</div>
			{/if}
		</div>

		<div class="mb-8">
			{#if emissionsTimeseries.length > 0}
				<div class="card bg-base-200 border border-base-300">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-4">
							<ChartLine size={24} weight="bold" class="text-accent" />
							<h2 class="card-title">Emissions Timeline</h2>
						</div>

						<Plot
							inset={15}
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
								interval: '1 quarter',
								tickFormat(d) {
									return formatDate(d);
								},
								tickRotate: -20
							}}
						>
							<LineY
								data={emissionsTimeseries}
								x={(d) => new Date(d.date)}
								y="emissions"
								curve="monotone-x"
								stroke="var(--color-primary)"
								strokeWidth={2}
								strokeDasharray="2"
							/>

							<Dot
								data={emissionsTimeseries}
								x={(d) => new Date(d.date)}
								y="emissions"
								fill="var(--color-primary)"
								r={3}
							/>
						</Plot>

						<div class="text-xs opacity-60 mt-2">Emissions in tonnes CO₂e</div>
					</div>
				</div>
			{/if}

			{#if gasBreakdown.length > 1}
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
								<th>Year</th>
								<th>Month</th>
								<th class="text-right">Emissions</th>
								<th>Gas</th>
								<th class="text-right">Activity</th>
							</tr>
						</thead>
						<tbody>
							{#each currentEmissions as emission}
								<tr class="hover">
									<td>{emission.year}</td>
									<td>{emission.month || '-'}</td>
									<td class="text-right tabular-nums">{fN(emission.emissionsQuantity)}</td>
									<td class="text-sm opacity-70">{emission.gas}</td>
									<td class="text-right tabular-nums text-xs">
										{#if emission.activity}
											{fN(emission.activity)} {emission.activityUnits || ''}
										{:else}
											-
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-4 mb-2 pr-section-x">
					<Pagination
						count={allEmissions.length}
						perPage={ITEMS_PER_PAGE}
						bind:page={currentPage}
					/>
				</div>
			</div>
		</div>
	</div>
{/if}
