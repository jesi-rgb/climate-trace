<script lang="ts">
	import { fN } from '$lib/utils';

	interface Props {
		name: string;
		emissionsQuantity: number;
	}

	let { name, emissionsQuantity }: Props = $props();
</script>

<div
	class="rounded-lg border border-teal-800 bg-teal-100 p-4 shadow-lg dark:border-gray-800 dark:bg-gray-950"
>
	<h3 class="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
		{name}
	</h3>
	<p class="text-xs text-gray-600 dark:text-gray-400">
		{fN(emissionsQuantity)} tCO₂e
	</p>
</div>
