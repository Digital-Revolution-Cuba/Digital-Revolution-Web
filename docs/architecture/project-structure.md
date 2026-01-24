# Project Structure

Detailed explanation of the Digital Revolution Web folder structure.

---

## 📁 Root Level

```
Digital-Revolution-Web/
├── .astro/              # Astro build cache (auto-generated)
├── .github/             # GitHub configurations and AI instructions
├── .vscode/             # VS Code workspace settings
├── dist/                # Production build output
├── docs/                # THIS DOCUMENTATION
├── eng/                 # Engineering utilities/scripts
├── node_modules/        # Dependencies (managed by pnpm)
├── public/              # Static assets (served as-is)
├── scripts/             # Build and automation scripts
├── src/                 # SOURCE CODE
├── astro.config.mjs     # Astro configuration
├── package.json         # Project dependencies and scripts
├── pnpm-lock.yaml       # Locked dependency versions
├── tsconfig.json        # TypeScript configuration
├── .gitignore           # Git ignore rules
├── .prettierrc          # Prettier formatting config
├── .editorconfig        # Editor configuration
├── LICENSE              # MIT License
├── README.md            # Project overview
├── CONTRIBUTING.md      # Contribution guidelines
├── Documentation.md     # Quick reference documentation
└── TESTING.md           # Testing guidelines
```

---

## 🎯 Key Directories

### `/src` - Source Code

The heart of the application.

```
src/
├── assets/              # Raw assets (images, fonts, SVGs)
├── components/          # Reusable UI components
├── composables/         # Reusable logic/hooks
├── config/              # Configuration files
├── data/                # Static data and types
├── layouts/             # Page layouts
├── pages/               # File-based routing
├── styles/              # Global CSS and Tailwind config
├── types/               # Global TypeScript types
├── utils/               # Utility functions
└── env.d.ts            # Environment type definitions
```

---

### `/src/assets` - Raw Assets

Images, fonts, and other raw assets that need processing.

```
assets/
├── ImagenPruebaGaleria.avif
├── prueba.avif
├── ConcursosBG/
│   ├── concurso1.jpg
│   └── concurso2.jpg
└── logos/
    └── brand-logo.svg
```

**Usage Pattern**:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image src={heroImage} alt="Hero" />
```

**Rules**:
- Images here are optimized at build time
- Use `Image` component from `astro:assets`
- Generates responsive images (AVIF, WebP, JPEG)

---

### `/src/components` - UI Components

Reusable components organized by feature.

```
components/
├── Header.astro                  # Global header
├── Footer.astro                  # Global footer
├── Hero.astro                    # Hero section
├── Card.astro                    # Generic card
├── ResponsiveImage.astro         # Optimized image wrapper
├── AccordeonSlider.astro         # Accordion slider
├── Concursos.astro               # Contests section
├── JoinOurCommunity.astro        # CTA section
│
├── gallery/                      # Gallery-specific
│   ├── CategoryButton.astro
│   ├── GalleryItem.astro
│   ├── MusicCard.astro
│   ├── FotografiaCard.astro
│   └── NavigationButton.astro
│
├── talents/                      # Talent search (React Islands)
│   ├── TalentsSearch.astro      # Astro wrapper
│   └── TalentsCards.tsx         # React interactive component
│
└── ui/                          # Base UI components (to be created)
    ├── Button.astro
    ├── Input.astro
    └── Modal.astro
```

**Naming Conventions**:
- `.astro` - Static components
- `.tsx` - React islands
- PascalCase for all component files

---

### `/src/composables` - Reusable Logic

Custom hooks and composables (functional utilities).

```
composables/
├── useCategorySwitch.ts     # Category switching logic
└── useGallerySlider.ts      # Gallery slider controller
```

**Example**:

```typescript
// src/composables/useGallerySlider.ts
export function useGallerySlider(config) {
  return {
    next() { /* ... */ },
    prev() { /* ... */ },
    goTo(index) { /* ... */ },
  };
}
```

---

### `/src/config` - Configuration

Application configuration files.

```
config/
├── galleryConfig.ts        # Gallery settings
├── constants.ts            # Application constants
└── site.config.ts          # Site metadata
```

**Example**:

```typescript
// src/config/galleryConfig.ts
export const GALLERY_CONFIG = {
  VISIBLE_IMAGES: 3,
  AUTO_PLAY: true,
  AUTO_PLAY_INTERVAL: 5000,
  TRANSITION_DURATION: 500,
};
```

---

### `/src/data` - Static Data

Data files and type definitions.

```
data/
├── types.ts                    # Core TypeScript interfaces
├── index.ts                    # Re-exports for convenience
├── arteGallery.ts             # Art gallery items
├── musicaGallery.ts           # Music gallery items
├── fotografiaGallery.ts       # Photography gallery items
├── concursosData.ts           # Contest data
├── colaboracionesData.ts      # Collaboration data
└── talents.ts                 # Talent profiles
```

**Pattern**:

```typescript
// 1. Define types in types.ts
export interface Talent {
  id: number;
  name: string;
  role: string;
}

// 2. Create data in separate file
import type { Talent } from './types';

export const talents: Talent[] = [
  { id: 1, name: 'María', role: 'Fotógrafa' },
];

// 3. Re-export in index.ts for convenience
export { talents } from './talents';
export { arteGallery } from './arteGallery';
export type { Talent } from './types';
```

---

### `/src/layouts` - Page Layouts

Reusable page layouts with common structure.

```
layouts/
└── Layout.astro            # Main layout (header, meta, footer)
```

**Layout.astro Structure**:

```astro
---
interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title} | Digital Revolution</title>
    <meta name="description" content={description} />
    <!-- Meta tags, JSON-LD, etc. -->
  </head>
  <body>
    <Header />
    <slot />
    <Footer />
  </body>
</html>
```

---

### `/src/pages` - File-Based Routing

Astro's file-based routing system.

```
pages/
├── index.astro                  # Homepage (/)
│
├── talentos/
│   └── index.astro              # /talentos
│
├── colaboraciones/
│   ├── index.astro              # /colaboraciones
│   ├── components/              # Page-specific components
│   │   └── FeaturedCollaborationCard.astro
│   └── data/
│       └── colaboraciones.ts    # Page-specific data
│
├── concursos/
│   └── index.astro              # /concursos
│
├── galeria/
│   └── index.astro              # /galeria
│
└── perfiles/
    └── index.astro              # /perfiles
```

**Routing Rules**:
- `index.astro` → `/path`
- `about.astro` → `/about`
- `blog/[slug].astro` → `/blog/post-title` (dynamic routes)

---

### `/src/styles` - Global Styles

CSS files for global styles and Tailwind configuration.

```
styles/
├── global.css                  # Main CSS (Tailwind + globals)
├── animations.css              # Animation keyframes
├── glass-card.css              # Glass morphism effects
│
└── components/                 # Component-specific CSS
    ├── adaptive-gallery.css
    ├── fluid-typography.css
    ├── responsive-card.css
    └── talents.css
```

**global.css Structure**:

```css
/* Import Tailwind */
@import "tailwindcss";

/* Define design tokens */
@theme {
  --color-brand-dark: #011822;
  --color-brand-navy: #002b38;
  --color-accent-cyan: #34dfde;
  --color-accent-orange: #f49624;
}

/* Global styles */
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--color-brand-background-global);
}

/* Utility classes */
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-cyan-500 text-white rounded-lg;
  }
}
```

---

### `/src/utils` - Utility Functions

Helper functions and utilities.

```
utils/
├── galleryAnimations.js      # Gallery animation helpers
├── musicPlayer.ts            # Music player utilities
├── responsiveTests.js        # Responsive testing utilities
└── transitionUtils.js        # Page transition helpers
```

**Example**:

```typescript
// src/utils/dateFormatter.ts
export function formatDate(date: Date, locale = 'es-ES'): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(date);
}
```

---

## 📦 `/public` - Static Assets

Files served as-is without processing.

```
public/
├── robots.txt              # Search engine crawler rules
├── sitemap.xml             # Site URL inventory
├── favicon.svg             # Site favicon
├── og-home.jpg            # Open Graph image for homepage
├── og-talentos.jpg        # OG image for talents page
├── og-galeria.jpg         # OG image for gallery page
└── fonts/                 # Web fonts (if self-hosted)
    └── inter.woff2
```

**Rules**:
- Files in `public/` are served from root URL
- No processing or optimization
- Use for: favicons, robots.txt, sitemap.xml, etc.
- Don't use for images that need optimization

---

## 📚 `/docs` - Documentation

This comprehensive documentation folder.

```
docs/
├── README.md                     # Documentation index
├── guides/                       # Developer guides
│   ├── quick-start.md
│   ├── coding-standards.md
│   ├── ai-guidelines.md
│   ├── git-workflow.md
│   └── troubleshooting.md
├── architecture/                 # Architecture docs
│   ├── overview.md
│   ├── islands.md
│   ├── data-flow.md
│   └── seo-strategy.md
├── components/                   # Component documentation
│   ├── README.md
│   ├── astro-components.md
│   └── react-islands.md
└── api/                         # API reference
    ├── data-models.md
    ├── utilities.md
    └── configuration.md
```

---

## ⚙️ Configuration Files

### `astro.config.mjs`

Astro framework configuration.

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
```

### `tsconfig.json`

TypeScript configuration.

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

### `package.json`

Project dependencies and scripts.

```json
{
  "name": "digitalrevolutionweb",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "format": "prettier --write ."
  },
  "dependencies": {
    "astro": "^5.16.6",
    "react": "^19.2.3",
    "tailwindcss": "^4.1.18"
  }
}
```

---

## 🔒 Ignored Folders

These folders are auto-generated and should not be committed:

```
.astro/          # Astro cache
dist/            # Build output
node_modules/    # Dependencies
```

Defined in `.gitignore`:

```
node_modules/
dist/
.astro/
.env
.DS_Store
```

---

## 📊 Folder Size Guidelines

| Folder | Expected Size | Notes |
|--------|--------------|-------|
| `src/components/` | Growing | One file per component |
| `src/pages/` | Stable | One file per route |
| `src/data/` | Growing | Split large data files |
| `src/utils/` | Growing | Keep utilities small and focused |
| `public/` | Limited | Keep static assets minimal |

---

## 🔗 Related Documentation

- [Architecture Overview](./overview.md)
- [Component Guidelines](../components/README.md)
- [Quick Start Guide](../guides/quick-start.md)

---

**Last Updated**: January 2026
