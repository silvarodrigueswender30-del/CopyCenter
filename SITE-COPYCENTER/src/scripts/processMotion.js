import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
let activeCleanup = noop;

export function initProcessMotion(root = document) {
  activeCleanup();

  const resolvedRoot = root?.querySelector ? root : document;
  const section = resolvedRoot.querySelector(".section_process");

  if (!section || typeof window === "undefined") {
    activeCleanup = noop;
    return noop;
  }

  const ownerDocument = section.ownerDocument || document;
  const rootElement = ownerDocument.documentElement;
  const component = section.querySelector(".process_component");
  const heading = section.querySelector("h2.heading-custom-h1");
  const processInfo = section.querySelector(".process_info");
  const imageList = section.querySelector(".process-image_list");
  const processWrapper = section.querySelector(".process-info_wrapper");
  const contentItems = [
    section.querySelector(".process-info_content > .process-info_content-item.content-item-1"),
    section.querySelector(".process-info_content > .process-info_content-item.content-item-2"),
    section.querySelector(".process-info_content > .process-info_content-item.content-item-3"),
  ];
  const imageItems = [
    section.querySelector(".process-image_list > .process-image_item.item-1"),
    section.querySelector(".process-image_list > .process-image_item.item-2"),
    section.querySelector(".process-image_list > .process-image_item.item-3"),
  ];
  const tags = [
    section.querySelector(".process-info_tags-list > .process-info_tags-item.tag-1"),
    section.querySelector(".process-info_tags-list > .process-info_tags-item.tag-2"),
    section.querySelector(".process-info_tags-list > .process-info_tags-item.tag-3"),
  ];

  const requiredElements = [
    component,
    heading,
    processInfo,
    imageList,
    ...contentItems,
    ...imageItems,
    ...tags,
  ];

  if (requiredElements.some((element) => !element)) {
    activeCleanup = noop;
    return noop;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mm = gsap.matchMedia();
  let refreshFrame = null;
  let cancelled = false;

  const refresh = () => {
    ScrollTrigger.refresh();
  };

  const scheduleRefresh = () => {
    if (cancelled) {
      return;
    }

    refreshFrame = window.requestAnimationFrame(refresh);
  };

  const ctx = gsap.context(() => {
    rootElement.classList.add("motion-ready");

    mm.add("(min-width: 992px)", () => {
      if (prefersReducedMotion) {
        gsap.set([component, heading], {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          yPercent: 0,
          clearProps: "transform,filter,visibility",
        });
        gsap.set(contentItems, { autoAlpha: 1 });
        gsap.set(imageItems, { autoAlpha: 1, scale: 1 });
        gsap.set(tags, { opacity: 1 });
        return noop;
      }

      rootElement.classList.add("process-motion-ready");

      gsap.set(component, {
        height: "400vh",
        autoAlpha: 1,
        y: 0,
        clearProps: "transform,filter,visibility",
      });
      gsap.set(heading, {
        autoAlpha: 1,
        filter: "blur(0px)",
        yPercent: 0,
        clearProps: "transform,filter,visibility",
      });
      gsap.set(contentItems[0], { autoAlpha: 1 });
      gsap.set(contentItems.slice(1), { autoAlpha: 0 });
      gsap.set(imageItems[0], { autoAlpha: 1, scale: 1 });
      gsap.set(imageItems.slice(1), { autoAlpha: 0, scale: 1.04 });
      gsap.set(tags[0], { opacity: 1 });
      gsap.set(tags.slice(1), { opacity: 0.5 });

      const spacer = { progress: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processWrapper || section,
          start: "top 12%",
          end: "+=260%",
          scrub: 1.2,
          pin: false,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      tl.addLabel("step2", 1)
        .to(contentItems[0], { autoAlpha: 0, duration: 0.2, overwrite: "auto" }, "step2")
        .to(contentItems[1], { autoAlpha: 1, duration: 0.2, overwrite: "auto" }, "step2")
        .to(imageItems[0], { autoAlpha: 0, scale: 1.04, duration: 0.3, overwrite: "auto" }, "step2")
        .to(imageItems[1], { autoAlpha: 1, scale: 1, duration: 0.3, overwrite: "auto" }, "step2")
        .to(tags[0], { opacity: 0.5, duration: 0.15, overwrite: "auto" }, "step2")
        .to(tags[1], { opacity: 1, duration: 0.15, overwrite: "auto" }, "step2")
        .addLabel("step3", 2)
        .to(contentItems[1], { autoAlpha: 0, duration: 0.2, overwrite: "auto" }, "step3")
        .to(contentItems[2], { autoAlpha: 1, duration: 0.2, overwrite: "auto" }, "step3")
        .to(imageItems[1], { autoAlpha: 0, scale: 1.04, duration: 0.3, overwrite: "auto" }, "step3")
        .to(imageItems[2], { autoAlpha: 1, scale: 1, duration: 0.3, overwrite: "auto" }, "step3")
        .to(tags[1], { opacity: 0.5, duration: 0.15, overwrite: "auto" }, "step3")
        .to(tags[2], { opacity: 1, duration: 0.15, overwrite: "auto" }, "step3")
        .to(spacer, { progress: 1, duration: 0.001 }, 3);

      scheduleRefresh();

      return () => {
        rootElement.classList.remove("process-motion-ready");
      };
    });
  }, section);

  if (ownerDocument.fonts?.ready) {
    ownerDocument.fonts.ready.then(scheduleRefresh).catch(noop);
  }

  window.addEventListener("load", scheduleRefresh, { once: true });

  activeCleanup = () => {
    cancelled = true;
    window.removeEventListener("load", scheduleRefresh);

    if (refreshFrame !== null) {
      window.cancelAnimationFrame(refreshFrame);
    }

    mm.revert();
    ctx.revert();
    rootElement.classList.remove("process-motion-ready");
    activeCleanup = noop;
  };

  return activeCleanup;
}
