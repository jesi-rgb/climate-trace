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

<main
	class="selection:bg-primary selection:text-primary-content w-full mx-auto flex-grow min-h-screen"
>
	<Header />
	{@render children?.()}
</main>
<Footer />
