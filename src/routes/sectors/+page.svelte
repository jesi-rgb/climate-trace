<script lang="ts">
	import { formatSector } from '$lib/utils';
	import { getSectors } from '../api/sector.remote';

	const sectors = await getSectors();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">Emission Sectors</h1>

	{#if !sectors}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading sectors...</p>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each sectors as sector}
				<a href="/sector/{sector}" class="card bg-base-200 transition-all hover:bg-base-300">
					<div class="card-body">
						<h2 class="card-title">{formatSector(sector)}</h2>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
