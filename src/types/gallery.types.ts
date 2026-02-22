/**
 * Gallery Types
 * Shared types for gallery components
 * Re-exports from data/types for consistency
 */

import type {
  ArteGalleryItem,
  BaseGalleryItem,
  CategoryConfig,
  CategoryType,
  FotografiaGalleryItem,
  GalleryItem,
  MusicGalleryItem,
} from "../data/types";

export type {
  ArteGalleryItem,
  BaseGalleryItem,
  CategoryConfig,
  CategoryType,
  FotografiaGalleryItem,
  GalleryItem,
  MusicGalleryItem,
};

/** Gallery configuration for the slider component */
export interface GalleryConfig {
  readonly categories: readonly CategoryConfig[];
  readonly defaultCategory: CategoryType;
  readonly visibleImages: number;
}
