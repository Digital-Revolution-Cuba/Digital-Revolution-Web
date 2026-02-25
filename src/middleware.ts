import { defineMiddleware } from "astro:middleware";

/**
 * Middleware de producción — añade cabeceras de seguridad y optimización a
 * todas las respuestas SSR generadas por el servidor de Vercel.
 *
 * Las cabeceras estáticas (/_astro/*, /fonts/*, etc.) se gestionan en
 * vercel.json para máxima eficiencia en el edge.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Solo aplicar a respuestas HTML (páginas) — no a assets, APIs, etc.
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  // Clonar headers para poder modificarlos (Response es inmutable)
  const headers = new Headers(response.headers);

  // ── Seguridad ──────────────────────────────────────────────────────────────
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // CSP — permite scripts de Vercel Analytics y Speed Insights
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://digital-revolution-cuba.vercel.app https://*.vercel.app",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ")
  );

  // HSTS — solo en producción (Vercel ya fuerza HTTPS)
  if (import.meta.env.PROD) {
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  // ── Rendimiento ────────────────────────────────────────────────────────────
  // Páginas HTML: siempre revalidar (ISR se encarga del caché en Vercel)
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
