---
name: 'meta-tags'
description: 'Genera metatags y JSON-LD para SEO'
---

# Prompt: Meta Tags & JSON-LD Generator

Genera metatags y datos estructurados para SEO.

## Input Variables

- `title`: Título de la página
- `description`: Descripción (max 160 caracteres)
- `url`: URL canónica de la página
- `image`: URL de la imagen OG

## Output

Snippet HTML con:

1. `<title>` tag
2. `<meta name="description">` 
3. OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`)
4. Twitter Card tags
5. JSON-LD script para `WebSite` o `Article`

## Example Output

```html
<title>{title} | Digital Revolution</title>
<meta name="description" content="{description}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{image}" />
<meta property="og:url" content="{url}" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{title}",
  "url": "{url}"
}
</script>
```
