// Utilities for gallery animations (client-side)
// Exports: swapButtons(targetCategory, buttonsContainer)

// (removed keyframe-based animation helper; FLIP uses transition-based approach)

export function waitForTransitionEnd(el, timeout = 500) {
  return new Promise((resolve) => {
    if (!el) return resolve();
    let finished = false;
    const onEnd = (e) => {
      if (finished) return;
      // Only care about transform property
      if (e && e.propertyName && e.propertyName !== 'transform') return;
      finished = true;
      el.removeEventListener('transitionend', onEnd);
      resolve();
    };
    el.addEventListener('transitionend', onEnd, { once: true });

    // Fallback in case transitionend doesn't fire
    setTimeout(() => {
      if (!finished) {
        finished = true;
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }
    }, timeout);
  });
}

// Removed keyframe-based swapButtons in favor of FLIP `flipSwapButtons`.

// FLIP swap: visually moves buttons to each other's spots using transform
export async function flipSwapButtons(targetCategory, buttonsContainer) {
  if (!buttonsContainer) return;

  const btns = Array.from(buttonsContainer.querySelectorAll('.category-btn'));
  const arteBtn = btns.find((b) => b.dataset.cat === 'arte');
  const musicaBtn = btns.find((b) => b.dataset.cat === 'musica');
  if (!arteBtn || !musicaBtn) return;

  // Clone-based FLIP: create fixed-position clones, animate them from first->last,
  // then reorder DOM and remove clones. This avoids modifying originals' layout
  // during the animation and ensures a visible translation.
  const shouldMusicBeFirst = targetCategory === 'musica';

  // Measure first positions (relative to viewport)
  const firstRect = {
    arte: arteBtn.getBoundingClientRect(),
    musica: musicaBtn.getBoundingClientRect(),
  };

  // Create clones positioned fixed at the original positions
  const makeClone = (el, rect) => {
    const clone = el.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.transform = 'none';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    return clone;
  };

  const arteClone = makeClone(arteBtn, firstRect.arte);
  const musicaClone = makeClone(musicaBtn, firstRect.musica);

  document.body.appendChild(arteClone);
  document.body.appendChild(musicaClone);

  // Hide originals visually but keep them in flow for measurement after reorder
  arteBtn.style.visibility = 'hidden';
  musicaBtn.style.visibility = 'hidden';

  // Reorder DOM to final arrangement
  if (shouldMusicBeFirst) {
    buttonsContainer.insertBefore(musicaBtn, arteBtn);
  } else {
    buttonsContainer.insertBefore(arteBtn, musicaBtn);
  }

  // Measure last positions (after reorder)
  const lastRect = {
    arte: arteBtn.getBoundingClientRect(),
    musica: musicaBtn.getBoundingClientRect(),
  };

  // Compute translation deltas for clones
  const dxArte = Math.round(lastRect.arte.left - firstRect.arte.left);
  const dyArte = Math.round(lastRect.arte.top - firstRect.arte.top);
  const dxMus = Math.round(lastRect.musica.left - firstRect.musica.left);
  const dyMus = Math.round(lastRect.musica.top - firstRect.musica.top);

  // Prepare clones for transition
  const transition = 'transform 320ms cubic-bezier(.2,.9,.2,1)';
  arteClone.style.transition = transition;
  musicaClone.style.transition = transition;

  // Force reflow
  // eslint-disable-next-line no-unused-expressions
  arteClone.getBoundingClientRect();

  // Animate clones to their target positions using transform translate
  requestAnimationFrame(() => {
    arteClone.style.transform = `translate(${dxArte}px, ${dyArte}px)`;
    musicaClone.style.transform = `translate(${dxMus}px, ${dyMus}px)`;
  });

  // Wait for clones' transitions
  await Promise.all([
    waitForTransitionEnd(arteClone, 500),
    waitForTransitionEnd(musicaClone, 500),
  ]);

  // Cleanup clones and restore originals
  arteClone.remove();
  musicaClone.remove();
  arteBtn.style.visibility = '';
  musicaBtn.style.visibility = '';
}
