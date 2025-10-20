<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import CountrySearch from './CountrySearch.svelte';
</script>

<nav class="flex py-1 items-center justify-between">
	<div class="flex items-center gap-4">
		<a class="" href="/">climate trace</a>
		<a class="" href="/sectors">sectors</a>
		<a class="" href="/rankings">sources</a>
	</div>

	<CountrySearch />

	<ThemeToggle />
</nav>
