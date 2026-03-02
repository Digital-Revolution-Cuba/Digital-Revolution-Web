# 📐 Reorganización del Proyecto — Febrero 2026

## 🎯 Objetivo

Reorganizar el proyecto siguiendo el **Colocation Pattern** de Astro y las mejores prácticas de diseño de sistemas para mejorar la mantenibilidad, escalabilidad y experiencia de desarrollo.

---

## 📊 Cambios Realizados

### ✅ Componentes Movidos a Colocation Pattern

#### **Homepage Components** → `src/pages/components/`

- ✅ `Hero.astro`
- ✅ `ConcursosSection.astro` (antes `Concursos.astro`)
- ✅ `DinamycGalleryTitle.astro`
- ✅ `ColaboracionesDestacadas.astro`
- ✅ `ColaboracionesDestacadasTitle.astro`
- ✅ `AccordeonSlider.astro`
- ✅ `ColaboracionCard.astro`
- ✅ `ConcursoCard.astro`

#### **Colaboraciones Components** → `src/pages/colaboraciones/components/`

- ✅ `CollaborationCard.astro`
- ✅ `ColaboracionCard.astro`
- ✅ `ColaboracionCardDetailed.astro`
- ✅ `FeaturedCollaborationCard.astro` (ya estaba)

#### **Concursos Components** → `src/pages/concursos/components/`

- ✅ `ConcursoCard.astro`
- ⚠️ `ConcursoCard.tsx` → **Pendiente renombrar a `_ConcursoCard.tsx`**
- ✅ `ConcursosCTA.astro`
- ⚠️ `ConcursosFiltersIsland.tsx` → **Pendiente renombrar a `_ConcursosFiltersIsland.tsx`**
- ✅ `ConcursosHero.astro`
- ⚠️ `ConcursosTabsIsland.tsx` → **Pendiente renombrar a `_ConcursosTabsIsland.tsx`**

#### **Galería Components** → `src/pages/galeria/components/`

- ✅ `CategoryButton.astro`
- ✅ `FotografiaCard.astro`
- ⚠️ `GalleryGrid.tsx` → **Pendiente renombrar a `_GalleryGrid.tsx`**
- ⚠️ `GalleryHero.tsx` → **Pendiente renombrar a `_GalleryHero.tsx`**
- ✅ `GalleryItem.astro`
- ⚠️ `InputSearchGallery.tsx` → **Pendiente renombrar a `_InputSearchGallery.tsx`**
- ✅ `MusicCard.astro`
- ✅ `NavigationButton.astro`

#### **Talentos Components** → `src/pages/talentos/components/`

- ⚠️ `TalentsCards.tsx` → **Pendiente renombrar a `_TalentsCards.tsx`**
- ✅ `TalentsSearch.astro`

#### **Layout Components** → `src/components/layout/`

- ✅ `Header.astro`
- ✅ `Footer.astro`
- ✅ `JoinOurCommunity.astro`

#### **UI Components** → `src/components/ui/`

- ✅ `Button.astro`
- ✅ `Card.astro`
- ✅ `Icon.astro`
- ✅ `DiagonalDivider.astro`
- ✅ `Divisor.astro`
- ✅ `ResponsiveImage.astro`
- ✅ `EmptyState.tsx`
- ✅ `FilterButtons.tsx`
- ✅ `SearchBar.tsx`

---

## 🚨 Acciones Pendientes

### 1. Renombrar Archivos TSX con Prefijo `_`

Los archivos `.tsx` dentro de `/pages` deben tener prefijo `_` para que Astro no los considere rutas:

```powershell
# Concursos
Rename-Item "src\pages\concursos\components\ConcursoCard.tsx" "_ConcursoCard.tsx"
Rename-Item "src\pages\concursos\components\ConcursosFiltersIsland.tsx" "_ConcursosFiltersIsland.tsx"
Rename-Item "src\pages\concursos\components\ConcursosTabsIsland.tsx" "_ConcursosTabsIsland.tsx"

# Galería
Rename-Item "src\pages\galeria\components\GalleryGrid.tsx" "_GalleryGrid.tsx"
Rename-Item "src\pages\galeria\components\GalleryHero.tsx" "_GalleryHero.tsx"
Rename-Item "src\pages\galeria\components\InputSearchGallery.tsx" "_InputSearchGallery.tsx"

# Talentos
Rename-Item "src\pages\talentos\components\TalentsCards.tsx" "_TalentsCards.tsx"
```

### 2. Actualizar Imports tras Renombrado

**Ya preparados en el código**, solo falta ejecutar el renombrado:

#### `src/pages/galeria/index.astro`

```ts
import { GalleryGrid } from "./components/_GalleryGrid";
import { HeroSection } from "./components/_GalleryHero";
```

#### `src/pages/galeria/components/_GalleryGrid.tsx`

```ts
import { InputSearchGallery } from "./_InputSearchGallery";
```

#### `src/pages/concursos/index.astro`

```ts
import ConcursosFiltersIsland from "./components/_ConcursosFiltersIsland.tsx";
```

#### `src/pages/talentos/components/TalentsSearch.astro`

```ts
import TalentSearch from "./_TalentsCards";
```

---

## 📁 Estructura Final del Proyecto

```
src/
├── components/
│   ├── ui/                          # ✅ Componentes base reutilizables
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Icon.astro
│   │   ├── DiagonalDivider.astro
│   │   ├── Divisor.astro
│   │   ├── ResponsiveImage.astro
│   │   ├── EmptyState.tsx
│   │   ├── FilterButtons.tsx
│   │   └── SearchBar.tsx
│   │
│   ├── layout/                      # ✅ Componentes de layout globales
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── JoinOurCommunity.astro
│   │
│   └── features/                    # ✅ Features compartidas
│       └── gallery/
│           ├── Gallery.astro
│           ├── GalleryControls.astro
│           └── GallerySlider.astro
│
├── pages/
│   ├── index.astro
│   │
│   ├── components/                  # ✅ Componentes específicos de homepage
│   │   ├── Hero.astro
│   │   ├── ConcursosSection.astro
│   │   ├── DinamycGalleryTitle.astro
│   │   ├── ColaboracionesDestacadas.astro
│   │   ├── ColaboracionesDestacadasTitle.astro
│   │   ├── AccordeonSlider.astro
│   │   ├── ColaboracionCard.astro
│   │   └── ConcursoCard.astro
│   │
│   ├── colaboraciones/
│   │   ├── index.astro
│   │   ├── [slug].astro
│   │   ├── components/              # ✅ Componentes específicos
│   │   │   ├── CollaborationCard.astro
│   │   │   ├── ColaboracionCard.astro
│   │   │   ├── ColaboracionCardDetailed.astro
│   │   │   └── FeaturedCollaborationCard.astro
│   │   └── data/
│   │       └── colaboraciones.ts
│   │
│   ├── concursos/
│   │   ├── index.astro
│   │   ├── [slug].astro
│   │   └── components/              # ✅ Componentes específicos
│   │       ├── ConcursoCard.astro
│   │       ├── _ConcursoCard.tsx    # ⚠️ Pendiente renombrar
│   │       ├── ConcursosCTA.astro
│   │       ├── _ConcursosFiltersIsland.tsx  # ⚠️ Pendiente renombrar
│   │       ├── ConcursosHero.astro
│   │       └── _ConcursosTabsIsland.tsx     # ⚠️ Pendiente renombrar
│   │
│   ├── galeria/
│   │   ├── index.astro
│   │   └── components/              # ✅ Componentes específicos
│   │       ├── CategoryButton.astro
│   │       ├── FotografiaCard.astro
│   │       ├── _GalleryGrid.tsx     # ⚠️ Pendiente renombrar
│   │       ├── _GalleryHero.tsx     # ⚠️ Pendiente renombrar
│   │       ├── GalleryItem.astro
│   │       ├── _InputSearchGallery.tsx  # ⚠️ Pendiente renombrar
│   │       ├── MusicCard.astro
│   │       └── NavigationButton.astro
│   │
│   ├── talentos/
│   │   ├── index.astro
│   │   └── components/              # ✅ Componentes específicos
│   │       ├── _TalentsCards.tsx    # ⚠️ Pendiente renombrar
│   │       └── TalentsSearch.astro
│   │
│   └── perfiles/
│       ├── index.astro
│       └── [slug].astro
│
├── layouts/
│   └── Layout.astro                 # ✅ Layout principal
│
├── data/                            # ✅ Datos estáticos
├── config/                          # ✅ Configuración
├── types/                           # ✅ Tipos TypeScript
├── utils/                           # ✅ Utilidades
├── composables/                     # ✅ Lógica reutilizable
└── styles/                          # ✅ Estilos globales
```

---

## ✅ Beneficios de la Reorganización

### 🎯 Colocation Pattern

- **Imports más cortos**: `./components/Card.astro` vs `../../components/Card.astro`
- **Organización lógica**: Componentes junto a las páginas que los usan
- **Fácil navegación**: Todo relacionado con una página en una carpeta

### 🧹 Separación de Responsabilidades

- **`/components/ui`**: Solo componentes verdaderamente reutilizables
- **`/components/layout`**: Componentes de estructura global (Header, Footer)
- **`/pages/[page]/components`**: Componentes específicos de cada página

### 📦 Mantenibilidad

- **Fácil encontrar componentes**: Saber dónde buscar según el contexto
- **Menos acoplamiento**: Cambios en una página no afectan otras
- **Escalabilidad**: Agregar páginas nuevas con su propia carpeta de componentes

### 🚀 Alineado con Astro

- Sigue las recomendaciones oficiales de Astro sobre organización
- Usa prefijo `_` para excluir componentes del routing
- Aprovecha file-based routing de forma efectiva

---

## 📚 Documentación Relacionada

- [Astro Project Structure](https://docs.astro.build/en/basics/project-structure/)
- [Component Colocation Pattern](https://kentcdodds.com/blog/colocation)
- [docs/architecture/project-structure.md](./architecture/project-structure.md)
- [MODULAR-STRUCTURE.md](../MODULAR-STRUCTURE.md)

---

## ✍️ Autor

**Reorganización realizada**: Febrero 17, 2026
**Siguiendo**: Astro Best Practices + Design System Principles
**Patrón**: Component Colocation Pattern
