/**
 * Concursos utility functions
 * Shared utilities for contest operations
 */

import type { CollectionEntry } from 'astro:content';
import { STATUS_PRIORITY } from '../config/concursosConfig';

/**
 * Format a date to Spanish locale string
 * @param date - Date to format
 * @returns Formatted date string (e.g., "15 de febrero de 2026")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Sort contests by featured status and then by status priority
 * @param contests - Array of contest entries
 * @returns Sorted array of contests
 */
export function sortConcursos(
  contests: CollectionEntry<'concursos'>[],
): CollectionEntry<'concursos'>[] {
  return [...contests].sort((a, b) => {
    // Featured first
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;

    // Then by status priority
    return STATUS_PRIORITY[a.data.status] - STATUS_PRIORITY[b.data.status];
  });
}

/**
 * Filter contests by search query
 * Searches in title, description, and tags
 * @param contests - Array of contest entries
 * @param query - Search query string
 * @returns Filtered array of contests
 */
export function filterBySearch(
  contests: CollectionEntry<'concursos'>[],
  query: string,
): CollectionEntry<'concursos'>[] {
  if (!query) return contests;

  const lowerQuery = query.toLowerCase();

  return contests.filter((concurso) => {
    return (
      concurso.data.title.toLowerCase().includes(lowerQuery) ||
      concurso.data.description.toLowerCase().includes(lowerQuery) ||
      concurso.data.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Filter contests by category
 * @param contests - Array of contest entries
 * @param category - Category to filter by (null for all)
 * @returns Filtered array of contests
 */
export function filterByCategory(
  contests: CollectionEntry<'concursos'>[],
  category: string | null,
): CollectionEntry<'concursos'>[] {
  if (!category) return contests;

  return contests.filter((concurso) => concurso.data.category === category);
}

/**
 * Filter contests by status
 * @param contests - Array of contest entries
 * @param status - Status to filter by (null for all)
 * @returns Filtered array of contests
 */
export function filterByStatus(
  contests: CollectionEntry<'concursos'>[],
  status: string | null,
): CollectionEntry<'concursos'>[] {
  if (!status) return contests;

  return contests.filter((concurso) => concurso.data.status === status);
}

/**
 * Calculate total value of prizes
 * @param premios - Array of prize objects
 * @returns Total value in number
 */
export function calcularValorPremios(
  premios: Array<{ value?: string }>,
): number {
  return premios.reduce((total, premio) => {
    if (!premio.value) return total;
    const match = premio.value.match(/\$?([\d,]+)/);
    if (match) {
      return total + parseInt(match[1].replace(/,/g, ''), 10);
    }
    return total;
  }, 0);
}

/**
 * Format prize total to display string
 * @param total - Total prize amount
 * @returns Formatted string (e.g., "$15K+")
 */
export function formatPrizeTotal(total: number): string {
  if (total === 0) return '$15K+';
  return `$${(total / 1000).toFixed(0)}K+`;
}
