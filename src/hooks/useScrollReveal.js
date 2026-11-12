import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Applies lightweight GSAP ScrollTrigger reveal animations to matching child elements,
 * automatically bypassing motion when prefers-reduced-motion is enabled.
 */
export function useScrollReveal(containerRef, selector = '[data-reveal]', deps = []) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef?.current;
    const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (!container || prefersReducedMotion || typeof window === 'undefined' || isJsdom) {
      return undefined;
    }

    const targets = container.querySelectorAll(selector);
    if (!targets || targets.length === 0) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 84%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, prefersReducedMotion, selector, ...deps]);
}

