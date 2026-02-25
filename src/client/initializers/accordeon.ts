/**
 * Accordion Slider — Client-side initializer
 *
 * Responsibilities:
 * - Page navigation via dots (each dot = a group of cards)
 * - Smooth page transitions (fade-slide, no chaotic glitch)
 * - Mobile card flip on tap
 * - Auto-rotation
 * - Keyboard accessibility
 *
 * This module follows single-responsibility: it only handles
 * DOM interaction. Data and config live in their own modules.
 */

// ─── Constants ───────────────────────────────────────────────
const SELECTORS = {
  wrapper: ".acordeon-wrapper",
  slider: "#acordeonSlider",
  dotsNav: "#acordeonDots",
  dot: ".acordeon-dot",
  page: ".acordeon-page",
  card: ".acordeon-item",
} as const;

const CSS_CLASSES = {
  active: "active",
  pageExit: "page-exit",
  pageEnter: "page-enter",
  mobileFlipped: "mobile-flipped",
} as const;

const ANIMATION = {
  /** Duration of exit animation — must match CSS `pageFadeOut` */
  exitDuration: 350,
  /** Duration of entrance animation — must match CSS `pageFadeIn` + stagger */
  enterDuration: 400,
  /** Auto-rotation interval in ms */
  autoRotateInterval: 10_000,
  /** How long a mobile-flipped card stays flipped */
  mobileFlipRevert: 4_000,
  /** Drag threshold in px to distinguish tap from swipe */
  dragThreshold: 5,
} as const;

// ─── Utility helpers ─────────────────────────────────────────

function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// ─── Main initializer ────────────────────────────────────────

function initAccordeon(): void {
  const wrapper = document.querySelector<HTMLElement>(SELECTORS.wrapper);
  const slider = document.querySelector<HTMLElement>(SELECTORS.slider);
  const dotsNav = document.querySelector<HTMLElement>(SELECTORS.dotsNav);

  if (!wrapper || !slider || !dotsNav) return;

  const dots = Array.from(dotsNav.querySelectorAll<HTMLButtonElement>(SELECTORS.dot));
  const pages = Array.from(slider.querySelectorAll<HTMLElement>(SELECTORS.page));
  const totalPages = pages.length;

  if (totalPages === 0) return;

  // ─── State ───────────────────────────────────────────────
  let currentPageIndex = 0;
  let isAnimating = false;
  let autoRotateTimer: number | null = null;

  // Touch tracking for drag-vs-tap detection
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  // ─── Page transition ─────────────────────────────────────
  /**
   * Transition from one page to another with a smooth fade-slide.
   * The entire page (group of cards) animates as a unit,
   * with individual cards getting a subtle staggered reveal via CSS.
   */
  function goToPage(targetIndex: number): void {
    if (isAnimating || targetIndex === currentPageIndex) return;
    if (targetIndex < 0 || targetIndex >= totalPages) return;

    isAnimating = true;

    const currentPage = pages[currentPageIndex];
    const nextPage = pages[targetIndex];

    // 1. Update dots immediately for responsive UX
    updateDots(targetIndex);

    // 2. Animate current page out
    currentPage.classList.add(CSS_CLASSES.pageExit);

    // 3. After exit animation completes, swap visibility
    setTimeout(() => {
      currentPage.classList.remove(CSS_CLASSES.active, CSS_CLASSES.pageExit);
      currentPage.setAttribute("aria-hidden", "true");

      // 4. Animate next page in
      nextPage.classList.add(CSS_CLASSES.active, CSS_CLASSES.pageEnter);
      nextPage.removeAttribute("aria-hidden");

      // 5. Clean up entrance animation classes
      setTimeout(() => {
        nextPage.classList.remove(CSS_CLASSES.pageEnter);
        currentPageIndex = targetIndex;
        isAnimating = false;
      }, ANIMATION.enterDuration);
    }, ANIMATION.exitDuration);
  }

  // ─── Dots UI ─────────────────────────────────────────────
  function updateDots(activeIndex: number): void {
    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;
      dot.classList.toggle(CSS_CLASSES.active, isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  // ─── Auto-rotation ──────────────────────────────────────
  function startAutoRotate(): void {
    stopAutoRotate();
    autoRotateTimer = window.setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentPageIndex + 1) % totalPages;
        goToPage(nextIndex);
      }
    }, ANIMATION.autoRotateInterval);
  }

  function stopAutoRotate(): void {
    if (autoRotateTimer !== null) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  // ─── Touch helpers ──────────────────────────────────────
  function handleTouchStart(e: TouchEvent): void {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isDragging = false;
  }

  function handleTouchMove(e: TouchEvent): void {
    if (isDragging) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartX);
    const dy = Math.abs(touch.clientY - touchStartY);
    if (dx > ANIMATION.dragThreshold || dy > ANIMATION.dragThreshold) {
      isDragging = true;
    }
  }

  // ─── Dot interaction ────────────────────────────────────
  function handleDotInteraction(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (isDragging) {
      isDragging = false;
      return;
    }

    const target = e.currentTarget as HTMLElement;
    const pageIndex = parseInt(target.dataset.pageIndex ?? "0", 10);

    if (!isNaN(pageIndex) && pageIndex !== currentPageIndex) {
      stopAutoRotate();
      goToPage(pageIndex);
      startAutoRotate();
    }
  }

  // ─── Mobile card flip ──────────────────────────────────
  function handleCardTap(e: Event): void {
    if (!isTouchDevice()) return;

    if (isDragging) {
      isDragging = false;
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const card = (e.currentTarget as HTMLElement).closest(SELECTORS.card) as HTMLElement | null;
    if (!card) return;

    const activePage = pages[currentPageIndex];
    const pageCards = Array.from(activePage.querySelectorAll<HTMLElement>(SELECTORS.card));

    const wasFlipped = card.classList.contains(CSS_CLASSES.mobileFlipped);

    // Unflip all cards in the current page
    pageCards.forEach((c) => c.classList.remove(CSS_CLASSES.mobileFlipped));

    // Toggle the tapped card
    if (!wasFlipped) {
      card.classList.add(CSS_CLASSES.mobileFlipped);

      // Auto-revert after timeout
      setTimeout(() => {
        card.classList.remove(CSS_CLASSES.mobileFlipped);
      }, ANIMATION.mobileFlipRevert);
    }
  }

  // ─── Event binding ──────────────────────────────────────
  function bindEvents(): void {
    // Dot navigation
    dots.forEach((dot) => {
      dot.addEventListener("touchstart", handleTouchStart as EventListener, {
        passive: true,
      });
      dot.addEventListener("touchmove", handleTouchMove as EventListener, {
        passive: true,
      });
      dot.addEventListener("touchend", handleDotInteraction);
      dot.addEventListener("click", handleDotInteraction);

      // Keyboard: Enter / Space
      dot.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleDotInteraction(e);
        }
      });
    });

    // Mobile card flip
    if (isTouchDevice()) {
      pages.forEach((page) => {
        const cards = page.querySelectorAll<HTMLElement>(SELECTORS.card);
        cards.forEach((card) => {
          card.addEventListener("touchend", handleCardTap);
          card.addEventListener("click", handleCardTap);
        });
      });
    }

    // Pause auto-rotation on hover (desktop only)
    if (!isTouchDevice() && slider) {
      slider.addEventListener("mouseenter", stopAutoRotate);
      slider.addEventListener("mouseleave", startAutoRotate);
    }
  }

  // ─── Initialize ─────────────────────────────────────────
  bindEvents();
  updateDots(0);
  startAutoRotate();
}

// ─── Bootstrap ────────────────────────────────────────────
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccordeon);
} else {
  initAccordeon();
}

export { initAccordeon };
