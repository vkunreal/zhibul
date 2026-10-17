/// <reference types="vitest/config" />

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(rootDir, 'src')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(srcDir, 'app'),
      '@shared': path.resolve(srcDir, 'shared'),
      '@entities': path.resolve(srcDir, 'entities'),
      '@features': path.resolve(srcDir, 'features'),
      '@widgets': path.resolve(srcDir, 'widgets'),
      '@views': path.resolve(srcDir, 'views'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
      },
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
    env: {
      VITE_API_URL: 'http://localhost:5001',
      VITE_SITE_URL: 'http://localhost:3000',
    },
  },
})
