import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/**
 * Initializes Lenis once for the entire app and wires the RAF loop.
 */
export const initLenis = () => {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    lerp: 0.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
  return lenisInstance;
};

/**
 * Smoothly scrolls to a section id using Lenis with a safe fallback.
 */
export const smoothScrollTo = (id: string, offset = 80) => {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = initLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -offset });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

