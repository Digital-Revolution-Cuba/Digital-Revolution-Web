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

  const { IMAGES_PER_PAGE, ITEM_WIDTH } = GALLERY_CONFIG;
  const maxIndex = Math.max(0, Math.ceil(totalImages / IMAGES_PER_PAGE) - 1);

  /**
   * Updates the slider position and button states
   */
  function updateSlider() {
    const offset = -state.currentIndex * IMAGES_PER_PAGE * ITEM_WIDTH;
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
   * Initialize slider
   */
  function initialize() {
    updateSlider();

    prevButton.addEventListener('click', navigatePrevious);
    nextButton.addEventListener('click', navigateNext);

    const cleanupKeyboard = setupKeyboardNavigation();

    return () => {
      prevButton.removeEventListener('click', navigatePrevious);
      nextButton.removeEventListener('click', navigateNext);
      cleanupKeyboard();
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
