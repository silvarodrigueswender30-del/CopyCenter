import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initCtaMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_cta");

  if (!section || typeof window === "undefined") {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The precise scatter map based on Webflow IX2 extraction
  const map = {
    ".is-image1": { scale: 1.8, x: -170, y: -245 },
    ".is-image2": { scale: 2.5, x: 140, y: -210 },
    ".is-image3": { scale: 1.8, x: 334, y: -50 },
    ".is-image4": { scale: 1.8, x: -334, y: -30 },
    ".is-image5": { scale: 1.8, x: -400, y: 160 },
    ".is-image6": { scale: 1.8, x: -280, y: 320 },
    ".is-image7": { scale: 1.8, x: 110, y: 240 },
    ".is-image8": { scale: 1.8, x: 494, y: 320 },
  };

  const ctx = gsap.context(() => {
    document.documentElement.classList.add("cta-motion-ready");

    const ctaComponent = section.querySelector(".cta_component");
    const ctaContent = section.querySelector(".cta_content");

    // Pre-clear any old styles
    if (ctaContent) gsap.set(ctaContent, { clearProps: "all" });
    Object.keys(map).forEach((selector) => {
      const el = section.querySelector(selector);
      if (el) gsap.set(el, { clearProps: "transform,opacity,visibility" });
    });

    if (prefersReducedMotion) {
      if (ctaContent) gsap.set(ctaContent, { autoAlpha: 1 });
      Object.keys(map).forEach((selector) => {
        const el = section.querySelector(selector);
        if (el) {
          gsap.set(el, {
            xPercent: map[selector].x,
            yPercent: map[selector].y,
            scale: 1,
            autoAlpha: 1,
          });
        }
      });
      ScrollTrigger.refresh();
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaComponent,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrub
        invalidateOnRefresh: true,
      },
    });

    // Content fade in (0 to 64% of the scroll distance)
    if (ctaContent) {
      tl.fromTo(
        ctaContent,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.64, ease: "none" },
        0
      );
    }

    // Images scatter (0 to 60% of the scroll distance)
    Object.keys(map).forEach((selector) => {
      const el = section.querySelector(selector);
      if (el) {
        const config = map[selector];
        tl.fromTo(
          el,
          { xPercent: 0, yPercent: 0, scale: config.scale },
          {
            xPercent: config.x,
            yPercent: config.y,
            scale: 1,
            duration: 0.6,
            ease: "power1.inOut",
          },
          0
        );
      }
    });

    // Add a dummy tween to extend the timeline duration to 1.0 (100% of scroll)
    // so the animation holds still from 64% to 100% scroll distance.
    tl.to({}, { duration: 0.36 });

  }, section);

  activeCleanup = () => {
    document.documentElement.classList.remove("cta-motion-ready");
    ctx.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
