# Clip Shapes: Guía Completa

Documentación de todos los clip-paths utilizados en Digital Revolution Web.

## 📋 Tabla de Contenidos

1. [Clases de Clip-Path Disponibles](#clases-disponibles)
2. [Sistema de Custom Properties](#custom-properties)
3. [Uso Básico](#uso-básico)
4. [Mejores Prácticas](#mejores-prácticas)
5. [Troubleshooting](#troubleshooting)
6. [Herramientas Útiles](#herramientas)

## Clases Disponibles

### 1. Paralelogramos (Figma Design System)

```css
/* Definidos en src/styles/global.css */

.clip-path-parallelogram-left-corner
.clip-path-parallelogram-center-top
.clip-path-parallelogram-center-bottom
.clip-path-parallelogram-right-bottom
```

**Uso:**
```html
<div class="clip-path-parallelogram-left-corner">
  <img src="..." alt="..." />
</div>
```

**Características:**
- ✅ Responsive (ajustan automáticamente en mobile)
- ✅ Anti-aliasing optimizado
- ✅ GPU-accelerated rendering

### 2. Rombo Simple

```css
.rounded-rhombus-left {
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
}
```

**Uso:**
```html
<div class="rounded-rhombus-left">
  <img src="..." alt="..." />
</div>
```

**Coordenadas del polígono:**
- `25% 0%` — top-left (cortado)
- `100% 0%` — top-right (completo)
- `75% 100%` — bottom-right (cortado)
- `0% 100%` — bottom-left (completo)

## Custom Properties

### Sistema de Ángulos Coherente (✅ IMPLEMENTADO)

Para mantener consistencia visual entre componentes, usamos un sistema centralizado de custom properties en `global.css`:

```css
:root {
  /* === Desktop (>1024px) - Aggressive diagonals === */
  --clip-angle-dark-end: 88%;      /* 12% diagonal */
  --clip-angle-cyan-mid: 70%;      /* 30% diagonal */
  --clip-angle-yellow-start: 25%;  /* 25% start point */
  
  /* Heights for layers */
  --hero-cyan-height: clamp(60px, 8vw, 100px);
  --hero-dark-padding-bottom: calc(var(--hero-cyan-height) * 0.5);
  --hero-yellow-padding-top: calc(var(--hero-cyan-height) * 0.4);
  
  /* Overlap fix (anti-aliasing only) */
  --hero-overlap: -2px;
}

/* === Tablet (768-1023px) === */
@media (max-width: 1023px) {
  :root {
    --clip-angle-dark-end: 90%;
    --clip-angle-cyan-mid: 75%;
    --clip-angle-yellow-start: 28%;
    --hero-cyan-height: clamp(50px, 7vw, 80px);
  }
}

/* === Mobile (481-767px) === */
@media (max-width: 767px) {
  :root {
    --clip-angle-dark-end: 92%;
    --clip-angle-cyan-mid: 78%;
    --clip-angle-yellow-start: 32%;
    --hero-cyan-height: clamp(45px, 6vw, 70px);
  }
}

/* === Mobile Small (360-480px) === */
@media (max-width: 480px) {
  :root {
    --clip-angle-dark-end: 94%;
    --clip-angle-cyan-mid: 80%;
    --clip-angle-yellow-start: 36%;
    --hero-cyan-height: clamp(40px, 5vw, 60px);
  }
}

/* === Mobile XS (<360px) === */
@media (max-width: 359px) {
  :root {
    --clip-angle-dark-end: 95%;
    --clip-angle-cyan-mid: 82%;
    --clip-angle-yellow-start: 38%;
    --hero-cyan-height: clamp(35px, 5vw, 50px);
  }
}
```

**Uso en componentes:**
```css
.my-section {
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% var(--clip-angle-dark-end), 
    0 100%
  );
}
```

### ✅ Beneficios del Sistema

1. **Centralizado**: Un solo lugar para ajustar todos los ángulos
2. **Responsive**: Progresión automática en 5 breakpoints
3. **Predecible**: Fórmula matemática clara (cada breakpoint reduce ~2% la diagonal)
4. **Mantenible**: Fácil de ajustar sin romper el layout

### Sistema de Ángulos Coherente (LEGACY - Deprecado)

```css
:root {
  /* Desktop angles */
  --clip-angle-subtle: 88%;  /* 12% diagonal */
  --clip-angle-medium: 70%;  /* 30% diagonal */
  --clip-angle-strong: 50%;  /* 50% diagonal */
}

@media (max-width: 1023px) {
  :root {
    --clip-angle-subtle: 90%;
    --clip-angle-medium: 75%;
    --clip-angle-strong: 60%;
  }
}

@media (max-width: 767px) {
  :root {
    --clip-angle-subtle: 92%;
    --clip-angle-medium: 78%;
    --clip-angle-strong: 65%;
  }
}
```

**Uso en componentes:**
```css
.my-section {
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% var(--clip-angle-subtle), 
    0 100%
  );
}
```

## Uso Básico

### Diagonal Superior (Top Clip)

```css
.section-top-diagonal {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}
```

**Visual:**
```
┌─────────────────────────────┐
│                             │
│   CONTENIDO                 │
│                           ╱ │
└─────────────────────────╱───┘
```

### Diagonal Inferior (Bottom Clip)

```css
.section-bottom-diagonal {
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
}
```

**Visual:**
```
┌───╱─────────────────────────┐
│ ╱                           │
│╱   CONTENIDO                │
└─────────────────────────────┘
```

### Banda Diagonal (Band)

```css
.section-band {
  clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
}
```

**Visual:**
```
┌───╱─────────────────────────┐
│ ╱                           │
│╱   CONTENIDO              ╱ │
└─────────────────────────╱───┘
```

## Mejores Prácticas

### ✅ DO

1. **Usar custom properties del sistema centralizado:**
```css
/* ✅ BIEN - Usa el sistema implementado */
.section {
  clip-path: polygon(
    0 0,
    100% 0,
    100% var(--clip-angle-dark-end),
    0 100%
  );
}
```

2. **Usar transform para overlaps (no negative margins):**
```css
/* ✅ BIEN */
.section {
  transform: translateY(var(--hero-overlap)); /* Solo -2px anti-aliasing */
}
```

3. **Añadir isolation para stacking context:**
```css
/* ✅ BIEN */
.parent-container {
  position: relative;
  isolation: isolate; /* Crea stacking context limpio */
}
```

4. **Usar calc() para padding dinámico:**
```css
/* ✅ BIEN */
.section {
  padding-top: calc(var(--hero-cyan-height) * 0.4);
}
```

5. **Añadir anti-aliasing fixes:**
```css
/* ✅ BIEN */
.clipped-element {
  overflow: hidden;
  will-change: clip-path;
  backface-visibility: hidden;
}
```

4. **Ajustar padding interno para evitar cortes:**
```css
/* ✅ BIEN */
.section {
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
  padding-top: calc(25% + 2rem); /* Clip % + espacio */
}
```

### ❌ DON'T

1. **NO hardcodear ángulos en componentes:**
```css
/* ❌ MAL - Valor hardcodeado */
.section {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}

/* ✅ BIEN - Usar custom property */
.section {
  clip-path: polygon(0 0, 100% 0, 100% var(--clip-angle-dark-end), 0 100%);
}
```

2. **NO usar negative margins para layout:**
```css
/* ❌ MAL - Causa gaps en algunos viewports */
.section {
  margin-top: -100px;
}

/* ✅ BIEN - Usar transform solo para anti-aliasing */
.section {
  transform: translateY(var(--hero-overlap)); /* -2px */
}
```

3. **NO usar píxeles en clip-paths responsive:**
```css
/* ❌ MAL */
clip-path: polygon(100px 0, 1920px 0, 1820px 1080px, 0 1080px);
```

2. **NO usar negative margins excesivos:**
```css
/* ❌ MAL */
.section {
  margin-top: -100px; /* Causa gaps en algunos viewports */
}
```

3. **NO animar clip-path en scroll:**
```css
/* ❌ MAL - Costoso en performance */
.section {
  animation: clipAnimation 1s ease-in-out infinite;
}

@keyframes clipAnimation {
  from { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  to { clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%); }
}
```

4. **NO combinar clip-path + opacity + transitions:**
```css
/* ❌ MAL - Causa flickering */
.section {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
  opacity: 0.8;
  transition: all 0.3s ease;
}
```

## Troubleshooting

### Problema 1: Gap Blanco Entre Secciones

**Solución:**
```css
/* Añadir pequeño overlap */
.section-2 {
  transform: translateY(-2px);
}

/* O extender clip-path */
.section-1 {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 102%);
  /*                                        ↑ 2% extra */
}
```

### Problema 2: Contenido Cortado

**Solución:**
```css
/* Ajustar padding interno */
.section {
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
  padding-top: calc(25% + 2rem);
}
```

### Problema 3: Flickering en Safari

**Solución:**
```css
.clipped-element {
  -webkit-backface-visibility: hidden;
  -webkit-transform: translateZ(0);
}
```

## Ajustar Formas

### Inline Style (Instancia única)

```html
<div style="clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);">
  <img src="..." alt="..." />
</div>
```

### Editar Global (src/styles/global.css)

```css
.rounded-rhombus-left {
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
  /*              ↑       ↑        ↑         ↑
                  Ajusta estos valores para cambiar forma */
}
```

**Cada par representa (x%, y%):**
- Primer valor = posición horizontal (0% = izquierda, 100% = derecha)
- Segundo valor = posición vertical (0% = arriba, 100% = abajo)

## Herramientas Útiles

### Generadores Visuales

1. **[Clippy](https://bennettfeely.com/clippy/)** — Generador interactivo
   - Ajusta vértices con el mouse
   - Copia el código CSS automáticamente
   - Previsualización en tiempo real

2. **[Fancy Border Radius](https://9elements.github.io/fancy-border-radius/)** — Para formas orgánicas

3. **Browser DevTools** — Edita en vivo
   - Inspecciona elemento
   - Edita `clip-path` en Styles panel
   - Copia resultado final

### Referencias

- [MDN: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- [Can I Use: clip-path](https://caniuse.com/css-clip-path)
- [CSS Tricks: clip-path](https://css-tricks.com/almanac/properties/c/clip-path/)

## Ejemplos en el Proyecto

### ConcursosHero (src/components/concursos/ConcursosHero.astro) - ✅ REFACTORIZADO

**Sistema implementado con custom properties:**

```css
.concursos-hero {
  isolation: isolate; /* Stacking context */
}

.hero-dark {
  clip-path: polygon(
    0 0,
    100% 0,
    100% var(--clip-angle-dark-end),
    0 100%
  );
  padding-bottom: var(--hero-dark-padding-bottom);
  z-index: 3;
}

.hero-cyan {
  height: var(--hero-cyan-height);
  transform: translateY(var(--hero-overlap)); /* Anti-aliasing */
  clip-path: polygon(
    0 0,
    100% var(--clip-angle-cyan-mid),
    100% 100%,
    0 100%
  );
  z-index: 2;
}

.hero-yellow {
  padding-top: var(--hero-yellow-padding-top);
  transform: translateY(var(--hero-overlap)); /* Anti-aliasing */
  clip-path: polygon(
    0 var(--clip-angle-yellow-start),
    100% 0,
    100% 100%,
    0 100%
  );
  z-index: 1;
}
```

**Progresión responsive automática:**
- Desktop: 88%, 70%, 25% (diagonales agresivas)
- Tablet: 90%, 75%, 28% (diagonales moderadas)
- Mobile: 92%, 78%, 32% (diagonales sutiles)
- Mobile SM: 94%, 80%, 36% (diagonales muy sutiles)
- Mobile XS: 95%, 82%, 38% (diagonales mínimas)

### ConcursosHero (LEGACY - Antes de refactorización)

<details>
<summary>⚠️ Sistema antiguo (deprecado) - Click para ver</summary>

```css
.hero-dark {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}

.hero-cyan {
  height: 80px;
  margin-top: -80px; /* ❌ Problemático */
  clip-path: polygon(0 0, 100% 50%, 100% 100%, 0 100%);
}

.hero-yellow {
  margin-top: -40px; /* ❌ Problemático */
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
}
```

**Problemas del sistema antiguo:**
- Negative margins causaban gaps
- Valores hardcodeados en múltiples media queries
- Difícil de mantener y ajustar
- Inconsistencias entre breakpoints

</details>

### Footer (src/components/Footer.astro) - Pendiente de refactorización

```css
.footer-bar {
  clip-path: polygon(0 0, 100% 28.5%, 100% 100%, 0 100%);
}
```

### DinamycGalleryTitle (src/components/DinamycGalleryTitle.astro)

```css
.azul {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%);
}

.amarillo {
  clip-path: polygon(0% 40%, 100% 0%, 100% 100%, 0% 100%);
}
```

## 📚 Documentación Adicional

Para más detalles sobre el sistema de clip-path y solución de problemas:

- **[Guía Visual Completa](./clip-path-visual-guide.md)** - Diagramas y ejemplos
- **[Plan de Corrección de Clips](../architecture/CLIP-PATH-FIX-PLAN.md)** - Análisis técnico detallado

---

**Última actualización:** 2026-02-15  
**Versión:** 3.0.0 - Sistema de Custom Properties Implementado

## 🎉 Changelog v3.0.0

### ✅ Cambios Implementados

1. **Sistema de Custom Properties Centralizado**
   - Añadido en `src/styles/global.css`
   - 5 breakpoints con progresión coherente
   - Variables para ángulos, alturas y overlaps

2. **ConcursosHero Refactorizado**
   - Eliminados negative margins
   - Implementado sistema de custom properties
   - Mejor anti-aliasing y rendering

3. **Documentación Actualizada**
   - Nuevas best practices
   - Ejemplos del sistema implementado
   - Guía de migración para otros componentes

### 🔄 Pendiente

- Aplicar sistema a ColaboracionesDestacadas.astro
- Aplicar sistema a DinamycGalleryTitle.astro
- Aplicar sistema a Footer.astro

### 📚 Referencias

- **[Plan de Corrección](../architecture/CLIP-PATH-FIX-PLAN.md)** - Análisis técnico completo
- **[Guía Visual](./clip-path-visual-guide.md)** - Diagramas y ejemplos visuales
