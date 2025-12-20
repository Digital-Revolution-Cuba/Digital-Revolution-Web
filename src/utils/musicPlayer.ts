/**
 * Music player interactions for gallery music cards
 * Handles play/pause button state and accessibility
 */

export function initializeMusicPlayers() {
  const playButtons = document.querySelectorAll('.play-button');

  playButtons.forEach((button) => {
    // Initialize ARIA attributes
    button.setAttribute('aria-pressed', 'false');

    button.addEventListener('click', () => {
      const isPressed = button.getAttribute('aria-pressed') === 'true';
      const newState = !isPressed;

      button.setAttribute('aria-pressed', String(newState));

      // Update icon: play <-> pause
      const svg = button.querySelector('svg');
      if (!svg) return;

      if (newState) {
        // Switch to pause icon
        svg.innerHTML = `
          <circle cx="12" cy="12" r="10" fill="#F49624" />
          <rect x="9" y="8" width="2" height="8" fill="#041421" />
          <rect x="13" y="8" width="2" height="8" fill="#041421" />
        `;
        button.setAttribute(
          'aria-label',
          button.getAttribute('aria-label')?.replace('Play', 'Pause') ||
            'Pause',
        );
      } else {
        // Switch to play icon
        svg.innerHTML = `
          <circle cx="12" cy="12" r="10" fill="#F49624" />
          <path d="M10 8L16 12L10 16V8Z" fill="#041421" />
        `;
        button.setAttribute(
          'aria-label',
          button.getAttribute('aria-label')?.replace('Pause', 'Play') || 'Play',
        );
      }
    });
  });
}
