/**
 * Colaboraciones Slider configuration constants.
 *
 * Centralizes layout settings so the component and its
 * initializer stay free of magic numbers.
 *
 * To tweak slider behaviour, edit the values below —
 * no need to touch the component or client initializer.
 */

import type { SliderConfig } from "../types/slider.types";

export const COLABORACIONES_SLIDER_CONFIG: SliderConfig = {
  /** Cards shown per page at each breakpoint */
  cardsPerPage: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },

  /** Viewport-width breakpoints (px) */
  breakpoints: {
    mobile: 640,
    tablet: 1024,
  },

  /** Transition duration for the slide animation (ms) */
  transitionDuration: 350,

  /** Debounce delay for resize recalculation (ms) */
  resizeDebounce: 250,
} as const;
