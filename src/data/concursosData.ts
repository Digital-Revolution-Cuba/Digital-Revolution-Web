/**
 * Concursos card data.
 *
 * Each entry represents a contest shown in the "Concursos Activos" slider.
 *
 * To add / remove a contest, edit this array.
 * Images are served from `public/` so paths start from the root
 * (e.g. "/images/concursos/photo.jpg").
 *
 * @example
 * // To add a new contest:
 * { id: 'concurso-7', title: 'Nuevo Concurso', ... }
 */

/** Shape of a single contest card displayed in the slider */
export interface ConcursoItem {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  /** Path or URL to the card image */
  readonly imageUrl: string;
  /** Alt text for accessibility */
  readonly altText: string;
  readonly ctaLink: string;
  readonly ctaText: string;
}

export const concursosData: readonly ConcursoItem[] = [
  {
    id: "concurso-1",
    title: "Concurso de Fotografía",
    date: "15 de Mayo",
    imageUrl: "/images/concursos/concurso-fotografia.jpg",
    altText: "Concurso de Fotografía",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "concurso-2",
    title: "Concurso de Arte Digital",
    date: "30 de Abril",
    imageUrl: "/images/concursos/concurso-arte-digital.jpg",
    altText: "Concurso de Arte Digital",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "concurso-3",
    title: "Concurso de Arte Digital",
    date: "30 de Abril",
    imageUrl: "/images/concursos/concurso-arte-digital-2.jpg",
    altText: "Concurso de Arte Digital",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "concurso-4",
    title: "Concurso de Ilustración",
    date: "20 de Junio",
    imageUrl: "/images/concursos/concurso-ilustracion.jpg",
    altText: "Concurso de Ilustración",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "concurso-5",
    title: "Concurso de Diseño Gráfico",
    date: "10 de Julio",
    imageUrl: "/images/concursos/concurso-diseno.jpg",
    altText: "Concurso de Diseño Gráfico",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
  {
    id: "concurso-6",
    title: "Concurso de Música",
    date: "25 de Agosto",
    imageUrl: "/images/concursos/concurso-musica.jpg",
    altText: "Concurso de Música",
    ctaLink: "#",
    ctaText: "Ver Más",
  },
] as const;
