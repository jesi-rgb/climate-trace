<script lang="ts">
	import { page } from '$app/state';
	import { getSourceById } from '../../api/source.remote';

	const sourceId = Number(page.params.id);
	const source = await getSourceById({ id: sourceId });

	const formatEmissions = (num: number) =>
		num.toLocaleString('en-US', { maximumFractionDigits: 2 });
</script>

<div class="container mx-auto p-4">
	{#if !source}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading source data...</p>
			</div>
		</div>
	{:else}
		<h1 class="mb-6 text-3xl font-bold">{source.name || 'Unknown Source'}</h1>

		<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="stat bg-base-200">
				<div class="stat-title">Country</div>
				<div class="stat-value text-2xl">
					<a href="/country/{source.iso3Country}" class="link link-hover">
						{source.iso3Country}
					</a>
				</div>
			</div>

			<div class="stat bg-base-200">
				<div class="stat-title">Sector</div>
				<div class="stat-value text-2xl">
					<a href="/sector/{source.sector}" class="link link-hover">
						{source.sector}
					</a>
				</div>
			</div>

			<div class="stat bg-base-200">
				<div class="stat-title">Subsector</div>
				<div class="stat-value text-2xl">{source.subsector}</div>
			</div>
		</div>

		<div class="mb-8">
			<h2 class="mb-4 text-2xl font-semibold">Emissions Timeline</h2>
			<div class="overflow-x-auto">
				<table class="table">
					<thead>
						<tr>
							<th>Date</th>
							<th>Emissions (tonnes CO₂e)</th>
							<th>Gas</th>
						</tr>
					</thead>
					<tbody>
						{#each source.emissions as emission}
							<tr>
								<td>{emission.date}</td>
								<td>{formatEmissions(emission.emissionsQuantity)}</td>
								<td>{emission.gas}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
