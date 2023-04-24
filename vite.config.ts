import { sveltekit } from '@sveltejs/kit/vite';
import { defineWorkspace } from 'vitest/config'
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
	],
	test: {
		name: 'user',
		setupFiles: ['./test/index.test.js'],
	},
});


