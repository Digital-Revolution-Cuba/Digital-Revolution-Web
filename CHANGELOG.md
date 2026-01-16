# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added

- Documentación completa del proyecto (DOCUMENTATION.md)
- Guía de testing responsive (TESTING.md)
- Documentación de refactoring de galería (REFACTORING.md)

### Changed

- TODO: Documentar próximos cambios aquí

### Deprecated

- Nada por ahora

### Removed

- Nada por ahora

### Fixed

- TODO: Documentar fixes aquí

### Security

- TODO: Documentar actualizaciones de seguridad aquí

---

## [0.0.1] - 2026-01-15

### Added

#### Core

- 🚀 Proyecto inicial con Astro 5.16.6
- ⚛️ Integración de React 19.2.3 para componentes interactivos (Islands Architecture)
- 🎨 Tailwind CSS 4.1.18 con plugin Vite
- 📝 TypeScript con configuración strict

#### Páginas

- 🏠 Página de inicio (Home) con Hero section
- 🏆 Página de concursos (`/concursos`)
- 🖼️ Página de galería (`/galeria`)
- 👤 Página de perfiles (`/perfiles`)
- 🔍 Página de talentos (`/talentos`)
- 🤝 Página de colaboraciones (`/colaboraciones`)

#### Componentes

- `Header.astro` - Navegación responsive con menú móvil
- `Hero.astro` - Sección hero de landing
- `Footer.astro` - Footer con redes sociales
- `GalleryGrid.tsx` - Galería masonry con React
- `GalleryHero.tsx` - Hero de galería interactivo
- `TalentsCards.tsx` - Cards de talentos con búsqueda
- `InputSearchGallery.tsx` - Buscador de galería
- Sistema completo de cards: `ArteCard`, `MusicCard`, `FotografiaCard`

#### Sistema de Estilos

- Sistema de tipografía fluida con `clamp()`
- Efectos glassmorphism (`glass-card.css`)
- Animaciones CSS optimizadas
- Estilos responsive con container queries

#### Arquitectura de Datos

- Tipos TypeScript para galería (`types.ts`)
- Configuración centralizada (`galleryConfig.ts`)
- Composables para lógica de negocio:
  - `useCategorySwitch.ts`
  - `useGallerySlider.ts`
- Utilidades:
  - `galleryAnimations.js` (FLIP animations)
  - `musicPlayer.ts`
  - `transitionUtils.js`

#### CI/CD

- GitHub Actions workflow para build verification
- GitHub Actions workflow para quality check (Prettier)
- GitHub Actions workflow para security audit
- PR labeler automático

#### Documentación

- README.md con visión del proyecto
- CONTRIBUTING.md con guía de contribución
- Conventional Commits configurado

### Technical Details

#### Dependencies

```json
{
  "astro": "^5.16.6",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "tailwindcss": "^4.1.18",
  "@astrojs/react": "^4.4.2",
  "lucide-react": "^0.562.0",
  "react-responsive-masonry": "^2.7.1",
  "sharp": "^0.34.5"
}
```

#### Build Output

- 7 páginas estáticas generadas
- Assets optimizados con Vite
- CSS bundle: ~8KB gzipped
- JS chunks optimizados por ruta

---

## Tipos de Cambios

- `Added` para funcionalidades nuevas
- `Changed` para cambios en funcionalidades existentes
- `Deprecated` para funcionalidades que serán removidas próximamente
- `Removed` para funcionalidades removidas
- `Fixed` para corrección de bugs
- `Security` para vulnerabilidades

---

[Unreleased]: https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/releases/tag/v0.0.1
