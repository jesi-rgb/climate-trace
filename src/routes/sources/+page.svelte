<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getTopSources } from '../api/source.remote';
	import type { SourceSummary } from '$lib/api/schemas/generated';
	import { fN, formatSector } from '$lib/utils';

	const ITEMS_PER_PAGE = 20;

	let sources = $state<SourceSummary[]>([]);
	let filteredSources = $state<SourceSummary[]>([]);
	let searchTerm = $state('');
	let selectedSubsectors = $state<string[]>([]);
	let loading = $state(true);
	let sectorHierarchy = $state<Record<string, string[]>>({});

	const currentPage = $derived(parseInt(page.url.searchParams.get('page') || '1'));
	const totalPages = $derived(Math.ceil(filteredSources.length / ITEMS_PER_PAGE));
	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const paginatedSources = $derived(filteredSources.slice(startIndex, endIndex));

	async function loadSources() {
		loading = true;
		try {
			const data = await getTopSources({ limit: 1000 });
			sources = data || [];
			filteredSources = sources;

			const hierarchy: Record<string, Set<string>> = {};
			for (const source of sources) {
				if (!hierarchy[source.sector]) {
					hierarchy[source.sector] = new Set();
				}
				hierarchy[source.sector].add(source.subsector);
			}

			sectorHierarchy = Object.fromEntries(
				Object.entries(hierarchy).map(([sector, subsectors]) => [
					sector,
					Array.from(subsectors).sort()
				])
			);
		} finally {
			loading = false;
		}
	}

	function toggleSubsector(subsector: string) {
		if (selectedSubsectors.includes(subsector)) {
			selectedSubsectors = selectedSubsectors.filter((s) => s !== subsector);
		} else {
			selectedSubsectors = [...selectedSubsectors, subsector];
		}
	}

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

	$effect(() => {
		let result = sources;

		if (searchTerm) {
			result = result.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		if (selectedSubsectors.length > 0) {
			result = result.filter((s) => selectedSubsectors.includes(s.subsector));
		}

		filteredSources = result;
		if (currentPage > Math.ceil(result.length / ITEMS_PER_PAGE)) {
			goToPage(1);
		}
	});

	loadSources();
</script>

<div class="drawer drawer-open">
	<input id="sources-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="container mx-auto p-4">
			<div class="mb-6 flex items-center justify-between">
				<h1 class="text-3xl font-bold">Sources</h1>
				{#if !loading}
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
									{#each getDropdownPages() as pageNum}
										<li><button onclick={() => goToPage(pageNum)}>Page {pageNum}</button></li>
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

			{#if loading}
				<div class="flex my-20 items-center justify-center">
					<div class="text-center">
						<div class="loading loading-spinner loading-lg text-primary"></div>
						<p class="mt-4 text-xs text-muted">Loading sources...</p>
					</div>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Sector</th>
								<th>Subsector</th>
								<th>Country</th>
								<th>Asset Type</th>
								<th>Source Type</th>
								<th>Emissions (tonnes CO₂e)</th>
								<th>Year</th>
							</tr>
						</thead>
						<tbody>
							{#each paginatedSources as source}
								<tr class="hover">
									<td>
										<a href="/source/{source.id}" class="link link-hover">
											{source.name}
										</a>
									</td>
									<td>
										<a href="/sector/{source.sector}" class="link link-hover">
											{formatSector(source.sector)}
										</a>
									</td>
									<td>{formatSector(source.subsector)}</td>
									<td>
										<a href="/country/{source.country}" class="link link-hover">
											{source.country}
										</a>
									</td>
									<td>{source.assetType}</td>
									<td>{formatSector(source.sourceType)}</td>
									<td class="tabular-nums text-right">{fN(source.emissionsQuantity)}</td>
									<td>{source.year}</td>
								</tr>
							{:else}
								<tr>
									<td colspan="8" class="text-center text-muted">No sources found</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-4 text-sm text-muted">
					Showing {filteredSources.length} of {sources.length} sources
				</div>
			{/if}
		</div>
	</div>
	<div class="drawer-side">
		<label for="sources-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-200 min-h-full w-80 p-4">
			<h2 class="text-lg font-semibold mb-4">Filters</h2>

			<div class="space-y-6">
				<div>
					<label class="flex-col">
						<span class="label-text font-medium">Search</span>
						<input
							type="text"
							bind:value={searchTerm}
							placeholder="Search by name..."
							class="input input-bordered input-sm w-full"
						/>
					</label>
				</div>

				<div>
					<div class="flex items-center justify-between mb-2">
						<span class="label-text font-medium">Sectors & Subsectors</span>
						{#if selectedSubsectors.length > 0}
							<button
								type="button"
								class="btn btn-ghost btn-xs"
								onclick={() => (selectedSubsectors = [])}
							>
								Clear
							</button>
						{/if}
					</div>
					<ul class="menu menu-sm bg-base-100 rounded-box w-full">
						{#each Object.entries(sectorHierarchy) as [sector, subsectors]}
							<li>
								<details open>
									<summary class="font-medium">
										{formatSector(sector)}
									</summary>
									<ul>
										{#each subsectors as subsector}
											<li>
												<label class="cursor-pointer justify-start gap-2 py-1 flex">
													<input
														type="checkbox"
														class="checkbox checkbox-xs"
														checked={selectedSubsectors.includes(subsector)}
														onchange={() => toggleSubsector(subsector)}
													/>
													<span class="text-xs">{formatSector(subsector)}</span>
												</label>
											</li>
										{/each}
									</ul>
								</details>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
