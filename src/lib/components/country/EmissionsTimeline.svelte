<script lang="ts">
	import { ChartLine } from 'phosphor-svelte';
	import { Plot, LineY, Dot, Pointer, Text } from 'svelteplot';
	import Card from '$lib/components/ui/Card.svelte';
	import Heading from '$lib/components/type/Heading.svelte';
	import Body from '$lib/components/type/Body.svelte';
	import { fN } from '$lib/utils';

	interface Props {
		emissionsTimeseries: Array<{
			year: number;
			emissions: number;
		}>;
		years: number[];
	}

	let { emissionsTimeseries, years }: Props = $props();
</script>

{#if emissionsTimeseries.length > 0}
	<Card>
		{#snippet title()}
			<div class="flex items-center gap-2">
				<ChartLine size={24} weight="bold" class="text-primary" />
				<Heading size="h3">Emissions Timeline</Heading>
			</div>
		{/snippet}

		{#snippet content()}
			<div class="px-4">
				<Plot
					inset={15}
					y={{
						grid: true,
						nice: true,
						tickFormat(d) {
							return fN(d.valueOf() as number);
						}
					}}
					x={{
						grid: true,
						nice: true,
						ticks: years,
						tickFormat(d) {
							return d.valueOf() as number;
						}
					}}
				>
					<LineY
						data={emissionsTimeseries}
						x="year"
						y="emissions"
						curve="monotone-x"
						stroke="var(--color-primary)"
						strokeDasharray="2"
						strokeWidth={2}
					/>

					<Dot data={emissionsTimeseries} x="year" y="emissions" fill="var(--color-primary)" />

					<Pointer data={emissionsTimeseries} x="year">
						{#snippet children({ data })}
							<Text
								{data}
								fill="currentColor"
								stroke="var(--color-base-200)"
								strokeWidth={4}
								x="year"
								class="font-mono"
								y="emissions"
								text={(d) => `${fN(d.emissions, 4, 'compact')} t`}
								fontSize={12}
								lineAnchor="bottom"
								fontWeight="bold"
								dy={-10}
							/>
						{/snippet}
					</Pointer>
				</Plot>
			</div>
		{/snippet}

		{#snippet footnote()}
			<Body size="12" class="mt-2 text-muted">Emissions in tonnes CO₂e</Body>
		{/snippet}
	</Card>
{/if}
