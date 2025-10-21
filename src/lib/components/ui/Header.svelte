<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import CountrySearch from './CountrySearch.svelte';
</script>

<nav class="flex py-1 items-center justify-between gap-10">
	<div class="flex items-center gap-4 shrink-0">
		<a class="" href="/">Climate Trace</a>
		<a class="" href="/sectors">Sectors</a>
		<a class="" href="/rankings">Rankings</a>
		<a class="" href="/sources">Sources</a>
	</div>

	<CountrySearch />

	<ThemeToggle />
</nav>
