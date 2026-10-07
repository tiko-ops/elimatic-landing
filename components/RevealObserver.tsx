"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades and lifts any element marked with `data-reveal` as it scrolls into view.
 * Content stays fully visible without JavaScript.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past (e.g. after an anchor jump).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    els.forEach((el) => {
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
