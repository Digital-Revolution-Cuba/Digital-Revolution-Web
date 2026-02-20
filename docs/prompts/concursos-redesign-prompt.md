# Prompt: Rediseño Completo de la Página de Concursos

## 🎯 Objetivo

Rediseñar completamente la página `/concursos` de Digital Revolution Web, manteniendo la identidad visual del proyecto y siguiendo las mejores prácticas de Astro, TypeScript, React, y accesibilidad WCAG 2.1 AA.

---

## 📋 Contexto del Proyecto

### Stack Tecnológico

- **Framework**: Astro 5.16.6 (SSG - Static Site Generation)
- **UI Framework**: React 19.2.3 (Islands Architecture para interactividad)
- **Estilos**: Tailwind CSS 4.1.18 + CSS Variables personalizadas
- **TypeScript**: 5.9.3 (tipado estricto)
- **Gestión de contenido**: Astro Content Collections con esquemas Zod
- **Optimización**: astro-compress, Lightning CSS, Sharp para imágenes
- **Package Manager**: pnpm

### Arquitectura del Proyecto

```
src/
├── components/          # Componentes Astro (.astro) y React (.tsx)
├── composables/         # Lógica reutilizable (hooks/funciones)
├── client/initializers/ # Inicializadores DOM para interactividad
├── content/            # Content Collections (concursos, colaboraciones, etc.)
├── layouts/            # Layouts de página
├── pages/              # Routing basado en archivos
├── styles/             # Estilos globales y componentes CSS
└── types/              # Definiciones TypeScript
```

### Principios de Diseño del Proyecto

**Paleta de Colores (Design Tokens CSS)**:

```css
--palette-background: #001018 /* Fondo oscuro principal */ --palette-brand-navy: #002b38
  /* Contenedores/Cards */ --palette-brand-dark: #011822 /* Elementos secundarios */
  --palette-accent-cyan: #34dfde /* Acento principal (CTAs) */ --palette-accent-purple: #9747ff
  /* Categorías/Badges */ --palette-accent-orange: #f49624 /* Destacados/Warnings */
  --palette-accent-yellow: #ffc943 /* Premios/Éxitos */ --palette-accent-blue: #19ceee
  /* Links/Info */;
```

**Tipografía**:

- **Headings**: Saira Stencil One (futurista/tech)
- **Body**: Rubik (legible, moderna)
- **UI Elements**: Barlow Semi Condensed (compacta, eficiente)

**Efectos Visuales**:

- Glass-morphism con `backdrop-filter: blur(10px)`
- Gradientes sutiles con opacidades controladas
- Animaciones CSS suaves (transformaciones, fade-ins)
- Hover states con elevación y glow effects

---

## 🎨 Requisitos de Diseño

### 1. Hero Section

**Objetivo**: Capturar atención inmediata y comunicar valor.

**Elementos requeridos**:

- Badge/etiqueta superior ("Concursos Creativos" con icono)
- Título impactante con palabra destacada en gradiente
- Descripción breve (2 líneas máx)
- Estadísticas en tiempo real:
  - Número de concursos activos
  - Total de participantes
  - Monto total en premios
- Elementos decorativos (círculos/formas geométricas animadas)

**Consideraciones**:

- Altura: ~70vh en desktop, adaptable en mobile
- Animaciones de entrada (fade-in, slide-up)
- Fondo con gradiente sutil desde `--palette-background`

### 2. Sistema de Filtrado y Búsqueda

**Funcionalidad requerida**:

- Filtro por categorías (fotografia, música, arte-digital, ilustración, diseño-gráfico, video, escritura)
- Filtro por estado (activo, próximo, finalizado, cerrado)
- Búsqueda por texto (título, descripción, tags)
- Indicador visual de filtros activos
- Botón "Limpiar filtros"

**Implementación**:

- Componente React interactivo (`ConcursosFilters.tsx`)
- Estado gestionado con nanostores o React state
- Animaciones de transición entre estados filtrados
- Diseño sticky en scroll (desktop)

**Accesibilidad**:

- Roles ARIA apropiados (`role="search"`, `role="group"`)
- Labels descriptivos para lectores de pantalla
- Navegación por teclado completa (Tab, Enter, Escape)
- Anuncios de cambios con `aria-live="polite"`

### 3. Grid de Concursos

**Diseño responsive**:

- Desktop (≥1024px): 3 columnas
- Tablet (768px-1023px): 2 columnas
- Mobile (<768px): 1 columna

**Características de las tarjetas**:

- Imagen destacada con lazy loading y aspect ratio 16:9
- Badge de categoría con color temático
- Badge de estado (activo, próximo, finalizado, cerrado)
- Indicador de "Destacado" para concursos featured
- Título del concurso (max 2 líneas con ellipsis)
- Fecha de cierre formateada (es-ES)
- Contador de participantes actuales vs. máximo
- Indicador visual de premios (ícono + monto)
- CTA "Ver detalles" con ícono de flecha

**Efectos interactivos**:

- Hover: elevación con `transform: translateY(-8px)`
- Hover: glow effect con `box-shadow`
- Transición suave de 300ms con `ease-out`
- Imagen con zoom sutil en hover (scale 1.05)

### 4. Estado Vacío y Carga

**Estados a considerar**:

- Loading: Skeleton loaders con animación shimmer
- Sin resultados: Mensaje amigable con ilustración/icono
- Error: Mensaje de error con opción de reintentar

### 5. Sección CTA (Call-to-Action)

**Ubicación**: Después del grid, antes del footer

**Contenido**:

- Título: "¿Tienes una idea para un concurso?"
- Descripción breve sobre cómo proponer concursos
- Botón primario "Proponer Concurso"
- Link secundario "Conoce más sobre nuestros concursos"

---

## 📐 Estructura de Archivos a Crear/Modificar

### Componentes Astro

```astro
// src/pages/concursos/index.astro import {getCollection} from 'astro:content'; import Layout from
'../../layouts/Layout.astro'; import ConcursosHero from
'../../components/concursos/ConcursosHero.astro'; import ConcursosFiltersIsland from
'../../components/concursos/ConcursosFiltersIsland.astro'; import ConcursosCTA from
'../../components/concursos/ConcursosCTA.astro'; const allConcursos = await
getCollection('concursos'); // Calcular estadísticas const concursosActivos = allConcursos.filter(c
=> c.data.status === 'activo' || c.data.status === 'proximo' ); const totalParticipantes =
allConcursos.reduce( (sum, c) => sum + (c.data.currentParticipants || 0), 0 ); const totalPremios =
allConcursos.reduce( (sum, c) => sum + calcularValorPremios(c.data.premios), 0 );

<Layout
  title="Concursos Creativos — Digital Revolution"
  description="Participa en concursos de fotografía, música, arte digital y más. Muestra tu talento y gana increíbles premios."
>
  <ConcursosHero
    activeCount={concursosActivos.length}
    totalParticipants={totalParticipantes}
    totalPrizes={totalPremios}
  />

  <ConcursosFiltersIsland concursos={allConcursos} client:load />

  <ConcursosCTA />
</Layout>
```

### Componentes React (Islands)

```typescript
// src/components/concursos/ConcursosFiltersIsland.tsx
import React, { useState, useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';
import ConcursoCardModern from './ConcursoCardModern';
import SearchBar from '../ui/SearchBar';
import FilterButtons from '../ui/FilterButtons';

interface Props {
  concursos: CollectionEntry<'concursos'>[];
}

export default function ConcursosFiltersIsland({ concursos }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredConcursos = useMemo(() => {
    return concursos.filter(concurso => {
      // Implementar lógica de filtrado
      const matchesSearch = /* ... */;
      const matchesCategory = /* ... */;
      const matchesStatus = /* ... */;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [concursos, searchQuery, selectedCategory, selectedStatus]);

  return (
    <section className="concursos-filters-section">
      <div className="container">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar concursos..."
          aria-label="Buscar concursos por título o descripción"
        />

        <FilterButtons
          categories={CATEGORIES}
          statuses={STATUSES}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
        />

        <div
          className="concursos-grid"
          role="region"
          aria-live="polite"
          aria-label="Resultados de concursos"
        >
          {filteredConcursos.length > 0 ? (
            filteredConcursos.map(concurso => (
              <ConcursoCardModern
                key={concurso.id}
                {...concurso.data}
                slug={concurso.slug}
              />
            ))
          ) : (
            <EmptyState query={searchQuery} />
          )}
        </div>
      </div>
    </section>
  );
}
```

### Componentes UI Reutilizables

```typescript
// src/components/ui/SearchBar.tsx
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  'aria-label': string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  'aria-label': ariaLabel
}: SearchBarProps) {
  return (
    <div className="search-bar" role="search">
      <label htmlFor="concursos-search" className="sr-only">
        {ariaLabel}
      </label>
      <input
        id="concursos-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label={ariaLabel}
      />
      {/* Icon SVG */}
    </div>
  );
}
```

---

## 🎯 Mejores Prácticas a Seguir

### Astro Content Collections

✅ **DO**:

```typescript
// Usar getCollection en componentes Astro
const concursos = await getCollection('concursos');

// Filtrar en build time cuando sea posible
const activos = await getCollection('concursos', ({ data }) =>
  data.status === 'activo'
);

// Pasar datos completos a islands React
<ConcursosFiltersIsland concursos={allConcursos} client:load />
```

❌ **DON'T**:

```typescript
// No hacer fetch en runtime para contenido estático
// No llamar getCollection dentro de React components
// No duplicar datos entre Astro y React innecesariamente
```

### React Islands (Interactividad)

✅ **DO**:

```typescript
// Usar client:load para contenido above-the-fold interactivo
<ConcursosFiltersIsland client:load />

// Usar client:visible para contenido below-the-fold
<ConcursosCTA client:visible />

// Usar client:idle para widgets no críticos
<NewsletterSubscribe client:idle />

// Exportar tipos para reusabilidad
export type { ConcursoCardProps };
```

❌ **DON'T**:

```typescript
// No usar client:only (rompe SSG)
// No hidratar todo (usar Astro components cuando sea posible)
// No olvidar memoization (useMemo, useCallback)
```

### TypeScript

✅ **DO**:

```typescript
// Usar tipos de Astro Content Collections
import type { CollectionEntry } from "astro:content";

type Concurso = CollectionEntry<"concursos">;

// Interfaces explícitas para Props
interface ConcursoCardProps {
  title: string;
  category: ConcursoCategory;
  status: ConcursoStatus;
  // ...
}

// Tipos estrictos para enums
type ConcursoStatus = "activo" | "proximo" | "finalizado" | "cerrado";
```

❌ **DON'T**:

```typescript
// No usar 'any'
// No ignorar errores de tipo con @ts-ignore sin justificación
// No duplicar definiciones de tipos
```

### Estilos

✅ **DO**:

```css
/* Usar CSS Variables del proyecto */
.concurso-card {
  background: rgba(var(--palette-brand-navy-rgb), 0.4);
  border: 1px solid rgba(var(--palette-accent-cyan-rgb), 0.1);
  backdrop-filter: blur(10px);
}

/* Usar Tailwind con @apply en componentes */
.search-bar {
  @apply flex items-center gap-2 rounded-lg px-4 py-3;
}

/* Animaciones CSS modulares */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

❌ **DON'T**:

```css
/* No hardcodear colores hex directamente */
background: #34dfde; /* ❌ */

/* No usar !important excesivamente */
/* No mezclar px y rem inconsistentemente */
```

### Accesibilidad (WCAG 2.1 AA)

✅ **DO**:

```astro
<!-- Estructura semántica -->
<main id="main-content">
  <section aria-labelledby="concursos-heading">
    <h1 id="concursos-heading">Concursos Creativos</h1>

    <!-- Skip links -->
    <a href="#concursos-grid" class="sr-only focus:not-sr-only"> Ir al listado de concursos </a>

    <!-- ARIA en elementos interactivos -->
    <button aria-label="Filtrar por categoría Fotografía" aria-pressed={selected}>
      Fotografía
    </button>

    <!-- Live regions para cambios dinámicos -->
    <div aria-live="polite" aria-atomic="true">
      Mostrando {count} concursos
    </div>
  </section>
</main>
```

❌ **DON'T**:

```html
<!-- No usar divs clickeables sin roles -->
<div onclick="...">Click me</div>
<!-- ❌ -->

<!-- No olvidar alt text en imágenes -->
<img src="..." />
<!-- ❌ -->

<!-- No usar color como único indicador -->
```

### Performance

✅ **DO**:

```astro
---
import { Image } from "astro:assets";
import concursoImage from "../assets/concurso.jpg";
---

<!-- Imágenes optimizadas automáticamente -->
<Image
  src={concursoImage}
  alt="Concurso de Fotografía Urbana 2026"
  loading="lazy"
  widths={[320, 640, 960, 1280]}
  sizes="(max-width: 768px) 100vw, 33vw"
  format="avif"
/>

<!-- Code splitting automático con islands -->
<ConcursosFilters client:load />
```

❌ **DON'T**:

```html
<!-- No cargar imágenes grandes sin optimizar -->
<img src="/images/huge-image.jpg" />
<!-- ❌ -->

<!-- No hidratar todo con client:only -->
```

---

## 📊 Criterios de Éxito

### Funcionales

- [x] Filtrado por categoría funciona correctamente
- [x] Filtrado por estado funciona correctamente
- [x] Búsqueda por texto busca en título, descripción y tags
- [x] Estadísticas calculadas dinámicamente
- [x] Links a páginas de detalle funcionan
- [x] Estados vacíos y de error manejados

### Diseño

- [x] Hero section impactante y clara
- [x] Grid responsive en 3/2/1 columnas
- [x] Tarjetas con hover effects suaves
- [x] Paleta de colores del proyecto respetada
- [x] Tipografía consistente con el proyecto
- [x] Animaciones sutiles y performantes

### Accesibilidad

- [x] Lighthouse Accessibility Score ≥ 90
- [x] Navegación completa por teclado
- [x] Lectores de pantalla funcionan correctamente
- [x] Contraste de color ≥ 4.5:1 en textos
- [x] Focus states visibles en todos los elementos interactivos
- [x] Estructura semántica HTML5

### Performance

- [x] Lighthouse Performance Score ≥ 90
- [x] First Contentful Paint < 1.5s
- [x] Largest Contentful Paint < 2.5s
- [x] Cumulative Layout Shift < 0.1
- [x] Imágenes optimizadas (AVIF/WebP)
- [x] JavaScript bundle < 50KB (gzipped)

### SEO

- [x] Meta tags correctos (title, description, OG)
- [x] Estructura de headings jerárquica (h1 → h2 → h3)
- [x] URLs semánticas (/concursos/slug-descriptivo)
- [x] Schema.org markup para eventos/concursos
- [x] Sitemap actualizado automáticamente

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local
pnpm dev

# Validación completa
pnpm validate  # format:check + type-check + astro check

# Build de producción
pnpm build

# Preview del build
pnpm preview

# Type-checking sin errores
pnpm type-check
```

---

## 📚 Referencias

- **Documentación del Proyecto**: `/docs/*`
- **Guía de Estilos**: `/docs/guides/coding-standards.md`
- **Estructura del Proyecto**: `/docs/architecture/project-structure.md`
- **Content Collections**: `/docs/dev/content-collections.md`
- **Implementación Actual**: `/docs/CONCURSOS-IMPLEMENTATION.md`
- **Accesibilidad**: `/.github/instructions/accessibility.instructions.md`
- **Astro Docs**: https://docs.astro.build
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/

---

## 🎨 Inspiración de Diseño

**Referencias visuales para el rediseño**:

- Dribbble: "dark theme competition cards"
- Awwwards: Páginas de eventos y concursos
- Behance: "contest platform UI"

**Elementos clave a incorporar**:

- Minimalismo con detalles sofisticados
- Jerarquía visual clara (featured > activo > próximo > finalizado)
- Microinteracciones que deleitan
- Información densa pero organizada
- Sensación de comunidad y energía creativa

---

## ✅ Checklist Final

Antes de considerar completado el rediseño:

### Código

- [ ] Todos los tipos TypeScript definidos sin `any`
- [ ] Componentes documentados con comentarios JSDoc
- [ ] Código formateado con Prettier (`pnpm format`)
- [ ] Sin errores de type-check (`pnpm type-check`)
- [ ] Sin warnings de Astro check (`pnpm check`)

### Funcionalidad

- [ ] Filtros funcionan en combinación (categoría + estado + búsqueda)
- [ ] Transiciones suaves entre estados filtrados
- [ ] Carga inicial optimizada (< 2s en 3G)
- [ ] Estados edge cases manejados (0 resultados, error de red, etc.)

### Diseño

- [ ] Responsive en todos los breakpoints (320px - 2560px)
- [ ] Hover states en todos los elementos interactivos
- [ ] Loading states con skeletons o spinners
- [ ] Consistencia visual con el resto del sitio

### Accesibilidad

- [ ] Navegación completa con Tab/Shift+Tab
- [ ] Enter/Space activan botones
- [ ] Escape cierra modales/dropdowns
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Contraste verificado con herramientas (axe DevTools)

### Performance

- [ ] Imágenes lazy loading
- [ ] JavaScript code splitting
- [ ] CSS crítico inline (automático con Astro)
- [ ] Lighthouse CI passing (>90 en todas las métricas)

### SEO

- [ ] Meta description única (<160 caracteres)
- [ ] Open Graph images optimizadas (1200x630)
- [ ] JSON-LD structured data para Event schema
- [ ] Canonical URLs configuradas

---

## 🚀 Entregables

1. **Código fuente completo** en la rama correspondiente
2. **Documentación actualizada** en `/docs/CONCURSOS-IMPLEMENTATION.md`
3. **Screenshots** del resultado final (desktop, tablet, mobile)
4. **Lighthouse reports** (Performance, Accessibility, Best Practices, SEO)
5. **Demo video** mostrando interacciones clave (30-60s)

---

**Nota importante**: Este prompt está diseñado para ser usado por desarrolladores familiarizados con el stack. Para dudas sobre patrones específicos del proyecto, consultar la documentación en `/docs/` o revisar implementaciones existentes en `/src/components/` y `/src/pages/`.
