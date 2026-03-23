// Centralized initializer for the main gallery (DinamycGallery)
import { createGallerySlider } from "../../composables/useGallerySlider";
import { createCategorySwitch } from "../../composables/useCategorySwitch";
import { initializeMusicPlayers } from "../../utils/musicPlayer";

function initGaleria() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const slider = document.getElementById("imageSlider");
  const buttonsContainer = document.querySelector("[data-category-buttons]");

  if (!prevBtn || !nextBtn || !slider || !buttonsContainer) {
    // Not on this page or DOM changed
    return;
  }

  // Parse per-category item counts for grid/slider switching
  const categoryCounts: Record<string, number> = JSON.parse(slider.dataset.categoryCounts || "{}");

  const totalImages =
    Number(slider.dataset.total) || slider.querySelectorAll(".gallery-item").length || 0;

  const gallerySlider = createGallerySlider(
    slider,
    prevBtn as HTMLButtonElement,
    nextBtn as HTMLButtonElement,
    totalImages,
    {
      viewportElement: slider.closest(".gallery-viewport") as HTMLElement,
    }
  );

  const cleanupSlider = gallerySlider.initialize();

  function applyGridMode(category: string) {
    const count = categoryCounts[category] ?? 999;
    const isGrid = count <= 3;

    slider!.classList.toggle("gallery-grid-mode", isGrid);
    (prevBtn as HTMLElement).style.display = isGrid ? "none" : "";
    (nextBtn as HTMLElement).style.display = isGrid ? "none" : "";
  }

  const categorySwitch = createCategorySwitch(
    buttonsContainer as HTMLElement,
    () => {
      // Reset slider and recalculate for new category
      gallerySlider.resetSlider();
    },
    {
      onCategoryChange: (category: string) => {
        applyGridMode(category);

        // Update slider for new category item count
        setTimeout(() => {
          gallerySlider.updateSlider();
        }, 50);

        if (category === "musica") {
          setTimeout(initializeMusicPlayers, 100);
        }
      },
    }
  );

  const cleanupCategory = categorySwitch.initialize("arte");

  applyGridMode("arte");

  // Initialize music players on load
  initializeMusicPlayers();

  window.addEventListener("beforeunload", () => {
    cleanupSlider();
    cleanupCategory();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGaleria);
} else {
  initGaleria();
}

export { initGaleria };
