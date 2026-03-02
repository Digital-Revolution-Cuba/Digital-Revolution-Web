// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://digitalrevolutioncuba.vercel.app",
  output: "server", // SSR con Vercel adapter — páginas estáticas usan export const prerender = true
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // Eliminar console.log en producción
          drop_debugger: true,
        },
      },
    },
  },
  build: {
    inlineStylesheets: "auto", // Inline CSS pequeño automáticamente
  },
  compressHTML: true, // Comprimir HTML en producción
  adapter: vercel({
    isr: true, // Incremental Static Regeneration — cachea páginas SSR tras el primer request
    imageService: true, // Usa Vercel Image Optimization API
    devImageService: "sharp", // Sharp en desarrollo
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/og/") &&
        !page.includes("/api/") &&
        !page.includes("/components/") &&
        !page.includes("/contacto"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-CU",
          en: "en-US",
        },
      },
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // Desactivar compresión de imágenes (ya usamos Astro Assets + Vercel)
      JavaScript: true,
      SVG: true,
    }),
  ],
});
