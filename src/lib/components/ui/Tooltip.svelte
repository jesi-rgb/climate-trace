<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import TooltipContent from './TooltipContent.svelte';

	type Props = TooltipPrimitive.RootProps & {
		trigger: Snippet;
		triggerProps?: TooltipPrimitive.TriggerProps;
		contentProps?: TooltipPrimitive.ContentProps;
	};

	let {
		open = $bindable(false),
		children,
		trigger,
		triggerProps = {},
		contentProps = {},
		delayDuration = 200,
		...restProps
	}: Props = $props();
</script>

<TooltipPrimitive.Root bind:open {delayDuration} {...restProps}>
	<TooltipPrimitive.Trigger {...triggerProps}>
		{#snippet child({ props })}
			<div {...props}>
				{@render trigger()}
			</div>
		{/snippet}
	</TooltipPrimitive.Trigger>

	<TooltipPrimitive.Portal>
		<TooltipContent {...contentProps}>
			{@render children?.()}
		</TooltipContent>
	</TooltipPrimitive.Portal>
</TooltipPrimitive.Root>
