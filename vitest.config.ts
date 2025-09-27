
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom', // Explicitly set jsdom environment for React testing
    globals: true, // Enable Jest-like globals (describe, it, expect)
    css: true, // Optional: Process CSS modules (useful for Tailwind)
        coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});