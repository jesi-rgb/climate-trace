<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui';
	import { fly } from 'svelte/transition';
	import { growFly } from '$lib/animations';

	let {
		ref = $bindable(null),
		children,
		sideOffset = 8,
		...restProps
	}: WithoutChildrenOrChild<Tooltip.ContentProps> & {
		children?: Snippet;
	} = $props();
</script>

<Tooltip.Content bind:ref {sideOffset} {...restProps} forceMount={true}>
	{#snippet child({ wrapperProps, props, open })}
		{#if open}
			<div {...wrapperProps}>
				<div
					{...props}
					transition:growFly={{ duration: 800, y: 4 }}
					class="z-50 overflow-hidden rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-sm shadow-md"
				>
					{@render children?.()}
				</div>
			</div>
		{/if}
	{/snippet}
</Tooltip.Content>
