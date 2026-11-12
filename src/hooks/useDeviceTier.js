import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Safely checks whether WebGL rendering context is available in the current browser.
 */
export function checkWebGLSupport() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

function getDeviceTier(width) {
  if (width >= 1024) return 'desktop';
  if (width >= 640) return 'tablet';
  return 'mobile';
}

/**
 * Provides responsive device tier ('desktop' | 'tablet' | 'mobile'), WebGL availability,
 * and reduced-motion preference for adaptive 3D scene quality.
 */
export function useDeviceTier() {
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported] = useState(() => checkWebGLSupport());
  const [tier, setTier] = useState(() =>
    typeof window !== 'undefined' ? getDeviceTier(window.innerWidth) : 'desktop'
  );

  useEffect(() => {
    let frameId = null;
    const handleResize = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(() => {
        setTier(getDeviceTier(window.innerWidth));
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    tier,
    webglSupported,
    prefersReducedMotion,
  };
}
