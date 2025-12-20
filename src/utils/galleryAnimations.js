/**
 * Utilities to animate button swaps and manage will-change dynamically.
 * Exports: flipSwapButtons(targetCategory, container), withWillChange(elements, willChangeValue, durationMs)
 *
 * Keep it small and single-responsibility (SOLID-friendly).
 */

import { readCssVarMs } from './transitionUtils.js';

/**
 * Add will-change to elements for durationMs milliseconds and remove afterwards.
 * elements: Element or array/NodeList of Elements
 * willChangeValue: string like 'transform' or 'opacity, transform'
 * durationMs: number milliseconds
 */
export function withWillChange(
  elements,
  willChangeValue = 'transform',
  durationMs = 100,
) {
  const els =
    elements instanceof Element ? [elements] : Array.from(elements || []);
  els.forEach((el) => {
    if (el && el.style) el.style.willChange = willChangeValue;
  });

  // Clean up after durationMs + small buffer
  const timer = setTimeout(
    () => {
      els.forEach((el) => {
        if (el && el.style) el.style.willChange = '';
      });
      clearTimeout(timer);
    },
    Math.max(0, durationMs + 20),
  );

  // Return a function to cancel early if needed
  return () => {
    clearTimeout(timer);
    els.forEach((el) => {
      if (el && el.style) el.style.willChange = '';
    });
  };
}

/**
 * FLIP swap between the currently active button and the button representing targetCategory.
 * Works with any category (arte, musica, fotografia, etc.)
 * container: DOM node containing category buttons.
 */
export function flipSwapButtons(targetCategory, container) {
  return new Promise((resolve, reject) => {
    if (!container) return resolve();

    try {
      const buttons = Array.from(container.querySelectorAll('.category-btn'));
      const active = buttons.find((b) => b.classList.contains('active'));
      const target = buttons.find((b) => b.dataset.cat === targetCategory);

      if (!target || active === target) {
        return resolve();
      }

      const flipMs = readCssVarMs('--flip-swap-duration', 70);

      // Measure positions before DOM change
      const rectA = active.getBoundingClientRect();
      const rectB = target.getBoundingClientRect();

      // Create clones at initial positions
      const makeCloneAt = (el, rect) => {
        const clone = el.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.margin = '0';
        clone.style.zIndex = '9999';
        clone.style.pointerEvents = 'none';
        clone.style.transition = `transform ${flipMs}ms ease`;
        document.body.appendChild(clone);
        return clone;
      };

      const cloneA = makeCloneAt(active, rectA);
      const cloneB = makeCloneAt(target, rectB);

      // Hide originals but keep layout
      active.style.visibility = 'hidden';
      target.style.visibility = 'hidden';

      // Set will-change to improve performance for the duration
      withWillChange([cloneA, cloneB, container], 'transform', flipMs);

      // Swap nodes in DOM (robust swap)
      const swapNodes = (parent, a, b) => {
        const aNext = a.nextSibling;
        const bNext = b.nextSibling;
        // move a to b's position and b to a's position
        parent.insertBefore(a, bNext);
        parent.insertBefore(b, aNext);
      };

      swapNodes(container, active, target);

      // Measure final positions after DOM change
      const finalA = active.getBoundingClientRect();
      const finalB = target.getBoundingClientRect();

      // Compute deltas for clones to animate from original -> final
      const dxA = Math.round(finalA.left - rectA.left);
      const dyA = Math.round(finalA.top - rectA.top);
      const dxB = Math.round(finalB.left - rectB.left);
      const dyB = Math.round(finalB.top - rectB.top);

      // Force reflow
      void cloneA.getBoundingClientRect();

      // Trigger the clone animations
      requestAnimationFrame(() => {
        cloneA.style.transform = `translate(${dxA}px, ${dyA}px)`;
        cloneB.style.transform = `translate(${dxB}px, ${dyB}px)`;
      });

      // Cleanup after animation finishes
      setTimeout(() => {
        cloneA.remove();
        cloneB.remove();

        // Restore originals visibility and update active classes
        buttons.forEach((b) => b.classList.remove('active'));
        target.classList.add('active');

        active.style.visibility = '';
        target.style.visibility = '';

        resolve();
      }, flipMs + 30);
    } catch (error) {
      console.error('Error in flipSwapButtons:', error);
      reject(error);
    }
  });
}
