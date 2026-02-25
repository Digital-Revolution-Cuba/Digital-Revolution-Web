// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // ── URL de producción ─────────────────────────────────────────────────────
  // Necesaria para sitemap, canonical URLs, Open Graph y SEO
  site: "https://digital-revolution-cuba.vercel.app",

  // SSR con Vercel adapter — páginas estáticas usan `export const prerender = true`
  output: "server",

  // ── Prefetch hover — navegar páginas antes de que el usuario haga click ──
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  // ── Optimizaciones de build ───────────────────────────────────────────────
  compressHTML: true,
  build: {
    inlineStylesheets: "auto", // Inline CSS pequeño (<4KB) para eliminar render-blocking
    assets: "_astro",
  },

  // ── Servidor de desarrollo ────────────────────────────────────────────────
  server: {
    port: 4321,
    host: true,
  },

  // ── Configuración de imágenes ─────────────────────────────────────────────
  image: {
    domains: ["digital-revolution-cuba.vercel.app"],
    remotePatterns: [{ protocol: "https" }],
  },

  // ── Experimental (Astro 5.x / 2026 features) ─────────────────────────────
  experimental: {
    // Optimización de SVGs importados (reduce peso de assets SVG)
    svgo: true,
  },

  // ── Vite — bundler y optimizaciones ───────────────────────────────────────
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Terser produce bundles más pequeños que esbuild
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.info", "console.debug", "console.warn"],
          passes: 2, // Múltiples pasadas para mejor compresión
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
      // Separar chunks para mejor cacheado en CDN
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            icons: ["lucide-react"],
            store: ["nanostores"],
          },
        },
      },
      // CSS: usar lightningcss para transformación ultra rápida
      cssMinify: "lightningcss",
    },
    css: {
      // lightningcss como transformer CSS (más rápido que PostCSS)
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true, // Soporte para @custom-media (CSS estándar 2025+)
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "nanostores"],
    },
  },

  // ── Adaptador Vercel — configuración de producción ────────────────────────
  adapter: vercel({
    // ISR — cachea SSR tras el primer request, revalida cada 24h
    isr: {
      expiration: 60 * 60 * 24,
      exclude: ["/api/**", "/preview"],
    },
    // Vercel Image Optimization API (producción)
    imageService: true,
    devImageService: "sharp",
    imagesConfig: {
      sizes: [320, 480, 640, 960, 1280, 1920],
      domains: ["digital-revolution-cuba.vercel.app"],
    },
    maxDuration: 30,
    // Habilita Web Analytics inyectando el script automáticamente
    webAnalytics: {
      enabled: true,
    },
  }),

  // ── Integraciones ─────────────────────────────────────────────────────────
  integrations: [
    react(),

    // Sitemap automático con prioridades por sección (chunks API)
    sitemap({
      lastmod: new Date(),
      chunks: {
        main: (item) => {
          if (item.url === "https://digital-revolution-cuba.vercel.app/") {
            item.priority = 1.0;
            return item;
          }
        },
        sections: (item) => {
          if (
            item.url.includes("/talentos") ||
            item.url.includes("/galeria") ||
            item.url.includes("/concursos") ||
            item.url.includes("/colaboraciones")
          ) {
            item.priority = 0.8;
            return item;
          }
        },
        profiles: (item) => {
          if (item.url.includes("/perfiles")) {
            item.priority = 0.7;
            return item;
          }
        },
        // Fallback chunk: include all other URLs with default priority
        others: (item) => item,
      },
    }),

    // Compresión de assets (imágenes desactivadas — Vercel Image Optimization)
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ],
});
