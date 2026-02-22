import { initializeHeader } from '../../components/HeaderInteractivity';

let cleanup = () => {};

const initHeader = () => {
  cleanup();
  cleanup = initializeHeader();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}

// Re-execute on Astro client navigation events
document.addEventListener('astro:page-load', initHeader);
document.addEventListener('astro:before-swap', () => cleanup());

export { initHeader };
