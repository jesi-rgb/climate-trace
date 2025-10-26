<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/ui/Header.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen flex flex-col relative">
	{#if $effect.pending()}
		<div
			transition:fade={{ duration: 350 }}
			class="loading-scrim absolute top-0 left-0 w-screen h-screen
			bg-black/5 z-20 pointer-events-none"
		></div>
	{/if}

	<Header />
	<main class="flex-1 overflow-y-scroll selection:bg-primary selection:text-primary-content">
		{@render children?.()}
	</main>
	<Footer />
</div>

<style>
	@property --scrim-percentage {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 69%;
	}

	.loading-scrim {
		background: radial-gradient(
			ellipse,
			rgba(255, 255, 255, 0) var(--scrim-percentage),
			color-mix(in oklch, var(--color-primary), transparent 80%) 100%
		);
		animation: pulse 4s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			--scrim-percentage: 59%;
		}
		50% {
			--scrim-percentage: 39%;
		}
	}
</style>
