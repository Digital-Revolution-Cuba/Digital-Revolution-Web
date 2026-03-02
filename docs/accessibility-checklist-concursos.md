# Accesibilidad WCAG 2.1 AA - Checklist para Concursos

## ✅ Estructura Semántica

- [x] Uso de `<main>` para contenido principal
- [x] Uso de `<section>` con `aria-labelledby` apropiado
- [x] Headings jerárquicos (h1 → h2 → h3)
- [x] Uso de `<article>` para tarjetas de concursos
- [x] Elementos interactivos con roles ARIA correctos

## ✅ Navegación por Teclado

- [x] Todos los botones navegables con Tab
- [x] Links y botones activables con Enter/Space
- [x] Skip links implementados (Ir a filtros)
- [x] Focus states visibles en todos los elementos interactivos
- [x] Sin keyboard traps

## ✅ ARIA y Lectores de Pantalla

- [x] `role="search"` en barra de búsqueda
- [x] `role="group"` en grupos de filtros
- [x] `role="region"` en grid de resultados
- [x] `aria-live="polite"` para contador de resultados
- [x] `aria-pressed` en botones de filtro
- [x] `aria-label` descriptivos en controles
- [x] `aria-hidden="true"` en decoraciones
- [x] Labels visibles y asociados correctamente

## ✅ Contraste de Color (≥ 4.5:1)

- [x] Texto principal sobre fondo (#fff sobre #001018)
- [x] Texto secundario (rgba(255,255,255,0.8))
- [x] Botones primarios (alto contraste)
- [x] Badges de estado (verificados individualmente)
- [x] Links y CTAs claramente diferenciados

## ✅ Imágenes y Contenido Visual

- [x] Alt text descriptivo en todas las imágenes
- [x] `loading="lazy"` para optimización
- [x] Decoraciones con `aria-hidden="true"`
- [x] Íconos con texto alternativo o `aria-label`

## ✅ Formularios y Controles

- [x] Labels asociados con inputs (for/id)
- [x] Placeholder no usado como único indicador
- [x] Estados de error claramente comunicados
- [x] Botón de limpiar búsqueda con aria-label

## ✅ Estados Dinámicos

- [x] Cambios de contenido anunciados con aria-live
- [x] Loading states comunicados
- [x] Empty states con mensajes claros
- [x] Error states con instrucciones de recuperación

## ✅ Responsive y Zoom

- [x] Funcional hasta 200% zoom
- [x] Breakpoints en 768px, 1024px
- [x] Sin scroll horizontal
- [x] Texto no truncado crítico

## ⚠️ Notas de Mejora Futura

- [ ] Testing con NVDA/JAWS completo
- [ ] Verificar con axe DevTools en todos los estados
- [ ] Testing en múltiples navegadores
- [ ] Validar con usuarios reales

## 📊 Métricas Esperadas

- Lighthouse Accessibility: ≥ 90
- axe DevTools: 0 violaciones críticas
- Contraste: 100% cumplimiento AA
- Navegación teclado: 100% funcional
