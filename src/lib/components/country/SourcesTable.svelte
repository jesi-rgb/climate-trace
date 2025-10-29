<script lang="ts">
	import { Campfire, Factory, MapPin } from 'phosphor-svelte';
	import Card from '../ui/Card.svelte';
	import Heading from '../type/Heading.svelte';
	import { fN, formatSector } from '$lib/utils';
	import { Pagination } from '$lib/components/ui';
	import type { SourceDetails } from '$lib/api';

	interface Props {
		countryName: string;
		globeSources: {
			id: number;
			name: string;
			lat: number;
			lon: number;
			sector: string;
			subsector: string;
			emissionsQuantity: number;
		}[];
	}

	let { countryName, globeSources }: Props = $props();

	const ITEMS_PER_PAGE = 10;

	let currentPage = $state(1);
	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentSources = $derived(globeSources.slice(startIndex, endIndex));
</script>

<Card class="col-span-full">
	{#snippet title()}
		<div class="flex items-center gap-2">
			<Campfire size={24} weight="fill" class="text-primary" />
			<Heading size="h3">Top Emission Sources in {countryName}</Heading>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="flex flex-col gap-4">
			<div class="overflow-x-auto">
				<table class="table table-zebra">
					<thead>
						<tr>
							<th class="text-right w-20">#</th>
							<th>Source Name</th>
							<th>Sector</th>
							<th>Subsector</th>
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
								<td class="text-muted">{formatSector(source.sector)}</td>
								<td class="text-muted">{formatSector(source.subsector)}</td>
								<td
									class="text-right
									tabular-nums">{fN(source.emissionsQuantity)}</td
								>
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
