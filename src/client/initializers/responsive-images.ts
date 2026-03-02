// Centralized initializer for responsive / lazy optimized images
function initImageLoading() {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
        }

        // If image already loaded, mark as loaded
        const handleLoad = () => img.classList.add("loaded");

        if (img.complete) {
          handleLoad();
        } else {
          img.addEventListener("load", handleLoad, { once: true });
        }

        observer.unobserve(img);
      });
    },
    {
      rootMargin: "100px",
      threshold: 0.01,
    }
  );

  document.querySelectorAll('.optimized-image[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img);
  });

  document.querySelectorAll('.optimized-image[loading="eager"]').forEach((img) => {
    const handleLoad = () => (img as HTMLImageElement).classList.add("loaded");
    if ((img as HTMLImageElement).complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad, { once: true });
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initImageLoading);
} else {
  initImageLoading();
}

export { initImageLoading };
