import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Vibe-To-Viable/',
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
  preview: {
    host: true,
    port: 3000,
  }
});
