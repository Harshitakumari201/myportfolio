import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});