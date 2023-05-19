/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
  },
  build: {
    target: 'es2017',
  },
  resolve: {
    alias: {
      'socket.io-client': 'socket.io-client/dist/socket.io.js',
    },
  },
});
