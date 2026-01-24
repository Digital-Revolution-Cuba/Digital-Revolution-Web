// Centralized initializer for the main gallery (DinamycGallery)
import { createGallerySlider } from '../../composables/useGallerySlider';
import { createCategorySwitch } from '../../composables/useCategorySwitch';
import { initializeMusicPlayers } from '../../utils/musicPlayer';

function initGaleria() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slider = document.getElementById('imageSlider');
  const buttonsContainer = document.querySelector('[data-category-buttons]');

  if (!prevBtn || !nextBtn || !slider || !buttonsContainer) {
    // Not on this page or DOM changed
    return;
  }

  const totalImages =
    Number(slider.dataset.total) ||
    slider.querySelectorAll('.gallery-item').length ||
    0;

  const gallerySlider = createGallerySlider(
    slider,
    prevBtn as HTMLButtonElement,
    nextBtn as HTMLButtonElement,
    totalImages,
    {
      viewportElement: slider.closest('.gallery-viewport') as HTMLElement,
    },
  );

  const cleanupSlider = gallerySlider.initialize();

  const categorySwitch = createCategorySwitch(
    buttonsContainer as HTMLElement,
    () => {
      // Reset slider and recalculate for new category
      gallerySlider.resetSlider();
    },
    {
      onCategoryChange: (category: string) => {
        // Update slider for new category item count
        setTimeout(() => {
          gallerySlider.updateSlider();
        }, 50);

        if (category === 'musica') {
          setTimeout(initializeMusicPlayers, 100);
        }
      },
    },
  );

  const cleanupCategory = categorySwitch.initialize('arte');

  // Initialize music players on load
  initializeMusicPlayers();

  window.addEventListener('beforeunload', () => {
    cleanupSlider();
    cleanupCategory();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGaleria);
} else {
  initGaleria();
}

export { initGaleria };
