import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules", "build", "**/*.js"],
    environment: 'node',
    setupFiles: "./src/test/setup.ts",
    watch: true,
    globals: true
  },
});