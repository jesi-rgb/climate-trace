<script lang="ts">
	import { Plot, LineY, normalizeY, AxisX, AxisY } from 'svelteplot';
	import { ct } from '$lib/api';
	import { fN } from '$lib/utils';
	import { draw } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';

	interface Props {
		country: string;
	}

	let { country }: Props = $props();

	const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

	const yearlyData = await Promise.all(
		years.map((year) => ct('getCountryRankings', { start: String(year), end: String(year) }))
	);
	const data = $derived(
		years.map((year, index) => {
			const ranking = yearlyData[index]?.rankings.find((r) => r.country === country);
			return {
				year,
				emissions: ranking?.emissionsQuantity || 0
			};
		})
	);
</script>

<Plot height={50} marginLeft={15}>
	<AxisX title={false} tickCount={2} tickFontSize={10} />
	<AxisY title={false} tickCount={0} />
	<LineY
		{data}
		x="year"
		y="emissions"
		curve="monotone-x"
		stroke="var(--color-primary)"
		strokeWidth={1.5}
	/>
</Plot>
