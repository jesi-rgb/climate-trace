<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<footer
	class="z-10 flex items-center justify-between gap-4 py-0.5 px-section-x
	sticky bottom-0 bg-base-200/40 backdrop-blur-xl border-t border-subtle/40 shadow-sm"
>
	<div class="text-muted">climate trace</div>
	<div class="text-muted">
		public data from <a href="https://api.climatetrace.org">https://api.climatetrace.org</a>
	</div>

	<ThemeToggle />
</footer>
