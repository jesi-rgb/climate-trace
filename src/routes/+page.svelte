<script lang="ts">
	import { ct } from '$lib/api';
	import { fN, formatSector } from '$lib/utils';
	import Card from '$lib/components/ui/Card.svelte';
	import Body from '$lib/components/type/Body.svelte';
	import Heading from '$lib/components/type/Heading.svelte';
	import Figure from '$lib/components/type/Figure.svelte';
	import { Plot, LineY, BarX, Dot, Pointer, Text } from 'svelteplot';
	import {
		Globe,
		Factory,
		Flame,
		TrendUp,
		MapPin,
		ChartBar,
		Lightning,
		TreeEvergreen
	} from 'phosphor-svelte';

	const years = [2021, 2022, 2023, 2024];

	let loading = $state(true);
	let globalStats = $state<any>(null);
	let yearlyEmissions = $state<any[]>([]);
	let topCountries = $state<any[]>([]);
	let sectorData = $state<any[]>([]);
	let subsectorData = $state<any[]>([]);
	let topSources = $state<any[]>([]);
	let countries = $state<any[]>([]);
	let continents = $state<string[]>([]);

	async function loadDashboard() {
		loading = true;
		try {
			// Load data for all years in parallel
			const allResults = await Promise.all([
				// Emissions for each year
				...years.map((year) => ct('getAggregatedEmissions', { year })),
				// Rankings for each year
				...years.map((year) =>
					ct('getCountryRankings', { gas: 'co2e_100yr', start: String(year), end: String(year) })
				),
				// Other data
				ct('getSources', { year: 2024, limit: 50 }),
				ct('getCountries', undefined),
				ct('getContinents', undefined),
				ct('getSectors', undefined),
				ct('getSubsectors', undefined)
			]);

			// Extract the results
			const yearlyData = allResults.slice(0, years.length);
			const yearlyRankings = allResults.slice(years.length, years.length * 2);
			const [sourcesRes, countriesRes, continentsRes, sectorsRes, subsectorsRes] = allResults.slice(
				years.length * 2
			);

			// Process yearly emissions for timeline
			yearlyEmissions = years.map((year, index) => ({
				year,
				emissions: yearlyData[index]?.totals?.summaries?.[0]?.emissionsQuantity || 0
			}));

			// Get latest year data
			const latestEmissions = yearlyData[years.length - 1];
			globalStats = {
				totalEmissions: latestEmissions?.totals?.summaries?.[0]?.emissionsQuantity || 0,
				sources: sourcesRes?.length || 0,
				countries: countriesRes?.length || 0,
				continents: continentsRes?.length || 0,
				sectors: sectorsRes?.length || 0,
				subsectors: subsectorsRes?.length || 0
			};

			// Get latest rankings
			const latestRankings = yearlyRankings[years.length - 1];
			topCountries = (latestRankings?.rankings || []).slice(0, 12);

			// Process sector data
			if (latestEmissions?.sectors?.summaries) {
				sectorData = latestEmissions.sectors.summaries
					.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity)
					.slice(0, 8)
					.map((s) => ({
						sector: formatSector(s.sector),
						emissions: s.emissionsQuantity,
						percentage: s.percentage
					}));
			}

			// Process subsector data
			if (latestEmissions?.subsectors?.summaries) {
				subsectorData = latestEmissions.subsectors.summaries
					.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity)
					.slice(0, 10)
					.map((s) => ({
						subsector: formatSector(s.subsector),
						emissions: s.emissionsQuantity,
						percentage: s.percentage
					}));
			}

			topSources = sourcesRes || [];
			countries = countriesRes || [];
			continents = continentsRes || [];
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
				<Body size="12" class="mt-4 text-muted">Loading global emissions dashboard...</Body>
			</div>
		</div>
	{:else}
		<!-- Header Section -->
		<div class="mb-6">
			<Heading size="h1" class="mb-2">Global Emissions Dashboard</Heading>
			<Body size="16" class="text-muted">
				Comprehensive climate data tracking emissions across {globalStats?.countries || 0} countries
				from {years[0]}–{years[years.length - 1]}
			</Body>
		</div>

		<!-- Key Metrics -->
		<div class="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
			<Figure
				icon={Globe}
				title="Global Emissions"
				value={fN(globalStats?.totalEmissions || 0, 0)}
				subtitle="tonnes CO₂e ({years[years.length - 1]})"
				color="primary"
			/>
			<Figure
				icon={Factory}
				title="Sectors"
				value={globalStats?.sectors || 0}
				subtitle="industrial categories"
				color="accent"
			/>
			<Figure
				icon={Lightning}
				title="Subsectors"
				value={globalStats?.subsectors || 0}
				subtitle="detailed breakdowns"
				color="warning"
			/>
			<Figure
				icon={Globe}
				title="Countries"
				value={globalStats?.countries || 0}
				subtitle="with available data"
				color="info"
			/>
			<Figure
				icon={TreeEvergreen}
				title="Continents"
				value={globalStats?.continents || 0}
				subtitle="geographic regions"
				color="success"
			/>
		</div>

		<!-- Main Dashboard Grid -->
		<div class="grid lg:grid-cols-2 gap-4 mb-4">
			<!-- Global Emissions Timeline -->
			<Card>
				{#snippet title()}
					<div class="flex items-center gap-2">
						<TrendUp size={24} weight="bold" class="text-primary" />
						<Heading size="h3">Global Emissions Timeline</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4">
						<Plot
							height={280}
							inset={15}
							y={{
								grid: true,
								nice: true,
								tickFormat(d) {
									return fN(d.valueOf() as number, 0);
								}
							}}
							x={{
								grid: true,
								nice: true,
								ticks: years,
								tickFormat(d) {
									return String(d.valueOf());
								}
							}}
						>
							<LineY
								data={yearlyEmissions}
								x="year"
								y="emissions"
								curve="monotone-x"
								stroke="var(--color-primary)"
								strokeWidth={3}
							/>

							<Dot
								data={yearlyEmissions}
								x="year"
								y="emissions"
								fill="var(--color-primary)"
								r={5}
							/>

							<Pointer data={yearlyEmissions} x="year">
								{#snippet children({ data })}
									<Text
										{data}
										fill="currentColor"
										stroke="var(--color-base-200)"
										strokeWidth={4}
										x="year"
										class="font-mono"
										y="emissions"
										text={(d) => `${fN(d.emissions, 2, 'compact')} t`}
										fontSize={13}
										lineAnchor="bottom"
										fontWeight="bold"
										dy={-12}
									/>
								{/snippet}
							</Pointer>
						</Plot>
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Total annual CO₂e emissions in tonnes</Body>
				{/snippet}
			</Card>

			<!-- Top Emission Sectors -->
			<Card>
				{#snippet title()}
					<div class="flex items-center gap-2">
						<Factory size={24} weight="fill" class="text-primary" />
						<Heading size="h3">Top Emission Sectors</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4">
						<Plot
							height={280}
							marginLeft={160}
							marginRight={30}
							marginBottom={40}
							y={{
								domain: sectorData.map((d) => d.sector),
								type: 'band'
							}}
							x={{
								grid: true,
								nice: true,
								tickFormat(d) {
									return fN(d.valueOf() as number);
								}
							}}
						>
							<BarX
								data={sectorData}
								x="emissions"
								y="sector"
								fill="var(--color-primary)"
								fillOpacity={0.2}
								stroke="var(--color-primary)"
								strokeWidth={2}
							/>
						</Plot>
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Emissions by sector in tonnes CO₂e</Body>
				{/snippet}
			</Card>
		</div>

		<!-- Emissions Timeline - Full Width -->
		<div class="mb-4 w-full">
			<Card class="w-full">
				{#snippet title()}
					<div class="flex items-center gap-2">
						<TrendUp size={24} weight="bold" class="text-primary" />
						<Heading size="h3">Emissions Timeline</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4 py-2">
						<ul class="timeline w-fit mx-auto">
							{#each yearlyEmissions as yearData, i}
								{@const prevYear = i > 0 ? yearlyEmissions[i - 1] : null}
								{@const change = prevYear
									? ((yearData.emissions - prevYear.emissions) / prevYear.emissions) * 100
									: 0}
								<li>
									{#if i > 0}
										<hr class="bg-primary" />
									{/if}
									<div class="timeline-start text-xs font-mono">{yearData.year}</div>
									<div class="timeline-middle">
										<div class="w-3 h-3 rounded-full bg-primary"></div>
									</div>
									<div class="timeline-end timeline-box">
										<Body size="16" class="font-semibold">{fN(yearData.emissions, 0)}</Body>
										<Body size="12" class="text-muted">tonnes CO₂e</Body>
										{#if prevYear}
											<div class="mt-1">
												<span
													class="text-xs
													font-semibold text-error"
												>
													{change > 0 ? '+' : ''}{change.toFixed(2)}%
												</span>
											</div>
										{/if}
									</div>
									{#if i < yearlyEmissions.length - 1}
										<hr class="bg-primary" />
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Year-over-year emissions change</Body>
				{/snippet}
			</Card>
		</div>

		<!-- Secondary Grid -->
		<div class="grid lg:grid-cols-2 gap-4 mb-4">
			<!-- Top Countries -->
			<Card>
				{#snippet title()}
					<div class="flex items-center gap-2">
						<Globe size={24} weight="fill" class="text-secondary" />
						<Heading size="h3">Top Emitting Countries</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4 space-y-2">
						{#each topCountries as country, i}
							<a
								href="/country/{country.country}"
								class="block hover:bg-base-300/50 rounded-lg p-2 transition-colors"
							>
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3 flex-1 min-w-0">
										<div
											class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/30 font-mono text-sm font-bold text-secondary"
										>
											{i + 1}
										</div>
										<Body size="16" class="truncate">{country.name || country.country}</Body>
									</div>
									<Body size="12" class="font-mono text-muted ml-2 shrink-0"
										>{fN(country.emissionsQuantity)} t</Body
									>
								</div>
							</a>
						{/each}
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Based on {years[years.length - 1]} data</Body>
				{/snippet}
			</Card>

			<!-- Top Subsectors -->
			<Card>
				{#snippet title()}
					<div class="flex items-center gap-2">
						<ChartBar size={24} weight="fill" class="text-accent" />
						<Heading size="h3">Top Subsectors</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4">
						<Plot
							height={350}
							marginLeft={180}
							marginRight={30}
							marginBottom={40}
							y={{
								domain: subsectorData.map((d) => d.subsector),
								type: 'band'
							}}
							x={{
								grid: true,
								nice: true,
								tickFormat(d) {
									return fN(d.valueOf() as number);
								}
							}}
						>
							<BarX
								data={subsectorData}
								x="emissions"
								y="subsector"
								fill="var(--color-accent)"
								fillOpacity={0.2}
								stroke="var(--color-accent)"
								strokeWidth={2}
							/>
						</Plot>
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Emissions in tonnes CO₂e</Body>
				{/snippet}
			</Card>
		</div>

		<!-- Bottom Grid - Detailed Lists -->
		<div class="grid lg:grid-cols-2 gap-4">
			<!-- Top Emission Sources -->
			<Card>
				{#snippet title()}
					<div class="flex items-center gap-2">
						<Flame size={24} weight="fill" class="text-error" />
						<Heading size="h3">Top Emission Sources Worldwide</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4 space-y-2">
						{#each topSources.slice(0, 20) as source}
							<a
								href="/source/{source.sourceId}"
								class="block hover:bg-base-300/50 rounded-lg p-2 transition-colors"
							>
								<div class="flex items-start justify-between">
									<div class="flex-1 min-w-0">
										<Body size="16" class="font-semibold truncate">{source.name}</Body>
										<Body size="12" class="text-muted">
											{formatSector(source.sector)} • {source.country}
										</Body>
									</div>
									<div class="text-right ml-3 shrink-0">
										<Body size="16" class="font-mono font-bold text-primary">
											{fN(source.emissionsQuantity)}
										</Body>
										<Body size="12" class="text-muted">tonnes</Body>
									</div>
								</div>
							</a>
						{/each}
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Top 20 emission sources globally</Body>
				{/snippet}
			</Card>

			<!-- Sector Breakdown Chart -->
			<Card>
				{#snippet title()}
					<div class="flex items-center gap-2">
						<Factory size={24} weight="bold" class="text-info" />
						<Heading size="h3">Sector Breakdown</Heading>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4">
						<Plot
							height={280}
							marginLeft={160}
							marginRight={30}
							marginBottom={40}
							y={{
								domain: sectorData.map((d) => d.sector),
								type: 'band'
							}}
							x={{
								grid: true,
								nice: true,
								tickFormat(d) {
									return fN(d.valueOf() as number);
								}
							}}
						>
							<BarX
								data={sectorData}
								x="emissions"
								y="sector"
								fill="var(--color-info)"
								fillOpacity={0.2}
								stroke="var(--color-info)"
								strokeWidth={2}
							/>
						</Plot>

						<div class="mt-4 pt-4 border-t border-base-300">
							<div class="flex items-center justify-between">
								<Body size="16" class="font-semibold">Total Coverage</Body>
								<Body size="16" class="font-mono font-bold">
									{sectorData.reduce((sum, s) => sum + s.percentage, 0).toFixed(1)}%
								</Body>
							</div>
						</div>
					</div>
				{/snippet}

				{#snippet footnote()}
					<Body size="12" class="text-muted">Emissions in tonnes CO₂e</Body>
				{/snippet}
			</Card>
		</div>
	{/if}
</main>
