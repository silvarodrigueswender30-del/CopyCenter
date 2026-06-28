import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initServiceMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_service");
  const header = section?.querySelector(".section_header");
  const list = section?.querySelector(".collection-list");
  const cards = section ? Array.from(section.querySelectorAll(".service-collection_item")) : [];

  if (!section || !header) {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(header, {
        autoAlpha: 1,
        filter: "blur(0px)",
        yPercent: 0,
        clearProps: "visibility",
      });
      gsap.set(cards, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        clearProps: "visibility",
      });
      return;
    }

    gsap.fromTo(
      header,
      {
        autoAlpha: 0,
        filter: "blur(5px)",
        yPercent: 14,
      },
      {
        autoAlpha: 1,
        filter: "blur(0px)",
        yPercent: 0,
        duration: 1.1,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "visibility",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      },
    );

    if (list && cards.length) {
      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 40,
          filter: "blur(4px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none reverse",
            markers: false,
            invalidateOnRefresh: true,
          },
        },
      );
    }
  }, section);

  ScrollTrigger.refresh();

  activeCleanup = () => {
    ctx.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
