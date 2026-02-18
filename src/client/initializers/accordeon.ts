// Centralized initializer for Accordeon slider
function initAccordeon() {
  const dotsContainer = document.getElementById("acordeonDots");
  const sliderContainer = document.getElementById("acordeonSlider");

  if (!dotsContainer || !sliderContainer) return;

  const dots = dotsContainer.querySelectorAll(".acordeon-dot");
  const cards = sliderContainer.querySelectorAll(".acordeon-item");
  let currentIndex = 0;
  let isAnimating = false;
  let autoRotate: number | null = null;

  // Touch detection
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Drag threshold (similar to Embla Carousel's approach)
  const DRAG_THRESHOLD = 5; // pixels
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  function animateTransition(fromIndex: number, toIndex: number) {
    if (isAnimating || fromIndex === toIndex) return;
    isAnimating = true;

    // Immediate visual feedback on dots (best practice from documentation)
    updateDotsUI(toIndex);

    cards.forEach((card, i) => {
      (card as HTMLElement).style.animationDelay = `${i * 100}ms`;
      card.classList.add("slide-out-left");
    });

    const exitDuration = 600;

    setTimeout(() => {
      cards.forEach((card, i) => {
        card.classList.remove("slide-out-left", "highlighted");
        (card as HTMLElement).style.animationDelay = "0ms";

        (card as HTMLElement).style.animationDelay = `${i * 75}ms`;
        card.classList.add("slide-in-right");

        if (i === toIndex) {
          card.classList.add("highlighted");
        }
      });

      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.remove("slide-in-right");
          (card as HTMLElement).style.animationDelay = "0ms";
        });
        isAnimating = false;
      }, 600);
    }, exitDuration - 100);

    currentIndex = toIndex;
  }

  /**
   * Update dots UI immediately (separate from animation for better UX)
   */
  function updateDotsUI(index: number) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  /**
   * Stop auto rotation
   */
  function stopAutoRotate() {
    if (autoRotate !== null) {
      clearInterval(autoRotate);
      autoRotate = null;
    }
  }

  /**
   * Start auto rotation
   */
  function startAutoRotate() {
    stopAutoRotate();
    autoRotate = window.setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentIndex + 1) % dots.length;
        animateTransition(currentIndex, nextIndex);
      }
    }, 6000);
  }

  /**
   * Handle touch start (track position for drag detection)
   */
  function handleTouchStart(e: Event) {
    const touchEvent = e as TouchEvent;
    const touch = touchEvent.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isDragging = false;
  }

  /**
   * Handle touch move (detect if user is dragging)
   */
  function handleTouchMove(e: Event) {
    const touchEvent = e as TouchEvent;
    if (!isDragging) {
      const touch = touchEvent.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);

      // If movement exceeds threshold, mark as dragging
      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        isDragging = true;
      }
    }
  }

  /**
   * Handle dot click/tap
   */
  function handleDotInteraction(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    // If dragging, ignore the click
    if (isDragging) {
      isDragging = false;
      return;
    }

    const target = e.currentTarget as HTMLElement;
    const index = parseInt(target.getAttribute("data-index") || "0", 10);

    if (!isAnimating && !isNaN(index) && index !== currentIndex) {
      stopAutoRotate();
      animateTransition(currentIndex, index);
    }
  }

  /**
   * Handle card tap on mobile (toggle flip)
   */
  function handleCardTap(e: Event) {
    // Only for touch devices
    if (!isTouchDevice) return;

    e.preventDefault();
    e.stopPropagation();

    const card = e.currentTarget as HTMLElement;
    const isFlipped = card.classList.contains("mobile-flipped");

    // Remove flip from all other cards
    cards.forEach((c) => {
      if (c !== card) {
        c.classList.remove("mobile-flipped");
      }
    });

    // Toggle current card
    if (isFlipped) {
      card.classList.remove("mobile-flipped");
    } else {
      card.classList.add("mobile-flipped");

      // Auto-remove flip after 4 seconds
      setTimeout(() => {
        card.classList.remove("mobile-flipped");
      }, 4000);
    }
  }

  /**
   * Initialize event listeners
   */
  function initEventListeners() {
    // Dots navigation
    dots.forEach((dot) => {
      // Add both touch and click events for maximum compatibility
      dot.addEventListener("touchstart", handleTouchStart, { passive: true });
      dot.addEventListener("touchmove", handleTouchMove, { passive: true });
      dot.addEventListener("touchend", handleDotInteraction);
      dot.addEventListener("click", handleDotInteraction);

      // Keyboard accessibility
      dot.addEventListener("keydown", (e: Event) => {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === "Enter" || keyEvent.key === " ") {
          e.preventDefault();
          handleDotInteraction(e);
        }
      });
    });

    // Cards interaction for mobile flip
    if (isTouchDevice) {
      cards.forEach((card) => {
        card.addEventListener("touchend", handleCardTap);
        // Also add click as fallback
        card.addEventListener("click", handleCardTap);
      });
    }

    // Auto-rotation pause on hover (desktop only)
    if (!isTouchDevice && sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoRotate);
      sliderContainer.addEventListener("mouseleave", startAutoRotate);
    }
  }

  // Initialize
  initEventListeners();
  updateDotsUI(0);
  cards[0]?.classList.add("highlighted");
  startAutoRotate();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccordeon);
} else {
  initAccordeon();
}

export { initAccordeon };
