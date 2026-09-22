import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** Standalone c20 (Charge Split) site — no hub, no router. */
export default defineConfig({
  root: path.resolve(rootDir, 'sites/c20'),
  mode: 'c20',
  publicDir: false,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    outDir: path.resolve(rootDir, 'dist-c20'),
    emptyOutDir: true,
  },
})
