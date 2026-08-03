import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        patient: resolve(__dirname, 'Patient.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },

  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  preview: {
    host: true,
    port: 3000,
  },
});