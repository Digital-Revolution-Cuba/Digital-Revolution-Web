---
name: 'layout-helper'
description: 'Ayuda a crear layouts consistentes y grids responsive para Digital Revolution'
---

# Layout Helper Skill

Esta skill proporciona patrones y plantillas para crear layouts consistentes con el branding de Digital Revolution.

## Capabilities

- Plantillas de grids, cards y botones consistentes con branding
- Guías de espaciado, tipografía y tokens de color
- Ejemplos de implementación con Tailwind CSS v4

## Grid Patterns

### Responsive Grid (2-3-4 columns)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Items -->
</div>
```

### Feature Grid (Icon + Text)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div class="flex flex-col items-center text-center p-6">
    <!-- Icon -->
    <h3 class="text-xl font-semibold mt-4">Title</h3>
    <p class="text-gray-600 mt-2">Description</p>
  </div>
</div>
```

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `gap-2` | 0.5rem | Inline elements |
| `gap-4` | 1rem | Tight spacing |
| `gap-6` | 1.5rem | Default spacing |
| `gap-8` | 2rem | Section spacing |
| `gap-12` | 3rem | Large sections |

## Container Pattern

```html
<section class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
  <!-- Content -->
</section>
```

## Card Pattern

```astro
<article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  <Image src={image} alt={alt} class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-lg font-semibold">{title}</h3>
    <p class="text-gray-600 mt-2">{description}</p>
  </div>
</article>
```
