import type { AccordeonCard } from "../types/accordeon.types";

/**
 * Accordion card data.
 *
 * Each card has a unique image. To change a card's image:
 * 1. Place the new image in `public/images/talents/avatars/`
 * 2. Update the `image` path below
 *
 * Images are served from the `public/` directory, so paths
 * are relative to that root (e.g., "/images/talents/avatars/photo.jpg").
 *
 * @example
 * // To change card 1's image:
 * { id: 1, image: '/images/talents/avatars/my-new-photo.jpg', ... }
 */
export const accordeonCards: readonly AccordeonCard[] = [
  {
    id: 1,
    image: "/images/talents/avatars/avatar-1.svg",
    alt: "Artista Digital - Ilustración creativa",
    backText: "Artista Digital",
  },
  {
    id: 2,
    image: "/images/talents/avatars/avatar-1.svg",
    alt: "Ilustrador - Arte conceptual",
    backText: "Ilustrador",
  },
  {
    id: 3,
    image: "/images/talents/avatars/avatar-1.svg",
    alt: "Diseñador - Diseño gráfico moderno",
    backText: "Diseñador",
  },
  {
    id: 4,
    image: "/images/talents/avatars/avatar-2.svg",
    alt: "Fotógrafo - Fotografía artística",
    backText: "Fotógrafo",
  },
  {
    id: 5,
    image: "/images/talents/avatars/avatar-2.svg",
    alt: "Animador - Animación 2D",
    backText: "Animador",
  },
  {
    id: 6,
    image: "/images/talents/avatars/avatar-2.svg",
    alt: "Músico - Producción musical",
    backText: "Músico",
  },
  {
    id: 7,
    image: "/images/talents/avatars/avatar-3.svg",
    alt: "Escritor - Narrativa creativa",
    backText: "Escritor",
  },
  {
    id: 8,
    image: "/images/talents/avatars/avatar-3.svg",
    alt: "Cineasta - Producción audiovisual",
    backText: "Cineasta",
  },
  {
    id: 9,
    image: "/images/talents/avatars/avatar-3.svg",
    alt: "Escultor - Arte tridimensional",
    backText: "Escultor",
  },
] as const;
