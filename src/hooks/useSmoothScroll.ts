import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis to window for debugging
    if (typeof window !== 'undefined') {
      (window as Window & { lenis?: Lenis }).lenis = lenis;
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    lenisRef.current?.scrollTo(target, {
      offset: options?.offset ?? -80,
      duration: options?.duration ?? 1.2,
    });
  }, []);

  return { scrollTo, lenis: lenisRef };
}
