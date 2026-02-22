/**
 * Type definitions for Colaboraciones (Collaborations)
 * Used across the colaboraciones section of Digital Revolution Web
 */

/**
 * Status of a collaboration
 */
export type ColaboracionStatus =
  | 'activa'
  | 'finalizada'
  | 'pausada'
  | 'planificada';

/**
 * Area or category of collaboration
 */
export type ColaboracionArea =
  | 'arte'
  | 'musica'
  | 'tecnologia'
  | 'educacion'
  | 'contenido'
  | 'eventos'
  | 'investigacion';

/**
 * Type of partner organization
 */
export type PartnerType =
  | 'Empresa'
  | 'ONG'
  | 'Institución'
  | 'Comunidad'
  | 'Organización';

/**
 * Partner organization information
 */
export interface Partner {
  name: string;
  type: string;
  logo?: string;
  website?: string;
}

/**
 * Participant in a collaboration
 */
export interface Participant {
  name: string;
  role: string;
  avatar?: string;
}

/**
 * Impact metric for a collaboration
 */
export interface ImpactoMetric {
  metric: string;
  value: string;
}

/**
 * Date range for collaboration
 */
export interface FechasColaboracion {
  inicio: Date;
  fin?: Date;
}

/**
 * Complete collaboration data structure
 */
export interface ColaboracionData {
  // Identification
  id: string;
  slug: string;
  title: string;
  description: string;
  descriptionLong?: string;

  // Classification
  status: ColaboracionStatus;
  areas: ColaboracionArea[];

  // Partner
  partner: Partner;

  // Visual
  image: string;
  imageAlt: string;

  // Dates
  fechas: FechasColaboracion;

  // Details
  participants: Participant[];
  impacto: ImpactoMetric[];
  objetivos: string[];

  // Links
  externalLink?: string;
  repositoryLink?: string;
  caseStudyLink?: string;

  // Metadata
  tags: string[];
  featured: boolean;
}

/**
 * Simplified data for collaboration cards
 */
export interface ColaboracionCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ColaboracionStatus;
  areas: ColaboracionArea[];
  partner: Partner;
  image: string;
  imageAlt: string;
  fechaInicio: Date;
  featured: boolean;
}

/**
 * Category label mapping for areas
 */
export const areaLabels: Record<ColaboracionArea, string> = {
  arte: 'Arte',
  musica: 'Música',
  tecnologia: 'Tecnología',
  educacion: 'Educación',
  contenido: 'Contenido',
  eventos: 'Eventos',
  investigacion: 'Investigación',
};

/**
 * Status label and styling configuration
 */
export const statusLabels: Record<ColaboracionStatus, string> = {
  activa: 'Activa',
  finalizada: 'Finalizada',
  pausada: 'Pausada',
  planificada: 'Planificada',
};
