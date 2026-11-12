import fs from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Footer from '../src/components/common/Footer';
import Hero from '../src/components/sections/Hero';
import { personalInfo } from '../src/data/personal';
import * as deviceTierHook from '../src/hooks/useDeviceTier';

describe('Phase 10: Final Launch Branding, SEO Metadata & Resume Handling', () => {
  it('presents consistent personal branding, location, and positioning in Hero and Footer', () => {
    vi.spyOn(deviceTierHook, 'useDeviceTier').mockReturnValue({
      tier: 'desktop',
      webglSupported: false,
      prefersReducedMotion: false,
    });

    render(
      <>
        <Hero />
        <Footer />
      </>
    );

    expect(screen.getByRole('heading', { name: /prince rathore/i, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText('Delhi, India').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText('PHP | MySQL | JavaScript | ERP Development | Backend Engineering').length
    ).toBe(2);
    expect(screen.getByText(/Backend Developer • Delhi, India/i)).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('uses a professional download filename when resumeUrl is configured and stays hidden otherwise', () => {
    vi.spyOn(deviceTierHook, 'useDeviceTier').mockReturnValue({
      tier: 'desktop',
      webglSupported: false,
      prefersReducedMotion: false,
    });

    const originalResumeUrl = personalInfo.resumeUrl;
    const { rerender } = render(<Hero />);
    expect(screen.queryByRole('link', { name: /download resume/i })).not.toBeInTheDocument();

    personalInfo.resumeUrl = '/resume/Prince-Rathore-Backend-Developer-Resume.pdf';
    rerender(<Hero />);

    const resumeLink = screen.getByRole('link', { name: /download resume/i });
    expect(resumeLink).toHaveAttribute(
      'download',
      'Prince-Rathore-Backend-Developer-Resume.pdf'
    );

    personalInfo.resumeUrl = originalResumeUrl;
    vi.restoreAllMocks();
  });

  it('includes consistent branding and sharing metadata in index.html', () => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');

    expect(html).toContain('Prince Rathore | Backend Developer');
    expect(html).toContain('Delhi, India');
    expect(html).toContain('PHP, MySQL, JavaScript, ERP Development');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('rel="icon"');
  });
});

