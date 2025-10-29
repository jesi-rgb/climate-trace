<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getTopSources } from '../api/source.remote';
	import { getSectors, getSubsectors, getSubsectorDetails } from '../api/sector.remote';
	import { fN, formatSector } from '$lib/utils';
	import { Pagination } from '$lib/components/ui';
	import Table from '$lib/components/ui/Table.svelte';
	import Sidebar from '$lib/components/sources/Sidebar.svelte';
	import { onMount } from 'svelte';
	import type { SubSector } from '$lib/api';
	import type { ColumnDef } from '@tanstack/svelte-table';

	const ITEMS_PER_PAGE = 20;
	const FETCH_CHUNK_SIZE = 10000;
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
	let sidebarLoading = $state(true);

	onMount(async () => {
		let sectors = await getSectors();
		let subsectors = await getSubsectors();

		if (!sectors || !subsectors) {
			sidebarLoading = false;
			return;
		}

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
		sidebarLoading = false;
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

	let filteredSources = $derived.by(() => {
		if (!chunkData || chunkData === null) return [];
		let sources = chunkData;

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

	type Source = (typeof filteredSources)[0];

	const columns: ColumnDef<Source>[] = [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: (info) => {
				const source = info.row.original;
				return `<a href="/source/${source.id}" class="link link-hover">${info.getValue()}</a>`;
			},
			meta: { className: 'w-60' },
			enableSorting: true
		},
		{
			accessorKey: 'sector',
			header: 'Sector',
			cell: (info) => {
				const source = info.row.original;
				return `<a href="/sector/${source.sector}" class="link link-hover"
					>${formatSector(info.getValue() as string)}</a
				>`;
			},
			enableSorting: true
		},
		{
			accessorKey: 'subsector',
			header: 'Subsector',
			cell: (info) => formatSector(info.getValue() as string),
			enableSorting: true
		},
		{
			accessorKey: 'country',
			header: 'Country',
			cell: (info) => {
				const source = info.row.original;
				return `<a href="/country/${source.country}" class="link link-hover">${info.getValue()}</a>`;
			},
			enableSorting: true
		},
		{
			accessorKey: 'assetType',
			header: 'Asset Type',
			cell: (info) => info.getValue(),
			enableSorting: true
		},
		{
			accessorKey: 'sourceType',
			header: 'Source Type',
			cell: (info) => formatSector(info.getValue() as string),
			enableSorting: true
		},
		{
			accessorKey: 'emissionsQuantity',
			header: 'Emissions (CO₂e t)',
			cell: (info) => fN(info.getValue() as number),
			meta: { className: 'tabular-nums text-right place-items-end' },
			enableSorting: true
		},
		{
			accessorKey: 'year',
			header: 'Year',
			cell: (info) => info.getValue(),
			meta: { className: 'text-right tabular-nums place-items-end' },
			enableSorting: true
		}
	];
</script>

<div class="drawer drawer-open h-full">
	<input id="sources-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content overflow-y-auto">
		<div class="">
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

			{#if loading}
				<div class="flex justify-center py-8">
					<div class="loading loading-bars"></div>
				</div>
			{/if}
			{#if filteredSources.length > 0}
				<div class="py-section-y">
					<Table data={filteredSources} {columns} pagination={true} pageSize={ITEMS_PER_PAGE} />
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
		<Sidebar
			bind:searchTerm
			bind:selectedSubsectors
			{sectorHierarchy}
			loading={sidebarLoading}
			onToggleSubsector={toggleSubsector}
		/>
	</div>
</div>
