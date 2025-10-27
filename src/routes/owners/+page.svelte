<script lang="ts">
	import { searchOwners } from '../api/owners.remote';
	import { Card } from '$lib/components/ui';

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
				<Card>
					{#snippet title()}
						<h2 class="card-title">{owner.ownerName}</h2>
					{/snippet}

					{#snippet content()}
						<div class="px-4 pb-4">
							{#if owner.country}
								<p class="text-sm">
									Country: <a href="/country/{owner.country}" class="link">{owner.country}</a>
								</p>
							{/if}
						</div>
					{/snippet}
				</Card>
			{/each}
		</div>
	{/if}
</div>
