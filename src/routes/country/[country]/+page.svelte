<script lang="ts">
	import { page } from '$app/state';
	import { getCountryData } from '../../api/country.remote';

	const formatNumber = (num: number) => num.toLocaleString('en-US', { maximumFractionDigits: 0 });
	const formatEmissions = (num: number) =>
		num.toLocaleString('en-US', { maximumFractionDigits: 2 });

	const data = await getCountryData(page.params?.country);
</script>

{#if !data}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center">
			<div class="loading loading-spinner loading-lg text-primary"></div>
			<p class="mt-4 text-xs text-muted">Loading country data...</p>
		</div>
	</div>
{:else}
	<div class="">
		<h1 class="font-bold text-xl">{data.name}</h1>

		<div class="flex flex-col stats rounded-none">
			<div class="">
				<h2 class="stat-desc">Emissions Per Capita</h2>
				<p class="stat-value">{formatEmissions(data.emissionsPerCapita)}</p>
				<p class="stat-title">tonnes CO₂e per person</p>
			</div>

			<div class="stat">
				<h2 class="stat-title">Population</h2>
				<p class="stat-value">{formatNumber(data.population)}</p>
			</div>

			<div class="stat">
				<h2 class="stat-title">Total Emissions</h2>
				<p class="stat-value">{formatEmissions(data.totalEmissions)}</p>
				<p class="stat-desc">tonnes CO₂e</p>
			</div>

			<div class="stat">
				<h2>Region</h2>
				<p class="value region">{data.subregion}</p>
				<p class="unit">{data.region}</p>
			</div>
		</div>
	</div>
{/if}
