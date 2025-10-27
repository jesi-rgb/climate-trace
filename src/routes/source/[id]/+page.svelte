<script lang="ts">
	import { page } from '$app/state';
	import {
		fN,
		formatDate,
		formatSector,
		formatActivity,
		formatEmissionsFactor,
		getEmissionsFactorUnit,
		getActivityIcon,
		getActivityLabel,
		shouldShowCapacityCard,
		getCapacityTooltip,
		formatCapacityFactor,
		getCapacityLabel
	} from '$lib/utils';
	import { getSourceById } from '../../api/source.remote';
	import {
		Factory,
		Globe,
		MapPin,
		ChartLine,
		XCircle,
		Flame,
		Users,
		Gauge,
		Lightning,
		CurrencyDollar,
		Horse,
		Wind,
		ChartBar,
		Trophy
	} from 'phosphor-svelte';

	const iconMap = {
		CurrencyDollar,
		Globe,
		Horse,
		Factory,
		Wind,
		Lightning,
		ChartBar
	};
	import { Plot, LineY, Dot, formatMonth } from 'svelteplot';
	import { Pagination, Card } from '$lib/components/ui';
	import CountrySearch from '$lib/components/ui/CountrySearch.svelte';
	import Figure from '$lib/components/type/Figure.svelte';

	const ITEMS_PER_PAGE = 10;

	let sourceId = $derived(Number(page.params.id));

	const years = [2021, 2022, 2023, 2024];
	let yearlyData = $derived(
		await Promise.all(
			years.map((year) =>
				getSourceById({
					id: sourceId,
					timeGranularity: 'month',
					start: `${year}-01`,
					end: `${year}-12`
				})
			)
		)
	);

	let source = $derived(yearlyData[yearlyData.length - 1]);
	console.log(source);

	let currentPage = $state(1);

	let allEmissions = $derived.by(() => {
		return yearlyData.flatMap((data) => {
			if (!data?.emissions || !Array.isArray(data.emissions)) return [];
			return data.emissions;
		});
	});

	let emissionsTimeseries = $derived.by(() => {
		return allEmissions.map((e) => ({
			date: `${e.year}-${String(e.month || 1).padStart(2, '0')}`,
			year: e.year,
			month: e.month,
			emissions: e.emissionsQuantity
		}));
	});

	let totalEmissions = $derived.by(() => {
		return allEmissions.reduce((sum, e) => sum + e.emissionsQuantity, 0);
	});

	let gasBreakdown = $derived.by(() => {
		const gasMap = new Map<string, number>();
		allEmissions.forEach((e) => {
			const current = gasMap.get(e.gas) || 0;
			gasMap.set(e.gas, current + e.emissionsQuantity);
		});
		return Array.from(gasMap.entries())
			.map(([gas, quantity]) => ({
				gas,
				quantity,
				percentage: (quantity / totalEmissions) * 100
			}))
			.sort((a, b) => b.quantity - a.quantity);
	});

	const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	const endIndex = $derived(startIndex + ITEMS_PER_PAGE);
	const currentEmissions = $derived(allEmissions.slice(startIndex, endIndex));
</script>

{#if $effect.pending()}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center">
			<div class="loading loading-spinner loading-lg text-primary"></div>
			<p class="mt-4 text-xs opacity-60">Loading source data...</p>
		</div>
	</div>
{:else if !source}
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="alert alert-error max-w-md">
			<XCircle size={24} weight="bold" />
			<div>
				<h3 class="font-bold">Source not found</h3>
				<a href="/sources" class="link link-hover">Return to sources</a>
			</div>
		</div>
	</div>
{:else}
	<div class="px-section-x py-section-y">
		<div class="mb-4">
			<div class="breadcrumbs text-sm mb-2">
				<ul>
					<li><a href="/" class="link link-hover">Home</a></li>
					<li><a href="/sources" class="link link-hover">Sources</a></li>
					<li>{source.name || 'Unknown Source'}</li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<h1 class="text-4xl font-bold">{source.name || 'Unknown Source'}</h1>
				<div class="badge badge-primary badge-lg">{formatSector(source.subsector)}</div>
			</div>
			<p class="text-lg opacity-70 mt-2">{formatSector(source.sector)}</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-4 gap-2 join-horizontal mb-4">
			<Figure
				icon={Flame}
				title="Total Emissions"
				value={fN(totalEmissions)}
				subtitle="tonnes CO₂e (2021-2024)"
				color="warning"
			/>

			<Figure
				icon={Globe}
				title="Country"
				value={source.country}
				subtitle="location"
				color="info"
				href="/country/{source.country}"
			/>

			<Figure
				icon={Factory}
				title="Sector"
				value={formatSector(source.sector)}
				subtitle="industry type"
				color="secondary"
			/>

			{#if source.totals?.activity}
				{@const IconComponent = iconMap[getActivityIcon(source.totals.activityUnits)] || ChartBar}
				<Figure
					icon={IconComponent}
					title={getActivityLabel(source.totals.activityUnits)}
					value={formatActivity(source.totals.activity, source.totals.activityUnits)}
					subtitle={source.totals.activityUnits}
					color="neutral-content"
				/>
			{/if}

			{#if source.totals?.capacityFactor !== undefined && source.totals?.activityUnits && shouldShowCapacityCard(source.totals.activityUnits)}
				<Figure
					icon={Gauge}
					title={getCapacityLabel(source.totals.activityUnits)}
					value={formatCapacityFactor(
						source.totals.capacityFactor,
						source.totals.activityUnits,
						source.totals.capacity
					)}
					subtitle={getCapacityTooltip(source.totals.activityUnits)}
					color="info"
				/>
			{/if}
			{#if source.totals?.emissionsFactor && source.totals?.activityUnits}
				<Figure
					icon={Flame}
					title="Emissions Intensity"
					value={formatEmissionsFactor(source.totals.emissionsFactor, source.totals.activityUnits)}
					subtitle={getEmissionsFactorUnit(
						source.totals.emissionsFactor,
						source.totals.activityUnits
					)}
					color="error"
				/>
			{/if}
			{#if gasBreakdown.length === 1}
				<Figure
					icon={Flame}
					title="Gas Type"
					value={fN(gasBreakdown[0].quantity)}
					subtitle="{gasBreakdown[0].gas}, tonnes"
					color="warning"
				/>
			{/if}
			{#if source.subsectorRanks && source.subsectorRanks.length > 0}
				<Figure
					icon={Trophy}
					title="Subsector Rank"
					value="#{source.subsectorRanks[0].rank}"
					subtitle="in {formatSector(source.subsector)}"
					color="secondary"
				/>
			{/if}
		</div>

		<div class="mb-8">
			{#if emissionsTimeseries.length > 0}
				<Card>
					{#snippet title()}
						<div class="flex items-center gap-2">
							<ChartLine size={24} weight="bold" class="text-accent" />
							<h2 class="card-title">Emissions Timeline</h2>
						</div>
					{/snippet}

					{#snippet content()}
						<div class="px-4 pb-4">
							<Plot
								inset={15}
								height={250}
								y={{
									grid: true,
									nice: true,
									tickFormat(d) {
										return fN(d.valueOf() as number);
									}
								}}
								x={{
									grid: true,
									interval: '1 quarter',
									tickFormat(d) {
										return formatDate(d);
									},
									tickRotate: -20
								}}
							>
								<LineY
									data={emissionsTimeseries}
									x={(d) => new Date(d.date)}
									y="emissions"
									curve="monotone-x"
									stroke="var(--color-primary)"
									strokeWidth={2}
									strokeDasharray="2"
								/>

								<Dot
									data={emissionsTimeseries}
									x={(d) => new Date(d.date)}
									y="emissions"
									fill="var(--color-primary)"
									r={3}
								/>
							</Plot>

							<div class="text-xs opacity-60 mt-2">Emissions in tonnes CO₂e</div>
						</div>
					{/snippet}
				</Card>
			{/if}

			{#if gasBreakdown.length > 1}
				<Card>
					{#snippet title()}
						<div class="flex items-center gap-2">
							<Flame size={24} weight="fill" class="text-error" />
							<h2 class="card-title">Gas Breakdown</h2>
						</div>
					{/snippet}

					{#snippet content()}
						<div class="px-4 pb-4 space-y-3">
							{#each gasBreakdown as gas}
								<div>
									<div class="flex justify-between items-center mb-1">
										<span class="text-sm font-medium">{gas.gas}</span>
										<span class="text-sm font-bold tabular-nums">{fN(gas.quantity)}</span>
									</div>
									<div class="flex items-center gap-2">
										<progress
											class="progress progress-error w-full"
											value={gas.percentage}
											max="100"
										></progress>
										<span class="text-xs opacity-60 tabular-nums min-w-[3rem]"
											>{gas.percentage.toFixed(1)}%</span
										>
									</div>
								</div>
							{/each}
						</div>
					{/snippet}
				</Card>
			{/if}
		</div>

		{#if source.owners && source.owners.length > 0}
			<Card class="mb-6">
				{#snippet title()}
					<div class="flex items-center gap-2">
						<Users size={24} weight="fill" class="text-info" />
						<h2 class="card-title">Owners</h2>
					</div>
				{/snippet}

				{#snippet content()}
					<div class="px-4 pb-4 flex flex-wrap gap-2">
						{#each source.owners as owner}
							<a href="/owners?id={owner.id}" class="badge badge-lg badge-outline">{owner.name}</a>
						{/each}
					</div>
				{/snippet}
			</Card>
		{/if}

		<Card>
			{#snippet title()}
				<div class="flex items-center gap-2">
					<MapPin size={18} weight="fill" class="text-primary" />
					<h2 class="card-title text-lg">Detailed Emissions Timeline</h2>
				</div>
			{/snippet}

			{#snippet content()}
				<div class="overflow-x-auto">
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Year</th>
								<th>Month</th>
								<th class="text-right">Emissions</th>
								<th>Gas</th>
								<th class="text-right">Activity</th>
							</tr>
						</thead>
						<tbody>
							{#each currentEmissions as emission}
								<tr class="hover">
									<td>{emission.year}</td>
									<td>{emission.month || '-'}</td>
									<td class="text-right tabular-nums">{fN(emission.emissionsQuantity)}</td>
									<td class="text-sm opacity-70">{emission.gas}</td>
									<td class="text-right tabular-nums text-xs">
										{#if emission.activity}
											{fN(emission.activity)} {emission.activityUnits || ''}
										{:else}
											-
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="mt-4 mb-2 pr-section-x">
					<Pagination
						count={allEmissions.length}
						perPage={ITEMS_PER_PAGE}
						bind:page={currentPage}
					/>
				</div>
			{/snippet}
		</Card>
	</div>
{/if}
