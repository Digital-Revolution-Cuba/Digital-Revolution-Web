/**
 * Gallery slider logic composable
 * Handles slider state, navigation, and keyboard controls
 */

import { GALLERY_CONFIG } from '../config/galleryConfig';
import type { CategoryType } from '../data/types';

export interface SliderState {
  currentIndex: number;
  currentCategory: CategoryType;
  isAnimating: boolean;
}

export function createGallerySlider(
  sliderElement: HTMLElement,
  prevButton: HTMLButtonElement,
  nextButton: HTMLButtonElement,
  totalImages: number,
) {
  const state: SliderState = {
    currentIndex: 0,
    currentCategory: 'arte',
    isAnimating: false,
  };

  /**
   * Get responsive values based on viewport width
   */
  function getResponsiveValues() {
    const width = window.innerWidth;

    if (width < 640) {
      // Mobile: 1 card
      return {
        itemWidth: Math.min(285, width - 80),
        visibleImages: 1,
        imagesPerPage: 1,
      };
    } else if (width < 768) {
      // Small tablet: 2 cards
      return {
        itemWidth: Math.min(285, (width - 100) / 2),
        visibleImages: 2,
        imagesPerPage: 2,
      };
    } else if (width < 1024) {
      // Tablet: 3 cards
      return {
        itemWidth: Math.min(285, (width - 120) / 3),
        visibleImages: 3,
        imagesPerPage: 3,
      };
    } else {
      // Desktop: 4 cards (original design)
      return {
        itemWidth: 285,
        visibleImages: 4,
        imagesPerPage: 4,
      };
    }
  }

  /**
   * Updates the slider position and button states
   */
  function updateSlider() {
    const { itemWidth, imagesPerPage } = getResponsiveValues();
    const maxIndex = Math.max(0, Math.ceil(totalImages / imagesPerPage) - 1);

    const offset = -state.currentIndex * imagesPerPage * itemWidth;
    sliderElement.style.transform = `translateX(${offset}px)`;

    // Update button states
    prevButton.disabled = state.currentIndex <= 0;
    nextButton.disabled = state.currentIndex >= maxIndex;
    prevButton.style.opacity = state.currentIndex <= 0 ? '0.5' : '1';
    nextButton.style.opacity = state.currentIndex >= maxIndex ? '0.5' : '1';
  }

  /**
   * Navigate to previous page
   */
  function navigatePrevious() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      updateSlider();
    }
  }

  /**
   * Navigate to next page
   */
  function navigateNext() {
    const { imagesPerPage } = getResponsiveValues();
    const maxIndex = Math.max(0, Math.ceil(totalImages / imagesPerPage) - 1);

    if (state.currentIndex < maxIndex) {
      state.currentIndex++;
      updateSlider();
    }
  }

  /**
   * Reset slider to first page
   */
  function resetSlider() {
    state.currentIndex = 0;
    updateSlider();
  }

  /**
   * Setup keyboard navigation
   */
  function setupKeyboardNavigation() {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { imagesPerPage } = getResponsiveValues();
      const maxIndex = Math.max(0, Math.ceil(totalImages / imagesPerPage) - 1);

      if (e.key === 'ArrowLeft' && state.currentIndex > 0) {
        navigatePrevious();
      } else if (e.key === 'ArrowRight' && state.currentIndex < maxIndex) {
        navigateNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * Setup resize handler to update slider on window resize
   */
  function setupResizeHandler() {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        state.currentIndex = 0; // Reset to first page on resize
        updateSlider();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }

  /**
   * Initialize slider
   */
  function initialize() {
    updateSlider();

    prevButton.addEventListener('click', navigatePrevious);
    nextButton.addEventListener('click', navigateNext);

    const cleanupKeyboard = setupKeyboardNavigation();
    const cleanupResize = setupResizeHandler();

    return () => {
      prevButton.removeEventListener('click', navigatePrevious);
      nextButton.removeEventListener('click', navigateNext);
      cleanupKeyboard();
      cleanupResize();
    };
  }

  return {
    state,
    updateSlider,
    navigatePrevious,
    navigateNext,
    resetSlider,
    initialize,
  };
}
