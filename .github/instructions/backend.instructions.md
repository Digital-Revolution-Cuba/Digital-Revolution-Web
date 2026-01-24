---
applyTo: '**/*.ts'
description: 'Reglas específicas para archivos TypeScript del proyecto'
---

# TypeScript Instructions

## Type Safety

- `tsconfig.json` debe tener `strict: true`
- Evitar `any`; usar tipos explícitos
- Documentar cualquier uso necesario de `any`

## Naming Conventions

- **Interfaces**: PascalCase con prefijo descriptivo (e.g., `UserProfile`, `ApiResponse`)
- **Types**: PascalCase (e.g., `ButtonVariant`)
- **Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

## Component Props

- Usar `interface Props` para componentes Astro
- Exportar interfaces que se usen externamente

## Imports

- Importar iconos individualmente de `lucide-react` para tree-shaking
- Preferir imports absolutos cuando estén configurados
