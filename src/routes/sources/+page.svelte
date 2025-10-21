<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getTopSources } from '../api/source.remote';
	import { fN, formatSector } from '$lib/utils';
	import { Pagination } from '$lib/components/ui';
	import { Factory, Tree, Car, Lightning, Buildings } from 'phosphor-svelte';

	const ITEMS_PER_PAGE = 20;
	const FETCH_CHUNK_SIZE = 500;

	const sectorIcons: Record<string, any> = {
		'fossil-fuel-operations': Factory,
		'forestry-and-land-use': Tree,
		manufacturing: Factory,
		transportation: Car,
		power: Lightning,
		buildings: Buildings
	};

	const MAX_DISPLAYABLE_ITEMS = 10000;

	let searchTerm = $state('');
	let selectedSubsectors = $state<string[]>([]);
	let currentPage = $state(parseInt(page.url.searchParams.get('page') || '1'));

	let hierarchyData = $derived(await getTopSources({ limit: 1000 }));

	let sectorHierarchy = $derived.by(() => {
		if (!hierarchyData) return {};
		const hierarchy: Record<string, Set<string>> = {};
		for (const source of hierarchyData) {
			if (!hierarchy[source.sector]) {
				hierarchy[source.sector] = new Set();
			}
			hierarchy[source.sector].add(source.subsector);
		}
		return Object.fromEntries(
			Object.entries(hierarchy).map(([sector, subsectors]) => [
				sector,
				Array.from(subsectors).sort()
			])
		);
	});

	let chunkOffset = $derived(
		Math.floor(((currentPage - 1) * ITEMS_PER_PAGE) / FETCH_CHUNK_SIZE) * FETCH_CHUNK_SIZE
	);

	let chunkData = $derived(
		await getTopSources({
			limit: FETCH_CHUNK_SIZE,
			offset: chunkOffset,
			subsectors: selectedSubsectors.length > 0 ? selectedSubsectors : undefined
		})
	);

	let paginatedSources = $derived.by(() => {
		if (!chunkData) return [];
		const indexInChunk = ((currentPage - 1) * ITEMS_PER_PAGE) % FETCH_CHUNK_SIZE;
		let sources = chunkData.slice(indexInChunk, indexInChunk + ITEMS_PER_PAGE);

		if (searchTerm) {
			sources = sources.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		return sources;
	});

	let totalCount = $derived(MAX_DISPLAYABLE_ITEMS);

	function toggleSubsector(subsector: string) {
		if (selectedSubsectors.includes(subsector)) {
			selectedSubsectors = selectedSubsectors.filter((s) => s !== subsector);
		} else {
			selectedSubsectors = [...selectedSubsectors, subsector];
		}
		handlePageChange(1);
	}

	function handlePageChange(newPage: number) {
		currentPage = newPage;
		goto(`?page=${newPage}`, { keepFocus: true, noScroll: false });
	}

	let loading = $derived($effect.pending());
</script>

<div class="drawer drawer-open">
	<input id="sources-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="container mx-auto p-4">
			<div class="mb-6">
				<h1 class="text-3xl font-bold">Sources</h1>
				<p class="text-sm opacity-60 mt-2">
					Showing top {totalCount.toLocaleString()} emission sources. Use filters to narrow results.
				</p>
			</div>

			<div class="mt-6 flex items-baseline justify-end">
				{#if loading}
					<div class="loading loading-bars"></div>
				{/if}
				<Pagination
					count={totalCount}
					perPage={ITEMS_PER_PAGE}
					bind:page={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
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
					<p class="text-xs opacity-60 mt-1">Searches within current page results</p>
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
							{@const SectorIcon = sectorIcons[sector] || Factory}
							<li>
								<details open>
									<summary class="font-medium">
										<SectorIcon size={16} class="inline mr-1" />
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
