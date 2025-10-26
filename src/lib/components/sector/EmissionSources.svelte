<script lang="ts">
	import { fN, formatSector } from '$lib/utils';
	import { Factory } from 'phosphor-svelte';
	import { Pagination } from '$lib/components/ui';
	import type { SourceSummary } from '$lib/api';

	interface Props {
		sources: SourceSummary[];
		subsectors: string[];
	}

	let { sources, subsectors }: Props = $props();

	const ITEMS_PER_PAGE = 10;

	let selectedSubsector = $state<string | null>(null);
	let sortOrder = $state<'asc' | 'desc'>('desc');
	let currentPage = $state(1);

	let filteredAndSortedSources = $derived.by(() => {
		let result = [...sources];

		if (selectedSubsector) {
			result = result.filter((s) => s.subsector === selectedSubsector);
		}

		result.sort((a, b) => {
			const diff = a.emissionsQuantity - b.emissionsQuantity;
			return sortOrder === 'desc' ? -diff : diff;
		});

		return result;
	});

	let paginatedSources = $derived.by(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		return filteredAndSortedSources.slice(start, end);
	});

	let totalCount = $derived(filteredAndSortedSources.length);

	function toggleSubsector(subsector: string) {
		selectedSubsector = selectedSubsector === subsector ? null : subsector;
		currentPage = 1;
	}

	function toggleSort() {
		sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
		currentPage = 1;
	}

	function handlePageChange(newPage: number) {
		currentPage = newPage;
	}
</script>

<div class="card bg-base-200 border border-base-300">
	<div class="card-body">
		<div class="flex items-center gap-2 mb-4">
			<Factory size={24} weight="bold" class="text-warning" />
			<h2 class="card-title">Top Emission Sources</h2>
		</div>

		<div class="mb-4">
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

		<div class="mb-4">
			<Pagination
				count={totalCount}
				perPage={ITEMS_PER_PAGE}
				bind:page={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>

		<div class="overflow-x-auto">
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Source Name</th>
						<th>Country</th>
						<th>Subsector</th>
						<th class="text-right">
							<button type="button" class="link link-hover" onclick={toggleSort}>
								Emissions {sortOrder === 'desc' ? '↓' : '↑'}
							</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedSources as source}
						<tr class="hover">
							<td>
								<a href="/source/{source.id}" class="link link-hover">
									{source.name || 'Unknown'}
								</a>
							</td>
							<td>
								<a href="/country/{source.country}" class="link link-hover">
									{source.country}
								</a>
							</td>
							<td class="text-sm opacity-70">{formatSector(source.subsector)}</td>
							<td class="text-right tabular-nums">{fN(source.emissionsQuantity)}</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="text-center text-muted">No sources found</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
