/**
 * Datos de prueba para la sección de Concursos Activos
 */

export interface ConcursoItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  altText: string;
  ctaLink: string;
  ctaText: string;
}

export const concursosData: ConcursoItem[] = [
  {
    id: 'concurso-1',
    title: 'Concurso de Fotografía',
    date: '15 de Mayo',
    imageUrl: 'https://picsum.photos/seed/concurso1/400/300',
    altText: 'Concurso de Fotografía',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'concurso-2',
    title: 'Concurso de Arte Digital',
    date: '30 de Abril',
    imageUrl: 'https://picsum.photos/seed/concurso2/400/300',
    altText: 'Concurso de Arte Digital',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'concurso-3',
    title: 'Concurso de Arte Digital',
    date: '30 de Abril',
    imageUrl: 'https://picsum.photos/seed/concurso3/400/300',
    altText: 'Concurso de Arte Digital',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'concurso-4',
    title: 'Concurso de Ilustración',
    date: '20 de Junio',
    imageUrl: 'https://picsum.photos/seed/concurso4/400/300',
    altText: 'Concurso de Ilustración',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'concurso-5',
    title: 'Concurso de Diseño Gráfico',
    date: '10 de Julio',
    imageUrl: 'https://picsum.photos/seed/concurso5/400/300',
    altText: 'Concurso de Diseño Gráfico',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
  {
    id: 'concurso-6',
    title: 'Concurso de Música',
    date: '25 de Agosto',
    imageUrl: 'https://picsum.photos/seed/concurso6/400/300',
    altText: 'Concurso de Música',
    ctaLink: '#',
    ctaText: 'Ver Más',
  },
];
