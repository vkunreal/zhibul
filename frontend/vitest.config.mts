import react from '@vitejs/plugin-react'
// Public Vitest entry, not an internal file.
// eslint-disable-next-line import/no-internal-modules
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
  },
})
