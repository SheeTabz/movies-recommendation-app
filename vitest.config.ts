
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'node', // Explicitly set jsdom environment
    globals: true, // Enable Jest-like globals (describe, it, expect)
    css: true, // Optional: Process CSS modules (useful for Tailwind)
        coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});