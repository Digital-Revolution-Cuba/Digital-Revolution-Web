# 📚 Guía Rápida de Imports - Digital Revolution Web

## 🎯 Reglas de Oro

### 1. **Sin extensiones en imports**

```typescript
// ❌ MAL
import Component from "./Component.tsx";
import Component from "./Component.astro";

// ✅ BIEN
import Component from "./Component";
```

### 2. **Sin guiones bajos en nombres**

```typescript
// ❌ MAL
import Component from "./_Component";

// ✅ BIEN
import Component from "./Component";
```

### 3. **Usar rutas relativas correctas según ubicación**

## 📐 Matriz de Profundidad

| Desde                             | Hacia `src/` | Ejemplo                         |
| --------------------------------- | ------------ | ------------------------------- |
| `pages/{feature}/components/`     | `../../../`  | `../../../config/galleryConfig` |
| `pages/components/`               | `../../`     | `../../data/concursosData`      |
| `components/`                     | `../`        | `../types/gallery.types`        |
| `components/features/{feature}/`  | `../../../`  | `../../../types/gallery.types`  |
| `composables/features/{feature}/` | `../../../`  | `../../../config/galleryConfig` |

## 🗺️ Mapa de Imports Comunes

### Desde Pages Features

```typescript
// src/pages/concursos/components/ConcursoCard.astro

// ✅ Config
import { CONCURSOS_CONFIG } from "../../../config/concursosConfig";

// ✅ Types
import type { Concurso } from "../../../types/concursos.types";

// ✅ Utils
import { formatDate } from "../../../utils/concursosUtils";

// ✅ UI Components
import Badge from "../../../components/ui/Badge.astro";
import Button from "../../../components/ui/Button.astro";

// ✅ Composables
import { useConcursosFilter } from "../../../composables/features/useConcursosFilter";
```

### Desde Pages Components (Cross-Feature)

```typescript
// src/pages/components/ConcursosSection.astro

// ✅ Importar de data
import { concursosData } from "../../data/concursosData";

// ✅ Importar componentes de features
import ConcursoCard from "../concursos/components/ConcursoCard.astro";
import ColaboracionCard from "../colaboraciones/components/ColaboracionCard.astro";

// ✅ Importar de shared components
import Header from "../../components/layout/Header.astro";
```

### Desde Shared Components

```typescript
// src/components/DinamycGallery.astro

// ✅ Data (1 nivel arriba)
import { arteGallery } from "../data/arteGallery";

// ✅ Config (1 nivel arriba)
import { GALLERY_CONFIG } from "../config/galleryConfig";

// ✅ Types (1 nivel arriba)
import type { GalleryItem } from "../types/gallery.types";

// ✅ Feature components desde pages
import GalleryItem from "../pages/galeria/components/GalleryItem.astro";
```

### Desde Components Features

```typescript
// src/components/features/gallery/GallerySlider.astro

// ✅ Types (3 niveles arriba)
import type { GalleryItem } from "../../../types/gallery.types";

// ✅ Components desde pages (3 niveles arriba + pages path)
import CategoryButton from "../../../pages/galeria/components/CategoryButton.astro";
```

## 🔄 Casos Especiales

### Importar Assets

```typescript
// Desde cualquier componente
import heroImage from "../../../assets/hero.jpg";
import { Image } from "astro:assets";
```

### Importar Estilos

```typescript
// Desde pages/galeria/components/
import "../../../styles/components/gallery.css";

// Desde components/
import "../styles/components/gallery.css";
```

### Content Collections

```typescript
// Desde cualquier lugar
import { getCollection } from "astro:content";
const concursos = await getCollection("concursos");
```

## 🚨 Errores Comunes y Soluciones

### Error: "Cannot find module"

**Causa**: Profundidad de ruta incorrecta

```typescript
// ❌ MAL (desde pages/galeria/components/)
import { config } from "../../config/galleryConfig"; // Solo 2 niveles

// ✅ BIEN
import { config } from "../../../config/galleryConfig"; // 3 niveles
```

### Error: "Module has no exported member"

**Causa**: Import named vs default export

```typescript
// Si el módulo exporta default
export default function Component() {}

// ✅ Importar así:
import Component from "./Component";

// Si el módulo exporta named
export function useHook() {}
export const CONFIG = {};

// ✅ Importar así:
import { useHook, CONFIG } from "./module";
```

## 📊 Diagrama Visual de Rutas

```
src/
├── pages/
│   ├── galeria/
│   │   └── components/
│   │       └── GalleryGrid.tsx
│   │           │
│   │           ├── ../../../config/         ✅ (3 niveles)
│   │           ├── ../../../types/          ✅ (3 niveles)
│   │           └── ../../../composables/    ✅ (3 niveles)
│   │
│   └── components/
│       └── ConcursosSection.astro
│           │
│           ├── ../../data/                  ✅ (2 niveles)
│           ├── ../../components/ui/         ✅ (2 niveles)
│           └── ../concursos/components/     ✅ (cross-feature)
│
├── components/
│   ├── DinamycGallery.astro
│   │   │
│   │   ├── ../data/                         ✅ (1 nivel)
│   │   ├── ../config/                       ✅ (1 nivel)
│   │   └── ../pages/galeria/components/    ✅ (hacia pages)
│   │
│   └── features/
│       └── gallery/
│           └── GallerySlider.astro
│               │
│               ├── ../../../types/          ✅ (3 niveles)
│               └── ../../../pages/galeria/  ✅ (hacia pages)
│
├── composables/
│   └── features/
│       └── gallery/
│           └── useGalleryModal.ts
│               │
│               └── ../../../types/          ✅ (3 niveles)
│
└── [config, types, utils, data] (root level resources)
```

## ✅ Checklist Rápido

Antes de commitear, verifica:

- [ ] Ningún import incluye extensión (.tsx, .astro, .ts)
- [ ] Ningún import tiene guiones bajos (\_Component)
- [ ] Las rutas relativas coinciden con la profundidad de carpetas
- [ ] Los imports están organizados (external → astro → internal → types → styles)
- [ ] No hay imports circulares
- [ ] `pnpm type-check` pasa sin errores
- [ ] `pnpm build` completa exitosamente

## 🛠️ Comandos de Validación

```bash
# Verificar tipos
pnpm type-check

# Verificar build
pnpm build

# Buscar imports con extensiones (PowerShell)
Get-ChildItem -Recurse -Include *.astro,*.tsx,*.ts | Select-String "from ['\"].*\.(astro|tsx|ts)['\"]"

# Buscar imports con guiones bajos
Get-ChildItem -Recurse -Include *.astro,*.tsx,*.ts | Select-String "from ['\"].*/_"
```

## 📚 Referencias

- [Screaming Architecture Guide](./SCREAMING-ARCHITECTURE.md)
- [Project Structure](./project-structure.md)
- [Coding Standards](../guides/coding-standards.md)

---

**Última actualización**: Febrero 2026  
**Mantenido por**: Digital Revolution Team
