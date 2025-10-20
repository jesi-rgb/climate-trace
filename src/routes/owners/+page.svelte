<script lang="ts">
	import { searchOwners } from '../api/owners.remote';

	const owners = await searchOwners({ limit: 100 });
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">Emission Source Owners</h1>

	{#if !owners}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading owners...</p>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each owners as owner}
				<div class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">{owner.ownerName}</h2>
						{#if owner.country}
							<p class="text-sm">
								Country: <a href="/country/{owner.country}" class="link">{owner.country}</a>
							</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
