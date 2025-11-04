<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		as?: 'h1' | 'h2' | 'h3' | null;
		children?: Snippet;
		size?: 'h1' | 'h2' | 'h3' | 'eyebrow';
	}

	let { as = null, class: className, size = 'h2', children, ...rest }: Props = $props();

	const baseClass = 'font-display leading-[1.04]';

	const headingSizeOptions = {
		h1: 'text-[20px] md:text-[30px] tracking-[-0.01em]',
		h2: 'text-[18px] md:text-[20px]',
		h3: 'text-[16px] md:text-[18px]',
		eyebrow: 'text-[11px] md:text-[13px] uppercase tracking-wide font-semibold leading-[1.00]'
	};
	const elementSizeOptions = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		eyebrow: 'h4'
	};

	const finalAs = as ?? elementSizeOptions[size];

	const classList = cn(baseClass, headingSizeOptions[size], className);
</script>

<svelte:element this={finalAs} class={classList} {...rest}>
	{@render children?.()}
</svelte:element>
