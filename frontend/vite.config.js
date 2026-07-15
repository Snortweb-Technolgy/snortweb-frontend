import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('react-router-dom') || id.includes('react-router') || id.includes('@remix-run')) return 'react-router';
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) return 'react-core';
            if (id.includes('lucide-react')) return 'lucide';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
})
