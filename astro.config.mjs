// @ts-check
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSR con Vercel adapter — páginas estáticas usan export const prerender = true
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
  adapter: vercel({
    isr: true, // Incremental Static Regeneration — cachea páginas SSR tras el primer request
    imageService: true, // Usa Vercel Image Optimization API
    devImageService: 'sharp', // Sharp en desarrollo
  }),
  integrations: [
    react(),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // Desactivar compresión de imágenes (ya usamos Astro Assets + Vercel)
      JavaScript: true,
      SVG: true,
    }),
  ],
});
