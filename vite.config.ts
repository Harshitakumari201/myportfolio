import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  base: '/myportfolio/', // Added base path for deployment
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});