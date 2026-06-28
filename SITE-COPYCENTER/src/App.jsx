import { useEffect, useState } from "react";
import { initAboutCountingMotion } from "./scripts/aboutCountingMotion.js";
import { initHeroMotion } from "./scripts/heroMotion.js";
import { initInfoMotion } from "./scripts/infoMotion.js";
import { initMobileNav } from "./scripts/mobileNav.js";
import { initProcessMotion } from "./scripts/processMotion.js";
import { initScrollTextMotion } from "./scripts/scrollTextMotion.js";
import { initServiceMotion } from "./scripts/serviceMotion.js";
import { initTestimonialMotion } from "./scripts/testimonialMotion.js";
import { initBlogMotion } from "./scripts/blogMotion.js";
import { initCtaMotion } from "./scripts/ctaMotion.js";
import { initFooterMotion } from "./scripts/footerMotion.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function App() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch("/header-hero.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Header/Hero markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/logo-marquee.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Logo marquee markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/animated-content.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Animated content markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/services.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Services markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/process.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Process markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/about.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load About markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/video.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Video markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/info.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Info markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/testimonial.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Testimonial markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/blog.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Blog markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/cta.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load CTA markup: ${response.status}`);
        }
        return response.text();
      }),
      fetch("/footer.html").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Footer markup: ${response.status}`);
        }
        return response.text();
      }),
    ])
      .then(([headerHeroMarkup, logoMarkup, contentMarkup, servicesMarkup, processMarkup, aboutMarkup, videoMarkup, infoMarkup, testimonialMarkup, blogMarkup, ctaMarkup, footerMarkup]) => {
        if (isMounted) {
          setHtml(
            headerHeroMarkup.replace(
              "</main>",
              `${logoMarkup}\n${contentMarkup}\n${servicesMarkup}\n${processMarkup}\n${aboutMarkup}\n${videoMarkup}\n${infoMarkup}\n${testimonialMarkup}\n${blogMarkup}\n${ctaMarkup}\n    </main>\n${footerMarkup}`,
            ),
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!html) {
      return undefined;
    }

    let cleanup = () => {};
    const frame = window.requestAnimationFrame(() => {
      const cleanups = [
        initMobileNav(document),
        initHeroMotion(document),
        initScrollTextMotion(document),
        initServiceMotion(document),
        initProcessMotion(document),
        initAboutCountingMotion(document),
        initInfoMotion(document),
        initTestimonialMotion(document),
        initBlogMotion(document),
        initCtaMotion(document),
        initFooterMotion(document),
      ];
      
      const refresh = () => ScrollTrigger.refresh();
      
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refresh).catch(() => {});
      }
      
      const images = document.querySelectorAll("img, video");
      images.forEach((media) => {
        if (media.tagName === "IMG" && !media.complete) {
          media.addEventListener("load", refresh, { once: true });
        } else if (media.tagName === "VIDEO" && media.readyState < 3) {
          media.addEventListener("loadeddata", refresh, { once: true });
        }
      });

      // Safeties for network latency on mobile
      const timeouts = [
        setTimeout(refresh, 500),
        setTimeout(refresh, 1500),
        setTimeout(refresh, 3000)
      ];

      cleanup = () => {
        cleanups.forEach((cleanupItem) => cleanupItem());
        timeouts.forEach(clearTimeout);
      };
    });

    return () => {
      window.cancelAnimationFrame(frame);
      cleanup();
    };
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
