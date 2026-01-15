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

---

## 🎯 Visión General del Proyecto

Plataforma web de la comunidad **Revolución Digital Cuba** orientada a mostrar talento creativo y técnico.

### Objetivos Técnicos

* Performance alto (Core Web Vitals)
* Accesibilidad WCAG 2.2 AA
* SEO técnico sólido
* Arquitectura preparada para backend futuro

---

## 🏗 Arquitectura

### Principios

* **Static-first** con Astro
* **Islands Architecture** para interactividad
* **Separación estricta** entre UI, datos y lógica

```
Browser
  ↓
Astro (SSG)
  ↓
Static HTML + JS hidratado selectivamente
```

---

## 🛠 Stack Tecnológico

### Core

| Tecnología   | Rol                       |
| ------------ | ------------------------- |
| Astro        | Framework principal (SSG) |
| React        | Componentes interactivos  |
| TypeScript   | Tipado y seguridad        |
| Tailwind CSS | Estilos utility-first     |

---

## 📁 Estructura del Proyecto

```
src/
├── assets/
├── components/
├── composables/
├── config/
├── data/
├── layouts/
├── pages/
├── styles/
└── utils/
```

---

## 💻 Guía de Desarrollo

### Convenciones

* Componentes Astro: `PascalCase.astro`
* Componentes React: `PascalCase.tsx`
* Datos y lógica sin JSX

---

## 🧩 Componentes

* Componentes estáticos por defecto
* React solo cuando hay estado, eventos o mediciones

---

## 📊 Sistema de Datos

* Datos locales tipados
* Sin fetch runtime
* Preparado para sustituir por API futura

---

## 🎨 Estilos y Design System

* Tailwind como base
* CSS manual solo para:

  * animaciones
  * efectos complejos
  * layouts no triviales

---

## 🚢 CI/CD y Deploy

* GitHub Actions para build, formato y seguridad
* Deploy automático en Vercel

---

## 🧪 Testing

* Testing manual como base
* Infraestructura preparada para testing automatizado futuro

---

## 📡 API Reference

### Estado Actual

No existe backend activo. Todos los datos son estáticos.

---

## 🛣 Roadmap a Backend

### Fase futura (no implementada)

* API propia (REST o GraphQL)
* Autenticación
* Persistencia de datos

---

## 🔧 Troubleshooting

Problemas comunes documentados para entorno local y build.

---

## 📚 Referencias

* Astro Docs
* React Docs
* Tailwind Docs

---

*Documentación orientada a landing page en Astro + React, preparada para crecimiento progresivo sin dependencia de CMS externos.*
