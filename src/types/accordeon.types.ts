/**
 * Type definitions for the Accordion Slider component.
 *
 * Follows TypeScript best practices:
 * - Readonly properties for immutable data
 * - Strict typing with no `any`
 * - Descriptive property names
 */

/** A single card displayed in the accordion slider */
export interface AccordeonCard {
  readonly id: number;
  /** Path to the card's image (relative to public/) */
  readonly image: string;
  /** Alt text for accessibility */
  readonly alt: string;
  /** Text displayed on the back of the card when flipped */
  readonly backText: string;
}

/** Configuration for the accordion slider pagination and animation */
export interface AccordeonConfig {
  /** Number of cards displayed per page/dot */
  readonly cardsPerPage: number;
  /** Duration of the exit animation in milliseconds */
  readonly exitAnimationDuration: number;
  /** Duration of the entrance animation in milliseconds */
  readonly enterAnimationDuration: number;
  /** Delay between each card's staggered animation in milliseconds */
  readonly staggerDelay: number;
  /** Auto-rotation interval in milliseconds (0 to disable) */
  readonly autoRotateInterval: number;
  /** Duration before mobile flip auto-reverts in milliseconds */
  readonly mobileFlipDuration: number;
}

/** Represents a page of accordion cards */
export interface AccordeonPage {
  readonly index: number;
  readonly cards: readonly AccordeonCard[];
}
