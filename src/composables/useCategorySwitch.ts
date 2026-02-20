/**
 * Category switching logic composable
 * Handles category transitions with animations
 */

import { flipSwapButtons, withWillChange } from "../utils/galleryAnimations";
import {
  GALLERY_CONFIG,
  GALLERY_CLASSES,
  DATA_ATTRIBUTES,
  CSS_VARIABLES,
} from "../config/galleryConfig";
import { readCssVarMs } from "../utils/transitionUtils";
import type { CategoryType } from "../data/types";

export interface CategorySwitchOptions {
  onCategoryChange?: (category: CategoryType) => void;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

export function createCategorySwitch(
  buttonsContainer: HTMLElement,
  sliderResetFn: () => void,
  options: CategorySwitchOptions = {}
) {
  let currentCategory: CategoryType = "arte";
  let isAnimating = false;

  const categoryButtons = Array.from(
    buttonsContainer.querySelectorAll<HTMLButtonElement>(`.${GALLERY_CLASSES.CATEGORY_BTN}`)
  );

  /**
   * Get items for a specific category
   */
  function getCategoryItems(category: CategoryType): HTMLElement[] {
    const className =
      category === "arte"
        ? GALLERY_CLASSES.ARTE_ITEM
        : category === "musica"
          ? GALLERY_CLASSES.MUSICA_ITEM
          : GALLERY_CLASSES.FOTOGRAFIA_ITEM;

    return Array.from(document.querySelectorAll(`.${className}`));
  }

  /**
   * Update active button visual state
   */
  function updateActiveButton(activeBtn: HTMLButtonElement) {
    categoryButtons.forEach((btn) => btn.classList.remove(GALLERY_CLASSES.ACTIVE));
    activeBtn.classList.add(GALLERY_CLASSES.ACTIVE);
  }

  /**
   * Switch to a new category with animation
   */
  async function switchCategory(targetCategory: CategoryType): Promise<boolean> {
    // Prevent re-entry and redundant switches
    if (targetCategory === currentCategory || isAnimating) {
      return false;
    }

    isAnimating = true;
    options.onAnimationStart?.();

    // Disable all category buttons during animation
    categoryButtons.forEach((btn) => (btn.disabled = true));

    const currentItems = getCategoryItems(currentCategory);
    const nextItems = getCategoryItems(targetCategory);

    // Update current category immediately to prevent race conditions
    const previousCategory = currentCategory;
    currentCategory = targetCategory;

    try {
      // Get card transition duration from CSS
      const cardTransitionMs =
        readCssVarMs(CSS_VARIABLES.CARD_TRANSITION_DURATION, null) ||
        GALLERY_CONFIG.CARD_TRANSITION_DURATION;

      // Apply will-change for smooth animations
      withWillChange(currentItems, "opacity, transform", cardTransitionMs);

      // Start hide animation for current items
      currentItems.forEach((item) => item.classList.add(GALLERY_CLASSES.HIDING));

      // Animate button swap using FLIP technique
      await flipSwapButtons(targetCategory, buttonsContainer);

      // Wait for card transition to complete
      await new Promise((resolve) => setTimeout(resolve, cardTransitionMs));

      // Hide old items and prepare new items
      currentItems.forEach((item) => {
        item.style.display = "none";
        item.classList.remove(GALLERY_CLASSES.HIDING);
      });

      // Show new items with entrance animation
      nextItems.forEach((item) => {
        item.style.display = "block";
        item.classList.add(GALLERY_CLASSES.HIDING);
      });

      // Apply will-change for entrance animation
      withWillChange(nextItems, "opacity, transform", cardTransitionMs);

      // Trigger entrance animation on next frame
      requestAnimationFrame(() => {
        nextItems.forEach((item) => item.classList.remove(GALLERY_CLASSES.HIDING));
      });

      // Reset slider to first page
      sliderResetFn();

      options.onCategoryChange?.(targetCategory);

      return true;
    } catch (error) {
      console.error("Error during category switch:", error);
      // Rollback on error
      currentCategory = previousCategory;
      return false;
    } finally {
      // Re-enable buttons
      categoryButtons.forEach((btn) => (btn.disabled = false));
      isAnimating = false;
      options.onAnimationEnd?.();
    }
  }

  /**
   * Handle category button click
   */
  function handleCategoryClick(event: Event) {
    const button = event.currentTarget as HTMLButtonElement;
    const category = button.dataset.cat as CategoryType;

    if (!category || isAnimating) return;

    switchCategory(category).then((success) => {
      if (success) {
        updateActiveButton(button);
      }
    });
  }

  /**
   * Initialize category switching
   */
  function initialize(initialCategory: CategoryType = "arte") {
    currentCategory = initialCategory;

    // Set initial active button
    const initialButton = categoryButtons.find((btn) => btn.dataset.cat === initialCategory);
    if (initialButton) {
      updateActiveButton(initialButton);
    }

    // Attach click handlers
    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", handleCategoryClick);
    });

    return () => {
      categoryButtons.forEach((btn) => {
        btn.removeEventListener("click", handleCategoryClick);
      });
    };
  }

  return {
    getCurrentCategory: () => currentCategory,
    isAnimating: () => isAnimating,
    switchCategory,
    initialize,
  };
}
