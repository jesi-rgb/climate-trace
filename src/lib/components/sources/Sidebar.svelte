<script lang="ts">
	import { formatSector } from '$lib/utils';
	import {
		Factory,
		Tree,
		Lightning,
		Buildings,
		CraneTower,
		GasCan,
		AirplaneTakeoff,
		Shovel,
		Trash
	} from 'phosphor-svelte';

	const sectorIcons: Record<string, any> = {
		'fossil-fuel-operations': GasCan,
		'forestry-and-land-use': Tree,
		manufacturing: CraneTower,
		transportation: AirplaneTakeoff,
		power: Lightning,
		agriculture: Shovel,
		waste: Trash,
		buildings: Buildings
	};

	let {
		searchTerm = $bindable(''),
		selectedSubsectors = $bindable<string[]>([]),
		sectorHierarchy = {},
		loading = false,
		onToggleSubsector
	}: {
		searchTerm?: string;
		selectedSubsectors?: string[];
		sectorHierarchy?: Record<string, string[]>;
		loading?: boolean;
		onToggleSubsector: (subsector: string) => void;
	} = $props();
</script>

<div class="border-r border-subtle/40 h-full w-80 flex flex-col">
	<div class="px-section-x py-section-y overflow-y-auto flex-1">
		<h2 class="text-lg font-semibold mb-4">Filters</h2>

		{#if loading}
			<div class="space-y-6">
				<div>
					<div class="skeleton h-4 w-20 mb-2"></div>
					<div class="skeleton h-8 w-full"></div>
					<div class="skeleton h-3 w-48 mt-1"></div>
				</div>

				<div>
					<div class="skeleton h-4 w-40 mb-2"></div>
					<div class="space-y-2">
						{#each Array(8) as _, i}
							<div class="skeleton h-10 w-full"></div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="space-y-6">
				<div>
					<label class="flex-col">
						<span class="label-text font-medium">Search</span>
						<input
							type="text"
							bind:value={searchTerm}
							placeholder="Search by name..."
							class="input input-bordered input-sm w-full"
						/>
					</label>
					<p class="text-xs opacity-60 mt-1">Searches within current page results</p>
				</div>

				<div>
					<div class="flex items-center justify-between mb-2">
						<span class="label-text font-medium">Sectors & Subsectors</span>
						{#if selectedSubsectors.length > 0}
							<button
								type="button"
								class="btn btn-ghost btn-xs"
								onclick={() => (selectedSubsectors = [])}
							>
								Clear
							</button>
						{/if}
					</div>
					<ul class="menu menu-sm bg-base-100 rounded-box w-full">
						{#each Object.entries(sectorHierarchy) as [sector, subsectors], i}
							{@const SectorIcon = sectorIcons[sector] || Factory}
							{@const open = i === 0}
							<li>
								<details {open}>
									<summary class="font-medium">
										<SectorIcon size={18} weight="fill" class="inline mr-1" />
										{formatSector(sector)}
									</summary>
									<ul>
										{#each subsectors as subsector}
											<li>
												<label class="cursor-pointer justify-start gap-2 py-1 flex">
													<input
														type="checkbox"
														class="checkbox checkbox-xs"
														checked={selectedSubsectors.includes(subsector)}
														onchange={() => onToggleSubsector(subsector)}
													/>
													<span class="text-xs text-muted">{formatSector(subsector)}</span>
												</label>
											</li>
										{/each}
									</ul>
								</details>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>
</div>
