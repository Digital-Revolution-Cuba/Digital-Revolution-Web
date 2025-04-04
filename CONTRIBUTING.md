# 🌟 Guía de Contribución

¿Quieres contribuir? Lee detenidamente este documento.

## 🔄 Proceso de Pull Request

1. Haz tus cambios en una rama separada
2. Actualiza la documentación si es necesario
3. Sube tu rama a tu fork
4. Abre un Pull Request contra la rama `main` del repositorio original
5. Describe tus cambios claramente en la descripción del PR
6. No olvides mencionar cualquier issue relacionado que le de solución el PR

## 📌 Nombres de ramas:

Usamos el formato:  
`tipo/descripcion-breve`

**Tipos comunes:**

- `feat/`: Para nuevas funcionalidades  
  Ejemplo: `feat/agregar-login`
- `fix/`: Para corrección de errores  
  Ejemplo: `fix/error-autenticacion`
- `docs/`: Para cambios en documentación  
  Ejemplo: `docs/actualizar-guia`
- `refactor/`: Para mejoras de código  
  Ejemplo: `refactor/componente-header`
- `style/`: Para cambios visuales  
  Ejemplo: `style/mejoras-responsive`

**Reglas importantes:**

- Usa minúsculas
- Separa palabras con guiones (`-`)
- Sé breve pero descriptivo
- No uses caracteres especiales o espacios

Ejemplo:
`feat/boton-compartir`

## 📝 Commits Convencionales

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para los mensajes de commit y el lenguaje ingles. Por favor usa este formato:

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[pie de página opcional]
```

En el pie de página añadir el número del issue si es necesario.

### Tipos de commit:

- `feat`: Una nueva funcionalidad
- `fix`: Corrección de un error
- `docs`: Cambios en la documentación
- `refactor`: Cambios de código que no corrigen errores ni añaden funcionalidades
- `perf`: Mejoras de rendimiento
- `chore`: Tareas de mantenimiento, configuración, etc.

### Ejemplo:

```
feat(pages): add pages/About section

- Added a section about the project info
- Updated the astro router

Issue #123
```

## 📌 **Comentarios en Código**

### 1. **`TODO`** (Tareas pendientes):

```javascript
// TODO: Refactorizar este código para separarlo en otra isla
// TODO: Mejorar validación de errores en el buscador [@pepito_dev]
// TODO: Añadir el botón de compartir (Issue: #123)
```

- **Uso**: Para features pendientes o mejoras identificadas.

### 2. **`FIX`** (Problemas conocidos):

```javascript
// FIX: El cálculo del total falla con valores negativos (Issue: #123)
// FIX: Corregir search condition en la API (PR: #45)
```

- **Uso**: Para bugs documentados que requieren atención.

### Reglas:

- Revisa si ya existe un `TODO`/`FIX` similar.
- Evita comentarios vagos. Ejemplo incorrecto: `// TODO: Arreglar esto`.
- Si es posible, etiqueta al responsable (`[@usuario]` o `[@team]`).
