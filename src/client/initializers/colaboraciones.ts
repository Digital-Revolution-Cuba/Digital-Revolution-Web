// Centralized initializer for Colaboraciones Destacadas
// Keeps components presentational and wires behavior from a single place
import { createGallerySlider } from '../../composables/useGallerySlider';

function initColaboraciones() {
  const prevBtn = document.getElementById('prevBtnColab');
  const nextBtn = document.getElementById('nextBtnColab');
  const slider = document.getElementById('cardSliderColab');
  const viewport = document.querySelector('.cards-viewport');
  const pagination = document.getElementById('paginationColab');

  if (!prevBtn || !nextBtn || !slider || !viewport || !pagination) {
    // Not present on this page or markup changed
    return;
  }

  const gallerySlider = createGallerySlider(
    slider,
    prevBtn as HTMLButtonElement,
    nextBtn as HTMLButtonElement,
    Number(slider.dataset.total || 0),
    {
      paginationElement: pagination,
      viewportElement: viewport as HTMLElement,
    },
  );

  const cleanup = gallerySlider.initialize();

  window.addEventListener('beforeunload', () => cleanup());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initColaboraciones);
} else {
  initColaboraciones();
}

export { initColaboraciones };
