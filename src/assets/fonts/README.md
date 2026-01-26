# Fonts

This folder contains self-hosted web fonts for the Digital Revolution Web project.

## Font Files Required

Download these font files from [google-webfonts-helper](https://gwfh.mranftl.com/fonts) and place them in `public/fonts/`:

### Barlow Semi Condensed

- `barlow-semi-condensed-v15-latin-regular.woff2` (400)
- `barlow-semi-condensed-v15-latin-regular.woff` (400)
- `barlow-semi-condensed-v15-latin-600.woff2` (600)
- `barlow-semi-condensed-v15-latin-600.woff` (600)
- `barlow-semi-condensed-v15-latin-700.woff2` (700)
- `barlow-semi-condensed-v15-latin-700.woff` (700)

### Rubik

- `rubik-v28-latin-regular.woff2` (400)
- `rubik-v28-latin-regular.woff` (400)
- `rubik-v28-latin-700.woff2` (700)
- `rubik-v28-latin-700.woff` (700)

### Saira Stencil One

- `saira-stencil-one-v16-latin-regular.woff2` (400)
- `saira-stencil-one-v16-latin-regular.woff` (400)

## Instructions

1. Visit <https://gwfh.mranftl.com/fonts>
2. Search for each font family
3. Select only the weights needed (400, 600, 700)
4. Select charsets: latin
5. Download WOFF2 and WOFF formats
6. Place files in `public/fonts/` directory
7. Font files will be served from `/fonts/` in production

## Why Self-Hosted?

- **Performance:** Eliminates render-blocking Google Fonts requests
- **Privacy:** No tracking from external CDN
- **Reliability:** Works offline and in restricted networks
- **Control:** font-display: swap prevents FOIT (Flash of Invisible Text)

## Total Size

Estimated: ~200 KB (compressed WOFF2 format)
