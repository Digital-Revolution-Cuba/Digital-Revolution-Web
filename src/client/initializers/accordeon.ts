// Centralized initializer for Accordeon slider
function initAccordeon() {
  const dotsContainer = document.getElementById('acordeonDots');
  const sliderContainer = document.getElementById('acordeonSlider');

  if (!dotsContainer || !sliderContainer) return;

  const dots = dotsContainer.querySelectorAll('.acordeon-dot');
  const cards = sliderContainer.querySelectorAll('.acordeon-item');
  let currentIndex = 0;
  let isAnimating = false;

  function animateTransition(fromIndex: number, toIndex: number) {
    if (isAnimating) return;
    isAnimating = true;

    cards.forEach((card, i) => {
      (card as HTMLElement).style.animationDelay = `${i * 100}ms`;
      card.classList.add('slide-out-left');
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === toIndex);
    });

    const exitDuration = 600;

    setTimeout(() => {
      cards.forEach((card, i) => {
        card.classList.remove('slide-out-left', 'highlighted');
        (card as HTMLElement).style.animationDelay = '0ms';

        (card as HTMLElement).style.animationDelay = `${i * 75}ms`;
        card.classList.add('slide-in-right');

        if (i === toIndex) {
          card.classList.add('highlighted');
        }
      });

      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.remove('slide-in-right');
          (card as HTMLElement).style.animationDelay = '0ms';
        });
        isAnimating = false;
      }, 600);
    }, exitDuration - 100);

    currentIndex = toIndex;
  }

  function updateActiveState(index: number, animate = true) {
    if (animate && index !== currentIndex) {
      animateTransition(currentIndex, index);
    } else {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      cards.forEach((card, i) => {
        (card as HTMLElement).style.animationDelay = '0ms';
        if (i === index) {
          card.classList.add('highlighted');
        } else {
          card.classList.remove('highlighted');
        }
      });
      currentIndex = index;
    }
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(
        (e.target as HTMLElement).dataset.index || '0',
        10,
      );
      if (!isAnimating) updateActiveState(index, true);
    });
  });

  let autoRotate = setInterval(() => {
    if (!isAnimating) {
      const nextIndex = (currentIndex + 1) % dots.length;
      updateActiveState(nextIndex, true);
    }
  }, 6000);

  sliderContainer.addEventListener('mouseenter', () =>
    clearInterval(autoRotate),
  );
  sliderContainer.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentIndex + 1) % dots.length;
        updateActiveState(nextIndex, true);
      }
    }, 6000);
  });

  updateActiveState(0, false);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordeon);
} else {
  initAccordeon();
}

export { initAccordeon };
