import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? '/HashX15/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist'
  }
}))
