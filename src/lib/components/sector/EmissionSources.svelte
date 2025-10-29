<script lang="ts">
	import { fN, formatSector } from '$lib/utils';
	import { Factory } from 'phosphor-svelte';
	import { Card } from '$lib/components/ui';
	import Table from '$lib/components/ui/Table.svelte';
	import type { SourceSummary } from '$lib/api';
	import type { ColumnDef } from '@tanstack/svelte-table';

	interface Props {
		sources: SourceSummary[];
		subsectors: string[];
	}

	let { sources, subsectors }: Props = $props();

	const ITEMS_PER_PAGE = 10;

	let selectedSubsector = $state<string | null>(null);
	let sortOrder = $state<'asc' | 'desc'>('desc');
	let currentPage = $state(1);

	let filteredSources = $derived.by(() => {
		let result = [...sources];

		if (selectedSubsector) {
			result = result.filter((s) => s.subsector === selectedSubsector);
		}

		return result;
	});

	function toggleSubsector(subsector: string) {
		selectedSubsector = selectedSubsector === subsector ? null : subsector;
	}

	const columns: ColumnDef<SourceSummary>[] = [
		{
			accessorKey: 'name',
			header: 'Source Name',
			cell: (info) => {
				const source = info.row.original;
				return `<a href="/source/${source.id}" class="link link-hover">${info.getValue() || 'Unknown'}</a>`;
			},
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
			accessorKey: 'subsector',
			header: 'Subsector',
			cell: (info) => formatSector(info.getValue() as string),
			meta: { className: 'text-muted' },
			enableSorting: true
		},
		{
			accessorKey: 'emissionsQuantity',
			header: 'Emissions',
			cell: (info) => fN(info.getValue() as number),
			meta: { className: 'text-right tabular-nums place-items-end' },
			enableSorting: true
		}
	];
</script>

<Card>
	{#snippet title()}
		<div class="flex items-center gap-2">
			<Factory size={24} weight="bold" class="text-warning" />
			<h2 class="card-title">Top Emission Sources</h2>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="px-4 pb-4 space-y-4">
			<div>
				<div class="flex items-center justify-between mb-2">
					<span class="label-text font-medium">Filter by Subsector</span>
					{#if selectedSubsector}
						<button
							type="button"
							class="btn btn-ghost btn-xs"
							onclick={() => (selectedSubsector = null)}
						>
							Clear
						</button>
					{/if}
				</div>
				<div class="filter">
					{#each subsectors as subsector}
						<input
							class="btn {selectedSubsector === subsector ? '' : 'filter-reset'}"
							type="radio"
							name="subsector-filter"
							aria-label={formatSector(subsector)}
							checked={selectedSubsector === subsector}
							onchange={() => toggleSubsector(subsector)}
						/>
					{/each}
				</div>
			</div>

			<Table data={filteredSources} {columns} pagination={true} pageSize={ITEMS_PER_PAGE} />
		</div>
	{/snippet}
</Card>
