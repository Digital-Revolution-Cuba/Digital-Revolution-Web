/**
 * Concursos configuration constants
 * Centralized configuration for contest categories, statuses, and labels
 */

import type { ConcursoCategory, ConcursoStatus } from "../types/concursos.types";

/**
 * Category options for filtering
 */
export const CATEGORIES: Array<{ value: ConcursoCategory; label: string }> = [
  { value: "fotografia", label: "Fotografía" },
  { value: "musica", label: "Música" },
  { value: "arte-digital", label: "Arte Digital" },
  { value: "ilustracion", label: "Ilustración" },
  { value: "diseno-grafico", label: "Diseño Gráfico" },
  { value: "video", label: "Video" },
  { value: "escritura", label: "Escritura" },
];

/**
 * Status options for filtering
 */
export const STATUSES: Array<{ value: ConcursoStatus; label: string }> = [
  { value: "activo", label: "Activo" },
  { value: "proximo", label: "Próximamente" },
  { value: "finalizado", label: "Finalizado" },
  { value: "cerrado", label: "Cerrado" },
];

/**
 * Category label mapping
 */
export const CATEGORY_LABELS: Record<ConcursoCategory, string> = {
  fotografia: "Fotografía",
  musica: "Música",
  "arte-digital": "Arte Digital",
  ilustracion: "Ilustración",
  "diseno-grafico": "Diseño Gráfico",
  video: "Video",
  escritura: "Escritura",
};

/**
 * Status configuration with labels and CSS classes
 */
export const STATUS_CONFIG: Record<ConcursoStatus, { label: string; class: string }> = {
  activo: { label: "Activo", class: "status-active" },
  proximo: { label: "Próximamente", class: "status-upcoming" },
  finalizado: { label: "Finalizado", class: "status-finished" },
  cerrado: { label: "Cerrado", class: "status-closed" },
};

/**
 * Status priority for sorting
 */
export const STATUS_PRIORITY: Record<ConcursoStatus, number> = {
  activo: 1,
  proximo: 2,
  finalizado: 3,
  cerrado: 4,
};
