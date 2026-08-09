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
            if (id.includes('three') || id.includes('@react-three')) return 'three-engine';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('axios') || id.includes('@tanstack')) return 'network';
            if (id.includes('react-router')) return 'router';
            if (id.includes('react') || id.includes('react-dom')) return 'react-core';
            return 'vendor-utils';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
})
