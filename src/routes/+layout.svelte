<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/ui/Header.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen flex flex-col">
	<Header />
	<main class="flex-1 overflow-hidden selection:bg-primary selection:text-primary-content">
		{@render children?.()}
	</main>
	<Footer />
</div>
