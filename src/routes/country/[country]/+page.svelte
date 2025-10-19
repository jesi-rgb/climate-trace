<script lang="ts">
	import { page } from '$app/state';
	import { getCountryData } from '../../api/emissions.remote';

	const formatNumber = (num: number) => num.toLocaleString('en-US', { maximumFractionDigits: 0 });
	const formatEmissions = (num: number) =>
		num.toLocaleString('en-US', { maximumFractionDigits: 2 });
</script>

{#await getCountryData(page.params.country) then data}
	<div class="container">
		<h1>{data.name}</h1>

		<div class="stats stats-vertical">
			<div class="stat-card">
				<h2>Emissions Per Capita</h2>
				<p class="value">{formatEmissions(data.emissionsPerCapita)}</p>
				<p class="unit">tonnes CO₂e per person</p>
			</div>

			<div class="stat-card">
				<h2>Population</h2>
				<p class="value">{formatNumber(data.population)}</p>
			</div>

			<div class="stat-card">
				<h2>Total Emissions</h2>
				<p class="value">{formatEmissions(data.totalEmissions)}</p>
				<p class="unit">tonnes CO₂e</p>
			</div>

			<div class="stat-card">
				<h2>Region</h2>
				<p class="value region">{data.subregion}</p>
				<p class="unit">{data.region}</p>
			</div>
		</div>
	</div>
{/await}

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		font-weight: 700;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.stat-card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.stat-card.highlight {
		background: var(--color-primary);
		color: white;
		grid-column: 1 / -1;
	}

	.stat-card h2 {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
		margin: 0 0 0.5rem 0;
		font-weight: 600;
	}

	.stat-card .value {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		line-height: 1.2;
	}

	.stat-card .value.region {
		font-size: 1.5rem;
	}

	.stat-card .unit {
		font-size: 0.875rem;
		opacity: 0.7;
		margin: 0.25rem 0 0 0;
	}

	.stat-card.highlight h2,
	.stat-card.highlight .unit {
		opacity: 0.9;
	}
</style>
