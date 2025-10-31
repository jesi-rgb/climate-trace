<script lang="ts">
	import { ct } from '$lib/api';
	import { fN, formatSector } from '$lib/utils';
	import SectorData from '$lib/components/sector/SectorData.svelte';

	let topSources = $state<any[]>([]);
	let countryRankings = $state<any[]>([]);
	let sectors = $state<string[]>([]);
	let subsectors = $state<string[]>([]);
	let gases = $state<string[]>([]);
	let globalEmissions = $state<any>(null);
	let sectorEmissions = $state<any[]>([]);
	let subsectorEmissions = $state<any[]>([]);
	let topCountries = $state<any[]>([]);
	let countries = $state<any[]>([]);
	let continents = $state<string[]>([]);
	let loading = $state(true);

	async function loadDashboard() {
		loading = true;
		try {
			const [
				sourcesRes,
				rankingsRes,
				sectorsRes,
				subsectorsRes,
				gasesRes,
				emissionsRes,
				countriesRes,
				continentsRes
			] = await Promise.all([
				ct('getSources', { year: 2022, limit: 30 }),
				ct('getCountryRankings', { gas: 'co2e_100yr', start: '2022', end: '2022' }),
				ct('getSectors', undefined),
				ct('getSubsectors', undefined),
				ct('getGases', undefined),
				ct('getAggregatedEmissions', { year: 2022 }),
				ct('getCountries', undefined),
				ct('getContinents', undefined)
			]);

			topSources = sourcesRes || [];
			countryRankings = (rankingsRes?.rankings || []).slice(0, 25);
			sectors = sectorsRes || [];
			subsectors = subsectorsRes || [];
			gases = gasesRes || [];
			globalEmissions = emissionsRes;
			countries = countriesRes || [];
			continents = continentsRes || [];

			if (
				emissionsRes?.sectors?.summaries &&
				Array.isArray(emissionsRes.sectors.summaries) &&
				emissionsRes.sectors.summaries.length > 0
			) {
				sectorEmissions = emissionsRes.sectors.summaries;
			}

			if (
				emissionsRes?.subsectors?.summaries &&
				Array.isArray(emissionsRes.subsectors.summaries) &&
				emissionsRes.subsectors.summaries.length > 0
			) {
				subsectorEmissions = emissionsRes.subsectors.summaries.slice(0, 20);
			}

			topCountries = (rankingsRes?.rankings || []).slice(0, 10);
		} catch (error) {
			console.error('Failed to load dashboard:', error);
		} finally {
			loading = false;
		}
	}

	loadDashboard();
</script>

<main class="px-section-x py-section-y">
	{#if loading}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading dashboard data...</p>
			</div>
		</div>
	{:else}
		<div class="grid lg:grid-cols-6 join">
			<div class="bg-base-200 border border-subtle join-item p-2">
				<h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Global Emissions</h2>
				<div class="mt-1">
					<div class="font-bold text-primary">
						{fN(globalEmissions?.totals?.summaries?.[0]?.emissionsQuantity || 0, 0)} t
					</div>
					<p class="text-[9px] text-muted">CO2e (2022)</p>
				</div>
			</div>

			<div class="bg-base-200 border border-subtle join-item p-2">
				<h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Sources</h2>
				<div class="mt-1">
					<div class="font-bold text-secondary">
						{fN(topSources.length * 100, 0)}+
					</div>
					<p class="text-[9px] text-muted">Mrs worldwide</p>
				</div>
			</div>

			<div class="bg-base-200 border border-subtle join-item p-2">
				<h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Sectors</h2>
				<div class="mt-1">
					<div class="font-bold text-accent">{sectors.length}</div>
					<p class="text-[9px] text-muted">Industrial sectors</p>
				</div>
			</div>

			<div class="bg-base-200 border border-subtle join-item p-2">
				<h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Subsectors</h2>
				<div class="mt-1">
					<div class="font-bold text-warning">{subsectors.length}</div>
					<p class="text-[9px] text-muted">Subsector categories</p>
				</div>
			</div>

			<div class="bg-base-200 border border-subtle join-item p-2">
				<h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Countries</h2>
				<div class="mt-1">
					<div class="font-bold text-info">{countries.length}</div>
					<p class="text-[9px] text-muted">With data available</p>
				</div>
			</div>

			<div class="bg-base-200 border border-subtle join-item p-2">
				<h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Continents</h2>
				<div class="mt-1">
					<div class="font-bold text-success">{continents.length}</div>
					<p class="text-[9px] text-muted">Geographic regions</p>
				</div>
			</div>
		</div>

		<div class="grid lg:grid-cols-4 join">
			<div class="bg-base-200 border border-t-0 border-subtle join-item p-2.5">
				<h2 class="text-[11px] font-semibold text-base-content mb-1.5">
					Top Countries by Emissions
				</h2>
				<div class="space-y-1">
					{#each countryRankings as country, i}
						<div class="flex items-center justify-between text-[11px]">
							<div class="flex items-center gap-1.5 flex-1 min-w-0">
								<div
									class="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-base-300 font-mono text-[9px] font-bold text-base-content"
								>
									{i + 1}
								</div>
								<span class="text-base-content truncate">{country.name || country.country}</span>
							</div>
							<span class="font-mono text-[9px] text-muted ml-2 shrink-0"
								>{fN(country.emissionsQuantity)} t</span
							>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-base-200 border border-t-0 border-subtle join-item p-2.5">
				<h2 class="text-[11px] font-semibold text-base-content mb-1.5">Emissions by Sector</h2>
				<div class="space-y-1">
					{#each sectorEmissions as sector}
						<div>
							<div class="mb-0.5 flex items-center justify-between text-[10px]">
								<span class="text-base-content truncate">{formatSector(sector.sector)}</span>
								<span class="font-mono text-muted ml-2 shrink-0"
									>{sector.percentage.toFixed(1)}%</span
								>
							</div>
							<div class="h-0.5 w-full overflow-hidden rounded-full bg-base-300">
								<div class="h-full bg-primary" style="width: {sector.percentage}%"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-base-200 border border-subtle border-t-0 join-item p-2.5">
				<h2 class="text-[11px] font-semibold text-base-content mb-1.5">Top Subsectors</h2>
				<div class="space-y-1">
					{#each subsectorEmissions as subsector}
						<div>
							<div class="mb-0.5 flex items-center justify-between text-[10px]">
								<span class="text-base-content truncate">{formatSector(subsector.subsector)}</span>
								<span class="font-mono text-muted ml-2 shrink-0"
									>{subsector.percentage.toFixed(1)}%</span
								>
							</div>
							<div class="h-0.5 w-full overflow-hidden rounded-full bg-base-300">
								<div class="h-full bg-secondary" style="width: {subsector.percentage}%"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-base-200 border border-subtle border-t-0 join-item p-2.5">
				<h2 class="text-[11px] font-semibold text-base-content mb-1.5">Regional Leaders</h2>
				<div class="grid grid-cols-2 gap-1.5">
					{#each topCountries as country}
						<div class="rounded border border-subtle bg-base-100 p-1.5 text-center">
							<div class="text-base font-bold text-primary">
								#{country.rank}
							</div>
							<div class="text-[9px] font-semibold text-base-content truncate">
								{country.name || country.country}
							</div>
							<div class="font-mono text-[8px] text-muted">
								{fN(country.emissionsQuantity)} t
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="grid lg:grid-cols-3 join">
			<div class="bg-base-200 border border-subtle join-item p-2.5">
				<h2 class="text-[11px] font-semibold text-base-content mb-1.5">
					Top Emission Sources (All)
				</h2>
				<div class="space-y-1">
					{#each topSources as source}
						<div class="rounded border border-subtle bg-base-100 p-1.5">
							<div class="flex items-start justify-between">
								<div class="flex-1 min-w-0">
									<h3 class="text-[10px] font-semibold text-base-content truncate">
										{source.name}
									</h3>
									<p class="text-[9px] text-muted">
										{formatSector(source.sector)} • {source.country}
									</p>
								</div>
								<div class="text-right ml-2 shrink-0">
									<div class="font-mono text-[10px] font-bold text-primary">
										{fN(source.emissionsQuantity)}
									</div>
									<div class="text-[8px] text-muted">tonnes</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<SectorData {sectors} />

			<div class="bg-base-200 border border-subtle join-item p-2.5">
				<h3 class="text-[11px] font-semibold text-base-content mb-1">Continents</h3>
				<div class="flex flex-wrap gap-1 mb-2">
					{#each continents as continent}
						<div class="badge badge-accent badge-sm text-[9px]">{continent}</div>
					{/each}
				</div>

				<h3 class="mt-2 text-[11px] font-semibold text-base-content mb-1">Key Gases</h3>
				<div class="flex flex-wrap gap-0.5">
					{#each ['co2', 'ch4', 'n2o', 'co2e_100yr', 'co2e_20yr'] as gas}
						<div class="badge badge-secondary badge-sm text-[9px]">
							{gas.toUpperCase()}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</main>
