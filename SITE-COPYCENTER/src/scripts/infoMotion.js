import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initInfoMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_info");

  if (!section || typeof window === "undefined") {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    // Add readiness class for custom.css fallback handling
    document.documentElement.classList.add("info-motion-ready");

    const title = section.querySelector(".home-info_title");
    const imageWrap = section.querySelector(".home-info_image-wrap");
    const cards = gsap.utils.toArray(section.querySelectorAll(".home-info_card"));

    // Clear any leftover IX2 inline styles to avoid conflicts
    if (title) gsap.set(title, { clearProps: "transform,filter,visibility,opacity" });
    if (imageWrap) gsap.set(imageWrap, { clearProps: "transform,filter,visibility,opacity" });
    cards.forEach((card) => {
      gsap.set(card, { clearProps: "transform,filter,visibility,opacity" });
    });

    if (prefersReducedMotion) {
      // Just ensure visibility
      if (title) gsap.set(title, { autoAlpha: 1, filter: "blur(0px)", yPercent: 0 });
      if (imageWrap) gsap.set(imageWrap, { autoAlpha: 1, filter: "blur(0px)", y: 0, scale: 1 });
      cards.forEach((card) => gsap.set(card, { autoAlpha: 1, filter: "blur(0px)", y: 0 }));
      ScrollTrigger.refresh();
      return;
    }

    // Title animation
    if (title) {
      gsap.fromTo(
        title,
        { autoAlpha: 0, yPercent: 14, filter: "blur(5px)" },
        {
          autoAlpha: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // Image animation
    if (imageWrap) {
      gsap.fromTo(
        imageWrap,
        { autoAlpha: 0, y: 40, scale: 0.96, filter: "blur(5px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // Cards animation with stagger
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 36, filter: "blur(4px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    }

    ScrollTrigger.refresh();
  }, section);

  activeCleanup = () => {
    document.documentElement.classList.remove("info-motion-ready");
    ctx.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
