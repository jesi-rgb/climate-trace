<script lang="ts">
	import { Plot, BarX } from 'svelteplot';

	interface Props {
		data: { sector: number; emissions: number }[];
		formatValue: (value: number) => string;
	}

	let { data, formatValue }: Props = $props();
</script>

<Plot
	height={300}
	marginLeft={130}
	marginRight={30}
	marginBottom={40}
	y={{
		domain: data.map((d) => d.sector),
		type: 'band'
	}}
	x={{
		grid: true,
		nice: true,
		tickFormat(d) {
			return formatValue(d.valueOf() as number);
		}
	}}
>
	<BarX
		{data}
		x="emissions"
		y="sector"
		sort={{ channel: '-y' }}
		fill="var(--color-primary)"
		fillOpacity={0.2}
		stroke="var(--color-primary)"
		strokeWidth={2}
	/>
</Plot>
