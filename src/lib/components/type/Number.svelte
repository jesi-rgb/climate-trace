<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		as?: 'p' | 'span' | 'div';
		children?: Snippet;
		class?: string;
		size?: 'huge' | 'big' | 'medium' | 'small';
	}

	let { as = 'p', size = 'big', class: className, children, ...rest }: Props = $props();

	const baseClass = 'font-semibold leading-[1.04] tabular-nums';

	const numberSizeOptions = {
		huge: 'text-5xl md:text-6xl',
		big: 'text-4xl md:text-5xl',
		medium: 'text-3xl md:text-4xl',
		small: 'text-2xl md:text-3xl'
	} as const;

	const classList = cn(baseClass, numberSizeOptions[size], className);
</script>

<svelte:element this={as} class={classList} {...rest}>
	{@render children?.()}
</svelte:element>
