/**
 * Gallery Types
 * Shared types for gallery components
 * Re-exports from data/types for consistency
 */

import type {
  BaseGalleryItem,
  ArteGalleryItem,
  MusicGalleryItem,
  FotografiaGalleryItem,
  GalleryItem,
  CategoryType,
  CategoryConfig,
} from '../data/types';

export type {
  BaseGalleryItem,
  ArteGalleryItem,
  MusicGalleryItem,
  FotografiaGalleryItem,
  GalleryItem,
  CategoryType,
  CategoryConfig,
};

export interface GalleryConfig {
  categories: CategoryConfig[];
  defaultCategory: CategoryType;
  visibleImages: number;
}
