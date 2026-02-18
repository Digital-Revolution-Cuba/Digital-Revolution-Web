import type { AccordeonCard } from '../types/accordeon.types';

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
    image: '/images/talents/avatars/artist-01.jpg',
    alt: 'Artista Digital - Ilustración creativa',
    backText: 'Artista Digital',
  },
  {
    id: 2,
    image: '/images/talents/avatars/artist-02.jpg',
    alt: 'Ilustrador - Arte conceptual',
    backText: 'Ilustrador',
  },
  {
    id: 3,
    image: '/images/talents/avatars/artist-03.jpg',
    alt: 'Diseñador - Diseño gráfico moderno',
    backText: 'Diseñador',
  },
  {
    id: 4,
    image: '/images/talents/avatars/artist-04.jpg',
    alt: 'Fotógrafo - Fotografía artística',
    backText: 'Fotógrafo',
  },
  {
    id: 5,
    image: '/images/talents/avatars/artist-05.jpg',
    alt: 'Animador - Animación 2D',
    backText: 'Animador',
  },
  {
    id: 6,
    image: '/images/talents/avatars/artist-06.jpg',
    alt: 'Músico - Producción musical',
    backText: 'Músico',
  },
  {
    id: 7,
    image: '/images/talents/avatars/artist-07.jpg',
    alt: 'Escritor - Narrativa creativa',
    backText: 'Escritor',
  },
  {
    id: 8,
    image: '/images/talents/avatars/artist-08.jpg',
    alt: 'Cineasta - Producción audiovisual',
    backText: 'Cineasta',
  },
  {
    id: 9,
    image: '/images/talents/avatars/artist-09.jpg',
    alt: 'Escultor - Arte tridimensional',
    backText: 'Escultor',
  },
] as const;
