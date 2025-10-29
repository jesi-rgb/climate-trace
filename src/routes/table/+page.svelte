<script lang="ts">
	import Table from '$lib/components/ui/Table.svelte';
	import type { ColumnDef } from '@tanstack/svelte-table';

	type Person = {
		name: string;
		age: number;
		country: string;
	};

	const data: Person[] = [
		{ name: 'John', age: 30, country: 'USA' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 23, country: 'UK' },
		{ name: 'Jane', age: 24, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 23, country: 'UK' },
		{ name: 'Jane', age: 22, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 22, country: 'UK' },
		{ name: 'Jane', age: 21, country: 'UK' },
		{ name: 'Jane', age: 21, country: 'UK' },
		{ name: 'Jane', age: 23, country: 'UK' },
		{ name: 'Jane', age: 23, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 23, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Jane', age: 22, country: 'UK' },
		{ name: 'Jane', age: 25, country: 'UK' },
		{ name: 'Bob', age: 35, country: 'Canada' }
	];

	const columns: ColumnDef<Person>[] = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'age', header: 'Age' },
		{ accessorKey: 'country', header: 'Country' }
	];
</script>

<main class="px-section-x py-section-y">
	<Table {data} {columns} pagination pageSize={10} />
</main>
