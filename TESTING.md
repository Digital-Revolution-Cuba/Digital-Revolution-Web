# 🧪 Guía de Testing Responsive

## Cómo usar las herramientas de testing

### 1. Abrir el sitio en desarrollo

```bash
pnpm run dev
```

### 2. Abrir las DevTools del navegador

Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)

### 3. Ejecutar tests en la consola

```javascript
// Ver todas las funciones disponibles
window.responsiveTests;

// Ejecutar todos los tests
window.responsiveTests.runAllTests();

// Tests individuales
window.responsiveTests.testContainerQueries();
window.responsiveTests.auditTouchTargets();
window.responsiveTests.logViewportInfo();

// Mostrar indicador de breakpoint en pantalla
window.responsiveTests.showBreakpointIndicator();

// Simular dispositivo específico
const cleanup = window.responsiveTests.simulateDevice('iPhone 14');
// Para cerrar: cleanup()

// Medir Core Web Vitals
window.responsiveTests.getWebVitals();
```

## Checklist de Testing Manual

### ✅ Mobile (320px - 640px)

- [ ] Header muestra menú hamburguesa
- [ ] Menú móvil se abre/cierra correctamente
- [ ] Touch targets ≥ 48px
- [ ] Texto legible sin zoom
- [ ] Imágenes cargan con lazy loading
- [ ] Galería se desplaza correctamente
- [ ] Sin scroll horizontal

### ✅ Tablet (641px - 1023px)

- [ ] Logo con texto visible
- [ ] Navegación responsive
- [ ] Cards en 2 columnas
- [ ] Tipografía escala correctamente

### ✅ Desktop (1024px+)

- [ ] Navegación completa visible
- [ ] Cards en 3 columnas
- [ ] Hover effects funcionan
- [ ] Focus indicators visibles

### ✅ Accesibilidad

- [ ] Navegación con teclado (Tab/Shift+Tab)
- [ ] Escape cierra menú móvil
- [ ] Todas las imágenes tienen alt text
- [ ] Contraste de color ≥ 4.5:1
- [ ] ARIA labels correctos

### ✅ Performance

- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Imágenes en formato WebP/AVIF

## Dispositivos para probar

Use Chrome DevTools > Toggle Device Toolbar (Ctrl+Shift+M):

1. **iPhone SE** (375x667)
2. **iPhone 14 Pro** (393x852)
3. **iPad Air** (820x1180)
4. **iPad Pro 12.9** (1024x1366)
5. **Desktop 1080p** (1920x1080)
6. **Desktop 4K** (3840x2160)

## Browsers a probar

- ✅ Chrome (último)
- ✅ Firefox (último)
- ✅ Safari (último)
- ✅ Edge (último)

## Problemas comunes y soluciones

### El menú móvil no se cierra

**Solución**: Verificar que HeaderInteractivity.ts se esté cargando correctamente

### Las imágenes no cargan

**Solución**: Verificar ruta de las imágenes y que IntersectionObserver esté disponible

### Touch targets muy pequeños

**Solución**: Ejecutar `window.responsiveTests.auditTouchTargets()` para identificar elementos problemáticos

### Layout shift (CLS alto)

**Solución**: Asegurar que todas las imágenes tengan `width` y `height` attributes

## CI/CD Testing (Futuro)

```yaml
# .github/workflows/test.yml
- name: Lighthouse CI
  run: |
    npm run build
    npm run lighthouse -- --budget-path=./budget.json
```

## Recursos adicionales

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Web Vitals](https://web.dev/vitals/)
- [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
