<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fN } from '$lib/utils';
	import { getAllRankings } from '../api/rankings.remote';

	const ITEMS_PER_PAGE = 20;

	const data = await getAllRankings();
	console.log(data);

	const currentPage = $derived(parseInt($page.url.searchParams.get('page') || '1'));
	const totalPages = $derived(Math.ceil((data?.rankings.length || 0) / ITEMS_PER_PAGE));
	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentRankings = $derived(data?.rankings.slice(startIndex, endIndex) || []);

	function goToPage(page: number) {
		goto(`?page=${page}`, { keepFocus: true, noScroll: false });
	}

	function getDropdownPages() {
		const pages = [];
		const start = currentPage + 1;
		const end = Math.min(currentPage + 4, totalPages);
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	}
</script>

<div class="container mx-auto p-4">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Global Emissions Rankings</h1>
		{#if data}
			<div class="join">
				<button
					class="join-item btn"
					disabled={currentPage === 1}
					onclick={() => goToPage(1)}
					title="First page"
				>
					««
				</button>
				<button
					class="join-item btn"
					disabled={currentPage === 1}
					onclick={() => goToPage(currentPage - 1)}
				>
					«
				</button>

				<div class="dropdown dropdown-center">
					<button tabindex="0" role="button" class="join-item btn">Page {currentPage}</button>
					{#if getDropdownPages().length > 0}
						<ul
							tabindex="0"
							class="menu dropdown-content border-subtle z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
						>
							{#each getDropdownPages() as page}
								<li><button onclick={() => goToPage(page)}>Page {page}</button></li>
							{/each}
						</ul>
					{/if}
				</div>

				<button
					class="join-item btn"
					disabled={currentPage === totalPages}
					onclick={() => goToPage(currentPage + 1)}
				>
					»
				</button>
				<button
					class="join-item btn"
					disabled={currentPage === totalPages}
					onclick={() => goToPage(totalPages)}
					title="Last page"
				>
					»»
				</button>
			</div>
		{/if}
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
						<th>Emissions (tonnes CO₂e)</th>
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
								{ranking.country}
							</td>
							<td class="tabular-nums text-right">{fN(ranking.emissionsQuantity)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
