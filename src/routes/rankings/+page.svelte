<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { fN } from '$lib/utils';
	import { getAllRankings } from '../api/rankings.remote';
	import { Pagination } from '$lib/components/ui';
	import TrendingLineRanking from '$lib/components/TrendingLineRanking.svelte';

	const ITEMS_PER_PAGE = 20;

	const data = await getAllRankings();

	let currentPage = $state(parseInt(page.url.searchParams.get('page') || '1'));
	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentRankings = $derived(data?.rankings.slice(startIndex, endIndex) || []);
	$inspect(currentRankings);

	function handlePageChange(newPage: number) {
		currentPage = newPage;
		goto(`?page=${newPage}`, { keepFocus: true, noScroll: false });
	}
</script>

<section class="px-section-x py-section-y">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold mb-4">Global Emissions Rankings</h1>

		<Pagination
			count={data.rankings.length}
			perPage={ITEMS_PER_PAGE}
			bind:page={currentPage}
			onPageChange={handlePageChange}
		/>
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
						<th class="">Trend (2015-2024)</th>
						<th class="text-right">Emissions (tonnes CO₂e)</th>
						<th class="text-right">Per Capita</th>
					</tr>
				</thead>
				<tbody>
					{#each currentRankings as ranking, i}
						<tr
							class="hover:bg-base-200 cursor-pointer"
							onclick={() => goto(`/country/${ranking.country}`)}
						>
							<td>{startIndex + i + 1}</td>
							<td>
								{ranking.name}
							</td>
							<td class="max-w-[0px]">
								<TrendingLineRanking country={ranking.country} />
							</td>
							<td class="tabular-nums text-right">{fN(ranking.emissionsQuantity)}</td>
							<td class="tabular-nums text-right">{fN(ranking.emissionsPerCapita)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>
