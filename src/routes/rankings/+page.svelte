<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { fN } from '$lib/utils';
	import { getAllRankings } from '../api/rankings.remote';
	import { Pagination } from '$lib/components/ui';
	import { Plot, LineY } from 'svelteplot';
	import { ct } from '$lib/api';

	const ITEMS_PER_PAGE = 20;

	const data = await ct('getCountryRankings', { start: '2015-01', end: '2024-12' });

	let currentPage = $state(parseInt(page.url.searchParams.get('page') || '1'));
	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentRankings = $derived(data?.rankings.slice(startIndex, endIndex) || []);

	function handlePageChange(newPage: number) {
		currentPage = newPage;
		goto(`?page=${newPage}`, { keepFocus: true, noScroll: false });
	}

	function getTimeseriesData() {
		if (!data?.totals?.timeseries) return [];
		const grouped = new Map<number, number>();
		data.totals.timeseries.forEach((t) => {
			const current = grouped.get(t.year) || 0;
			grouped.set(t.year, current + t.emissionsQuantity);
		});
		return Array.from(grouped.entries())
			.sort((a, b) => a[0] - b[0])
			.map(([year, emissions]) => ({ year, emissions }));
	}

	const timeseriesData = $derived(getTimeseriesData());
</script>

<div class="">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold mb-4">Global Emissions Rankings</h1>
		<div class="mt-6">
			<Pagination
				count={data.rankings.length}
				perPage={ITEMS_PER_PAGE}
				bind:page={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	</div>

	{#if !data}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading rankings...</p>
			</div>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Country</th>
						<th class="text-right">Emissions (tonnes CO₂e)</th>
						<th class="w-48">Trend (2021-2024)</th>
					</tr>
				</thead>
				<tbody>
					{#each currentRankings as ranking, i}
						{@const countryData = timeseriesData.map((t) => ({
							year: t.year,
							emissions: (t.emissions * ranking.percentage) / 100
						}))}
						<tr
							class="hover:bg-base-200 cursor-pointer"
							onclick={() => goto(`/country/${ranking.country}`)}
						>
							<td>{startIndex + i + 1}</td>
							<td>
								{ranking.name}
							</td>
							<td class="tabular-nums text-right">{fN(ranking.emissionsQuantity)}</td>
							<td>
								{#if countryData.length > 0}
									<Plot
										height={40}
										marginTop={5}
										marginBottom={5}
										marginLeft={0}
										marginRight={0}
										y={{ axis: null }}
										x={{ axis: null }}
									>
										<LineY
											data={countryData}
											x="year"
											y="emissions"
											curve="monotone-x"
											stroke="var(--color-primary)"
											strokeWidth={1.5}
										/>
									</Plot>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
