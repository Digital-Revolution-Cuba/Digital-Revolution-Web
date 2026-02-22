/**
 * Gallery slider logic composable
 * Handles slider state, navigation, and keyboard controls
 */

import type { CategoryType } from "../data/types";
import { debounce } from "../utils/debounce";

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
  options?: {
    paginationElement?: HTMLElement | null;
    viewportElement?: HTMLElement | null;
  }
) {
  const state: SliderState = {
    currentIndex: 0,
    currentCategory: "arte",
    isAnimating: false,
  };

  const paginationElement = options?.paginationElement || null;
  const viewportElement = options?.viewportElement || null;

  let itemWidthFromDom = 0;
  let gapFromDom = 0;
  let activeTotalImages = totalImages; // Track active category's item count

  /**
   * Get the count of visible items in the current category
   */
  function getVisibleItemCount(): number {
    const visibleItems = sliderElement.querySelectorAll(
      '.gallery-item:not([style*="display: none"]), .card-item:not([style*="display: none"])'
    );
    return visibleItems.length || totalImages;
  }

  /**
   * Get responsive values based on viewport width
   * nav offset = 120px; track gap = 1rem = 16px
   * Card width mirrors CSS: (available - nav_offset - (N-1)*gap) / N
   */
  function getResponsiveValues() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const gap = 16; // 1rem — matches .gallery-track gap: var(--gallery-gap)

    // Landscape phones (e.g. 390×852 rotated → 852×390): 3 cards
    const isLandscapePhone = height <= 500 && width > height;

    if (isLandscapePhone) {
      return {
        itemWidth: Math.min(285, (width - 120 - 2 * gap) / 3),
        visibleImages: 3,
        imagesPerPage: 3,
      };
    } else if (width < 640) {
      // Mobile: 1 card
      return {
        itemWidth: Math.min(285, width - 120),
        visibleImages: 1,
        imagesPerPage: 1,
      };
    } else if (width < 768) {
      // Small tablet: 2 cards
      return {
        itemWidth: Math.min(285, (width - 120 - gap) / 2),
        visibleImages: 2,
        imagesPerPage: 2,
      };
    } else if (width < 1024) {
      // Tablet: 3 cards
      return {
        itemWidth: Math.min(285, (width - 120 - 2 * gap) / 3),
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
    // Update active item count based on what's actually visible
    activeTotalImages = getVisibleItemCount();

    const { itemWidth, imagesPerPage } = getResponsiveValues();
    const usedItemWidth = itemWidthFromDom || itemWidth;
    const usedGap = gapFromDom || 0;

    // Calculate max index: total pages minus one (for 0-based index)
    const totalPages = Math.ceil(activeTotalImages / imagesPerPage);
    const maxIndex = Math.max(0, totalPages - 1);

    // Clamp current index to valid range
    state.currentIndex = Math.max(0, Math.min(state.currentIndex, maxIndex));

    // Calculate offset based on cards per page
    const offset = -state.currentIndex * imagesPerPage * (usedItemWidth + usedGap);
    sliderElement.style.transform = `translateX(${offset}px)`;

    // Update button states
    prevButton.disabled = state.currentIndex <= 0;
    nextButton.disabled = state.currentIndex >= maxIndex;
    prevButton.style.opacity = state.currentIndex <= 0 ? "0.5" : "1";
    nextButton.style.opacity = state.currentIndex >= maxIndex ? "0.5" : "1";

    // Update dots if pagination is present
    if (paginationElement) {
      const dots = Array.from(paginationElement.querySelectorAll(".pagination-dot"));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === state.currentIndex));
    }
  }

  function calculateLayout() {
    // Read actual rendered card width and track gap from DOM for accurate offset calculation.
    // Do NOT set maxWidth on the viewport — .gallery-container overflow:hidden is the clip boundary.
    const firstItem = sliderElement.querySelector(
      ".card-item, .gallery-item"
    ) as HTMLElement | null;
    if (firstItem) {
      itemWidthFromDom = firstItem.offsetWidth;

      const computedStyle = window.getComputedStyle(sliderElement);
      gapFromDom = parseFloat(computedStyle.gap) || 0;
    } else {
      // Reset DOM-based measurements
      itemWidthFromDom = 0;
      gapFromDom = 0;
    }
    // Always clear any previously set maxWidth so CSS controls the viewport
    if (viewportElement) {
      viewportElement.style.maxWidth = "";
    }
  }

  // Dots generation (if pagination container provided)
  const dotCleanups: Array<() => void> = [];
  function generateDots() {
    if (!paginationElement) return;

    // Update active item count
    activeTotalImages = getVisibleItemCount();

    paginationElement.innerHTML = "";
    const { imagesPerPage } = getResponsiveValues();
    const numPages = Math.max(1, Math.ceil(activeTotalImages / imagesPerPage));

    for (let i = 0; i < numPages; i++) {
      const dot = document.createElement("button");
      dot.className = `pagination-dot ${i === state.currentIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Ir a página ${i + 1}`);
      const onClick = () => {
        state.currentIndex = i;
        updateSlider();
      };
      dot.addEventListener("click", onClick);
      paginationElement.appendChild(dot);
      dotCleanups.push(() => dot.removeEventListener("click", onClick));
    }
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
    // Update active item count
    activeTotalImages = getVisibleItemCount();

    const { imagesPerPage } = getResponsiveValues();
    const totalPages = Math.ceil(activeTotalImages / imagesPerPage);
    const maxIndex = Math.max(0, totalPages - 1);

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
      // Update active item count
      activeTotalImages = getVisibleItemCount();

      const { imagesPerPage } = getResponsiveValues();
      const maxIndex = Math.max(0, Math.ceil(activeTotalImages / imagesPerPage) - 1);

      if (e.key === "ArrowLeft" && state.currentIndex > 0) {
        navigatePrevious();
      } else if (e.key === "ArrowRight" && state.currentIndex < maxIndex) {
        navigateNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  /**
   * Setup resize handler to update slider on window resize
   * Debounced to 250ms para mejor rendimiento
   */
  function setupResizeHandler() {
    const handleResize = debounce(() => {
      calculateLayout();
      generateDots();
      state.currentIndex = 0; // Reset to first page on resize
      updateSlider();
    }, 250);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }

  /**
   * Initialize slider
   */
  function initialize() {
    calculateLayout();
    generateDots();
    updateSlider();

    prevButton.addEventListener("click", navigatePrevious);
    nextButton.addEventListener("click", navigateNext);

    const cleanupKeyboard = setupKeyboardNavigation();
    const cleanupResize = setupResizeHandler();

    return () => {
      prevButton.removeEventListener("click", navigatePrevious);
      nextButton.removeEventListener("click", navigateNext);
      cleanupKeyboard();
      cleanupResize();
      dotCleanups.forEach((cleanup) => cleanup());
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
