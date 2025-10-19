<script lang="ts">
	import Combobox from './Combobox.svelte';
	import { MagnifyingGlass } from 'phosphor-svelte';
	import { goto } from '$app/navigation';
	import { ct } from '$lib/api';
	import type { Country } from '$lib/api/schemas/generated';

	let countries = $state<Country[]>([]);
	let selectedCountry = $state<string | undefined>(undefined);
	let open = $state(false);

	$effect(() => {
		ct('getCountries').then((data) => {
			countries = data;
		});
	});

	$effect(() => {
		if (selectedCountry && !open) {
			goto(`/country/${selectedCountry}`);
			selectedCountry = undefined;
		}
	});

	const items = $derived(
		countries.map((country) => ({
			value: country.id,
			label: country.name
		}))
	);
</script>

<Combobox
	{items}
	bind:value={selectedCountry}
	bind:open
	placeholder="Search countries..."
	Icon={MagnifyingGlass}
	emptyMessage="No countries found."
/>
