/**
 * Gallery Composable
 * Provides gallery state management and helper functions
 * This is a utility module, not for React hooks
 */

import type { CategoryType, CategoryConfig } from '../../types/gallery.types';

export interface GalleryState {
  activeCategory: CategoryType;
  currentIndex: number;
  totalItems: number;
}

/**
 * Create gallery utilities
 */
export function createGalleryUtils(categories: CategoryConfig[]) {
  /**
   * Get items for a specific category
   */
  function getCategoryItems(category: CategoryType) {
    const categoryConfig = categories.find((c) => c.id === category);
    return categoryConfig?.items || [];
  }

  /**
   * Get total items count for a category
   */
  function getCategoryItemsCount(category: CategoryType): number {
    return getCategoryItems(category).length;
  }

  /**
   * Get visible items based on viewport width
   */
  function getVisibleItemsCount(viewportWidth: number): number {
    if (viewportWidth < 640) return 1; // Mobile
    if (viewportWidth < 768) return 2; // Small tablet
    if (viewportWidth < 1024) return 3; // Tablet
    return 4; // Desktop
  }

  /**
   * Calculate max page index for current category
   */
  function getMaxPageIndex(
    category: CategoryType,
    itemsPerPage: number,
  ): number {
    const totalItems = getCategoryItemsCount(category);
    return Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);
  }

  /**
   * Check if navigation is at start
   */
  function isAtStart(currentIndex: number): boolean {
    return currentIndex <= 0;
  }

  /**
   * Check if navigation is at end
   */
  function isAtEnd(
    currentIndex: number,
    category: CategoryType,
    itemsPerPage: number,
  ): boolean {
    const maxIndex = getMaxPageIndex(category, itemsPerPage);
    return currentIndex >= maxIndex;
  }

  return {
    getCategoryItems,
    getCategoryItemsCount,
    getVisibleItemsCount,
    getMaxPageIndex,
    isAtStart,
    isAtEnd,
  };
}

/**
 * Get responsive configuration based on viewport
 */
export function getResponsiveGalleryConfig(viewportWidth: number) {
  if (viewportWidth < 640) {
    return {
      itemWidth: Math.min(285, viewportWidth - 80),
      visibleImages: 1,
      imagesPerPage: 1,
      gap: 16,
    };
  } else if (viewportWidth < 768) {
    return {
      itemWidth: Math.min(285, (viewportWidth - 100) / 2),
      visibleImages: 2,
      imagesPerPage: 2,
      gap: 16,
    };
  } else if (viewportWidth < 1024) {
    return {
      itemWidth: Math.min(285, (viewportWidth - 120) / 3),
      visibleImages: 3,
      imagesPerPage: 3,
      gap: 16,
    };
  } else {
    return {
      itemWidth: 285,
      visibleImages: 4,
      imagesPerPage: 4,
      gap: 16,
    };
  }
}
