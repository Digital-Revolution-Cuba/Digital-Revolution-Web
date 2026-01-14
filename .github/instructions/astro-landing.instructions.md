---
applyTo: '**/*.astro, **/*.tsx'
description: 'Reglas específicas para componentes Astro de la landing'
---

# Astro Landing Instructions

## Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.astro`, `CardItem.tsx`)
- **Props interfaces**: Prefijo `Props` o nombre descriptivo (e.g., `interface HeroProps`)

## Layout & Responsive

- Mobile-first approach con Tailwind breakpoints
- Usar `<Image />` de `astro:assets` para imágenes optimizadas
- LCP images: `loading="eager"` + `widths={[640, 1024, 1600]}`

## Accessibility

- Images: siempre incluir `alt` text descriptivo
- Buttons icon-only: incluir `aria-label`
- Usar semantic HTML (`<section>`, `<article>`, `<nav>`, etc.)

## Hydration Policy

- Default: `client:visible` para React islands
- Usar `.astro` para componentes sin interactividad
- Nunca hidratar páginas completas

## Styling

- Usar Tailwind CSS v4 utilities
- Tokens definidos en `src/styles/global.css` via `@theme`
- Evitar inline styles para layout principal
