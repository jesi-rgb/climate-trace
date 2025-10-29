<script lang="ts">
	import { Campfire } from 'phosphor-svelte';
	import Card from '../ui/Card.svelte';
	import Heading from '../type/Heading.svelte';
	import Table from '../ui/Table.svelte';
	import { fN, formatSector } from '$lib/utils';
	import type { ColumnDef } from '@tanstack/svelte-table';

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

	type Source = Props['globeSources'][0];

	const columns: ColumnDef<Source>[] = [
		{
			accessorKey: 'id',
			header: '#',
			cell: (info) => info.getValue(),
			meta: { className: 'text-right font-mono text-muted place-items-end w-14' }
		},
		{
			accessorKey: 'name',
			header: 'Source Name',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'sector',
			header: 'Sector',
			cell: (info) => formatSector(info.getValue() as string),
			meta: { className: 'text-muted' }
		},
		{
			accessorKey: 'subsector',
			header: 'Subsector',
			cell: (info) => formatSector(info.getValue() as string),
			meta: { className: 'text-muted' }
		},
		{
			accessorKey: 'emissionsQuantity',
			header: 'Emissions',
			cell: (info) => fN(info.getValue() as number),
			meta: { className: 'text-right tabular-nums place-items-end w-14' }
		}
	];
</script>

<Card class="col-span-full">
	{#snippet title()}
		<div class="flex items-center gap-2">
			<Campfire size={24} weight="fill" class="text-primary" />
			<Heading size="h3">Top Emission Sources in {countryName}</Heading>
		</div>
	{/snippet}

	{#snippet content()}
		<Table data={globeSources} {columns} pagination pageSize={10} />
	{/snippet}
</Card>
