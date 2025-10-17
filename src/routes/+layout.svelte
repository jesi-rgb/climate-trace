<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main
	class="selection:bg-primary selection:text-primary-content w-[90%]
	md:max-w-7xl my-10 mx-auto"
>
	{@render children?.()}
</main>
