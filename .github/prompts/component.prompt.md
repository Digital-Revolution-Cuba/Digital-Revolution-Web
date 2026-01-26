---
name: 'component-generator'
description: 'Genera componentes reutilizables Astro/React'
---

# Prompt: Component Generator

Genera un componente para el proyecto Digital Revolution.

## Input Variables

- `COMPONENT_NAME`: Nombre del componente (PascalCase)
- `COMPONENT_TYPE`: Tipo de componente (`Astro` | `React`)
- `INTERACTIVITY`: Nivel de interactividad (`none` | `low` | `high`)

## Instructions

1. Si `INTERACTIVITY` es `none` o `low`, crear componente `.astro`
2. Si `INTERACTIVITY` es `high`, crear React island con `client:visible`
3. Incluir interface `Props` con TypeScript estricto
4. Aplicar Tailwind CSS v4 para estilos
5. Asegurar accesibilidad (alt, aria-label, semántica)

## Output

Archivo completo del componente con Props, types y layout responsive.
