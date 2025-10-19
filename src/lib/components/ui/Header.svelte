<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import CountrySearch from './CountrySearch.svelte';
</script>

<nav class="flex items-center justify-between flex-wrap gap-4 p-3">
	<span>climate trace</span>

	<div class="flex-1 max-w-md">
		<CountrySearch />
	</div>

	<ThemeToggle />
</nav>
