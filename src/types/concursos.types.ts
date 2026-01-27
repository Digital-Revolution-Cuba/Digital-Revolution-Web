/**
 * Type definitions for Concursos (Contests)
 * Defines the structure for contest entries in the community
 */

/**
 * Contest status enum
 */
export type ConcursoStatus = 'activo' | 'proximo' | 'finalizado' | 'cerrado';

/**
 * Contest category types
 */
export type ConcursoCategory =
  | 'fotografia'
  | 'musica'
  | 'arte-digital'
  | 'ilustracion'
  | 'diseno-grafico'
  | 'video'
  | 'escritura';

/**
 * Prize structure for contests
 */
export interface Premio {
  position: number;
  prize: string;
  value?: string;
}

/**
 * Requirement item for contest participation
 */
export interface Requisito {
  id: string;
  description: string;
}

/**
 * Contest date information
 */
export interface FechasConcurso {
  inicio: Date;
  cierre: Date;
  resultados?: Date;
}

/**
 * Full contest data structure
 */
export interface ConcursoData {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ConcursoCategory;
  status: ConcursoStatus;
  image: string;
  imageAlt: string;

  // Dates
  fechas: FechasConcurso;

  // Details
  premios: Premio[];
  requisitos: Requisito[];

  // Participation
  participationLink?: string;
  maxParticipants?: number;
  currentParticipants?: number;

  // Additional info
  organizer?: string;
  tags?: string[];
  featured?: boolean;
}

/**
 * Simplified contest card data for listings
 */
export interface ConcursoCardData {
  id: string;
  slug: string;
  title: string;
  category: ConcursoCategory;
  status: ConcursoStatus;
  image: string;
  imageAlt: string;
  fechaCierre: Date;
  featured?: boolean;
}
