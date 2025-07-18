import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/getAllCodigos": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/getRow": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/submit": {
        target: "http://localhost:3000/",
        changeOrigin: true
      }
    }


  }
})
