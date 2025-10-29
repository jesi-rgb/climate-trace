<script lang="ts">
	import { Factory, MapPin } from 'phosphor-svelte';
	import Card from '../ui/Card.svelte';
	import Heading from '../type/Heading.svelte';
	import { fN, formatSector } from '$lib/utils';
	import { Pagination } from '$lib/components/ui';

	let { countryName, globeSources } = $props();

	const ITEMS_PER_PAGE = 10;

	let currentPage = $state(1);
	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentSources = $derived(globeSources.slice(startIndex, endIndex));
</script>

<Card class="col-span-full">
	{#snippet title()}
		<div class="flex items-center gap-2">
			<Factory size={24} weight="bold" class="text-primary" />
			<Heading size="h3">Top Emission Sources in {countryName}</Heading>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="flex flex-col gap-4">
			<div class="overflow-x-auto">
				<table class="table table-sm table-zebra">
					<thead>
						<tr>
							<th class="text-right w-20">#</th>
							<th>Source Name</th>
							<th>Sector</th>
							<th class="text-right">Emissions</th>
						</tr>
					</thead>
					<tbody>
						{#each currentSources as source, idx}
							<tr class="hover">
								<td class="text-muted font-mono text-right">{source.id}</td>
								<td>
									<a href="/source/{source.id}" class="link link-hover">{source.name}</a>
								</td>
								<td class="text-sm text-muted">{formatSector(source.name)}</td>
								<td class="text-right tabular-nums">{fN(source.emissionsQuantity)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="flex justify-end mr-4 mb-4">
				<Pagination count={globeSources.length} perPage={ITEMS_PER_PAGE} bind:page={currentPage} />
			</div>
		</div>
	{/snippet}
</Card>
