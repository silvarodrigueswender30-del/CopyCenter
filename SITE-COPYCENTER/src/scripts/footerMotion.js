import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initFooterMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".footer");

  if (!section || typeof window === "undefined") {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const target = section.querySelector(
    '[data-w-id="b6def29d-75e6-ec68-bf55-d4183e570274"]'
  ) || section.querySelector(".footer_element");

  const ctx = gsap.context(() => {
    document.documentElement.classList.add("footer-motion-ready");

    if (target) {
      gsap.set(target, { clearProps: "all" });

      if (prefersReducedMotion) {
        gsap.set(target, { autoAlpha: 1, y: 0 });
        ScrollTrigger.refresh();
        return;
      }

      gsap.fromTo(
        target,
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1, // mapped from delay: 100 in IX2
          ease: "sine.inOut", // mapped from "inOutSine" in IX2
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // standard webflow scroll-into-view offset
            toggleActions: "play none none none", // playInReverse is false
          },
        }
      );
    }
  }, section);

  activeCleanup = () => {
    document.documentElement.classList.remove("footer-motion-ready");
    ctx.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
