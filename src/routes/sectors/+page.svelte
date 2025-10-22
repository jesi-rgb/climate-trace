<script lang="ts">
	import { formatSector } from '$lib/utils';
	import { getSectors } from '../api/sector.remote';
	import {
		Trash,
		Car,
		Drop,
		Plant,
		Lightning,
		Wind,
		Tree,
		Buildings,
		Factory,
		Hammer
	} from 'phosphor-svelte';

	const sectors = await getSectors();

	const sectorConfig: Record<string, { icon: Icon; color: string; gradient: string }> = {
		waste: { icon: Trash, color: 'rgb(139, 92, 46)', gradient: 'to top right' },
		transportation: { icon: Car, color: 'rgb(59, 130, 246)', gradient: 'to top right' },
		'fossil-fuel-operations': { icon: Drop, color: 'rgb(71, 85, 105)', gradient: 'to top right' },
		agriculture: { icon: Plant, color: 'rgb(34, 197, 94)', gradient: 'to top right' },
		power: { icon: Lightning, color: 'rgb(234, 179, 8)', gradient: 'to top right' },
		'fluorinated-gases': { icon: Wind, color: 'rgb(168, 85, 247)', gradient: 'to top right' },
		'forestry-and-land-use': { icon: Tree, color: 'rgb(22, 163, 74)', gradient: 'to top right' },
		buildings: { icon: Buildings, color: 'rgb(148, 163, 184)', gradient: 'to top right' },
		manufacturing: { icon: Factory, color: 'rgb(239, 68, 68)', gradient: 'to top right' },
		'mineral-extraction': { icon: Hammer, color: 'rgb(120, 113, 108)', gradient: 'to top right' }
	};
</script>

<div class="px-section-x py-section-y">
	<h1 class="mb-6 text-3xl font-bold">Emission Sectors</h1>

	{#if !sectors}
		<div class="flex min-h-[60vh] items-center justify-center">
			<div class="text-center">
				<div class="loading loading-spinner loading-lg text-primary"></div>
				<p class="mt-4 text-xs text-muted">Loading sectors...</p>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each sectors as sector}
				{@const config = sectorConfig[sector] || {
					icon: Factory
				}}
				<a
					href="/sector/{sector}"
					class="card bg-base-200 transition-all group hover:bg-base-300 overflow-hidden relative min-h-[180px]"
				>
					<div
						class="absolute inset-0 opacity-30 pointer-events-none"
						style="background: linear-gradient({config.gradient}, {config.color}, transparent);"
					></div>
					<div class="card-body relative z-10">
						<h2 class="card-title text-xl">{formatSector(sector)}</h2>
					</div>
					<config.icon
						size={180}
						class="absolute -bottom-10 -right-10 -rotate-12
						opacity-10 pointer-events-none group-hover:-bottom-5
						group-hover:-right-5 group-hover:scale-120 transition-all"
						weight="fill"
					/>
				</a>
			{/each}
		</div>
	{/if}
</div>
