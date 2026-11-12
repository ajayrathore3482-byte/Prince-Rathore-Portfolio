import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Mock IntersectionObserver for jsdom tests
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver;

// Ensure requestAnimationFrame exists even during jsdom teardown for GSAP timers
if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
}

// Mock matchMedia for jsdom tests
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// Stub canvas.getContext in jsdom to avoid noisy NotImplemented stderr while simulating non-WebGL jsdom
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => null;
}

afterEach(() => {
  cleanup();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
