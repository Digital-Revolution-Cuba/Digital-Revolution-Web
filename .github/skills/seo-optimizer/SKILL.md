---
name: 'seo-optimizer'
description: 'Mejora SEO, metatags y accesibilidad de páginas y componentes'
---

# SEO Optimizer Skill

Esta skill proporciona guías y plantillas para optimizar el SEO de Digital Revolution.

## Capabilities

- Revisar archivos y proponer mejoras en `title`, `meta description`, `og:*` y `twitter:*`
- Generar plantillas JSON-LD para `WebSite`, `Organization` y `Article`
- Validar `alt` en imágenes y `aria-label` en controles icon-only
- Proveer ejemplos en `templates/`

## Meta Tags Template

```html
<!-- Primary Meta Tags -->
<title>Page Title | Digital Revolution</title>
<meta name="title" content="Page Title | Digital Revolution" />
<meta name="description" content="Description under 160 characters" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://digitalrevolution.com/page" />
<meta property="og:title" content="Page Title | Digital Revolution" />
<meta property="og:description" content="Description under 160 characters" />
<meta property="og:image" content="https://digitalrevolution.com/og-image.jpg" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://digitalrevolution.com/page" />
<meta property="twitter:title" content="Page Title | Digital Revolution" />
<meta property="twitter:description" content="Description under 160 characters" />
<meta property="twitter:image" content="https://digitalrevolution.com/og-image.jpg" />
```

## JSON-LD Templates

### WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Digital Revolution",
  "url": "https://digitalrevolution.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://digitalrevolution.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Revolution",
  "url": "https://digitalrevolution.com",
  "logo": "https://digitalrevolution.com/logo.png",
  "sameAs": [
    "https://twitter.com/digitalrev",
    "https://instagram.com/digitalrev"
  ]
}
```

## Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Icon-only buttons have `aria-label`
- [ ] Color contrast meets WCAG AA (≥ 4.5:1)
- [ ] One `<h1>` per page
- [ ] Heading hierarchy is maintained
