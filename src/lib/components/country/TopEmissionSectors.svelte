<script lang="ts">
	import { Factory } from 'phosphor-svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Heading from '$lib/components/type/Heading.svelte';
	import Body from '$lib/components/type/Body.svelte';
	import EmissionsBarChart from '$lib/components/charts/EmissionsBarChart.svelte';
	import { fN, formatSector } from '$lib/utils';

	interface Props {
		topSectors: Array<{
			sector: string;
			emissionsQuantity: number;
		}>;
	}

	let { topSectors }: Props = $props();
</script>

{#if topSectors.length > 0}
	<Card>
		{#snippet title()}
			<div class="flex items-center gap-2">
				<Factory size={24} weight="fill" class="text-primary" />
				<Heading size="h3">Top Emission Sectors</Heading>
			</div>
		{/snippet}

		{#snippet content()}
			<div class="px-4">
				<EmissionsBarChart
					data={topSectors.map((s) => ({
						sector: formatSector(s.sector),
						emissions: s.emissionsQuantity
					}))}
					formatValue={fN}
				/>
			</div>
		{/snippet}

		{#snippet footnote()}
			<Body size="12" class="mt-2 text-muted">Emissions in tonnes CO₂e</Body>
		{/snippet}
	</Card>
{/if}
