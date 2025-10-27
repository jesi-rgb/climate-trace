<script lang="ts">
	import { ct } from '$lib/api';
	import { fN, formatSector } from '$lib/utils';

	interface Props {
		sectors?: string[];
	}

	let { sectors = [] }: Props = $props();

	let selectedSector = $state<string | null>(null);
	let sectorSources = $state<any[]>([]);
	let loading = $state(false);

	const sectorConfig = {
		power: { color: 'warning', title: 'Power Sector Sources' },
		transportation: { color: 'info', title: 'Transportation Sources' },
		'fossil-fuel-operations': { color: 'error', title: 'Fossil Fuel Operations' },
		manufacturing: { color: 'success', title: 'Manufacturing Sources' }
	};

	async function loadSectorData(sector: string) {
		loading = true;
		selectedSector = sector;
		try {
			const sources = await ct('getSources', { year: 2022, sectors: [sector], limit: 12 });
			sectorSources = Array.isArray(sources) ? sources : [];
			if (!sources) {
				console.warn(`No data returned for sector: ${sector}`);
			}
		} catch (error) {
			console.error(`Failed to load ${sector} data:`, error);
			sectorSources = [];
		} finally {
			loading = false;
		}
	}

	function getColor(sector: string): string {
		return (sectorConfig as any)[sector]?.color || 'primary';
	}

	function getTitle(sector: string): string {
		return (sectorConfig as any)[sector]?.title || formatSector(sector);
	}
</script>

<div class="bg-base-200 border border-subtle join-item p-2.5">
	<h2 class="text-[11px] font-semibold text-base-content mb-1.5">All Monitored Sectors</h2>
	<div class="flex flex-wrap gap-1 mb-2">
		{#each sectors as sector, index (index)}
			<button
				class="badge badge-sm text-[9px] {selectedSector === sector
					? `badge-${getColor(sector)}`
					: 'badge-primary'}"
				onclick={() => loadSectorData(sector)}
			>
				{formatSector(sector)}
			</button>
		{/each}
	</div>

	{#if selectedSector}
		<div class="mt-2">
			<h3 class="text-[11px] font-semibold text-base-content mb-1.5">
				{getTitle(selectedSector)}
			</h3>

			{#if loading}
				<div class="flex items-center justify-center py-4">
					<div class="loading loading-spinner loading-sm text-{getColor(selectedSector)}"></div>
				</div>
			{:else if sectorSources.length === 0}
				<div class="rounded border border-subtle bg-base-100 p-3 text-center">
					<p class="text-[10px] text-muted">No data available for this sector</p>
				</div>
			{:else}
				<div class="space-y-1">
					{#each sectorSources as source, idx (source.sourceId || `${selectedSector}-${idx}`)}
						<div class="rounded border border-subtle bg-base-100 p-1.5">
							<div class="flex items-start justify-between">
								<div class="flex-1 min-w-0">
									<h3 class="text-[10px] font-semibold text-base-content truncate">
										{source.name}
									</h3>
									<p class="text-[9px] text-muted">{source.country}</p>
								</div>
								<div class="text-right ml-2 shrink-0">
									<div class="font-mono text-[10px] font-bold text-{getColor(selectedSector)}">
										{fN(source.emissionsQuantity)}
									</div>
									<div class="text-[8px] text-muted">tonnes</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
