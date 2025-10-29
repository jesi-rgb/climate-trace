<script lang="ts">
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		getPaginationRowModel,
		type ColumnDef,
		type SortingState,
		type PaginationState,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import { CaretUp, CaretDown, CaretUpDown, CaretLeft, CaretRight } from 'phosphor-svelte';

	type TData = any;

	interface Props {
		data: TData[];
		columns: ColumnDef<TData>[];
		class?: string;
		pagination?: boolean;
		pageSize?: number;
	}

	let { data, columns, class: className, pagination = false, pageSize = 20 }: Props = $props();

	let sorting = $state<SortingState>([]);
	let paginationState = $state<PaginationState>({
		pageIndex: 0,
		pageSize
	});

	const options = $derived({
		data,
		columns,
		state: {
			sorting,
			...(pagination && { pagination: paginationState })
		},
		onSortingChange: (updater: any) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		...(pagination && {
			onPaginationChange: (updater: any) => {
				if (typeof updater === 'function') {
					paginationState = updater(paginationState);
				} else {
					paginationState = updater;
				}
			}
		}),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		...(pagination && { getPaginationRowModel: getPaginationRowModel() })
	});

	const table = $derived(createSvelteTable(options));

	function getClassName(meta: any): string {
		return meta?.className ?? '';
	}
</script>

<div class={className ?? ''}>
	<div class="overflow-x-auto">
		<table class="table table-zebra">
			<thead>
				{#each $table.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							{@const headerMeta = header.column.columnDef.meta}
							<th class={getClassName(headerMeta)}>
								{#if !header.isPlaceholder}
									{#if header.column.getCanSort()}
										<button
											class="flex items-center gap-2
										text-muted hover:text-primary
										transition-colors duration-100"
											onclick={header.column.getToggleSortingHandler()}
										>
											{header.column.columnDef.header}
											{#if header.column.getIsSorted() === 'asc'}
												<CaretUp size={16} />
											{:else if header.column.getIsSorted() === 'desc'}
												<CaretDown size={16} />
											{:else if header.column.getIsSorted() === false}
												<CaretUpDown size={16} />
											{/if}
										</button>
									{:else}
										{header.column.columnDef.header}
									{/if}
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each $table.getRowModel().rows as row}
					<tr>
						{#each row.getVisibleCells() as cell}
							{@const cellMeta = cell.column.columnDef.meta}
							<td class={getClassName(cellMeta)}>
								{#if cell.column.columnDef.cell && typeof cell.column.columnDef.cell === 'function'}
									{@html cell.column.columnDef.cell(cell.getContext())}
								{:else}
									{cell.getValue()}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if pagination}
		<div class="flex items-center justify-between mt-4 px-section-x py-section-y">
			<p class="text-sm text-muted">
				Showing {$table.getState().pagination.pageIndex * $table.getState().pagination.pageSize + 1}
				to {Math.min(
					($table.getState().pagination.pageIndex + 1) * $table.getState().pagination.pageSize,
					$table.getRowCount()
				)}
				of {$table.getRowCount()}
			</p>

			<div class="join">
				<button
					class="join-item btn btn-xs hover:btn-primary"
					onclick={() => $table.firstPage()}
					disabled={!$table.getCanPreviousPage()}
				>
					<CaretLeft size={16} weight="bold" />
					<CaretLeft size={16} weight="bold" class="-ml-3" />
				</button>
				<button
					class="join-item btn btn-xs hover:btn-primary"
					onclick={() => $table.previousPage()}
					disabled={!$table.getCanPreviousPage()}
				>
					<CaretLeft size={16} weight="bold" />
				</button>
				<button class="join-item btn btn-xs btn-disabled hover:btn-primary">
					Page {$table.getState().pagination.pageIndex + 1} of {$table.getPageCount()}
				</button>
				<button
					class="join-item btn btn-xs hover:btn-primary"
					onclick={() => $table.nextPage()}
					disabled={!$table.getCanNextPage()}
				>
					<CaretRight size={16} weight="bold" />
				</button>
				<button
					class="join-item btn btn-xs hover:btn-primary"
					onclick={() => $table.lastPage()}
					disabled={!$table.getCanNextPage()}
				>
					<CaretRight size={16} weight="bold" />
					<CaretRight size={16} weight="bold" class="-ml-3" />
				</button>
			</div>
		</div>
	{/if}
</div>
