import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [angular(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
    include: ['src/**/*.vitest-spec.ts'],
  },
});
