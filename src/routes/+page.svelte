<script>
	import { ct } from '$lib/api';
	import Combobox from '$lib/components/ui/Combobox.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import { fN } from '$lib/utils';
	import { MagnifyingGlass } from 'phosphor-svelte';

	let selectedCountry = $state('USA');
	let selectedSector = $state('power');
	let selectedYear = $state(2024);

	const countryData = $derived(
		await ct('getAggregatedEmissions', {
			year: selectedYear,
			gadmId: selectedCountry,
			sectors: selectedSector ? [selectedSector] : undefined
		})
	);
	const topSources = $derived(
		await ct('getSources', {
			year: selectedYear,
			sectors: selectedSector ? [selectedSector] : undefined,
			limit: 10
		})
	);

	const countries = $derived(
		(await ct('getCountries')).map((c) => ({ value: c.id, label: c.name }))
	);
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<div class="flex gap-2">
			<Combobox
				items={countries}
				bind:value={selectedCountry}
				placeholder="Select a country"
				Icon={MagnifyingGlass}
				inputProps={{ class: 'w-full' }}
				contentProps={{ class: 'w-full' }}
			/>

			<select bind:value={selectedSector} class="w-full">
				<option value="power">Power</option>
				<option value="heat">Heat</option>
				<option value="transportation">Transportation</option>
				<option value="industry">Industry</option>
				<option value="buildings">Buildings</option>
				<option value="other">Other</option>
			</select>
		</div>
		<div class="flex gap-2">
			<select bind:value={selectedYear} class="w-full">
				<option value={2024}>2024</option>
				<option value={2023}>2023</option>
				<option value={2022}>2022</option>
				<option value={2021}>2021</option>
				<option value={2020}>2020</option>
				<option value={2019}>2019</option>
				<option value={2018}>2018</option>
				<option value={2017}>2017</option>
				<option value={2016}>2016</option>
			</select>
		</div>
	</div>

	{#if topSources}
		<div class="flex flex-col gap-2">
			<div class="flex justify-between">
				<div class="flex items-center gap-2">
					<div class="text-xl font-bold">
						Top {selectedSector} Sources
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				{#each topSources as source}
					<div class="flex gap-2 items-center">
						<div class="flex flex-col gap-1">
							<div class="text-sm font-bold">
								{source.name}
							</div>
							<div class="flex gap-1">
								<div class="text-xs">
									{source.sector}
								</div>
								<div class="text-xs">
									{source.country}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if countryData}
		<div>Emissions: {fN(countryData.totals.summaries[0].emissionsQuantity)} T</div>
		<div>{countryData.owners}</div>
	{/if}
</div>

<ThemeToggle />
