<script lang="ts">
	import { cn } from '$lib/utils';
	import Heading from './Heading.svelte';
	import Number from './Number.svelte';
	import Body from './Body.svelte';

	interface Props {
		icon?: any;
		iconClass?: string;
		title: string;
		value: string | number;
		subtitle?: string;
		color?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'base-content';
		gradientFrom?: number;
		gradientTo?: number;
		borderOpacity?: number;
		href?: string;
		class?: string;
	}

	let {
		icon,
		iconClass,
		title,
		value,
		subtitle,
		color = 'primary',
		gradientFrom = 10,
		gradientTo = 0,
		borderOpacity = 30,
		href,
		class: className
	}: Props = $props();
</script>

<figure
	class={cn('card border', className)}
	style="
		--gradient-from: color-mix(in oklch, var(--color-{color}), transparent {100 - gradientFrom}%);
		--gradient-to: color-mix(in oklch, var(--color-{color}), transparent {100 - gradientTo}%);
		background-image: linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to));
		border-color: color-mix(in oklch, var(--color-{color}), transparent {100 - borderOpacity}%);
	"
>
	<div class="card-body">
		<div class="flex items-center gap-2 mb-2">
			{#if icon}
				{@const Icon = icon}
				<Icon size={20} weight="fill" class={cn(iconClass)} style="color: var(--color-{color});" />
			{/if}
			<Heading size="eyebrow" class="card-title" style="color: var(--color-{color});">
				{title}
			</Heading>
		</div>
		{#if href}
			<a {href}>
				<Number
					class="hover:underline"
					style="text-decoration-color: var(--color-{color});
					text-decoration-thickness: 2px; text-underline-offset: 4px;"
					size="medium">{value}</Number
				>
			</a>
		{:else}
			<Number size="small">{value}</Number>
		{/if}
		{#if subtitle}
			<Body size="16" class="text-muted">{subtitle}</Body>
		{/if}
	</div>
</figure>
