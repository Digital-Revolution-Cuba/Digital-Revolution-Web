/**
 * Colaboraciones Destacadas card data.
 *
 * Each entry represents a collaboration shown in the slider.
 *
 * To add / remove a collaboration, edit this array.
 * Images are served from `public/` so paths start from the root
 * (e.g. "/images/colaboraciones/photo.jpg").
 *
 * @example
 * // To add a new collaboration:
 * { id: 'colab-7', title: 'Nuevo Proyecto', ... }
 */

/** Shape of a single collaboration card displayed in the slider */
export interface ColaboracionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** Path or URL to the card image */
  readonly imageUrl: string;
  /** Alt text for accessibility */
  readonly altText: string;
  readonly ctaLink: string;
  readonly ctaText: string;
}

export const colaboracionesData: readonly ColaboracionItem[] = [
  {
    id: "colab-1",
    title: 'Corto Animado "Eclipse"',
    description: "Proyecto audiovisual colaborativo entre artistas.",
    imageUrl: "/images/colaboraciones/corto-eclipse.svg",
    altText: "Corto Animado Eclipse",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "colab-2",
    title: 'Corto Animado "Eclipse"',
    description: "Proyecto audiovisual colaborativo entre artistas.",
    imageUrl: "/images/colaboraciones/corto-eclipse-2.svg",
    altText: "Corto Animado Eclipse",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "colab-3",
    title: 'Corto Animado "Eclipse"',
    description: "Proyecto audiovisual colaborativo entre artistas.",
    imageUrl: "/images/colaboraciones/corto-eclipse-3.svg",
    altText: "Corto Animado Eclipse",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "colab-4",
    title: 'Proyecto Musical "Synth Wave"',
    description: "Colaboración entre productores y artistas visuales.",
    imageUrl: "/images/colaboraciones/synth-wave.svg",
    altText: "Proyecto Musical Synth Wave",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "colab-5",
    title: 'Exposición "Digital Dreams"',
    description: "Muestra colectiva de arte digital contemporáneo.",
    imageUrl: "/images/colaboraciones/digital-dreams.svg",
    altText: "Exposición Digital Dreams",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "colab-6",
    title: 'Documental "Creativos"',
    description: "Serie documental sobre artistas emergentes.",
    imageUrl: "/images/colaboraciones/documental-creativos.svg",
    altText: "Documental Creativos",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
] as const;
