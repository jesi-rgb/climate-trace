<script lang="ts">
	import { page } from '$app/state';
	import { fN } from '$lib/utils';
	import { getSectorDetails, getSectorEmissions, getSectorSources } from '../../api/sector.remote';

	const sector = page.params.sector!;
	const details = await getSectorDetails(sector);
	const emissions = await getSectorEmissions(sector);
	const sources = await getSectorSources({ sector, limit: 50 });
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">{details.name}</h1>

	<div class="mb-8">
		<h2 class="mb-4 text-2xl font-semibold">Total Emissions</h2>
		<div class="stat">
			<div class="stat-value">{emissions.subsectors.summaries[0].emissionsQuantity}</div>
			<div class="stat-desc">tonnes CO₂e</div>
		</div>
	</div>

	<div class="mb-8">
		<h2 class="mb-4 text-2xl font-semibold">Subsectors</h2>
		<div class="flex flex-wrap gap-2">
			{#each details.subSectors as subsector}
				<div class="badge badge-lg">{subsector}</div>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="mb-4 text-2xl font-semibold">Top Emission Sources</h2>
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>Source Name</th>
						<th>Country</th>
						<th>Subsector</th>
						<th>Emissions</th>
					</tr>
				</thead>
				<tbody>
					{#each sources as source}
						<tr>
							<td>
								<a href="/source/{source.id}" class="link link-hover">
									{source.name || 'Unknown'}
								</a>
							</td>
							<td>
								<a href="/country/{source.country}" class="link link-hover">
									{source.country}
								</a>
							</td>
							<td>{source.subsector}</td>
							<td>{source.emissionsQuantity}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
