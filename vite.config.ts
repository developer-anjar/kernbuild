import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return;
          if (/\/node_modules\/(react|react-dom|react-router-dom|scheduler|@remix-run\/router)\//.test(id)) return 'vendor-react';
          if (/\/node_modules\/(gsap|@gsap\/react)\//.test(id)) return 'vendor-gsap';
          if (/\/node_modules\/motion\//.test(id)) return 'vendor-motion';
          if (/\/node_modules\/lenis\//.test(id)) return 'vendor-lenis';
          if (/\/node_modules\/three\//.test(id)) return 'vendor-three';
          if (/\/node_modules\/@emailjs\//.test(id)) return 'vendor-emailjs';
        },
      },
    },
  },
});
