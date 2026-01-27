// @ts-check
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static', // SSG por defecto para mejor rendimiento (valorar a futuro el hybrid o el server (cuando implementemos backend))
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Eliminar console.log en producción
          drop_debugger: true,
        },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto', // Inline CSS pequeño automáticamente
  },
  compressHTML: true, // Comprimir HTML en producción
  integrations: [
    react(),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // Desactivar compresión de imágenes (ya usamos Astro Assets)
      JavaScript: true,
      SVG: true,
    }),
  ],
});
