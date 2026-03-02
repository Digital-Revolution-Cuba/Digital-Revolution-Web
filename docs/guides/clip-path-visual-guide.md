# Guía Visual: Sistema de Clip-Path para Digital Revolution

## 🎨 Anatomía de un Clip-Path Diagonal

### Coordenadas del Polígono

```
┌─────────────────────────────────┐ 100% width
│ (0, 0)              (100%, 0)   │
│   ┌──────────────────────────┐  │
│   │                          │  │
│   │  CONTENIDO VISIBLE       │  │
│   │                        ╱ │  │
│   │                      ╱   │  │ <- Clip diagonal
│   │                    ╱     │  │
│   │                  ╱       │  │
│   │                ╱         │  │
│   └──────────────────────────┘  │
│ (0, 100%)   (100%, Y%)          │
└─────────────────────────────────┘
        ↑                ↑
    Top-left      Bottom-right
                  (donde ocurre el clip)
```

**Fórmula del ángulo:**

```
clip-path: polygon(
  0 0,          /* Top-left */
  100% 0,       /* Top-right */
  100% Y%,      /* Bottom-right (ajustar Y para ángulo) */
  0 100%        /* Bottom-left */
);

Diagonal % = 100% - Y%

Ejemplo:
- Y = 88% → Diagonal de 12% (suave)
- Y = 70% → Diagonal de 30% (moderada)
- Y = 50% → Diagonal de 50% (agresiva)
```

## 📐 Sistema de Ángulos Coherente

### Progresión Visual

```
┌─────────────────────────────────────────────┐
│ Desktop (>1024px)                           │
│ ┌─────────────────────────────┐             │
│ │        dark (88%)          │             │
│ │                          ╱ │             │
│ └────────────────────────╱───┘             │
│ ┌──────────────────────╱─────┐             │
│ │   cyan (70%)       ╱       │             │
│ └──────────────────╱─────────┘             │
│ ┌────────────────╱───────────┐             │
│ │              ╱  yellow (25%)│             │
│ │            ╱                │             │
│ └──────────╱──────────────────┘             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Tablet (768-1023px)                         │
│ ┌─────────────────────────────┐             │
│ │        dark (90%)          │             │
│ │                         ╱  │             │
│ └───────────────────────╱────┘             │
│ ┌──────────────────────╱────┐              │
│ │   cyan (75%)      ╱       │              │
│ └─────────────────╱──────────┘             │
│ ┌───────────────╱────────────┐             │
│ │            ╱  yellow (28%)  │             │
│ │          ╱                  │             │
│ └────────╱────────────────────┘             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Mobile (481-767px)                          │
│ ┌─────────────────────────────┐             │
│ │        dark (92%)          │             │
│ │                        ╱   │             │
│ └──────────────────────╱─────┘             │
│ ┌─────────────────────╱─────┐              │
│ │   cyan (78%)     ╱        │              │
│ └────────────────╱───────────┘             │
│ ┌──────────────╱─────────────┐             │
│ │           ╱  yellow (32%)   │             │
│ │         ╱                   │             │
│ └───────╱─────────────────────┘             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Mobile Small (360-480px)                    │
│ ┌─────────────────────────────┐             │
│ │        dark (94%)          │             │
│ │                       ╱    │             │
│ └─────────────────────╱──────┘             │
│ ┌────────────────────╱──────┐              │
│ │   cyan (80%)    ╱         │              │
│ └───────────────╱────────────┘             │
│ ┌─────────────╱──────────────┐             │
│ │          ╱  yellow (36%)    │             │
│ │        ╱                    │             │
│ └──────╱──────────────────────┘             │
└─────────────────────────────────────────────┘
```

### Tabla de Valores

| Breakpoint | Dark End | Cyan Mid | Yellow Start | Diagonal Intensity |
| ---------- | -------- | -------- | ------------ | ------------------ |
| Desktop    | 88%      | 70%      | 25%          | 🔥🔥🔥 Agresiva    |
| Tablet     | 90%      | 75%      | 28%          | 🔥🔥 Moderada      |
| Mobile     | 92%      | 78%      | 32%          | 🔥 Suave           |
| Mobile SM  | 94%      | 80%      | 36%          | 🔸 Muy Suave       |

**Nota:** En mobile, los ángulos se suavizan para:

- Evitar que el clip corte contenido importante
- Mantener legibilidad en pantallas pequeñas
- Reducir impacto visual que puede ser abrumador

## 🚫 Problema: Negative Margins

### ❌ Enfoque Incorrecto (Actual)

```
┌───────────────────────────┐
│   hero-dark               │
│                         ╱ │
└───────────────────────╱───┘
        ↓ margin-top: -80px
┌───────╱───────────────────┐  ← Se superpone
│ cyan╱                     │
└───╱───────────────────────┘
  ↓ margin-top: -40px
┌─╱─────────────────────────┐  ← Se superpone
│╱ yellow                   │
└───────────────────────────┘
```

**Problemas:**

1. En algunos viewports, aparecen **gaps blancos**
2. El overlap no es predecible
3. Cambios en padding rompen el layout
4. Difícil de mantener

### ✅ Enfoque Correcto (Propuesto)

```
┌───────────────────────────┐
│   hero-dark               │
│   z-index: 3            ╱ │
│   padding-bottom ajustado │
└───────────────────────╱───┘
┌───────────────────────────┐  ← No margin negativo
│   hero-cyan             ╱ │    transform: translateY(-2px)
│   z-index: 2          ╱   │    (solo anti-aliasing)
└─────────────────────╱─────┘
┌───────────────────────────┐  ← No margin negativo
│ ╱ hero-yellow             │    transform: translateY(-2px)
│╱  z-index: 1              │    padding-top ajustado
└───────────────────────────┘
```

**Beneficios:**

1. ✅ No gaps entre secciones
2. ✅ Control preciso del overlap
3. ✅ Responsive predecible
4. ✅ Fácil de ajustar

## 🎯 Custom Properties System

### Definición en :root

```css
:root {
  /* === CLIP ANGLES === */
  --hero-clip-dark-end: 88%;
  --hero-clip-cyan-mid: 70%;
  --hero-clip-yellow-start: 25%;

  /* === HEIGHTS === */
  --hero-cyan-height: clamp(60px, 8vw, 100px);

  /* === OVERLAP (anti-aliasing) === */
  --hero-overlap: -2px;

  /* === SPACING === */
  --hero-dark-padding-bottom: calc(var(--hero-cyan-height) * 0.5);
  --hero-yellow-padding-top: calc(var(--hero-cyan-height) * 0.4);
}
```

### Uso en Componentes

```css
.hero-dark {
  clip-path: polygon(0 0, 100% 0, 100% var(--hero-clip-dark-end), 0 100%);
  padding-bottom: var(--hero-dark-padding-bottom);
}

.hero-cyan {
  height: var(--hero-cyan-height);
  clip-path: polygon(0 0, 100% var(--hero-clip-cyan-mid), 100% 100%, 0 100%);
  transform: translateY(var(--hero-overlap));
}

.hero-yellow {
  clip-path: polygon(0 var(--hero-clip-yellow-start), 100% 0, 100% 100%, 0 100%);
  transform: translateY(var(--hero-overlap));
  padding-top: var(--hero-yellow-padding-top);
}
```

### Responsive con Custom Properties

```css
/* Tablet */
@media (max-width: 1023px) {
  :root {
    --hero-clip-dark-end: 90%;
    --hero-clip-cyan-mid: 75%;
    --hero-clip-yellow-start: 28%;
    --hero-cyan-height: clamp(50px, 7vw, 80px);
  }
}

/* Mobile */
@media (max-width: 767px) {
  :root {
    --hero-clip-dark-end: 92%;
    --hero-clip-cyan-mid: 78%;
    --hero-clip-yellow-start: 32%;
    --hero-cyan-height: clamp(40px, 6vw, 60px);
  }
}

/* Mobile Small */
@media (max-width: 480px) {
  :root {
    --hero-clip-dark-end: 94%;
    --hero-clip-cyan-mid: 80%;
    --hero-clip-yellow-start: 36%;
    --hero-cyan-height: 50px;
  }
}
```

**Ventajas:**

- ✅ Un solo lugar para ajustar valores
- ✅ Cambios consistentes en todos los componentes
- ✅ Fácil de testear diferentes ángulos
- ✅ Documentación auto-explicativa

## 🔧 Casos de Uso Comunes

### 1. Diagonal Superior (Top)

```css
/* Diagonal que corta desde arriba-derecha */
.section-top-diagonal {
  clip-path: polygon(
    0 0,
    /* Top-left (sin cortar) */ 100% 0,
    /* Top-right (sin cortar) */ 100% 88%,
    /* Bottom-right (cortado) */ 0 100% /* Bottom-left (sin cortar) */
  );
}
```

```
┌─────────────────────────────┐
│                             │
│   CONTENIDO                 │
│                           ╱ │ ← Diagonal aquí
│                         ╱   │
│                       ╱     │
└─────────────────────╱───────┘
```

### 2. Diagonal Inferior (Bottom)

```css
/* Diagonal que corta desde arriba-izquierda */
.section-bottom-diagonal {
  clip-path: polygon(
    0 25%,
    /* Top-left (cortado) */ 100% 0,
    /* Top-right (sin cortar) */ 100% 100%,
    /* Bottom-right (sin cortar) */ 0 100% /* Bottom-left (sin cortar) */
  );
}
```

```
┌───╱─────────────────────────┐
│ ╱                           │ ← Diagonal aquí
│╱   CONTENIDO                │
│                             │
│                             │
└─────────────────────────────┘
```

### 3. Diagonal Central (Banda)

```css
/* Banda con diagonales arriba y abajo */
.section-band-diagonal {
  clip-path: polygon(
    0 20%,
    /* Top-left (cortado) */ 100% 0,
    /* Top-right (sin cortar) */ 100% 80%,
    /* Bottom-right (cortado) */ 0 100% /* Bottom-left (sin cortar) */
  );
}
```

```
┌───╱─────────────────────────┐
│ ╱                           │ ← Diagonal superior
│╱   CONTENIDO                │
│                           ╱ │ ← Diagonal inferior
│                         ╱   │
└─────────────────────╱───────┘
```

### 4. Rombo / Paralelogramo

```css
.section-rhombus {
  clip-path: polygon(
    25% 0%,
    /* Top-left (cortado) */ 100% 0%,
    /* Top-right (sin cortar) */ 75% 100%,
    /* Bottom-right (cortado) */ 0% 100% /* Bottom-left (sin cortar) */
  );
}
```

```
    ┌─────────────────────┐
   ╱                       │
  ╱   CONTENIDO            │
 ╱                       ╱ │
│                      ╱   │
└────────────────────╱─────┘
```

## 🎨 Paleta de Colores & Clips

### Combinaciones Comunes en Digital Revolution

```css
/* === CYAN + YELLOW (Firma visual) === */
.hero-cyan {
  background: var(--palette-accent-cyan, #34dfde);
  clip-path: polygon(0 0, 100% 50%, 100% 100%, 0 100%);
}

.hero-yellow {
  background: var(--palette-accent-yellow, #ffc943);
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
}

/* === DARK + CYAN (Contraste fuerte) === */
.section-dark {
  background: var(--palette-brand-dark, #011822);
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}

.section-cyan {
  background: var(--palette-accent-cyan, #34dfde);
  clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%);
}

/* === ORANGE + NAVY (CTA sections) === */
.cta-section {
  background: var(--palette-brand-navy, #002b38);
  clip-path: polygon(0 0, 100% 25%, 100% 100%, 0 100%);
}
```

## 🐛 Troubleshooting

### Problema 1: Gap Blanco Entre Secciones

**Síntoma:**

```
┌───────────────────────────┐
│   section-1             ╱ │
└───────────────────────╱───┘
  <── GAP BLANCO AQUÍ -->
┌─╱─────────────────────────┐
│╱ section-2                │
```

**Solución:**

```css
/* Añadir pequeño overlap con transform */
.section-2 {
  transform: translateY(-2px);
}

/* O ajustar clip de section-1 para que se extienda más */
.section-1 {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 102%);
  /*                                        ↑ Extiende 2% extra */
}
```

### Problema 2: Contenido Cortado

**Síntoma:**
El texto o imágenes se cortan por el clip-path

**Solución:**

```css
/* Añadir padding interno */
.section {
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
  padding-top: calc(25% + 2rem); /* 25% del clip + espacio extra */
  padding-left: 2rem;
  padding-right: 2rem;
}
```

### Problema 3: Flickering en Animaciones

**Síntoma:**
Parpadeo o artifacts visuales al animar clip-path

**Solución:**

```css
.animated-clip {
  /* Anti-aliasing fixes */
  will-change: clip-path;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
```

### Problema 4: Ángulos Inconsistentes en Mobile

**Síntoma:**
Los clips se ven muy agresivos o muy suaves en mobile

**Solución:**

```css
/* Usar clamp() para transición suave */
:root {
  --clip-angle: clamp(88%, calc(88% + (2% * (100vw - 768px) / 256)), 94%);
  /*            desktop       ↑ progresión gradual ↑          mobile  */
}

.section {
  clip-path: polygon(0 0, 100% 0, 100% var(--clip-angle), 0 100%);
}
```

## 📊 Performance Checklist

### ✅ Best Practices

- [ ] Usar porcentajes (%) en lugar de píxeles (px)
- [ ] Evitar `clip-path` en elementos animados frecuentemente
- [ ] Usar `will-change: clip-path` solo cuando sea necesario
- [ ] Eliminar `will-change` después de la animación
- [ ] Preferir `transform` sobre `margin` para overlaps
- [ ] Usar `isolation: isolate` para crear stacking context limpio
- [ ] Testing en DevTools con FPS counter habilitado

### ⚠️ Anti-Patterns a Evitar

- [ ] ❌ NO usar negative margins excesivos
- [ ] ❌ NO animar clip-path en scroll (costoso)
- [ ] ❌ NO combinar clip-path + opacity + transitions (flickering)
- [ ] ❌ NO usar valores absolutos (píxeles) en clips responsive
- [ ] ❌ NO olvidar anti-aliasing fixes

## 🎓 Recursos Útiles

### Herramientas

1. **[Clippy](https://bennettfeely.com/clippy/)** - Generador visual interactivo
2. **Browser DevTools** - Editar en vivo y copiar resultado
3. **[Fancy Border Radius](https://9elements.github.io/fancy-border-radius/)** - Alternativa para shapes complejos

### Referencias

- [MDN: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- [Can I Use: clip-path](https://caniuse.com/css-clip-path)
- [Smashing Magazine: Creating Responsive Shapes with clip-path](https://www.smashingmagazine.com/2015/05/creating-responsive-shapes-with-clip-path/)

### Ejemplos en el Proyecto

- `src/components/concursos/ConcursosHero.astro` - Hero con 3 clips apilados
- `src/components/DinamycGalleryTitle.astro` - Clips con overlay de imágenes
- `src/components/Footer.astro` - Clip diagonal superior simple
- `src/components/ColaboracionesDestacadas.astro` - Múltiples clips decorativos

---

**Última actualización:** 2026-02-15
**Versión:** 1.0.0
**Autor:** Development Team
