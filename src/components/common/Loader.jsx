import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/personal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Brief, non-blocking loading screen displaying PR initials and an orbital 3D-inspired ring.
 */
export default function Loader({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete?.();
      return undefined;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, 450);

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 750);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080A12] transition-opacity duration-300 ${
        isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* Outer electric-blue orbital ring */}
        <div
          className="animate-orbit absolute inset-0 rounded-full border border-[#398BFF]/25 border-t-[#398BFF]"
          aria-hidden="true"
        />
        {/* Inner violet counter-orbital ring */}
        <div
          className="animate-orbit-reverse absolute inset-3 rounded-full border border-[#8B5CF6]/20 border-b-[#8B5CF6]"
          aria-hidden="true"
        />
        {/* Monogram */}
        <span className="font-display text-2xl font-bold tracking-wider text-white">
          {personalInfo.initials}
        </span>
      </div>
      <p className="mt-4 text-xs font-medium tracking-[0.25em] text-[#A1A1AA] uppercase">
        Initializing Universe
      </p>
    </div>
  );
}

