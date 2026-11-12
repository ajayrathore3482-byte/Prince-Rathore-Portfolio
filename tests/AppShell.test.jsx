import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('Portfolio App Shell (Phase 2 & 3)', () => {
  it('renders primary navigation links and hero identity from PRD', () => {
    render(<App />);

    expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /prince rathore/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/turning ideas into powerful digital experiences/i)).toBeInTheDocument();
  });

  it('renders all required main section landmarks', () => {
    render(<App />);

    expect(document.getElementById('home')).toBeInTheDocument();
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(document.getElementById('skills')).toBeInTheDocument();
    expect(document.getElementById('experience')).toBeInTheDocument();
    expect(document.getElementById('projects')).toBeInTheDocument();
    expect(document.getElementById('education')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
  });
});

