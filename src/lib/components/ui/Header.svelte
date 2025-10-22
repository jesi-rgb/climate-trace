<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import CountrySearch from './CountrySearch.svelte';
</script>

<nav
	class="flex py-section-y px-section-x items-center justify-between gap-10 border-b
	border-subtle/40
	shadow-sm"
>
	<div class="flex items-center gap-2 shrink-0">
		<a class="btn btn-sm" href="/">Climate Trace</a>
		<a class="btn btn-sm" href="/sectors">Sectors</a>
		<a class="btn btn-sm" href="/rankings">Rankings</a>
		<a class="btn btn-sm" href="/sources">Sources</a>
	</div>

	<CountrySearch />

	<ThemeToggle />
</nav>
