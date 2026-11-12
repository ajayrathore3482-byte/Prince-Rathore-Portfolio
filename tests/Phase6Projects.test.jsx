import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Projects from '../src/components/sections/Projects';
import ProjectCard from '../src/components/ui/ProjectCard';
import ProjectModal from '../src/components/ui/ProjectModal';

describe('Phase 6: Interactive Projects Showcase', () => {
  it('renders Featured Projects heading, subtitle, and both configured projects', () => {
    render(<Projects />);

    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
    expect(
      screen.getByText("Some of the software and applications I've worked on.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'RealKeeper ERP & Accounting Software' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'CogentHR Recruitment Software' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Illustrative Mockup').length).toBeGreaterThanOrEqual(2);
  });

  it('filters projects by category and shows clean empty state for Personal', () => {
    render(<Projects />);

    fireEvent.click(screen.getByRole('button', { name: 'HR / Recruitment Software' }));
    expect(screen.getByText('CogentHR Recruitment Software')).toBeInTheDocument();
    expect(
      screen.queryByText('RealKeeper ERP & Accounting Software')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Personal' }));
    expect(screen.getByText('More Projects Coming Soon')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('RealKeeper ERP & Accounting Software')).toBeInTheDocument();
    expect(screen.getByText('CogentHR Recruitment Software')).toBeInTheDocument();
  });

  it('opens and closes ProjectModal via View Details, Close button, and Escape key', () => {
    render(<Projects />);

    fireEvent.click(
      screen.getByRole('button', { name: /view details for realkeeper erp/i })
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Project Overview')).toBeInTheDocument();
    expect(within(dialog).getByText('Key Features')).toBeInTheDocument();
    expect(within(dialog).getByText('My Contributions')).toBeInTheDocument();
    expect(within(dialog).getByText('Backend development using PHP and MySQL.')).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole('button', { name: /close project details/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Re-open CogentHR and close with Escape
    fireEvent.click(
      screen.getByRole('button', { name: /view details for cogenthr/i })
    );
    const cogentDialog = screen.getByRole('dialog');
    expect(within(cogentDialog).getByText('Resume scanning')).toBeInTheDocument();
    expect(within(cogentDialog).getByText('WhatsApp API integration')).toBeInTheDocument();
    expect(within(cogentDialog).getByText('Interview meeting scheduling')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides external links when unconfigured and renders safe links when configured', () => {
    const baseProject = {
      id: 'sample',
      title: 'Sample App',
      category: 'Personal',
      role: 'Full Stack Developer',
      description: 'Sample description',
      technologies: ['PHP', 'MySQL'],
      features: ['Feature A'],
      contributions: ['Contribution A'],
      liveUrl: '',
      githubUrl: '',
    };

    const { rerender } = render(<ProjectCard project={baseProject} onSelect={vi.fn()} />);
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();

    const withLinks = {
      ...baseProject,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/repo',
    };

    rerender(<ProjectCard project={withLinks} onSelect={vi.fn()} />);
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'href',
      'https://example.com'
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/example/repo'
    );

    render(<ProjectModal project={withLinks} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
    expect(within(dialog).getByRole('link', { name: /github repository/i })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });
});

