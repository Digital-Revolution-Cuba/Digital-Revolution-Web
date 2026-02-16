/**
 * Datos de prueba para la sección de Colaboraciones Destacadas
 */

export interface ColaboracionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  ctaLink: string;
  ctaText: string;
}

export const colaboracionesData: ColaboracionItem[] = [
  {
    id: 'colab-1',
    title: 'Corto Animado "Eclipse"',
    description: 'Proyecto audiovisual colaborativo entre artistas.',
    imageUrl: 'https://picsum.photos/seed/colab1/400/300',
    altText: 'Corto Animado Eclipse',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'colab-2',
    title: 'Corto Animado "Eclipse"',
    description: 'Proyecto audiovisual colaborativo entre artistas.',
    imageUrl: 'https://picsum.photos/seed/colab2/400/300',
    altText: 'Corto Animado Eclipse',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'colab-3',
    title: 'Corto Animado "Eclipse"',
    description: 'Proyecto audiovisual colaborativo entre artistas.',
    imageUrl: 'https://picsum.photos/seed/colab3/400/300',
    altText: 'Corto Animado Eclipse',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'colab-4',
    title: 'Proyecto Musical "Synth Wave"',
    description: 'Colaboración entre productores y artistas visuales.',
    imageUrl: 'https://picsum.photos/seed/colab4/400/300',
    altText: 'Proyecto Musical Synth Wave',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'colab-5',
    title: 'Exposición "Digital Dreams"',
    description: 'Muestra colectiva de arte digital contemporáneo.',
    imageUrl: 'https://picsum.photos/seed/colab5/400/300',
    altText: 'Exposición Digital Dreams',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'colab-6',
    title: 'Documental "Creativos"',
    description: 'Serie documental sobre artistas emergentes.',
    imageUrl: 'https://picsum.photos/seed/colab6/400/300',
    altText: 'Documental Creativos',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
];
