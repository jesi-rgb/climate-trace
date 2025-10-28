<script lang="ts">
	import { page } from '$app/state';
	import { fN } from '$lib/utils';
	import { getCountryData } from '../../api/country.remote';
	import { getAllRankings } from '../../api/rankings.remote';
	import { getAggregatedEmissions } from '../../api/emissions.remote';
	import { UsersThree, Globe, XCircle, Flame } from 'phosphor-svelte';
	import Figure from '$lib/components/type/Figure.svelte';
	import Heading from '$lib/components/type/Heading.svelte';
	import GeoSources from '$lib/components/country/GeoSources.svelte';
	import GlobalRankings from '$lib/components/country/GlobalRankings.svelte';
	import TopEmissionSectors from '$lib/components/country/TopEmissionSectors.svelte';
	import EmissionsTimeline from '$lib/components/country/EmissionsTimeline.svelte';
	import SourcesTable from '$lib/components/country/SourcesTable.svelte';

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
				<Heading size="h3">Country not found</Heading>
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
				<Heading size="h1">{data.name}</Heading>
				{#if data.subregion}
					<div class="badge badge-primary badge-lg">{data.subregion}</div>
				{/if}
			</div>
			{#if data.region}
				<p class="text-lg opacity-70 mt-2">{data.region}</p>
			{/if}
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-2 join-horizontal mb-2">
			<Figure
				icon={Flame}
				title="Emissions Per Capita"
				value={fN(data.emissionsPerCapita)}
				subtitle="tonnes CO₂e per person"
				color="error"
			/>

			<Figure
				icon={UsersThree}
				title="Population"
				value={fN(data.population)}
				subtitle="people"
				color="info"
			/>

			<Figure
				icon={Globe}
				title="Total Emissions"
				value={fN(data.totalEmissions)}
				subtitle="tonnes CO₂e"
				color="warning"
			/>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8">
			<GlobalRankings {rankingsContext} countryName={data.name} />
			<TopEmissionSectors {topSectors} />
			<EmissionsTimeline {emissionsTimeseries} {years} />
			<GeoSources countryCode={country} countryName={data.name} />
		</div>
	</div>
{/if}
