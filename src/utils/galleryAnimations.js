// Utilities for gallery animations (client-side)
// Exports: swapButtons(targetCategory, buttonsContainer)

export function waitForAnimationEnd(el, timeout = 500) {
  return new Promise((resolve) => {
    if (!el) return resolve();
    let finished = false;
    const onEnd = () => {
      if (finished) return;
      finished = true;
      el.removeEventListener('animationend', onEnd);
      resolve();
    };
    el.addEventListener('animationend', onEnd, { once: true });

    // Fallback in case animationend doesn't fire
    setTimeout(() => {
      if (!finished) {
        finished = true;
        el.removeEventListener('animationend', onEnd);
        resolve();
      }
    }, timeout);
  });
}

export async function swapButtons(targetCategory, buttonsContainer) {
  if (!buttonsContainer) return;

  const btns = Array.from(buttonsContainer.querySelectorAll('.category-btn'));
  const arteBtn = btns.find((b) => b.dataset.cat === 'arte');
  const musicaBtn = btns.find((b) => b.dataset.cat === 'musica');
  if (!arteBtn || !musicaBtn) return;

  // Remove previous animation classes
  arteBtn.classList.remove('move-left', 'move-right');
  musicaBtn.classList.remove('move-left', 'move-right');

  // Apply classes based on target
  if (targetCategory === 'musica') {
    musicaBtn.classList.add('move-left');
    arteBtn.classList.add('move-right');
  } else {
    arteBtn.classList.add('move-left');
    musicaBtn.classList.add('move-right');
  }

  // Wait for both buttons to finish animation
  await Promise.all([
    waitForAnimationEnd(arteBtn, 400),
    waitForAnimationEnd(musicaBtn, 400),
  ]);

  // Reorder DOM to reflect final visual positions
  if (targetCategory === 'musica') {
    buttonsContainer.insertBefore(musicaBtn, arteBtn);
  } else {
    buttonsContainer.insertBefore(arteBtn, musicaBtn);
  }

  // Clean up classes
  arteBtn.classList.remove('move-left', 'move-right');
  musicaBtn.classList.remove('move-left', 'move-right');
}
