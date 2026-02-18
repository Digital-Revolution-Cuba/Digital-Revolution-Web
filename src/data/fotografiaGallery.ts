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
    image: "/images/gallery/fotografia/photo-1.jpg",
    title: "Urban Landscape",
    photographer: "Carlos Méndez",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-2.jpg",
    title: "Portrait Series",
    photographer: "Ana García",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-3.jpg",
    title: "Nature Study",
    photographer: "Luis Rodríguez",
    date: "2023",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-4.jpg",
    title: "Street Photography",
    photographer: "María López",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-5.jpg",
    title: "Architectural Study",
    photographer: "José Martínez",
    date: "2023",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-6.jpg",
    title: "Abstract Composition",
    photographer: "Elena Torres",
    date: "2024",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-7.jpg",
    title: "Documentary Project",
    photographer: "Roberto Sánchez",
    date: "2023",
  },
  {
    type: "fotografia",
    image: "/images/gallery/fotografia/photo-8.jpg",
    title: "Light and Shadow",
    photographer: "Carmen Ruiz",
    date: "2024",
  },
] as const;
