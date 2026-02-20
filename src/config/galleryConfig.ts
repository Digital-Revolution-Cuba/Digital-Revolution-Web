/**
 * Gallery configuration constants
 * Centralizes all magic numbers and configuration values
 */

export const GALLERY_CONFIG = {
  // Slider dimensions
  ITEM_WIDTH: 285,
  ITEM_HEIGHT: 440,
  VISIBLE_IMAGES: 4,
  IMAGES_PER_PAGE: 4,

  // Gallery container dimensions
  // 4 cards × 285px + 3 gaps × 16px (1rem) + 4px safety buffer = 1192px
  CONTAINER_WIDTH: 1192,

  // Padding and spacing
  ITEM_PADDING_HORIZONTAL: 8,

  // Animation timings (milliseconds)
  CARD_TRANSITION_DURATION: 100,
  FLIP_SWAP_DURATION: 70,
  CATEGORY_SWITCH_DELAY: 160,
  SHINE_EFFECT_DURATION: 700,

  // Z-index layers
  Z_INDEX: {
    CATEGORY_BUTTONS: 20,
    NAV_BUTTONS: 10,
    SHINE_EFFECT: 2,
    FLIP_CLONES: 9999,
  },
} as const;

/**
 * CSS class names used throughout the gallery
 */
export const GALLERY_CLASSES = {
  GALLERY_ITEM: "gallery-item",
  ARTE_ITEM: "arte-item",
  MUSICA_ITEM: "musica-item",
  FOTOGRAFIA_ITEM: "fotografia-item",
  CATEGORY_BTN: "category-btn",
  NAV_BTN: "nav-btn",
  NAV_ARROW: "nav-arrow",
  HIDING: "hiding",
  ACTIVE: "active",
} as const;

/**
 * Data attributes used for element selection
 */
export const DATA_ATTRIBUTES = {
  CATEGORY: "data-category",
  CATEGORY_BTN: "data-cat",
  CATEGORY_BUTTONS_CONTAINER: "data-category-buttons",
} as const;

/**
 * CSS custom properties (CSS variables)
 */
export const CSS_VARIABLES = {
  FLIP_SWAP_DURATION: "--flip-swap-duration",
  CARD_TRANSITION_DURATION: "--card-transition-duration",
} as const;

/**
 * Masonry Grid Configuration
 * Responsive breakpoints for masonry layout
 */
export const MASONRY_CONFIG = {
  BREAKPOINTS: {
    MOBILE: 350,
    TABLET: 750,
    DESKTOP: 1200,
  },
  COLUMNS: {
    MOBILE: 2,
    TABLET: 3,
    DESKTOP: 5,
  },
  GUTTER: "10px",
} as const;

/**
 * Modal Configuration
 * Settings for image modal/lightbox
 */
export const MODAL_CONFIG = {
  Z_INDEX: 50,
  BACKDROP_BLUR: "sm",
  ANIMATION_DURATION: 300, // ms
  OVERLAY_OPACITY: 0.8,
  MAX_WIDTH: "90vw",
  MAX_HEIGHT: "90vh",
} as const;

/**
 * Infinite Scroll Configuration
 */
export const INFINITE_SCROLL_CONFIG = {
  INITIAL_ITEMS: 20,
  ITEMS_PER_PAGE: 10,
  THRESHOLD: 0.5, // IntersectionObserver threshold
  ROOT_MARGIN: "100px", // Load before reaching bottom
} as const;
