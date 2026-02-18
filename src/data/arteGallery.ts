import type { ArteGalleryItem } from "./types";

/**
 * Arte gallery data.
 *
 * Each entry represents an art piece in the "Arte" category.
 * Images are served from `public/` so paths start from the root.
 *
 * @example
 * // To change an image:
 * { image: '/images/gallery/arte/my-new-artwork.jpg', ... }
 */
export const arteGallery: readonly ArteGalleryItem[] = [
  {
    type: "arte",
    image: "/images/gallery/arte/arte-1.jpg",
    title: "Arte Digital 1",
    artistName: "Gloria",
    artistRole: "Ilustradora y Animadora 2D",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-2.jpg",
    title: "Arte Digital 2",
    artistName: "Sofía Martínez",
    artistRole: "Artista Digital",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-3.jpg",
    title: "Arte Digital 3",
    artistName: "Carlos Ruiz",
    artistRole: "Ilustrador Conceptual",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-4.jpg",
    title: "Arte Digital 4",
    artistName: "Ana López",
    artistRole: "Diseñadora Gráfica",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-5.jpg",
    title: "Arte Digital 5",
    artistName: "Miguel Torres",
    artistRole: "Artista 3D",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-6.jpg",
    title: "Arte Digital 6",
    artistName: "Laura Sánchez",
    artistRole: "Ilustradora Editorial",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-7.jpg",
    title: "Arte Digital 7",
    artistName: "Diego Ramírez",
    artistRole: "Character Designer",
  },
  {
    type: "arte",
    image: "/images/gallery/arte/arte-8.jpg",
    title: "Arte Digital 8",
    artistName: "Valentina Cruz",
    artistRole: "Concept Artist",
  },
] as const;
