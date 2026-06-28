import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initBlogMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_blog");

  if (!section || typeof window === "undefined") {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    document.documentElement.classList.add("blog-motion-ready");

    const header = section.querySelector(".section_header");
    const cards = gsap.utils.toArray(section.querySelectorAll(".collection-blogs_item"));

    // Clear any IX2 inline styles to avoid conflicts
    if (header) gsap.set(header, { clearProps: "transform,filter,visibility,opacity" });
    cards.forEach((card) => {
      gsap.set(card, { clearProps: "transform,filter,visibility,opacity" });
    });

    if (prefersReducedMotion) {
      if (header) gsap.set(header, { autoAlpha: 1, filter: "blur(0px)", yPercent: 0 });
      cards.forEach((card) => gsap.set(card, { autoAlpha: 1, filter: "blur(0px)", y: 0 }));
      ScrollTrigger.refresh();
      return;
    }

    // Header animation
    if (header) {
      gsap.fromTo(
        header,
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

    // Cards animation with stagger
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 38, filter: "blur(4px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
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
    document.documentElement.classList.remove("blog-motion-ready");
    ctx.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
