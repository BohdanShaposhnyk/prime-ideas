import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { headMarkup } from './src/site/lib/seo.ts'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function primeSeo(): Plugin {
  const markup = headMarkup()
  return {
    name: 'prime-seo',
    transformIndexHtml(html) {
      return html.replace('<!--prime-seo-->', markup)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), primeSeo()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
})
