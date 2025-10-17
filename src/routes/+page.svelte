<script>
	import { ct, getTopSources } from '$lib/api';
	import Combobox from '$lib/components/ui/Combobox.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import { fN, formatSector } from '$lib/utils';
	import { MagnifyingGlass } from 'phosphor-svelte';

	let selectedCountry = $state('USA');
	let selectedSector = $state('power');
	let selectedYear = $state(2024);

	let [countryData, topSources, countries] = $derived(
		await Promise.all([
			ct('getAggregatedEmissions', {
				year: selectedYear,
				gadmId: selectedCountry,
				sectors: selectedSector ? [selectedSector] : undefined
			}),
			ct('getSources', {
				year: selectedYear,
				sectors: selectedSector ? [selectedSector] : undefined,
				limit: 10
			}),
			ct('getCountries')
		])
	);

	const countryOptions = $derived(countries.map((c) => ({ value: c.id, label: c.name })));
	$inspect(selectedCountry);
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<div class="flex gap-2">
			<Combobox
				items={countryOptions}
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

	{#if countryData}
		<div class="flex flex-col gap-2">
			<div class="flex justify-between">
				<div class="flex items-center gap-2">
					<div class="text-xl font-bold">
						{formatSector(selectedSector)}
					</div>
				</div>
			</div>
		</div>
	{/if}

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
							<div class="text-xs">
								{source.sector}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center">
			<div class="text-center text-xl font-bold">No data available</div>
			<div class="text-center text-sm">Please try again later</div>
		</div>
	{/if}
</div>

<ThemeToggle />
