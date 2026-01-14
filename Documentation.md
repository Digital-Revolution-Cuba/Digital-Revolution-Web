# Documentation: Digital Revolution Web

**Contexto del Proyecto para IAs y Desarrolladores**

Este documento refleja el estado actual del proyecto, su arquitectura y los cambios más recientes. Úsalo para obtener contexto rápido.

---

## 🚀 Quick Context (Tech Stack)

- **Framework**: Astro 5.0 (Static-first, Islands Architecture).
- **UI Library**: React 19 (para islas interactivas).
- **Styling**: Tailwind CSS v4 (configurado via `@theme` y variables CSS).
- **Language**: TypeScript (Strict Mode).
- **Assets**: `astro:assets` (con `sharp`), Iconos `lucide-react`.
- **Package Manager**: pnpm.

---

## 📂 Project Structure (Tree)

Estructura de archivos clave (omitidos archivos de configuración menor):

```text
.github/
├── agents/                 # Agentes personalizados para Copilot (SEO, Content, Component)
├── instructions/           # Reglas por tipo de archivo (.astro, .ts, etc.)
├── prompts/                # Prompts reutilizables (.prompt.md)
└── skills/                 # Skills y templates (layout-helper, seo-optimizer)

public/
├── robots.txt              # Directivas de rastreo (Nuevo)
└── sitemap.xml             # Mapa del sitio (Nuevo)

src/
├── assets/                 # Imágenes optimizadas y SVGs
├── components/             # Componentes UI reutilizables
│   ├── gallery/            # Componentes específicos de galería
│   ├── talents/            # Componentes de búsqueda de talentos (React Islands)
│   └── ResponsiveImage.astro # Componente base para imágenes optimizadas
├── data/                   # Datos estáticos (JSON/TS) para galerías y colaboradores
├── layouts/
│   └── Layout.astro        # Layout principal con SEO Meta Tags y JSON-LD
├── pages/                  # Rutas del sitio (File-based routing)
│   ├── colaboraciones/
│   ├── concursos/
│   ├── galeria/
│   ├── talentos/
│   └── index.astro         # Página de inicio
├── styles/
│   ├── global.css          # Estilos globales y tokens de Tailwind
│   └── glass-card.css      # Efectos visuales específicos
└── utils/                  # Utilidades (animaciones, reproductores, responsive)

astro.config.mjs            # Configuración de Astro
package.json                # Dependencias y scripts
```

---

## 🧠 Arquitectura y Patrones

### 1. Static-First & Islands

- La mayoría de la UI es estática (`.astro`).
- La interactividad compleja (ej. `TalentsSearch`, `TalentsCards`) usa **React** con hidratación parcial (`client:visible`, `client:only`).

### 2. SEO & Metatags (Recent Update)

- **Global**: `Layout.astro` maneja `<title>`, `<meta description>`, Open Graph y Twitter Cards dinámicos vía props.
- **JSON-LD**: Se inyectan esquemas `WebSite` y `Organization` automáticamente en el layout.
- **Páginas**: Cada página (`index`, `colaboraciones`, `talentos`, etc.) define sus propios `title`, `description` e `image`.
- **Archivos**: Se agregaron `robots.txt` y `sitemap.xml` en `public/`.

### 3. Styling

- **Tailwind v4**: Uso intensivo de utilidades.
- **Variables CSS**: Definidas en `global.css` para colores de marca (`--palette-brand-*`).
- **Responsive**: Diseño Mobile-first.

---

## 📝 Cambios Recientes (Changelog Corto)

1. **Optimización SEO Completa**:
    - Agregado soporte para `robots` meta tag en `Layout.astro`.
    - Implementado `JSON-LD` dinámico para datos estructurados.
    - Definidos títulos y descripciones únicos para todas las páginas principales.
    - Creados `sitemap.xml` y `robots.txt`.
2. **Mejoras de Accesibilidad**:
    - Corregidos atributos `alt` en imágenes (uso de descripciones reales o decorativas).
    - Asegurada jerarquía de encabezados (`h1` único por página).
3. **Configuración de IA (.github/)**:
    - Establecidos agentes (`seo`, `content`, `component`) e instrucciones personalizadas para guiar la generación de código.

---

## 🏃‍♂️ Scripts

- `pnpm dev`: Inicia servidor de desarrollo.
- `pnpm build`: Construye el sitio para producción.
- `pnpm preview`: Vista previa del build.
- `pnpm format`: Formatea código con Prettier.
