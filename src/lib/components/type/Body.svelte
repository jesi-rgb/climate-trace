<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		as?: 'div' | 'p' | 'span';
		children?: Snippet;
		class?: string;
		size?: '28' | '24' | '20' | '16' | '12';
	}

	let { as = 'p', size = '20', class: className, children, ...rest }: Props = $props();

	const baseClass = 'font-sans font-normal leading-[1.05] tracking-[-0.01rem]';

	const bodySizeOptions = {
		'28': 'text-[20px] md:text-[28px]',
		'24': 'text-[20px] md:text-[24px]',
		'20': 'text-[18px] md:text-[20px] tracking-normal',
		'16': 'text-[16px] leading-[1.05]',
		'12': 'text-[12px] leading-[1.05] tracking-wide'
	};
	const classList = cn(baseClass, bodySizeOptions[size], className);
</script>

<svelte:element this={as} class={classList} {...rest}>
	{@render children?.()}
</svelte:element>
