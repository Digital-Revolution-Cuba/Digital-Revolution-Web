// Centralized initializer for Colaboraciones Destacadas
// Uses config-driven slider matching the Concursos pattern
import { COLABORACIONES_SLIDER_CONFIG } from "../../config/colaboracionesSliderConfig";

function initColaboraciones() {
  const prevBtn = document.getElementById("prevBtnColab");
  const nextBtn = document.getElementById("nextBtnColab");
  const slider = document.getElementById("cardSliderColab");
  const viewport = document.getElementById("cardsViewportColab") as HTMLElement | null;
  const pagination = document.getElementById("paginationColab");

  if (!prevBtn || !nextBtn || !slider || !viewport || !pagination) return;

  const { cardsPerPage, breakpoints, resizeDebounce } = COLABORACIONES_SLIDER_CONFIG;

  let currentIndex = 0;
  let activeCardsPerPage = cardsPerPage.desktop;
  let itemWidth = 0;
  let gap = 0;

  function calculateLayout() {
    if (!slider) return;
    const firstItem = slider.querySelector(".card-item") as HTMLElement | null;
    if (!firstItem) return;

    const viewportWidth = window.innerWidth;

    if (viewportWidth < breakpoints.mobile) {
      activeCardsPerPage = cardsPerPage.mobile;
    } else if (viewportWidth < breakpoints.tablet) {
      activeCardsPerPage = cardsPerPage.tablet;
    } else {
      activeCardsPerPage = cardsPerPage.desktop;
    }

    itemWidth = firstItem.offsetWidth;
    const computedStyle = window.getComputedStyle(slider);
    gap = parseFloat(computedStyle.gap) || 0;

    const requiredViewportWidth = itemWidth * activeCardsPerPage + gap * (activeCardsPerPage - 1);
    viewport!.style.maxWidth = `${requiredViewportWidth}px`;
  }

  function getMaxIndex(): number {
    if (!slider) return 0;
    return Math.max(0, Math.ceil(Number(slider.dataset.total || 0) / activeCardsPerPage) - 1);
  }

  function generateDots() {
    if (!pagination) return;
    pagination.innerHTML = "";
    const numPages = getMaxIndex() + 1;
    for (let i = 0; i < numPages; i++) {
      const dot = document.createElement("button");
      dot.className = `pagination-dot ${i === currentIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Ir a página ${i + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });
      pagination.appendChild(dot);
    }
  }

  function updateSlider() {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    if (!slider) return;
    const offset = -currentIndex * activeCardsPerPage * (itemWidth + gap);
    (slider as HTMLElement).style.transform = `translateX(${offset}px)`;

    if (prevBtn && nextBtn) {
      (prevBtn as HTMLButtonElement).disabled = currentIndex <= 0;
      (nextBtn as HTMLButtonElement).disabled = currentIndex >= maxIndex;
      prevBtn.style.opacity = currentIndex <= 0 ? "0.4" : "1";
      nextBtn.style.opacity = currentIndex >= maxIndex ? "0.4" : "1";
    }

    if (!pagination) return;
    const dots = pagination.querySelectorAll(".pagination-dot");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  let resizeTimeout: number;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      calculateLayout();
      currentIndex = 0;
      generateDots();
      updateSlider();
    }, resizeDebounce);
  });

  // Use requestAnimationFrame so layout is calculated after the browser
  // completes its first paint — eliminates the 100ms race condition.
  requestAnimationFrame(() => {
    calculateLayout();
    generateDots();
    updateSlider();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initColaboraciones);
} else {
  initColaboraciones();
}

export { initColaboraciones };
