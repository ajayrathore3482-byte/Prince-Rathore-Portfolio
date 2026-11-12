import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Education from '../src/components/sections/Education';
import Navbar from '../src/components/common/Navbar';
import ProjectModal from '../src/components/ui/ProjectModal';

describe('Phase 8: Production Readiness, SEO Assets & Accessibility Audit', () => {
  it('renders Education section cleanly without developer scaffolding text', () => {
    render(<Education />);

    expect(
      screen.getByRole('heading', { name: 'Academic & Technical Foundation' })
    ).toBeInTheDocument();
    expect(screen.queryByText(/phase 6/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/src\/data\/education\.js/i)).not.toBeInTheDocument();
  });

  it('uses semantic aria-current="location" for active single-page navigation links', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('aria-current', 'location');
  });

  it('traps Tab focus inside ProjectModal while open', () => {
    const sampleProject = {
      id: 'sample',
      title: 'Sample ERP',
      category: 'ERP / Accounting Software',
      role: 'Backend Developer',
      description: 'Sample description',
      technologies: ['PHP', 'MySQL'],
      features: ['Module A'],
      contributions: ['Backend logic'],
      liveUrl: 'https://example.com',
      githubUrl: '',
    };

    render(<ProjectModal project={sampleProject} onClose={() => {}} />);

    const closeBtn = screen.getByRole('button', { name: /close project details/i });
    const liveLink = screen.getByRole('link', { name: /live demo/i });

    expect(closeBtn).toHaveFocus();

    // Shift+Tab from first element wraps to last focusable element
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(liveLink).toHaveFocus();

    // Tab from last element wraps back to first focusable element
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(closeBtn).toHaveFocus();
  });

  it('includes all required public SEO, SPA routing, and Open Graph assets on disk', () => {
    const publicDir = path.resolve(process.cwd(), 'public');
    expect(fs.existsSync(path.join(publicDir, 'favicon.svg'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, 'robots.txt'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, 'sitemap.xml'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, '_redirects'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, 'images', 'og-cover.png'))).toBe(true);
  });
});

