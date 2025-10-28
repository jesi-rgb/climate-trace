<script lang="ts">
	import { Trophy } from 'phosphor-svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Heading from '$lib/components/type/Heading.svelte';
	import Body from '$lib/components/type/Body.svelte';
	import { fN } from '$lib/utils';

	interface Props {
		rankingsContext: Array<{
			rank: number;
			name: string;
			country: string;
			emissionsQuantity: number;
			emissionsPerCapita: number;
			isCurrentCountry: boolean;
		}>;
		countryName: string;
	}

	let { rankingsContext, countryName }: Props = $props();
</script>

{#if rankingsContext.length > 0}
	<Card>
		{#snippet title()}
			<div class="flex items-center gap-2">
				<Trophy size={18} weight="fill" class="text-primary" />
				<Heading size="h3">Global Rankings</Heading>
			</div>
		{/snippet}

		{#snippet content()}
			<div class="overflow-x-auto">
				<table class="table table-sm">
					<thead>
						<tr>
							<th class="w-16">Rank</th>
							<th>Country</th>
							<th class="text-right">Total</th>
							<th class="text-right">Per Capita</th>
						</tr>
					</thead>
					<tbody>
						{#each rankingsContext as ranking}
							<tr class={ranking.isCurrentCountry ? 'bg-primary/10 font-semibold' : ''}>
								<td class="text-center">
									{#if ranking.isCurrentCountry}
										<div class="badge badge-primary badge-sm">{ranking.rank}</div>
									{:else}
										{ranking.rank}
									{/if}
								</td>
								<td class="truncate max-w-[120px]">{ranking.name}</td>
								<td class="text-right tabular-nums text-xs">
									{fN(ranking.emissionsQuantity)}
								</td>
								<td class="text-right tabular-nums text-xs">
									{fN(ranking.emissionsPerCapita)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/snippet}

		{#snippet footnote()}
			<Body size="12" class="mt-2 text-muted">
				Showing ±3 countries around {countryName}'s position
			</Body>
		{/snippet}
	</Card>
{/if}
