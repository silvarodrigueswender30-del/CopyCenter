const noop = () => {};

export function initMobileNav(root = document) {
  const resolvedRoot = root?.querySelectorAll ? root : document;
  const navbars = Array.from(resolvedRoot.querySelectorAll(".navbar.w-nav"));

  if (!navbars.length || typeof window === "undefined") {
    return noop;
  }

  const cleanups = [];

  navbars.forEach((navbar) => {
    const button = navbar.querySelector(".w-nav-button");
    const menu = navbar.querySelector(".w-nav-menu");

    if (!button || !menu) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 992px)");

    const setOpen = (isOpen) => {
      button.classList.toggle("w--open", isOpen);
      menu.classList.toggle("w--open", isOpen);
      button.setAttribute("aria-expanded", String(isOpen));
    };

    const toggleMenu = (event) => {
      event.preventDefault();
      setOpen(!button.classList.contains("w--open"));
    };

    const closeMenu = () => {
      setOpen(false);
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleDesktopChange = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };

    const links = Array.from(menu.querySelectorAll("a"));

    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", handleKeydown);
    links.forEach((link) => link.addEventListener("click", closeMenu));

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else {
      desktopQuery.addListener(handleDesktopChange);
    }

    cleanups.push(() => {
      closeMenu();
      button.removeEventListener("click", toggleMenu);
      document.removeEventListener("keydown", handleKeydown);
      links.forEach((link) => link.removeEventListener("click", closeMenu));

      if (desktopQuery.removeEventListener) {
        desktopQuery.removeEventListener("change", handleDesktopChange);
      } else {
        desktopQuery.removeListener(handleDesktopChange);
      }
    });
  });

  if (!cleanups.length) {
    return noop;
  }

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
