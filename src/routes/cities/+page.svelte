<script lang="ts">
	import { searchCities } from '../api/cities.remote';

	const cities = await searchCities({ limit: 100 });
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">Cities</h1>

	{#if !cities}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading cities...</p>
			</div>
		</div>
	{:else}
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
	{/if}
</div>
