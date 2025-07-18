import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/electron',
    emptyOutDir: false,
    lib: {
      entry: 'electron/main.ts',
      formats: ['cjs']
    }
  }
});
