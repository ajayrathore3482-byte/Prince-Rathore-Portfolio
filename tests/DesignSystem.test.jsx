import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PrimaryButton from '../src/components/ui/PrimaryButton';
import SecondaryButton from '../src/components/ui/SecondaryButton';
import Container from '../src/components/ui/Container';
import GlassCard from '../src/components/ui/GlassCard';
import SectionHeading from '../src/components/ui/SectionHeading';
import SocialLinks from '../src/components/ui/SocialLinks';
import ScrollIndicator from '../src/components/ui/ScrollIndicator';
import Navbar from '../src/components/common/Navbar';
import Footer from '../src/components/common/Footer';
import { personalInfo } from '../src/data/personal';

describe('Phase 3 Design System & Reusable Components', () => {
  it('renders PrimaryButton and SecondaryButton as links or buttons', () => {
    render(
      <div>
        <PrimaryButton href="#projects">Explore Work</PrimaryButton>
        <SecondaryButton>Secondary Action</SecondaryButton>
      </div>
    );

    const link = screen.getByRole('link', { name: /explore work/i });
    expect(link).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('button', { name: /secondary action/i })).toBeInTheDocument();
  });

  it('renders Container, GlassCard, and SectionHeading with expected structure', () => {
    const { container } = render(
      <Container size="narrow">
        <SectionHeading eyebrow="Overview" title="System Architecture" subtitle="Clean layers" />
        <GlassCard interactive>Card Content</GlassCard>
      </Container>
    );

    expect(container.firstChild).toHaveClass('max-w-4xl');
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'System Architecture' })).toBeInTheDocument();
    expect(screen.getByText('Clean layers')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toHaveClass('glass-card-interactive');
  });

  it('omits unconfigured SocialLinks and renders ScrollIndicator cleanly', () => {
    const originalEmail = personalInfo.contact.email;
    personalInfo.contact.email = '';

    try {
      render(
        <div>
          <SocialLinks showLabels />
          <ScrollIndicator targetId="about" />
        </div>
      );

      expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'LinkedIn' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Email' })).not.toBeInTheDocument();
      expect(screen.getByRole('link', { name: /scroll to explore/i })).toHaveAttribute('href', '#about');
    } finally {
      personalInfo.contact.email = originalEmail;
    }
  });

  it('toggles Navbar mobile menu and closes on Escape key', () => {
    render(<Navbar />);

    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(document.getElementById('mobile-navigation-drawer')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.getElementById('mobile-navigation-drawer')).not.toBeInTheDocument();
  });

  it('invokes smooth scroll to top from Footer back-to-top button', () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(<Footer />);
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }));

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});

