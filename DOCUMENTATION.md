# 📖 Digital Revolution Web — Documentación Completa

> **Versión:** 0.0.1  
> **Última actualización:** 2026-01-15  
> **Estado:** 🟢 Producción (Landing Page)

---

## Tabla de Contenidos

1. [Quick Start](#-quick-start-10-minutos)
2. [Visión General del Proyecto](#-visión-general-del-proyecto)
3. [Arquitectura](#-arquitectura)
4. [Stack Tecnológico](#-stack-tecnológico)
5. [Estructura del Proyecto](#-estructura-del-proyecto)
6. [Guía de Desarrollo](#-guía-de-desarrollo)
7. [Componentes](#-componentes)
8. [Sistema de Datos](#-sistema-de-datos)
9. [Estilos y Design System](#-estilos-y-design-system)
10. [CI/CD y Deploy](#-cicd-y-deploy)
11. [Testing](#-testing)
12. [API Reference](#-api-reference)
13. [Roadmap a Backend](#-roadmap-a-backend)
14. [Troubleshooting](#-troubleshooting)
15. [Referencias](#-referencias)

---

## 🚀 Quick Start (<10 minutos)

### Prerrequisitos

| Herramienta | Versión Mínima | Verificar       |
| ----------- | -------------- | --------------- |
| Node.js     | 20.x           | `node -v`       |
| pnpm        | 10.x           | `pnpm -v`       |
| Git         | 2.x            | `git --version` |

### Instalación Rápida

```bash
# 1. Clonar repositorio
git clone https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web.git
cd Digital-Revolution-Web

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm dev
```

### Scripts Disponibles

| Comando             | Descripción                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Servidor de desarrollo en `http://localhost:4321` |
| `pnpm build`        | Genera sitio estático en `/dist`                  |
| `pnpm preview`      | Preview del build de producción                   |
| `pnpm format`       | Formatea código con Prettier                      |
| `pnpm format:check` | Verifica formato sin modificar                    |

### Verificación de Instalación

```bash
# Ejecutar build para verificar que todo funciona
pnpm build

# Salida esperada:
# ✓ Completed in X.XXs
# [build] 7 page(s) built in X.XXs
# [build] Complete!
```

---

## 🎯 Visión General del Proyecto

### ¿Qué es Digital Revolution Web?

Plataforma web de la comunidad **Revolución Digital Cuba** que conecta y muestra talentos en:

- 🎨 **Arte y Diseño**
- 🎵 **Música**
- 💻 **Desarrollo y Game Dev**
- ✍️ **Escritura**
- 📸 **Fotografía**

### Objetivos Técnicos

- **Performance:** Core Web Vitals optimizados (LCP < 2.5s, CLS < 0.1)
- **Accesibilidad:** WCAG 2.2 AA compliance
- **SEO:** Meta tags OpenGraph + Twitter Cards
- **Escalabilidad:** Arquitectura preparada para headless CMS (WordPress)

### URLs del Proyecto

| Ambiente   | URL                                          |
| ---------- | -------------------------------------------- |
| Producción | `https://digital-revolution-web.vercel.app/` |
| Preview    | Generada por PR                              |
| Local      | `http://localhost:4321`                      |

---

## 🏗 Arquitectura

### Diagrama ASCII de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DIGITAL REVOLUTION WEB                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐  │
│  │   BROWSER   │◄──►│   ASTRO     │◄──►│     STATIC FILES       │  │
│  │   (Client)  │    │   (SSG)     │    │       (/dist)          │  │
│  └─────────────┘    └──────┬──────┘    └─────────────────────────┘  │
│                            │                                         │
│           ┌────────────────┼────────────────┐                       │
│           ▼                ▼                ▼                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐     │
│  │    REACT    │  │   ASTRO     │  │      TAILWIND CSS       │     │
│  │   Islands   │  │ Components  │  │       v4 + Vite         │     │
│  │  (Interac.) │  │  (Static)   │  │                         │     │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘     │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                          DATA LAYER                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐     │
│  │   /data/    │  │  /config/   │  │     /composables/       │     │
│  │  (Static)   │  │ (Settings)  │  │   (Business Logic)      │     │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘     │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                       FUTURE: BACKEND INTEGRATION                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐     │
│  │  WordPress  │  │   REST API  │  │       Database          │     │
│  │  (Headless) │  │   GraphQL   │  │      (PostgreSQL)       │     │
│  │   TODO      │  │    TODO     │  │         TODO            │     │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

                              DEPLOY FLOW
┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐
│   GitHub    │───►│   Actions   │───►│     Vercel/Netlify      │
│    Push     │    │   CI/CD     │    │       (CDN Edge)        │
└─────────────┘    └─────────────┘    └─────────────────────────┘
```

### Patrones de Arquitectura

| Patrón                     | Implementación                              |
| -------------------------- | ------------------------------------------- |
| **Islands Architecture**   | Astro + React para componentes interactivos |
| **Static Site Generation** | Build-time rendering                        |
| **Component Composition**  | Componentes Astro reutilizables             |
| **Separation of Concerns** | Data / Logic / Presentation separados       |

---

## 🛠 Stack Tecnológico

### Core

| Tecnología                                | Versión | Propósito                |
| ----------------------------------------- | ------- | ------------------------ |
| [Astro](https://astro.build/)             | 5.16.6  | Framework SSG            |
| [React](https://react.dev/)               | 19.2.3  | Componentes interactivos |
| [TypeScript](https://typescriptlang.org/) | 5.x     | Tipado estático          |
| [Tailwind CSS](https://tailwindcss.com/)  | 4.1.18  | Utility-first CSS        |

### Dependencias de Producción

```json
{
  "@astrojs/react": "^4.4.2", // Integración Astro-React
  "@tailwindcss/vite": "^4.1.18", // Plugin Vite para Tailwind
  "lightningcss": "^1.30.2", // CSS compiler ultra-rápido
  "lucide-react": "^0.562.0", // Iconos SVG
  "react-responsive-masonry": "^2.7.1", // Grid masonry
  "react-measure": "^2.5.2", // Medición de componentes
  "sharp": "^0.34.5" // Procesamiento de imágenes
}
```

### Dependencias de Desarrollo

```json
{
  "prettier": "^3.7.4",
  "prettier-plugin-astro": "^0.14.1",
  "prettier-plugin-tailwindcss": "^0.6.14"
}
```

---

## 📁 Estructura del Proyecto

```
Digital-Revolution-Web/
├── .github/
│   └── workflows/
│       ├── build.yml          # CI: Build verification
│       ├── quality.yml        # CI: Prettier check
│       └── security.yml       # CI: pnpm audit
├── src/
│   ├── assets/                # Imágenes y recursos estáticos
│   ├── components/            # Componentes UI
│   │   ├── gallery/           # Componentes de galería
│   │   └── talents/           # Componentes de talentos
│   ├── composables/           # Lógica de negocio reutilizable
│   ├── config/                # Configuración centralizada
│   ├── data/                  # Datos estáticos y tipos
│   ├── layouts/               # Layouts de página
│   ├── pages/                 # Rutas (file-based routing)
│   ├── styles/                # CSS global y componentes
│   └── utils/                 # Utilidades JavaScript
├── dist/                      # Build output (gitignored)
├── astro.config.mjs           # Configuración de Astro
├── tsconfig.json              # Configuración TypeScript
├── package.json               # Dependencias y scripts
└── pnpm-lock.yaml             # Lock file
```

### Páginas Disponibles

| Ruta              | Archivo                                | Descripción             |
| ----------------- | -------------------------------------- | ----------------------- |
| `/`               | `src/pages/index.astro`                | Home con Hero + Footer  |
| `/concursos`      | `src/pages/concursos/index.astro`      | Listado de concursos    |
| `/galeria`        | `src/pages/galeria/index.astro`        | Galería de trabajos     |
| `/perfiles`       | `src/pages/perfiles/index.astro`       | Perfiles de talentos    |
| `/talentos`       | `src/pages/talentos/index.astro`       | Búsqueda de talentos    |
| `/colaboraciones` | `src/pages/colaboraciones/index.astro` | Proyectos colaborativos |

---

## 💻 Guía de Desarrollo

### Configuración del Editor (VS Code)

Extensiones recomendadas:

- **Astro** (astro-build.astro-vscode)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **Prettier** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)

### Flujo de Trabajo

```bash
# 1. Crear rama feature
git checkout -b feat/nueva-funcionalidad

# 2. Desarrollar con hot-reload
pnpm dev

# 3. Verificar formato antes de commit
pnpm format:check

# 4. Formatear si es necesario
pnpm format

# 5. Verificar build
pnpm build

# 6. Commit con Conventional Commits
git commit -m "feat(gallery): add new masonry grid"

# 7. Push y crear PR
git push origin feat/nueva-funcionalidad
```

### Convenciones de Código

**Nombres de archivos:**

- Componentes Astro: `PascalCase.astro`
- Componentes React: `PascalCase.tsx`
- Utilidades: `camelCase.ts`
- Datos: `camelCase.ts`

**Estructura de componente Astro:**

```astro
---
// 1. Imports
import SomeComponent from './SomeComponent.astro';

// 2. Props interface
interface Props {
  title: string;
  count?: number;
}

// 3. Destructure props
const { title, count = 0 } = Astro.props;

// 4. Logic
const items = await fetchData();
---

<!-- 5. Template -->
<div class="container">
  <h1>{title}</h1>
</div>

<!-- 6. Styles (si son específicos) -->
<style>
  .container {
    /* ... */
  }
</style>
```

---

## 🧩 Componentes

### Componentes Principales

| Componente         | Tipo         | Descripción                    |
| ------------------ | ------------ | ------------------------------ |
| `Layout.astro`     | Layout       | Wrapper con meta tags SEO      |
| `Header.astro`     | Static       | Navegación responsive          |
| `Hero.astro`       | Static       | Sección hero de landing        |
| `Footer.astro`     | Static       | Footer con redes sociales      |
| `GalleryGrid.tsx`  | React Island | Galería masonry interactiva    |
| `TalentsCards.tsx` | React Island | Cards de talentos con búsqueda |

### Componentes de Galería

```
src/components/gallery/
├── CategoryButton.astro    # Botón de categoría
├── FotografiaCard.astro    # Card de fotografía
├── GalleryGrid.tsx         # Grid masonry (React)
├── GalleryHero.tsx         # Hero de galería (React)
├── GalleryItem.astro       # Item genérico
├── InputSearchGallery.tsx  # Buscador (React)
├── MusicCard.astro         # Card con reproductor
└── NavigationButton.astro  # Navegación prev/next
```

### Props de Componentes Clave

**Layout.astro:**

```typescript
interface Props {
  title?: string; // Default: 'Digital Revolution Web | Comunidad de Talentos'
  description?: string; // Meta description
  image?: string; // OG image
}
```

**GalleryGrid.tsx:**

```typescript
interface Gallery {
  images: {
    download_url: string;
    author: string;
  }[];
}
```

---

## 📊 Sistema de Datos

### Tipos Base

```typescript
// src/data/types.ts

export interface BaseGalleryItem {
  type: string;
  image: string;
  title: string;
}

export interface ArteGalleryItem extends BaseGalleryItem {
  type: 'arte';
  artistName: string;
  artistRole: string;
}

export interface MusicGalleryItem extends BaseGalleryItem {
  type: 'musica';
  artist: string;
  duration: string;
}

export interface FotografiaGalleryItem extends BaseGalleryItem {
  type: 'fotografia';
  photographer?: string;
  date?: string;
}

export type GalleryItem =
  | ArteGalleryItem
  | MusicGalleryItem
  | FotografiaGalleryItem;
export type CategoryType = 'arte' | 'musica' | 'fotografia';
```

### Archivos de Datos

| Archivo                 | Contenido                   |
| ----------------------- | --------------------------- |
| `arteGallery.ts`        | Items de arte/ilustración   |
| `musicaGallery.ts`      | Items de música             |
| `fotografiaGallery.ts`  | Items de fotografía         |
| `gallery.ts`            | Datos combinados de galería |
| `talents.ts`            | Perfiles de talentos        |
| `concursosData.ts`      | Información de concursos    |
| `colaboracionesData.ts` | Proyectos colaborativos     |

### Configuración de Galería

```typescript
// src/config/galleryConfig.ts

export const GALLERY_CONFIG = {
  ITEM_WIDTH: 285,
  ITEM_HEIGHT: 440,
  VISIBLE_IMAGES: 4,
  IMAGES_PER_PAGE: 4,
  CONTAINER_WIDTH: 1140,

  // Animation timings (ms)
  CARD_TRANSITION_DURATION: 100,
  FLIP_SWAP_DURATION: 70,
  CATEGORY_SWITCH_DELAY: 160,
  SHINE_EFFECT_DURATION: 700,
} as const;
```

---

## 🎨 Estilos y Design System

### Arquitectura CSS

```
src/styles/
├── global.css                    # Estilos base + Tailwind
├── animations.css                # Animaciones keyframes
├── glass-card.css               # Efecto glassmorphism
└── components/
    ├── adaptive-gallery.css     # Galería responsive
    ├── fluid-typography.css     # Tipografía fluida (clamp)
    ├── gallery.css              # Estilos de galería
    ├── responsive-card.css      # Cards adaptativas
    └── talents.css              # Estilos de talentos
```

### Sistema de Tipografía Fluida

```css
/* Escalado automático 320px → 1920px */
.heading-display {
  font-size: clamp(3rem, 5vw + 1rem, 8rem);
}
.heading-xl {
  font-size: clamp(2.25rem, 4vw + 0.5rem, 6rem);
}
.heading-lg {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 4rem);
}
```

### Colores del Brand

```css
/* TODO: Documentar paleta de colores en CSS variables */
--brand-dark: /* ... */ --brand-navy: /* ... */ --accent-cyan: /* ... */
  --accent-orange: /* ... */ --text-primary: /* ... */
  --text-secondary: /* ... */;
```

---

## 🚢 CI/CD y Deploy

### GitHub Actions Workflows

#### Build Verification (`.github/workflows/build.yml`)

```yaml
# Triggers: push/PR a main
# Steps:
# 1. Checkout
# 2. Setup pnpm 10 + Node 20
# 3. pnpm install --frozen-lockfile
# 4. pnpm build
```

**Ejecutar localmente:**

```bash
pnpm build
```

#### Code Quality (`.github/workflows/quality.yml`)

```yaml
# Verifica formato con Prettier
pnpm format:check
```

#### Security Audit (`.github/workflows/security.yml`)

```yaml
# Audita dependencias de producción
pnpm audit --prod
```

### Deploy a Producción

**Plataforma:** Vercel (auto-deploy desde `main`)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  git push   │────►│  GitHub     │────►│   Vercel    │
│   main      │     │  Actions    │     │   Deploy    │
└─────────────┘     └─────────────┘     └─────────────┘
```

**URL de producción:** `https://digital-revolution-web.vercel.app/`

### Deploy Manual

```bash
# 1. Build local
pnpm build

# 2. Preview antes de deploy
pnpm preview

# 3. El contenido de /dist está listo para cualquier CDN estático
```

---

## 🧪 Testing

### Testing Manual Responsive

Ejecutar en DevTools del navegador:

```javascript
// Cargar herramientas de testing
window.responsiveTests;

// Ejecutar todos los tests
window.responsiveTests.runAllTests();

// Tests específicos
window.responsiveTests.testContainerQueries();
window.responsiveTests.auditTouchTargets();
window.responsiveTests.getWebVitals();

// Simular dispositivo
window.responsiveTests.simulateDevice('iPhone 14');
```

### Checklist de Testing

#### Mobile (320px - 640px)

- [ ] Header muestra menú hamburguesa
- [ ] Touch targets ≥ 48px
- [ ] Sin scroll horizontal

#### Tablet (641px - 1023px)

- [ ] Logo con texto visible
- [ ] Cards en 2 columnas

#### Desktop (1024px+)

- [ ] Navegación completa visible
- [ ] Hover effects funcionan

#### Accesibilidad

- [ ] Navegación con teclado
- [ ] Contraste ≥ 4.5:1
- [ ] ARIA labels correctos

### TODO: Testing Automatizado

```bash
# TODO: Implementar Vitest para unit tests
# TODO: Implementar Playwright para E2E tests
# TODO: Configurar coverage reports
```

---

## 📡 API Reference

### Estado Actual

Actualmente el proyecto usa **datos estáticos** definidos en `/src/data/`.

### TODO: API REST/GraphQL

```yaml
# TODO: Crear archivo openapi.yaml
# TODO: Definir endpoints para:
#   - GET /api/talentos
#   - GET /api/galeria
#   - GET /api/concursos
#   - GET /api/colaboraciones
```

### Integración WordPress Headless (Futuro)

```typescript
// TODO: Implementar fetching de WordPress
// src/lib/wordpress.ts

export async function getGalleryItems() {
  const response = await fetch(`${WP_API_URL}/wp-json/wp/v2/gallery`);
  return response.json();
}
```

---

## 🛣 Roadmap a Backend

### Fase 1: Landing Page (✅ Actual)

- [x] Sitio estático con Astro
- [x] Componentes React interactivos
- [x] CI/CD con GitHub Actions
- [x] Deploy en Vercel

### Fase 2: Headless CMS

- [ ] Integrar WordPress como CMS
- [ ] Configurar regeneración ISR/SSR
- [ ] Crear custom post types

### Fase 3: API Propia

- [ ] Diseñar esquema de base de datos
- [ ] Implementar API REST/GraphQL
- [ ] Autenticación de usuarios

### Fase 4: Features Avanzados

- [ ] Sistema de perfiles de usuario
- [ ] Upload de contenido
- [ ] Sistema de votación
- [ ] Notificaciones

---

## 🔧 Troubleshooting

### Problemas Comunes

#### Puerto 4321 ocupado

```bash
# El servidor automáticamente usa el siguiente puerto disponible
# O mata el proceso manualmente:
lsof -i :4321
kill -9 <PID>
```

#### Error de dependencias

```bash
# Limpiar e instalar de nuevo
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Build falla con imágenes

```bash
# Verificar que sharp está instalado correctamente
pnpm rebuild sharp
```

#### TypeScript errors

```bash
# Regenerar tipos de Astro
pnpm astro sync
```

---

## 📚 Referencias

### Documentación Oficial

- [Astro Docs](https://docs.astro.build/)
- [React Docs](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

### Guías del Proyecto

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios
- [TESTING.md](./TESTING.md) - Guía de testing
- [REFACTORING.md](./REFACTORING.md) - Historial de refactoring
- [IMPLEMENTACION.md](./IMPLEMENTACION.md) - Detalles de implementación

### Recursos Externos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

---

## ⚠️ TODOs Pendientes

### Documentación

```markdown
<!-- TODO: Añadir archivo .env.example con variables de entorno -->
<!-- TODO: Crear openapi.yaml para documentar API futura -->
<!-- TODO: Documentar paleta de colores CSS variables -->
<!-- TODO: Añadir ADRs (Architecture Decision Records) -->
```

### Configuración

```markdown
<!-- TODO: Configurar Vitest para unit testing -->
<!-- TODO: Configurar Playwright para E2E testing -->
<!-- TODO: Añadir ESLint configuration -->
<!-- TODO: Configurar Husky para pre-commit hooks -->
```

### Integraciones

```markdown
<!-- TODO: Integrar WordPress headless CMS -->
<!-- TODO: Configurar Sentry para error tracking -->
<!-- TODO: Añadir analytics (Plausible/Umami) -->
```

---

## 🔒 Seguridad

### Prácticas Actuales

- ✅ Dependencias auditadas con `pnpm audit` en CI
- ✅ No se exponen secretos en el repositorio
- ✅ Build estático (sin servidor runtime)

### TODO: Mejoras de Seguridad

```markdown
<!-- TODO: Implementar Content Security Policy -->
<!-- TODO: Añadir rate limiting cuando haya API -->
<!-- TODO: Configurar CORS para API endpoints -->
```

---

_Documentación generada el 2026-01-15. Para reportar errores o sugerir mejoras, abrir un Issue en GitHub._
