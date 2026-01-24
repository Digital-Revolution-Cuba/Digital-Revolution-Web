# Architecture Overview

This document provides a comprehensive overview of the Digital Revolution Web architecture, design decisions, and core patterns.

---

## 🎯 Architectural Goals

1. **Performance First**: Achieve LCP ≤ 2.5s, minimize JavaScript
2. **SEO Optimized**: Server-side rendering, semantic HTML, structured data
3. **Developer Experience**: Type-safe, maintainable, well-documented
4. **Scalability**: Easy to add new sections and content
5. **Accessibility**: WCAG 2.1 AA compliant

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Astro Framework                      │
│                  (Static Site Generator)                 │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Static     │   │    React     │   │   Tailwind   │
│  Components  │   │   Islands    │   │     CSS      │
│   (.astro)   │   │   (minimal)  │   │   (v4.0)     │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                ┌──────────────────────┐
                │   Optimized Output   │
                │  (Static HTML + CSS  │
                │   + Minimal JS)      │
                └──────────────────────┘
```

---

## 🌊 Islands Architecture

### Concept

Digital Revolution Web uses **Astro Islands** architecture:

- **Default**: Server-rendered static HTML (zero JavaScript)
- **Interactive Islands**: Small React components hydrated only when needed
- **Partial Hydration**: Only interactive parts load JavaScript

### Example: Homepage Structure

```astro
---
// src/pages/index.astro
---

<Layout>
  <!-- 100% Static - No JS -->
  <Hero />
  <Concursos />
  <DinamycGalleryTitle />
  
  <!-- Static wrapper, interactive content -->
  <DinamicGallery />
  
  <!-- 100% Static -->
  <ColaboracionesDestacadas />
  <JoinOurCommunity />
  <Footer />
</Layout>
```

### Hydration Strategies

| Directive | When to Use | Example |
|-----------|-------------|---------|
| `client:load` | Critical interactivity (rare) | Navigation menu |
| `client:idle` | Non-critical, defer after page load | Analytics widgets |
| `client:visible` | Load when scrolled into view | Image galleries |
| `client:media` | Responsive behavior | Mobile-only menus |
| `client:only` | CSR-only components | `TalentsSearch` |

**Rule**: Use the least aggressive hydration strategy possible.

---

## 📁 Project Structure (Detailed)

```
src/
├── assets/                    # Raw assets (images, SVGs)
│   ├── ImagenPruebaGaleria.avif
│   └── ConcursosBG/
│
├── components/                # UI Components
│   ├── Header.astro          # Static header
│   ├── Hero.astro            # Static hero section
│   ├── Footer.astro          # Static footer
│   ├── Card.astro            # Reusable card component
│   ├── ResponsiveImage.astro # Optimized image wrapper
│   │
│   ├── gallery/              # Gallery-specific components
│   │   ├── CategoryButton.astro
│   │   ├── GalleryItem.astro
│   │   ├── MusicCard.astro
│   │   └── FotografiaCard.astro
│   │
│   └── talents/              # Interactive talent search
│       ├── TalentsSearch.astro  (Wrapper)
│       └── TalentsCards.tsx     (React Island)
│
├── composables/              # Reusable logic hooks
│   ├── useCategorySwitch.ts
│   └── useGallerySlider.ts
│
├── config/                   # Configuration files
│   └── galleryConfig.ts
│
├── data/                     # Static data & types
│   ├── types.ts             # TypeScript interfaces
│   ├── arteGallery.ts
│   ├── musicaGallery.ts
│   ├── fotografiaGallery.ts
│   ├── concursosData.ts
│   ├── colaboracionesData.ts
│   └── talents.ts
│
├── layouts/                  # Page layouts
│   └── Layout.astro         # Main layout (SEO, meta tags)
│
├── pages/                    # File-based routing
│   ├── index.astro          # Homepage (/)
│   ├── talentos/
│   │   └── index.astro      # /talentos
│   ├── colaboraciones/
│   │   ├── index.astro      # /colaboraciones
│   │   ├── components/
│   │   └── data/
│   ├── galeria/
│   │   └── index.astro      # /galeria
│   ├── concursos/
│   │   └── index.astro      # /concursos
│   └── perfiles/
│       └── index.astro      # /perfiles
│
├── styles/                   # Global styles
│   ├── global.css           # Tailwind config + CSS variables
│   ├── animations.css
│   ├── glass-card.css
│   └── components/
│       ├── adaptive-gallery.css
│       ├── fluid-typography.css
│       └── talents.css
│
├── types/                    # Global TypeScript types
│
└── utils/                    # Utility functions
    ├── galleryAnimations.js
    ├── musicPlayer.ts
    ├── responsiveTests.js
    └── transitionUtils.js
```

---

## 🎨 Styling Architecture

### Tailwind CSS v4 Configuration

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-brand-dark: #011822;
  --color-brand-navy: #002b38;
  --color-brand-background-global: #011822;
  
  /* Accent Colors */
  --color-accent-cyan: #34dfde;
  --color-accent-orange: #f49624;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'Impact', 'Arial Black', sans-serif;
}
```

### Component Styling Patterns

1. **Utility-First**: Prefer Tailwind utilities
2. **Component CSS**: Use `<style>` blocks in `.astro` files for component-specific styles
3. **Global Styles**: `global.css` for reusable patterns
4. **CSS Variables**: For theming and dynamic values

---

## 🔄 Data Flow

### Static Data Pattern

```typescript
// 1. Define types
// src/data/types.ts
export interface Talent {
  id: number;
  name: string;
  role: string;
  skills: string[];
}

// 2. Create data
// src/data/talents.ts
export const talents: Talent[] = [
  { id: 1, name: 'María García', role: 'Fotógrafa', skills: ['Fotografía'] }
];

// 3. Import and use
// src/pages/talentos/index.astro
---
import { talents } from '../../data/talents';
---

<div>
  {talents.map(talent => <Card {...talent} />)}
</div>
```

### Interactive Data Pattern

```tsx
// src/components/talents/TalentsCards.tsx
import { talents as talentsMock } from '../../data/talents';

export default function TalentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTalents = useMemo(() => {
    return talentsMock.filter(talent =>
      talent.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  return (/* JSX */);
}
```

---

## 🔍 SEO Architecture

### Meta Tags Strategy

**Centralized in Layout**:

```astro
---
// src/layouts/Layout.astro
interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<head>
  <title>{title} | Digital Revolution</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  
  <!-- JSON-LD -->
  <script type="application/ld+json">
    {JSON.stringify(schemaData)}
  </script>
</head>
```

**Page-Level Usage**:

```astro
---
// src/pages/talentos/index.astro
---

<Layout
  title="Talentos — Digital Revolution Web"
  description="Explora la comunidad de talentos..."
  image="/og-talentos.jpg"
>
  <!-- Page content -->
</Layout>
```

### Static Files

- `public/robots.txt`: Crawler directives
- `public/sitemap.xml`: URL inventory for search engines

---

## ⚡ Performance Optimization

### Image Optimization

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero image"
  widths={[640, 1024, 1600]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="eager"  <!-- For LCP images -->
  format="avif"    <!-- Modern format -->
/>
```

### Code Splitting

- **Automatic**: Astro splits code by route
- **Manual**: Dynamic imports for heavy components

```astro
---
const HeavyComponent = (await import('./Heavy.astro')).default;
---

{someCondition && <HeavyComponent />}
```

### Bundle Size Targets

- **Static HTML + CSS**: < 100 KB (gzipped)
- **JavaScript per island**: < 50 KB (gzipped)
- **Images (above fold)**: < 100 KB each

---

## 🔐 Type Safety

### TypeScript Configuration

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

### Component Props Pattern

```astro
---
// Always define Props interface
interface Props {
  title: string;
  description?: string;
  items: Array<{ id: number; name: string }>;
}

const { title, description = 'Default', items } = Astro.props;
---
```

---

## 🧪 Testing Strategy

(To be implemented)

- **Unit Tests**: Utility functions (Vitest)
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright
- **Visual Regression**: Percy or Chromatic

---

## 🚀 Build & Deployment

### Build Process

```bash
pnpm build
```

Output:

1. Static HTML files in `dist/`
2. Optimized CSS (purged, minified)
3. Minimal JavaScript bundles
4. Optimized images (AVIF, WebP, JPEG fallbacks)

### Deployment Targets

- **Vercel**: Zero-config deployment (recommended)
- **Netlify**: Static site hosting
- **Cloudflare Pages**: Edge deployment
- **GitHub Pages**: Free hosting option

---

## 📈 Future Considerations

### Potential Enhancements

1. **Content Collections**: Migrate static data to Astro Content Collections
2. **API Integration**: Connect to WordPress headless CMS
3. **i18n**: Multi-language support
4. **PWA**: Progressive Web App features
5. **Authentication**: User profiles and login

### Scalability

- Current architecture supports 100+ pages without performance degradation
- Image optimization scales with Sharp processing
- Static builds are CDN-friendly

---

## 🔗 Related Documentation

- [Islands Architecture Details](./islands.md)
- [Data Flow Patterns](./data-flow.md)
- [SEO Strategy Deep Dive](./seo-strategy.md)
- [Performance Optimization Guide](./performance.md)

---

**Last Updated**: January 2026  
**Architecture Version**: 1.0
