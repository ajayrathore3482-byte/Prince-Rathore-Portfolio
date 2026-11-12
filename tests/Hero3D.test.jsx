import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../src/components/common/ErrorBoundary';
import WebGLFallback from '../src/components/three/WebGLFallback';
import Hero from '../src/components/sections/Hero';
import * as deviceTierHook from '../src/hooks/useDeviceTier';

describe('Phase 4 3D Hero, Fallbacks & Accessibility', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders WebGLFallback when WebGL is unavailable while preserving readable, clickable Hero CTAs', () => {
    vi.spyOn(deviceTierHook, 'useDeviceTier').mockReturnValue({
      tier: 'desktop',
      webglSupported: false,
      prefersReducedMotion: false,
    });

    render(<Hero />);

    expect(screen.getByTestId('webgl-fallback')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /prince rathore/i, level: 1 })).toBeVisible();
    expect(screen.getByRole('link', { name: /explore my work/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '#contact');
    // Resume link stays hidden when no actual resume file is configured
    expect(screen.queryByRole('link', { name: /download resume/i })).not.toBeInTheDocument();
  });

  it('disables orbital CSS animations when prefers-reduced-motion is enabled', () => {
    const { container } = render(<WebGLFallback reducedMotion />);
    expect(container.querySelector('.animate-orbit')).not.toBeInTheDocument();
    expect(container.querySelector('.animate-orbit-reverse')).not.toBeInTheDocument();
  });

  it('catches 3D runtime errors in ErrorBoundary and renders fallback gracefully', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function BrokenCanvas() {
      throw new Error('Simulated WebGL failure');
    }

    render(
      <ErrorBoundary fallback={<WebGLFallback reducedMotion />}>
        <BrokenCanvas />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('webgl-fallback')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('adapts device tier across desktop, tablet, and mobile widths', () => {
    const originalWidth = window.innerWidth;
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    function TierProbe() {
      const { tier } = deviceTierHook.useDeviceTier();
      return <span data-testid="tier-value">{tier}</span>;
    }

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1440 });
    render(<TierProbe />);
    expect(screen.getByTestId('tier-value')).toHaveTextContent('desktop');

    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByTestId('tier-value')).toHaveTextContent('tablet');

    act(() => {
      window.innerWidth = 390;
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByTestId('tier-value')).toHaveTextContent('mobile');

    rafSpy.mockRestore();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth,
    });
  });
});

