import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: 'camelCaseOnly', // <-- This explicitly enables named exports
    },
  },
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
      },
      "/dannyhome/transfer/post": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/auth/login": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/auth/logout": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})
