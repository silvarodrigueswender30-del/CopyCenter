import { gsap } from "gsap";

const noop = () => {};

export function initHeroMotion(root = document) {
  const resolvedRoot = root?.querySelector ? root : document;
  const hero = resolvedRoot.querySelector(".section_hero");

  if (!hero) {
    return noop;
  }

  const heroContent = hero.querySelector(".home-hero_content");
  const movingCards = [
    hero.querySelector(".hero-moving_element.moving-element-01"),
    hero.querySelector(".hero-moving_element.moving-element-02"),
    hero.querySelector(".hero-moving_element.moving-element-03"),
  ].filter(Boolean);

  if (!heroContent || movingCards.length !== 3) {
    return noop;
  }

  const ownerDocument = hero.ownerDocument || document;
  const rootElement = ownerDocument.documentElement;
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  rootElement.classList.add("motion-ready");

  if (prefersReducedMotion) {
    gsap.set(heroContent, {
      autoAlpha: 1,
      filter: "blur(0px)",
      yPercent: 0,
      y: 0,
      clearProps: "visibility",
    });

    return () => {
      gsap.killTweensOf([heroContent, ...movingCards]);
      rootElement.classList.remove("motion-ready");
    };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      heroContent,
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
      },
    );

    gsap.to(movingCards[0], {
      x: 4,
      y: -12,
      duration: 3.2,
      delay: 0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto",
    });

    gsap.to(movingCards[1], {
      x: -5,
      y: 9,
      duration: 3.8,
      delay: 0.15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto",
    });

    gsap.to(movingCards[2], {
      x: 5,
      y: -9,
      duration: 3.5,
      delay: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  }, hero);

  return () => {
    ctx.revert();
    gsap.killTweensOf([heroContent, ...movingCards]);
    rootElement.classList.remove("motion-ready");
  };
}
