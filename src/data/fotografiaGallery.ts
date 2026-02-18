import type { FotografiaGalleryItem } from "./types";

/**
 * Fotografía gallery data.
 *
 * Each entry represents a photo in the "Fotografía" category.
 * Images are served from `public/` so paths start from the root.
 *
 * @example
 * // To change a photo:
 * { image: '/images/gallery/fotografia/my-photo.jpg', ... }
 */
export const fotografiaGallery: readonly FotografiaGalleryItem[] = [
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-1.svg",
    title: "Urban Landscape",
    photographer: "Carlos Méndez",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-2.svg",
    title: "Portrait Series",
    photographer: "Ana García",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-3.svg",
    title: "Nature Study",
    photographer: "Luis Rodríguez",
    date: "2023",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-4.svg",
    title: "Street Photography",
    photographer: "María López",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-5.svg",
    title: "Architectural Study",
    photographer: "José Martínez",
    date: "2023",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-6.svg",
    title: "Abstract Composition",
    photographer: "Elena Torres",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-7.svg",
    title: "Documentary Project",
    photographer: "Roberto Sánchez",
    date: "2023",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-8.svg",
    title: "Light and Shadow",
    photographer: "Carmen Ruiz",
    date: "2024",
  },
] as const;
