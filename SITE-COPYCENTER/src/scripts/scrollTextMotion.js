import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initScrollTextMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_content");
  const text = section?.querySelector(".reveal-type");

  if (!section || !text) {
    activeCleanup = noop;
    return noop;
  }

  let cancelled = false;
  let split = null;
  let ctx = null;

  const setup = async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    if (cancelled) {
      return;
    }

    split = new SplitType(text, { types: "words, chars" });
    const chars = split.chars || [];

    if (!chars.length) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(chars, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        chars,
        {
          autoAlpha: 0.22,
          y: 12,
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          stagger: 0.015,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    ScrollTrigger.refresh();
  };

  setup().catch((error) => {
    console.error(error);
  });

  activeCleanup = () => {
    cancelled = true;
    ctx?.revert();
    split?.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
