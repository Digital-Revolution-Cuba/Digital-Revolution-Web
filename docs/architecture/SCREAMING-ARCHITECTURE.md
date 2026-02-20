# 🏗️ Screaming Architecture - Digital Revolution Web

## 📖 Concepto

**Screaming Architecture** es un principio de diseño donde la estructura de carpetas del proyecto "grita" su propósito de negocio, no su tecnología.

### ❌ Mal Ejemplo (Organización por Tecnología)

```
src/
├── components/
├── hooks/
├── services/
└── utils/
```

**Problema**: No sabes qué hace la aplicación mirando la estructura.

### ✅ Buen Ejemplo (Organización por Features/Dominios)

```
src/
├── features/
│   ├── concursos/      # "¡Esta app gestiona concursos!"
│   ├── galeria/        # "¡Tiene una galería!"
│   └── talentos/       # "¡Muestra talentos!"
├── shared/             # Código compartido entre features
└── core/               # Lógica de negocio central
```

**Beneficio**: La estructura cuenta la historia del negocio.

---

## 🎯 Estructura Actual del Proyecto

### Híbrido: Pages Router + Feature-First

```
src/
├── pages/                      # 🎯 FEATURES (Astro file-based routing)
│   ├── concursos/              # Feature: Concursos
│   │   ├── index.astro         # /concursos
│   │   ├── [slug].astro        # /concursos/concurso-slug
│   │   └── _components/        # ✅ Components específicos (prefijo _ = no-route)
│   │       ├── ConcursoCard.astro
│   │       ├── ConcursosHero.astro
│   │       ├── ConcursosFiltersIsland.tsx
│   │       └── ConcursosTabsIsland.tsx
│   │
│   ├── galeria/                # Feature: Galería
│   │   ├── index.astro         # /galeria
│   │   └── _components/        # ✅ Prefijo _ para evitar rutas
│   │       ├── GalleryGrid.tsx
│   │       ├── GalleryHero.tsx
│   │       └── InputSearchGallery.tsx
│   │
│   ├── talentos/               # Feature: Talentos
│   │   ├── index.astro         # /talentos
│   │   └── _components/        # ✅ Prefijo _ para evitar rutas
│   │       ├── TalentsSearch.astro
│   │       └── TalentsCards.tsx
│   │
│   ├── colaboraciones/         # Feature: Colaboraciones
│   │   ├── index.astro         # /colaboraciones
│   │   ├── [slug].astro        # /colaboraciones/collab-slug
│   │   └── _components/        # ✅ Prefijo _ para evitar rutas
│   │       └── ColaboracionCard.astro
│   │
│   ├── perfiles/               # Feature: Perfiles
│   │   └── [slug].astro        # /perfiles/artista-slug
│   │
│   ├── components/             # Shared page-level components
│   │   ├── ConcursosSection.astro
│   │   └── ColaboracionesDestacadas.astro
│   │
│   └── index.astro             # Homepage
│
├── components/                 # 🧩 SHARED UI COMPONENTS
│   ├── layout/                 # Layout components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Navigation.astro
│   │
│   ├── ui/                     # Base UI components (Design System)
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   └── Modal.tsx
│   │
│   ├── features/               # Feature-specific reusable components
│   │   └── gallery/
│   │       ├── Gallery.astro
│   │       ├── GalleryControls.astro
│   │       └── GallerySlider.astro
│   │
│   └── DinamycGallery.astro    # Legacy component (to refactor)
│
├── composables/                # 🪝 REUSABLE LOGIC (hooks/composables)
│   ├── features/
│   │   ├── gallery/
│   │   │   ├── useGalleryModal.ts
│   │   │   ├── useImageSearch.ts
│   │   │   └── useInfiniteScroll.ts
│   │   └── talents/
│   │       ├── useTalentsFilter.ts
│   │       └── useTalentsSort.ts
│   │
│   ├── useCategorySwitch.ts
│   └── useGallerySlider.ts
│
├── config/                     # ⚙️ CONFIGURATION
│   ├── concursosConfig.ts
│   ├── galleryConfig.ts
│   └── talentsConfig.ts
│
├── data/                       # 📊 STATIC DATA
│   ├── arteGallery.ts
│   ├── musicaGallery.ts
│   ├── fotografiaGallery.ts
│   ├── concursosData.ts
│   ├── colaboracionesData.ts
│   └── types.ts
│
├── types/                      # 📝 TYPESCRIPT TYPES
│   ├── concursos.types.ts
│   ├── gallery.types.ts
│   └── talents.types.ts
│
├── utils/                      # 🛠️ UTILITIES
│   ├── concursosUtils.ts
│   ├── dateFormatter.ts
│   └── validators.ts
│
├── services/                   # 🌐 API SERVICES
│   ├── galleryService.ts
│   └── talentsService.ts
│
├── stores/                     # 📦 STATE MANAGEMENT
│   ├── galleryStore.ts
│   └── talentsStore.ts
│
├── styles/                     # 🎨 GLOBAL STYLES
│   ├── global.css
│   ├── animations.css
│   └── components/
│       ├── gallery.css
│       └── talents.css
│
└── layouts/                    # 📐 PAGE LAYOUTS
    └── Layout.astro
```

---

## 🧭 Reglas de Importación

### 1️⃣ Desde Pages Features → Shared Resources

**Desde**: `src/pages/{feature}/components/*.{astro,tsx}`  
**Hacia**: `src/`

```typescript
// ✅ CORRECTO: Usar ../../../ para salir de pages/{feature}/components/
import { GALLERY_CONFIG } from "../../../config/galleryConfig";
import type { GalleryItem } from "../../../types/gallery.types";
import { useGalleryModal } from "../../../composables/features/gallery/useGalleryModal";
import Button from "../../../components/ui/Button.astro";
```

**Profundidad de rutas**:

```
src/pages/galeria/components/GalleryGrid.tsx
│    │     │       │
└────┴─────┴───────┴──> ../../../  (3 niveles arriba hasta src/)
     pages galeria components
```

### 2️⃣ Cross-Feature Imports

**Desde**: `src/pages/components/*.astro`  
**Hacia**: `src/pages/{feature}/components/`

```typescript
// ✅ CORRECTO: Importar componentes de otras features
import ConcursoCard from "../concursos/components/ConcursoCard.astro";
import ColaboracionCard from "../colaboraciones/components/ColaboracionCard.astro";
```

### 3️⃣ Desde Shared Components → Resources

**Desde**: `src/components/*.astro`  
**Hacia**: `src/`

```typescript
// ✅ CORRECTO: Usar ../ (1 nivel)
import { GALLERY_CONFIG } from "../config/galleryConfig";
import type { GalleryItem } from "../types/gallery.types";
```

### 4️⃣ Convenciones de Nombres

```typescript
// ❌ MAL: No incluir extensiones o prefijos innecesarios
import Component from "./_Component.tsx";
import Component from "./Component.tsx";

// ✅ BIEN: Sin extensiones en imports
import Component from "./Component";
import { Component } from "./Component";
```

---

## 📏 Matriz de Profundidad de Imports

| Desde                                 | Profundidad | Ejemplo                         |
| ------------------------------------- | ----------- | ------------------------------- |
| `src/pages/{feature}/components/`     | `../../../` | `../../../config/galleryConfig` |
| `src/pages/components/`               | `../../`    | `../../config/galleryConfig`    |
| `src/components/`                     | `../`       | `../config/galleryConfig`       |
| `src/components/features/{feature}/`  | `../../../` | `../../../config/galleryConfig` |
| `src/composables/features/{feature}/` | `../../../` | `../../../types/gallery.types`  |

---

## 🎯 Principios de Screaming Architecture Aplicados

### 1. **Feature-First en Pages**

Cada feature vive en su carpeta dentro de `pages/`:

```
pages/
├── concursos/     # Todo sobre concursos
├── galeria/       # Todo sobre galería
└── talentos/      # Todo sobre talentos
```

### 2. **Colocation de Componentes**

Los componentes específicos de una feature viven junto a ella:

```
pages/concursos/
├── index.astro              # Página principal
├── [slug].astro             # Página de detalle
└── components/              # Componentes de concursos
    ├── ConcursoCard.astro
    └── ConcursosHero.astro
```

### 3. **Shared Resources en Root**

Recursos compartidos entre features viven en `src/`:

```
src/
├── components/ui/      # Design system compartido
├── composables/        # Lógica compartida
├── config/             # Configuración global
└── utils/              # Utilidades globales
```

### 4. **Dependency Rule**

```
Features (pages/) → Shared (components/, composables/) → Core (config/, types/)
      ↓                    ↓                                   ↓
   [UI Logic]        [Reusable Logic]                  [Business Logic]

✅ Features pueden importar de Shared
✅ Shared puede importar de Core
❌ Shared NO puede importar de Features
❌ Core NO puede importar de Shared o Features
```

---

## 🚀 Ejemplos Prácticos

### Ejemplo 1: Componente de Feature

```astro
---
// src/pages/concursos/components/ConcursoCard.astro

// ✅ Imports correctos desde feature component
import { CATEGORY_LABELS } from "../../../config/concursosConfig";
import type { Concurso } from "../../../types/concursos.types";
import { formatDate } from "../../../utils/concursosUtils";
import Badge from "../../../components/ui/Badge.astro";

interface Props {
  concurso: Concurso;
}

const { concurso } = Astro.props;
---

<article class="concurso-card">
  <h3>{concurso.title}</h3>
  <Badge>{CATEGORY_LABELS[concurso.category]}</Badge>
  <time>{formatDate(concurso.fechaCierre)}</time>
</article>
```

### Ejemplo 2: Composable de Feature

```typescript
// src/composables/features/gallery/useGalleryModal.ts

// ✅ Imports correctos desde composable
import type { GalleryItem } from "../../../types/gallery.types";
import { GALLERY_CONFIG } from "../../../config/galleryConfig";

export function useGalleryModal() {
  // Lógica del modal
  return {
    open: (item: GalleryItem) => {},
    close: () => {},
  };
}
```

### Ejemplo 3: Página usando Feature Components

```astro
---
// src/pages/index.astro

// ✅ Imports de layout y shared components
import Layout from "../layouts/Layout.astro";
import Header from "../components/layout/Header.astro";

// ✅ Imports de page-level components
import ConcursosSection from "./components/ConcursosSection.astro";
import ColaboracionesDestacadas from "./components/ColaboracionesDestacadas.astro";
---

<Layout title="Digital Revolution">
  <Header />
  <ConcursosSection />
  <ColaboracionesDestacadas />
</Layout>
```

---

## 🔧 Refactoring Guidelines

### Cuándo mover un componente de `components/` a `pages/{feature}/components/`

**Mover SI**:

- Solo se usa en una feature específica
- Tiene lógica específica del dominio
- Depende de configuración específica de la feature

**Mantener SI**:

- Se usa en múltiples features
- Es un componente de UI puro (Button, Card, Badge)
- Forma parte del design system

### Ejemplo de Refactoring

**Antes** (Problema):

```
src/components/
└── DinamycGallery.astro  # ❌ Legacy, mezcla responsabilidades
    ├── Imports de ./gallery/GalleryItem.astro  # ❌ No existe
```

**Después** (Solución):

```
src/pages/galeria/
└── components/
    ├── GalleryGrid.tsx        # ✅ Lógica específica de galería
    └── GalleryHero.tsx        # ✅ Hero específico de galería

src/components/features/gallery/
├── Gallery.astro              # ✅ Componente reutilizable
├── GalleryControls.astro      # ✅ Controles reutilizables
└── GallerySlider.astro        # ✅ Slider reutilizable
```

---

## 📚 Referencias

- [Screaming Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)

---

**Última actualización**: Febrero 2026  
**Mantenido por**: Digital Revolution Team
