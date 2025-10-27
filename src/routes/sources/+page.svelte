<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getTopSources } from '../api/source.remote';
	import { getSectors, getSubsectors, getSubsectorDetails } from '../api/sector.remote';
	import { fN, formatSector } from '$lib/utils';
	import { Pagination } from '$lib/components/ui';
	import {
		Factory,
		Tree,
		Lightning,
		Buildings,
		CraneTower,
		GasCan,
		AirplaneTakeoff,
		Shovel,
		Trash
	} from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import type { SubSector } from '$lib/api';

	const ITEMS_PER_PAGE = 20;
	const FETCH_CHUNK_SIZE = 10000;

	const sectorIcons: Record<string, any> = {
		'fossil-fuel-operations': GasCan,
		'forestry-and-land-use': Tree,
		manufacturing: CraneTower,
		transportation: AirplaneTakeoff,
		power: Lightning,
		agriculture: Shovel,
		waste: Trash,
		buildings: Buildings
	};

	const MAX_DISPLAYABLE_ITEMS = 10000;

	let searchTerm = $state('');
	let selectedSubsectors = $state<string[]>(
		page.url.searchParams.get('subsectors')?.split(',').filter(Boolean) || []
	);
	let selectedSectors = $state<string[]>(
		page.url.searchParams.get('sectors')?.split(',').filter(Boolean) || []
	);
	let selectedGas = $state(page.url.searchParams.get('gas') || 'co2e_100yr');
	let currentPage = $state(parseInt(page.url.searchParams.get('page') || '1'));

	let sectorHierarchy: Record<string, string[]> = $state({});

	onMount(async () => {
		let sectors = await getSectors();
		let subsectors = await getSubsectors();

		if (!sectors || !subsectors) return {};

		const subsectorDetails: SubSector[] = await Promise.all(
			subsectors.map(async (subsector) => {
				const subSectorDetails = await getSubsectorDetails(subsector);
				return subSectorDetails;
			})
		);

		for (const subsector of subsectorDetails) {
			const sector = subsector.sector;
			if (!sectorHierarchy[sector]) {
				sectorHierarchy[sector] = [];
			}
			sectorHierarchy[sector].push(subsector.name);
		}
	});

	let chunkOffset = $derived(
		Math.floor(((currentPage - 1) * ITEMS_PER_PAGE) / FETCH_CHUNK_SIZE) * FETCH_CHUNK_SIZE
	);

	let chunkData = $derived(
		await getTopSources({
			limit: FETCH_CHUNK_SIZE,
			offset: chunkOffset,
			subsectors: selectedSubsectors.length > 0 ? selectedSubsectors : undefined,
			gas: selectedGas
		})
	);
	// $inspect({
	// 	limit: FETCH_CHUNK_SIZE,
	// 	offset: chunkOffset,
	// 	subsectors: selectedSubsectors.length > 0 ? selectedSubsectors : undefined,
	// 	sectors: selectedSectors.length > 0 ? selectedSectors : undefined,
	// 	gas: selectedGas
	// });

	let paginatedSources = $derived.by(() => {
		if (!chunkData || chunkData === null) return [];
		const indexInChunk = ((currentPage - 1) * ITEMS_PER_PAGE) % FETCH_CHUNK_SIZE;
		let sources = chunkData.slice(indexInChunk, indexInChunk + ITEMS_PER_PAGE);

		if (searchTerm) {
			sources = sources.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		return sources;
	});

	let totalCount = $derived.by(() => {
		if (!chunkData || chunkData === null) return 0;

		const chunkSize = chunkData.length;
		if (chunkSize < FETCH_CHUNK_SIZE) {
			return chunkOffset + chunkSize;
		}

		return MAX_DISPLAYABLE_ITEMS;
	});

	function toggleSubsector(subsector: string) {
		if (selectedSubsectors.includes(subsector)) {
			selectedSubsectors = selectedSubsectors.filter((s) => s !== subsector);
		} else {
			selectedSubsectors = [...selectedSubsectors, subsector];
		}
		updateFilters({ page: 1 });
	}

	function updateFilters(options: { page?: number } = {}) {
		const params = new URLSearchParams();
		const targetPage = options.page ?? currentPage;
		params.set('page', targetPage.toString());
		if (selectedGas !== 'co2e_100yr') params.set('gas', selectedGas);
		if (selectedSectors.length > 0) params.set('sectors', selectedSectors.join(','));
		if (selectedSubsectors.length > 0) params.set('subsectors', selectedSubsectors.join(','));
		goto(`?${params.toString()}`, { keepFocus: true, noScroll: false });
		currentPage = targetPage;
	}

	function handlePageChange(newPage: number) {
		updateFilters({ page: newPage });
	}

	let loading = $derived($effect.pending());
</script>

<div class="drawer drawer-open h-full">
	<input id="sources-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content overflow-y-auto">
		<div class="container mx-auto">
			<div class="px-section-x py-section-y">
				<div class="mb-6">
					<h1 class="text-3xl font-bold">Sources</h1>
					<p class="text-sm opacity-60 mt-2">
						Showing top {totalCount.toLocaleString()} emission sources. Use filters to narrow results.
					</p>
				</div>

				<div class="mb-6">
					<div class="label">
						<span class="label-text font-medium">Gas</span>
					</div>
					<div class="filter">
						<input
							class="btn filter-reset btn-sm"
							type="radio"
							name="gas"
							value="co2e_100yr"
							aria-label="CO₂e - Carbon Dioxide Equivalent"
							checked={selectedGas === 'co2e_100yr'}
							onchange={() => {
								selectedGas = 'co2e_100yr';
								updateFilters({ page: 1 });
							}}
						/>
						<input
							class="btn btn-sm"
							type="radio"
							name="gas"
							value="co2"
							aria-label="CO₂ - Carbon Dioxide"
							checked={selectedGas === 'co2'}
							onchange={() => {
								selectedGas = 'co2';
								updateFilters({ page: 1 });
							}}
						/>
						<input
							class="btn btn-sm"
							type="radio"
							name="gas"
							value="ch4"
							aria-label="CH₄ - Methane"
							checked={selectedGas === 'ch4'}
							onchange={() => {
								selectedGas = 'ch4';
								updateFilters({ page: 1 });
							}}
						/>
						<input
							class="btn btn-sm"
							type="radio"
							name="gas"
							value="n2o"
							aria-label="N₂O - Nitrous Oxide"
							checked={selectedGas === 'n2o'}
							onchange={() => {
								selectedGas = 'n2o';
								updateFilters({ page: 1 });
							}}
						/>
					</div>
				</div>
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
			{#if paginatedSources.length > 0}
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
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="text-center my-20 text-xl space-y-4">
					<p class="text-center text-xl text-error">No sources found</p>
					<button
						class="btn btn-primary"
						onclick={() => {
							selectedSubsectors = [];
						}}>Clear filters</button
					>
				</div>
			{/if}
		</div>
	</div>
	<div class="drawer-side h-full">
		<label for="sources-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="border-r border-subtle/40 h-full w-80 flex flex-col">
			<div class="px-section-x py-section-y overflow-y-auto flex-1">
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
							{#each Object.entries(sectorHierarchy) as [sector, subsectors], i}
								{@const SectorIcon = sectorIcons[sector] || Factory}
								{@const open = i === 0}
								<li>
									<details {open}>
										<summary class="font-medium">
											<SectorIcon size={18} weight="fill" class="inline mr-1" />
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
														<span class="text-xs text-muted">{formatSector(subsector)}</span>
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
</div>
