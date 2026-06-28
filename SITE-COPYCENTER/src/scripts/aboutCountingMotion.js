import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

/**
 * SESSION-007.1 — About Counting Motion
 *
 * The .counting-animation container has height equal to the font-size (1 row visible)
 * and overflow: hidden — it acts as a viewport window over a vertical strip of numbers.
 *
 * Each .couting_column contains multiple <div> children (the digit reel).
 * The reel scrolls via translateY so the target digit lands in the visible window.
 *
 * - align-top: target digit is the FIRST child (index 0). Reel scrolls UP from bottom.
 *   At rest (y=0) the first child is at the top → already showing the right digit.
 *   We animate FROM a downward offset (showing the last digit) TO y=0 (showing the first).
 *
 * - align-bottom: target digit is the LAST child. Reel scrolls DOWN to the bottom.
 *   We animate FROM y=0 (top, wrong digit) TO the negative offset that reveals the last child.
 *
 * - plain columns (no align): static content ($, m, +). No animation needed.
 */
export function initAboutCountingMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_about");

  if (!section || typeof window === "undefined") {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    const animations = [];

    // Find every counting-animation container
    const counters = section.querySelectorAll(".counting-animation");

    counters.forEach((counter) => {
      const columns = counter.querySelectorAll(".couting_column");

      columns.forEach((col) => {
        const isAlignTop = col.classList.contains("align-top");
        const isAlignBottom = col.classList.contains("align-bottom");

        // Static columns ($, m, +): skip
        if (!isAlignTop && !isAlignBottom) return;

        const children = col.querySelectorAll(":scope > div");
        if (!children.length) return;

        // Measure a single row height from the computed line-height of the parent counter
        // We use the counter's own height (which equals the font-size = 1 row)
        const rowHeight = counter.offsetHeight || 52; // fallback 52px

        const totalRows = children.length;

        if (prefersReducedMotion) {
          // Snap immediately to final state without animating
          if (isAlignTop) {
            gsap.set(col, { y: 0 });
          } else if (isAlignBottom) {
            gsap.set(col, { y: -(rowHeight * (totalRows - 1)) });
          }
          return;
        }

        if (isAlignTop) {
          // Target: first child visible (y = 0)
          // Start: last child visible → y = -(rowHeight * (totalRows - 1)) pushed upward
          // Wait — aligning so first child shows means y=0 is the resting position.
          // We animate FROM showing a middle/bottom child (large negative y) TO y=0.
          // The "from" offset simulates the reel spinning up and landing on the target.
          const startY = -(rowHeight * (totalRows - 1));

          gsap.set(col, { y: startY });

          const anim = gsap.to(col, {
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
              markers: false,
              invalidateOnRefresh: true,
            },
          });
          animations.push(anim);
        } else if (isAlignBottom) {
          // align-bottom: target digit is the LAST child.
          // The column naturally aligns to flex-end (bottom), so the last child sits in the window.
          // We animate FROM y showing top (wrong digit) TO fully scrolled down.
          // Since CSS align-self: flex-end, at rest the column tail sits at bottom of the container.
          // We want to scroll upward through numbers and land at bottom.
          // Start: raise column so first child is visible (shift up by (totalRows-1) rows)
          const endY = 0; // natural flex-end position shows last child
          const startY = rowHeight * (totalRows - 1); // pushed down (shows top items)

          gsap.set(col, { y: startY });

          const anim = gsap.to(col, {
            y: endY,
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
              markers: false,
              invalidateOnRefresh: true,
            },
          });
          animations.push(anim);
        }
      });
    });

    // Stagger reveal of section header elements (fade-in + unblur), identical pattern to other sections
    const headerEl = section.querySelector(".margin-bottom.margin-60");
    const elementEl = section.querySelector(".home-about_element");
    const paraEl = section.querySelector(".about-para_wrap");

    [headerEl, elementEl, paraEl].forEach((el) => {
      if (!el) return;
      // Clear inline IX2 styles first
      gsap.set(el, {
        clearProps: "transform,filter,visibility",
      });
    });

    if (!prefersReducedMotion) {
      [headerEl, elementEl, paraEl].forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { autoAlpha: 0, filter: "blur(5px)", yPercent: 14 },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            yPercent: 0,
            duration: 1.0,
            ease: "power3.out",
            delay: i * 0.15,
            overwrite: "auto",
            clearProps: "visibility",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none reverse",
              markers: false,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    } else {
      // prefers-reduced-motion: snap visible
      [headerEl, elementEl, paraEl].forEach((el) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: 1, filter: "blur(0px)", yPercent: 0, clearProps: "visibility" });
      });
    }

    ScrollTrigger.refresh();
  }, section);

  activeCleanup = () => {
    ctx.revert();
    activeCleanup = noop;
  };

  return activeCleanup;
}
