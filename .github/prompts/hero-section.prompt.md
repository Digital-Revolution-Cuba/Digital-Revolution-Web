---
name: 'hero-section'
description: 'Genera sección Hero de landing'
---

# Prompt: Hero Section Generator

Genera una sección para la landing page de Digital Revolution.

## Input Variables

- `SECTION_TYPE`: Tipo de sección (Hero, Features, Testimonials, CTA, etc.)

## Context

Necesito una nueva sección para la landing page.

## Requirements

1. **Container**: Usar tag semántico (`<section>`) con un ID único
2. **Layout**: Flex/Grid responsive. Mobile-first
3. **Content**: Generar placeholder realista optimizado para SEO
4. **Styling**: Tailwind CSS v4 con tokens del proyecto
5. **Animation**: Animaciones de scroll opcionales
6. **Images**: Usar `<Image />` de `astro:assets` con widths responsive

## Output

Archivo `.astro` completo con la sección solicitada.
