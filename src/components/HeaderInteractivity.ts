/**
 * Header Interactivity Script
 * Maneja menú móvil, scroll behavior y focus trap
 * Separado para optimización con Astro Islands
 */

interface HeaderElements {
  menuToggle: HTMLButtonElement | null;
  mobileMenu: HTMLElement | null;
  header: HTMLElement | null;
  mobileNavLinks: NodeListOf<HTMLAnchorElement>;
}

/**
 * Inicializar funcionalidad del header
 */
export function initializeHeader(): () => void {
  const elements: HeaderElements = {
    menuToggle: document.getElementById("menu-toggle") as HTMLButtonElement,
    mobileMenu: document.getElementById("mobile-menu") as HTMLElement,
    header: document.getElementById("main-header") as HTMLElement,
    mobileNavLinks: document.querySelectorAll(".mobile-nav-link"),
  };

  if (!elements.menuToggle || !elements.mobileMenu || !elements.header) {
    console.error("Header: Required elements not found");
    return () => {};
  }

  // Setup mobile menu toggle
  const toggleMenu = (forceClose = false) => {
    const isExpanded = elements.menuToggle!.getAttribute("aria-expanded") === "true";
    const shouldClose = forceClose || isExpanded;

    elements.menuToggle!.setAttribute("aria-expanded", (!shouldClose).toString());

    elements.mobileMenu!.setAttribute("aria-hidden", shouldClose.toString());

    if (!shouldClose) {
      // ABRIR
      elements.mobileMenu!.classList.remove(
        "opacity-0",
        "invisible",
        "-translate-y-4",
        "pointer-events-none"
      );
      elements.mobileMenu!.classList.add(
        "opacity-100",
        "visible",
        "translate-y-0",
        "pointer-events-auto"
      );
      document.body.style.overflow = "hidden";
    } else {
      // CERRAR
      elements.mobileMenu!.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0",
        "pointer-events-auto"
      );
      elements.mobileMenu!.classList.add(
        "opacity-0",
        "invisible",
        "-translate-y-4",
        "pointer-events-none"
      );
      document.body.style.overflow = "";
    }

    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = shouldClose ? "" : "hidden";
  };

  // Click en botón de menú
  elements.menuToggle.addEventListener("click", () => toggleMenu());

  // Cerrar menú al hacer click en un link
  elements.mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  // Cerrar menú con Escape
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && elements.menuToggle!.getAttribute("aria-expanded") === "true") {
      toggleMenu(true);
      elements.menuToggle!.focus();
    }
  };

  document.addEventListener("keydown", handleEscape);

  // Cerrar menú al hacer click fuera
  const handleClickOutside = (e: MouseEvent) => {
    if (!elements.header!.contains(e.target as Node)) {
      toggleMenu(true);
    }
  };

  document.addEventListener("click", handleClickOutside);

  // Cerrar menú al hacer click en el backdrop
  elements.mobileMenu.addEventListener("click", (e) => {
    if (e.target === elements.mobileMenu) {
      toggleMenu(true);
    }
  });

  // Hide/show header on scroll con debouncing
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeaderVisibility = () => {
    const currentScrollY = window.scrollY;

    if (elements.header) {
      // Ocultar header al hacer scroll hacia abajo
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        elements.header.style.transform = "translateX(-50%) translateY(-150%)";

        // Cerrar menú móvil si está abierto
        if (elements.menuToggle!.getAttribute("aria-expanded") === "true") {
          toggleMenu(true);
        }
      } else {
        elements.header.style.transform = "translateX(-50%) translateY(0)";
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Cleanup function
  return () => {
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("scroll", handleScroll);
    document.body.style.overflow = "";
  };
}

// Auto-inicializar si el DOM está listo
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initializeHeader);
// } else {
//   initializeHeader();
// }
