<script lang="ts">
	import { searchCities } from '../api/cities.remote';

	let searchQuery = $state('');
	let cities = $state<Awaited<ReturnType<typeof searchCities>>>([]);
	let isLoading = $state(false);
	let debounceTimeout: NodeJS.Timeout;
	const DEBOUNCE_TIME = 100;

	async function handleSearch() {
		if (!searchQuery.trim()) {
			cities = [];
			return;
		}

		isLoading = true;
		try {
			cities = await searchCities({ name: searchQuery, limit: 100 });
		} catch (error) {
			console.error('Error searching cities:', error);
			cities = [];
		} finally {
			isLoading = false;
		}
	}

	function debouncedSearch() {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(handleSearch, DEBOUNCE_TIME);
	}

	$effect(() => {
		searchQuery;
		debouncedSearch();
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">Cities</h1>

	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Search cities by name..."
		class="input input-bordered mb-6 w-full"
	/>

	{#if isLoading}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading cities...</p>
			</div>
		</div>
	{:else if cities.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each cities as city}
				<div class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">{city.name}</h2>
						<p class="text-sm">
							Country: <a href="/country/{city.country}" class="link">{city.country}</a>
						</p>
						{#if city.population}
							<p class="text-sm">Population: {city.population.toLocaleString()}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else if searchQuery.trim()}
		<p class="text-center text-muted">No cities found</p>
	{/if}
</div>
