// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static', // SSG por defecto para mejor rendimiento
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto', // Inline CSS pequeño automáticamente
  },
  compressHTML: true, // Comprimir HTML en producción
  integrations: [react()],
});
