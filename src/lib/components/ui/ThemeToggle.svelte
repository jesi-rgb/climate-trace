<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon } from 'phosphor-svelte';

	const applyTheme = (newTheme: string) => {
		if (newTheme === 'system') {
			const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'barelycookie'
				: 'reallol';
			document.documentElement.setAttribute('data-theme', systemPreference);
		} else {
			document.documentElement.setAttribute('data-theme', newTheme);
		}
	};

	const toggleTheme = () => {
		if (document.documentElement.getAttribute('data-theme') === 'reallol') {
			applyTheme('barelycookie');
		} else {
			applyTheme('reallol');
		}
	};

	onMount(() => {
		applyTheme('system');
	});
</script>

<label class="swap swap-rotate text-base-muted hover:text-primary text-lg">
	<input type="checkbox" value="reallol" class="" onclick={toggleTheme} />

	<!-- sun icon -->
	<Sun weight="fill" class="swap-on swap-on-rotate" />
	<!-- moon icon -->
	<Moon weight="fill" class="swap-off swap-off-rotate" />
</label>
