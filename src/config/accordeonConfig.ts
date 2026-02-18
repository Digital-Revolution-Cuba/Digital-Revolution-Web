import type { AccordeonConfig } from "../types/accordeon.types";

/**
 * Default configuration for the Accordion Slider.
 *
 * Centralized config makes it easy to tweak behavior
 * without modifying component or logic files.
 */
export const accordeonConfig: AccordeonConfig = {
  cardsPerPage: 3,
  exitAnimationDuration: 400,
  enterAnimationDuration: 450,
  staggerDelay: 60,
  autoRotateInterval: 10_000,
  mobileFlipDuration: 4_000,
} as const;
