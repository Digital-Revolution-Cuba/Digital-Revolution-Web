# Clip shapes: polígono simple

Cómo ajustar la forma de polígono en `.rounded-rhombus-left`.

## Uso

Aplica la clase `rounded-rhombus-left` al wrapper de la imagen:

```html
<div class="rounded-rhombus-left">
  <img src="..." alt="..." />
</div>
```

## Ajustar forma

Edita directamente en `src/styles/global.css`:

```css
.rounded-rhombus-left {
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
}
```

Cada par representa un vértice (x% y%):

- `25% 0%` — top-left
- `100% 0%` — top-right
- `75% 100%` — bottom-right
- `0% 100%` — bottom-left

Para ajustar por instancia, usa inline:

```html
<div style="clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);">
  <!-- imagen -->
</div>
```

## Herramientas útiles

- [Clippy](https://bennettfeely.com/clippy/) — generador visual de clip-path
- DevTools — edita valores en vivo y copia el resultado

---

Archivo actualizado para mantener solo lo esencial.
