import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from '../src/components/sections/About';
import Skills from '../src/components/sections/Skills';
import Experience from '../src/components/sections/Experience';

describe('Phase 5: About, Skills & Experience Sections', () => {
  it('renders About section with authentic personal info and focus areas', () => {
    render(<About />);

    expect(screen.getByText('Prince Rathore')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('Realkeeper Technology Pvt. Ltd.')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('ERP Software')).toBeInTheDocument();
    expect(screen.getByText('Web Application Development')).toBeInTheDocument();
  });

  it('renders all Skills categories and supports interactive category filtering without fake percentages', () => {
    render(<Skills />);

    const expectedSkills = [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'jQuery',
      'PHP',
      'MySQL',
      'REST APIs',
      'AJAX',
      'Git',
      'GitHub',
      'Composer',
      'XAMPP',
      'PhpSpreadsheet',
      'PHPMailer',
    ];

    expectedSkills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    // Filter to Backend only
    fireEvent.click(screen.getByRole('button', { name: 'Backend' }));
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(screen.queryByText('HTML5')).not.toBeInTheDocument();
    expect(screen.queryByText('Composer')).not.toBeInTheDocument();

    // Reset to All Skills
    fireEvent.click(screen.getByRole('button', { name: 'All Skills' }));
    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('Composer')).toBeInTheDocument();
  });

  it('renders Experience timeline with Realkeeper Technology Pvt. Ltd. and verified responsibilities', () => {
    render(<Experience />);

    expect(screen.getByText('Realkeeper Technology Pvt. Ltd.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Backend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Current Position')).toBeInTheDocument();
    expect(screen.getByText('Working on backend development using PHP and MySQL.')).toBeInTheDocument();
    expect(screen.getByText('Developing and maintaining ERP/accounting software modules.')).toBeInTheDocument();
    expect(screen.getByText('Implementing AJAX-based functionality.')).toBeInTheDocument();
    expect(screen.getByText('Working with database queries and business logic.')).toBeInTheDocument();
    expect(screen.getByText('Integrating APIs and supporting application features.')).toBeInTheDocument();
    expect(screen.getByText('Improving existing functionality and fixing bugs.')).toBeInTheDocument();
  });
});

