import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
    exclude: [...configDefaults.exclude, '.vscode'],
    coverage: {
      include: ['src/**/*'],
      reporter: ['text', 'cobertura'],
      // TODO: when starting a new project set these thresholds to at least 80%
      thresholds: {
        autoUpdate: false,
        lines: 0,
        statements: 0,
        branches: 0,
        functions: 0,
      },
    },
  },
});
