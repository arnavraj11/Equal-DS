import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const root = resolve(__dirname, '..');

export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react()],
  resolve: { alias: { '@equal/ds': resolve(root, 'web/src/index.ts') } },
  server: { port: 5190, fs: { allow: [root] } },
  // Keep component function names in the production build: Trace maps live DOM to DS components by name.
  esbuild: { keepNames: true },
  build: { outDir: resolve(root, 'site-dist'), emptyOutDir: true, chunkSizeWarningLimit: 1600 },
});
