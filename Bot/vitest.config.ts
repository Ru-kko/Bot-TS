import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        exclude: ['node_modules', 'build', '**/*.js'],
        environment: 'node',
        watch: true,
        global: true,
		globalSetup: "./src/testSetup.ts"
    }
});