# 📸 Images Directory Structure

This directory contains all static images for the Digital Revolution Web project, organized by section for easy management and maintenance.

---

## 📁 Directory Structure

```
images/
├── README.md                          # This file
│
├── home/                              # 🏠 Homepage images
│   ├── hero-bg.jpg                   # Hero section background
│   ├── hero-featured-1.jpg           # Featured carousel item 1
│   ├── hero-featured-2.jpg           # Featured carousel item 2
│   └── hero-featured-3.jpg           # Featured carousel item 3
│
├── gallery/                           # 🎨 Gallery section images
│   ├── arte/                         # Digital art works
│   │   ├── placeholder.jpg           # Default placeholder
│   │   └── [artist]-[title].jpg      # Format: gloria-abstract-01.jpg
│   ├── fotografia/                   # Photography works
│   │   ├── placeholder.jpg
│   │   └── [photographer]-[title].jpg
│   ├── musica/                       # Music album covers
│   │   ├── placeholder.jpg
│   │   └── [artist]-[album].jpg
│   └── codigo/                       # Code project screenshots
│       ├── placeholder.jpg
│       └── [project]-screenshot.jpg
│
├── talents/                           # 👤 Talent profiles
│   ├── avatars/                      # Profile pictures
│   │   ├── placeholder-avatar.jpg    # Default avatar (400x400px)
│   │   └── [username].jpg            # Format: username.jpg
│   └── covers/                       # Profile cover images
│       ├── placeholder-cover.jpg     # Default cover (1200x400px)
│       └── [username]-cover.jpg
│
├── concursos/                         # 🏆 Contests section
│   ├── activos/                      # Active contests
│   │   └── [contest-name].jpg        # Format: foto-2026-febrero.jpg
│   ├── anteriores/                   # Past contests
│   │   └── [contest-name].jpg
│   └── ganadores/                    # Winner submissions
│       └── [contest]-[position]-[author].jpg  # Format: foto-2025-1st-carlos.jpg
│
├── colaboraciones/                    # 🤝 Collaboration projects
│   └── [project-name].jpg            # Format: eclipse-animation.jpg
│
├── og/                                # 🔗 Open Graph images (SEO)
│   ├── og-home.jpg                   # Homepage OG (1200x630px)
│   ├── og-galeria.jpg                # Gallery OG
│   ├── og-talentos.jpg               # Talents OG
│   ├── og-concursos.jpg              # Contests OG
│   └── og-colaboraciones.jpg         # Collaborations OG
│
└── brand/                             # 🎨 Brand assets
    ├── logo.svg                      # Main logo
    ├── logo-alt.svg                  # Alternative logo
    ├── logo-white.svg                # White version (dark backgrounds)
    └── isotipo.svg                   # Isotipo/icon only
```

---

## 📐 Image Specifications

### Required Formats & Sizes

| Category | Recommended Size | Format | Notes |
|----------|-----------------|--------|-------|
| **Hero Background** | 1920x1080px | JPG/WebP | Optimize for <500KB |
| **Gallery Items** | 800x600px | JPG/WebP/AVIF | Maintain aspect ratio |
| **Profile Avatars** | 400x400px | JPG/WebP | Square, faces centered |
| **Profile Covers** | 1200x400px | JPG/WebP | 3:1 aspect ratio |
| **Contest Banners** | 1200x630px | JPG/WebP | 1.91:1 aspect ratio |
| **OG Images** | 1200x630px | JPG | Required for social sharing |
| **Brand Logos** | Vector | SVG | Scalable, <50KB |

### Image Optimization Guidelines

- **Compression**: Use tools like TinyPNG or Squoosh.app
- **Max file size**: 
  - Hero/Background: <500KB
  - Gallery/Thumbnails: <200KB
  - Avatars: <100KB
  - OG Images: <300KB
- **Formats**: 
  - Prefer WebP for web
  - Use AVIF for modern browsers
  - Keep JPG as fallback
  - SVG for logos/icons

---

## 🏷️ Naming Conventions

### General Rules

- **Lowercase only**: `hero-image.jpg` ✅ | `Hero-Image.jpg` ❌
- **Hyphens not underscores**: `user-avatar.jpg` ✅ | `user_avatar.jpg` ❌
- **Descriptive names**: `concert-stage-view.jpg` ✅ | `img123.jpg` ❌
- **No spaces**: `my-photo.jpg` ✅ | `my photo.jpg` ❌
- **No special characters**: Avoid `ñ`, `á`, `@`, `#`, etc.

### Specific Patterns

```bash
# Gallery items
[artist-name]-[title-or-number].jpg
# Examples:
gloria-abstract-01.jpg
carlos-landscape-mountains.jpg

# Profile avatars
[username].jpg
# Examples:
johndoe.jpg
maria-garcia.jpg

# Profile covers
[username]-cover.jpg
# Examples:
johndoe-cover.jpg
maria-garcia-cover.jpg

# Contest images
[contest-slug]-[year]-[month].jpg
# Examples:
fotografia-2026-febrero.jpg
arte-digital-2026-marzo.jpg

# Contest winners
[contest-slug]-[position]-[author].jpg
# Examples:
foto-2025-1st-carlos.jpg
arte-2025-2nd-sofia.jpg

# Collaboration projects
[project-slug].jpg
# Examples:
eclipse-animation.jpg
synth-wave-album.jpg
```

---

## 🔄 How to Add Images

### For Developers

1. **Optimize the image** using [Squoosh](https://squoosh.app/) or similar
2. **Rename following conventions** (see above)
3. **Place in appropriate directory**
4. **Update data file** (`src/data/*.ts`) with new image path

#### Example: Adding a new gallery item

```typescript
// src/data/arteGallery.ts
export const arteGallery: ArteGalleryItem[] = [
  // ... existing items
  {
    type: 'arte',
    image: '/images/gallery/arte/gloria-abstract-02.jpg', // ← New image
    title: 'Abstract 02',
    artistName: 'Gloria',
    artistRole: 'Ilustradora y Animadora 2D',
  },
];
```

### For Content Managers

1. **Get optimized image** from designer
2. **Check naming convention** matches pattern
3. **Upload to correct folder** via Git or CMS
4. **Request developer** to update data files

---

## 🎨 Placeholder Images

Each category has a placeholder image for missing content:

- `gallery/arte/placeholder.jpg`
- `gallery/fotografia/placeholder.jpg`
- `gallery/musica/placeholder.jpg`
- `gallery/codigo/placeholder.jpg`
- `talents/avatars/placeholder-avatar.jpg`
- `talents/covers/placeholder-cover.jpg`

**To create placeholders:**

```bash
# Use placekitten.com, unsplash.com, or create in Figma
# Recommended tools:
- https://placeholder.com/
- https://picsum.photos/
- https://loremflickr.com/
```

---

## 📊 Image Usage in Code

### In Astro Components

```astro
---
// For images in /public, use absolute paths
const imagePath = '/images/gallery/arte/gloria-abstract-01.jpg';
---

<img 
  src={imagePath} 
  alt="Abstract art by Gloria"
  width="800"
  height="600"
  loading="lazy"
/>
```

### In TypeScript Data Files

```typescript
// src/data/arteGallery.ts
export const arteGallery: ArteGalleryItem[] = [
  {
    type: 'arte',
    image: '/images/gallery/arte/gloria-abstract-01.jpg', // Absolute path from /public
    title: 'Abstract 01',
    artistName: 'Gloria',
    artistRole: 'Ilustradora',
  },
];
```

### In Content Collections (JSON)

```json
// src/content/talents/username.json
{
  "name": "Gloria",
  "role": "Ilustradora",
  "image": "/images/talents/avatars/gloria.jpg",
  "coverImage": "/images/talents/covers/gloria-cover.jpg"
}
```

---

## ✅ Image Checklist

Before adding an image, verify:

- [ ] Image is optimized (<500KB for large images, <200KB for thumbnails)
- [ ] Filename follows naming conventions (lowercase, hyphens, descriptive)
- [ ] Placed in correct directory
- [ ] Alt text will be provided in code
- [ ] Dimensions match specifications
- [ ] Format is appropriate (WebP/JPG for photos, SVG for logos)
- [ ] Data file updated with new image path

---

## 🔗 Related Documentation

- [Component Reference](../../docs/reference/components/README.md)
- [Data Models](../../docs/reference/api/data-models.md)
- [Content Collections](../../docs/reference/content-collections.md)
- [Performance Optimization](../../docs/explanation/performance-strategy.md)

---

## 📮 Need Help?

Questions about image management?

- Check [How-To Guides](../../docs/how-to/)
- Ask in [GitHub Discussions](https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/discussions)
- Contact: [developers@digitalrevolution.cu](mailto:developers@digitalrevolution.cu)
