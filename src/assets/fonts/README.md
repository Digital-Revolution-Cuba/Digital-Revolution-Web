# Fonts

This folder contains self-hosted web fonts for the Digital Revolution Web project.

## Font Files Required

Download these font files from [google-webfonts-helper](https://gwfh.mranftl.com/fonts) and place them in `public/fonts/`:

### Roboto
- `roboto-regular.woff2` (400) 
- `roboto-medium.woff2` (500)
- `roboto-bold.woff2` (700)

### Inter
- `inter-variable-font-slnt-wght.woff2` (100-900)

### Impact
- `Impact.woff2`

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
