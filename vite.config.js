import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
   base: '/HashX15/',
    build: {
    outDir: 'dist'
  }
})