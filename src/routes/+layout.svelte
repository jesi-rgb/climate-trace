<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/ui/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main
	class="selection:bg-primary selection:text-primary-content w-[90%]
	md:w-full mx-auto"
>
	<Header />
	{@render children?.()}
</main>
