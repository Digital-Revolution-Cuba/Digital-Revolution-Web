# SEO TODOs for Digital-Revolution-Web

This file lists remaining SEO tasks that require manual assets or policy decisions.

- [ ] Add optimized OG images to `public/` for pages referenced in Layout (e.g. `/og-home.jpg`, `/og-talentos.jpg`, `/og-colaboraciones.jpg`, `/og-galeria.jpg`, `/og-concursos.jpg`). Recommended size: 1200 x 630 px (JPEG/PNG)
- [ ] Add automatic sitemap generation to the build pipeline (e.g., `astro-sitemap` or custom script) and keep `sitemap.xml` up-to-date.
- [ ] Add `robots.txt` verification in CI and ensure it points to the active sitemap URL.
- [ ] Run Lighthouse and Google Rich Results Test on staging; fix any SEO/accessibility regressions.
- [ ] For content pages (articles), add `Article` JSON-LD dynamically in page templates.
- [ ] Ensure each main page has a unique, descriptive `<title>` and `<meta name="description">` (we added defaults for core pages; keep them updated per-page).
- [ ] Validate that there is exactly one `<h1>` per page and maintain heading hierarchy.
- [ ] Review link rel=canonical usage for paginated or filtered listing pages.
