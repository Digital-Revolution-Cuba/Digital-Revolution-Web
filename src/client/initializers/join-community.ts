/**
 * Intersection Observer for JoinOurCommunity animations
 * Triggers 'animate-in' classes when elements enter viewport
 */

export function initJoinCommunityAnimations() {
  if (typeof window === "undefined") return;

  const animatedElements = document.querySelectorAll(".animate-in");

  if (animatedElements.length === 0) return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    // Add is-visible immediately for reduced motion users
    animatedElements.forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optional: unobserve after animation triggers
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all animated elements
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Auto-initialize when DOM is ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initJoinCommunityAnimations);
  } else {
    initJoinCommunityAnimations();
  }
}
