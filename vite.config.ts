import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltePhosphorOptimize } from "phosphor-svelte/vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	optimizeDeps: {
		include: ['bits-ui']
	},
	ssr: {
		noExternal: ['bits-ui']
	}
});
