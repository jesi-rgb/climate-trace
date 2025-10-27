<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'gradient';
		title?: Snippet;
		content: Snippet;
		footnote?: Snippet;
		class?: string;
	}

	let { variant = 'gradient', title, content, footnote, class: className = '' }: Props = $props();

	let variantClasses = $derived(
		variant === 'gradient'
			? 'bg-gradient-to-t from-base-200-muted shadow-sm shadow-subtle/10'
			: 'bg-base-200'
	);
</script>

<div class="card {variantClasses} border border-base-300 flex flex-col {className}">
	{#if title}
		<div class="px-4 pt-4 pb-2">
			{@render title()}
		</div>
	{/if}

	<div class="flex-1">
		{@render content()}
	</div>

	{#if footnote}
		<div class="px-4 pb-4 pt-2">
			{@render footnote()}
		</div>
	{/if}
</div>
