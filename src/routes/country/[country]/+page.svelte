<script lang="ts">
	import { page } from '$app/state';
	import { fN, formatSector } from '$lib/utils';
	import { getCountryData } from '../../api/country.remote';
	import { getAllRankings } from '../../api/rankings.remote';
	import { getAggregatedEmissions } from '../../api/emissions.remote';
	import { searchCities } from '../../api/cities.remote';
	import { getTopSources } from '../../api/source.remote';
	import {
		Lightning,
		Users,
		Globe,
		XCircle,
		Trophy,
		Factory,
		Buildings,
		ChartLine,
		MapPin
	} from 'phosphor-svelte';
	import { Plot, LineY, Dot, Pointer, Text } from 'svelteplot';

	let country = $derived(page.params.country!);
	let data = $derived(await getCountryData(country));
	let rankings = $derived(await getAllRankings());

	const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
	let yearlyRankings = $derived(
		await Promise.all(
			years.map((year) =>
				import('$lib/api').then((mod) =>
					mod.ct('getCountryRankings', { start: String(year), end: String(year) })
				)
			)
		)
	);

	let countryEmissions = $derived(await getAggregatedEmissions({ gadmId: country, year: 2024 }));
	let cities = $derived(await searchCities({ country, limit: 5 }));
	let topSources = $derived(await getTopSources({ limit: 10 }));

	let countryRankingIndex = $derived(
		rankings?.rankings.findIndex((r) => r.country === country) ?? -1
	);
	let rankingsContext = $derived.by(() => {
		if (countryRankingIndex === -1 || !rankings) return [];
		const start = Math.max(0, countryRankingIndex - 3);
		const end = Math.min(rankings.rankings.length, countryRankingIndex + 4);
		return rankings.rankings.slice(start, end).map((r, idx) => ({
			...r,
			rank: start + idx + 1,
			isCurrentCountry: r.country === country
		}));
	});

	let emissionsTimeseries = $derived.by(() => {
		return years.map((year, index) => {
			const ranking = yearlyRankings[index]?.rankings.find((r) => r.country === country);
			return {
				year,
				emissions: ranking?.emissionsQuantity || 0
			};
		});
	});

	let topSectors = $derived.by(() => {
		if (!countryEmissions?.sectors?.summaries) return [];
		return countryEmissions.sectors.summaries
			.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity)
			.slice(0, 5);
	});

	let countrySources = $derived.by(() => {
		if (!topSources) return [];
		return topSources.filter((s) => s.country === country).slice(0, 5);
	});
</script>

{#if $effect.pending()}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center">
			<div class="loading loading-spinner loading-lg text-primary"></div>
			<p class="mt-4 text-xs opacity-60">Loading country data...</p>
		</div>
	</div>
{:else if !data}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="alert alert-error max-w-md">
			<XCircle size={24} weight="bold" />
			<div>
				<h3 class="font-bold">Country not found</h3>
				<a href="/" class="link link-hover">Return to home</a>
			</div>
		</div>
	</div>
{:else}
	<div class="py-section-y px-section-x">
		<div class="mb-4">
			<div class="breadcrumbs text-sm mb-2">
				<ul>
					<li><a href="/" class="link link-hover">Home</a></li>
					<li>Countries</li>
					<li>{data.name}</li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<h1 class="text-4xl font-bold">{data.name}</h1>
				{#if data.subregion}
					<div class="badge badge-primary badge-lg">{data.subregion}</div>
				{/if}
			</div>
			{#if data.region}
				<p class="text-lg opacity-70 mt-2">{data.region}</p>
			{/if}
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 join-horizontal mb-4">
			<div class="card bg-gradient-to-br from-error/10 to-error/5 border border-error/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Lightning size={20} weight="fill" class="text-error" />
						<h2 class="card-title text-sm font-medium opacity-70">Emissions Per Capita</h2>
					</div>
					<p class="text-4xl font-bold mb-1">{fN(data.emissionsPerCapita)}</p>
					<p class="text-sm opacity-60">tonnes CO₂e per person</p>
				</div>
			</div>

			<div class="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Users size={20} weight="fill" class="text-info" />
						<h2 class="card-title text-sm font-medium opacity-70">Population</h2>
					</div>
					<p class="text-4xl font-bold mb-1">{fN(data.population)}</p>
					<p class="text-sm opacity-60">people</p>
				</div>
			</div>

			<div class="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-2">
						<Globe size={20} weight="fill" class="text-warning" />
						<h2 class="card-title text-sm font-medium opacity-70">Total Emissions</h2>
					</div>
					<p class="text-4xl font-bold mb-1">{fN(data.totalEmissions)}</p>
					<p class="text-sm opacity-60">tonnes CO₂e</p>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			{#if rankingsContext.length > 0}
				<div class="card bg-base-200 rounded-sm border border-base-300">
					<div class="card-body py-2 px-0">
						<div class="flex items-center gap-2 ml-3">
							<Trophy size={14} weight="fill" class="text-primary" />
							<h2 class="card-title text-lg">Global Rankings</h2>
						</div>

						<div class="overflow-x-auto">
							<table class="table table-sm">
								<thead>
									<tr>
										<th class="w-16">Rank</th>
										<th>Country</th>
										<th class="text-right">Total</th>
										<th class="text-right">Per Capita</th>
									</tr>
								</thead>
								<tbody>
									{#each rankingsContext as ranking}
										<tr class={ranking.isCurrentCountry ? 'bg-primary/10 font-semibold' : ''}>
											<td class="text-center">
												{#if ranking.isCurrentCountry}
													<div class="badge badge-primary badge-sm">{ranking.rank}</div>
												{:else}
													{ranking.rank}
												{/if}
											</td>
											<td class="truncate max-w-[120px]">{ranking.name}</td>
											<td class="text-right tabular-nums text-xs"
												>{fN(ranking.emissionsQuantity)}</td
											>
											<td class="text-right tabular-nums text-xs"
												>{fN(ranking.emissionsPerCapita)}</td
											>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<div class="text-xs opacity-60 mt-2 ml-3">
							Showing ±3 countries around {data.name}'s position
						</div>
					</div>
				</div>
			{/if}

			{#if topSectors.length > 0}
				<div class="card bg-base-200 border border-base-300">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-4">
							<Factory size={24} weight="fill" class="text-secondary" />
							<h2 class="card-title">Top Emission Sectors</h2>
						</div>

						<div class="space-y-3">
							{#each topSectors as sector}
								<div>
									<div class="flex justify-between items-center mb-1">
										<span class="text-sm font-medium">{formatSector(sector.sector)}</span>
										<span class="text-sm font-bold tabular-nums"
											>{fN(sector.emissionsQuantity)}</span
										>
									</div>
									<div class="flex items-center gap-2">
										<progress
											class="progress progress-secondary w-full"
											value={sector.percentage}
											max="100"
										></progress>
										<span class="text-xs opacity-60 tabular-nums min-w-[3rem]"
											>{sector.percentage.toFixed(1)}%</span
										>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
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
								nice: true,
								ticks: years,
								tickFormat(d) {
									return d.valueOf() as number;
								}
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

							<Pointer data={emissionsTimeseries} x="year">
								{#snippet children({ data })}
									<Text
										{data}
										fill="currentColor"
										stroke="var(--color-base-200)"
										strokeWidth={4}
										x="year"
										class="font-mono"
										y="emissions"
										text={(d) => `${fN(d.emissions, 4, 'compact')} t`}
										fontSize={12}
										lineAnchor="bottom"
										fontWeight="bold"
										dy={-10}
									/>
								{/snippet}
							</Pointer>
						</Plot>

						<div class="text-xs opacity-60 mt-2">Emissions in tonnes CO₂e</div>
					</div>
				</div>
			{/if}

			{#if cities && cities.length > 0}
				<div class="card bg-base-200 border border-base-300">
					<div class="card-body">
						<div class="flex items-center gap-2 mb-4">
							<Buildings size={24} weight="fill" class="text-info" />
							<h2 class="card-title">Major Cities</h2>
						</div>

						<div class="space-y-2">
							{#each cities as city}
								<div class="flex items-center gap-2">
									<MapPin size={16} class="opacity-60" />
									<span class="text-sm">{city.name}</span>
								</div>
							{/each}
						</div>

						<a href="/cities?country={country}" class="btn btn-sm btn-outline mt-4"
							>View All Cities</a
						>
					</div>
				</div>
			{/if}
		</div>

		{#if countrySources.length > 0}
			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-4">
						<Factory size={24} weight="bold" class="text-warning" />
						<h2 class="card-title">Top Emission Sources in {data.name}</h2>
					</div>

					<div class="overflow-x-auto">
						<table class="table table-sm">
							<thead>
								<tr>
									<th>Source Name</th>
									<th>Sector</th>
									<th class="text-right">Emissions</th>
								</tr>
							</thead>
							<tbody>
								{#each countrySources as source}
									<tr class="hover">
										<td>
											<a href="/source/{source.id}" class="link link-hover">{source.name}</a>
										</td>
										<td class="text-sm opacity-70">{formatSector(source.sector)}</td>
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
