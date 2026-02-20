/**
 * Shared type definitions for card slider components.
 *
 * Used by Concursos, Colaboraciones, and any future slider section
 * that follows the same pagination pattern.
 *
 * Follows TypeScript best practices:
 * - Readonly properties for immutable config
 * - Strict typing with no `any`
 */

/** Responsive cards-per-page configuration */
export interface ResponsiveCardsPerPage {
  readonly mobile: number;
  readonly tablet: number;
  readonly desktop: number;
}

/** Viewport breakpoints in pixels */
export interface Breakpoints {
  readonly mobile: number;
  readonly tablet: number;
}

/** Centralised slider configuration */
export interface SliderConfig {
  readonly cardsPerPage: ResponsiveCardsPerPage;
  readonly breakpoints: Breakpoints;
  readonly transitionDuration: number;
  readonly resizeDebounce: number;
}
