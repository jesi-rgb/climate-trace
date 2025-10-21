<script lang="ts">
	import { Pagination } from 'bits-ui';
	import { CaretLeft, CaretRight } from 'phosphor-svelte';

	interface Props {
		count: number;
		perPage?: number;
		page?: number;
		onPageChange?: (page: number) => void;
		siblingCount?: number;
	}

	let {
		count,
		perPage = 10,
		page = $bindable(1),
		onPageChange,
		siblingCount = 1
	}: Props = $props();
</script>

<Pagination.Root bind:page {count} {perPage} {siblingCount} {onPageChange}>
	{#snippet children({ pages, range })}
		<div class="flex flex-col items-end gap-4">
			<div class="join">
				<Pagination.PrevButton class="join-item btn btn-sm">
					<CaretLeft class="size-5" />
				</Pagination.PrevButton>

				<div class="flex items-center">
					{#each pages as p, i (i)}
						{#if p.type === 'ellipsis'}
							<div class="px-3 text-sm opacity-60 join-item">...</div>
						{:else}
							<Pagination.Page
								page={p}
								class="btn btn-sm join-item data-[selected]:btn-primary data-[selected]:text-primary-content min-w-[2.5rem]"
							>
								{p.value}
							</Pagination.Page>
						{/if}
					{/each}
				</div>

				<Pagination.NextButton class="join-item btn btn-sm">
					<CaretRight class="size-5" />
				</Pagination.NextButton>
			</div>

			<p class="text-xs opacity-60">
				Showing {range.start} - {range.end} of {count}
			</p>
		</div>
	{/snippet}
</Pagination.Root>
