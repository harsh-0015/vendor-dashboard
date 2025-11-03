import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface UseLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
  syncTouch?: boolean;
}

export function useLenisScroll(options?: UseLenisOptions) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with correct options
    const lenis = new Lenis({
      duration: options?.duration || 1.2,
      easing: options?.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: options?.smoothWheel !== undefined ? options.smoothWheel : true,
      wheelMultiplier: options?.wheelMultiplier || 1,
      touchMultiplier: options?.touchMultiplier || 2,
      infinite: options?.infinite || false,
      syncTouch: options?.syncTouch || false,
    });

    lenisRef.current = lenis;

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [options?.duration, options?.easing, options?.smoothWheel, options?.wheelMultiplier, options?.touchMultiplier, options?.infinite, options?.syncTouch]);

  return lenisRef;
}