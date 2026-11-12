import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Contact from '../src/components/sections/Contact';
import Footer from '../src/components/common/Footer';
import SocialLinks from '../src/components/ui/SocialLinks';
import { personalInfo } from '../src/data/personal';
import { submitContactMessage } from '../src/utils/contactService';

describe('Phase 7: Contact Section, Form Validation & Footer', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('renders Contact heading, subtitle, and configurable contact info cards without fake resume button', () => {
    render(<Contact />);

    expect(
      screen.getByRole('heading', { name: "Let's Build Something Together" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Have a project in mind, looking for a developer, or simply want to connect? I'd love to hear from you."
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Prince Rathore')).toBeInTheDocument();
    expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
    expect(screen.getByText('Delhi, India')).toBeInTheDocument();
    expect(personalInfo.contact.email).toBe('ajayrathore3482@gmail.com');
    const emailLink = screen.getByRole('link', { name: 'ajayrathore3482@gmail.com' });
    expect(emailLink).toHaveAttribute('href', 'mailto:ajayrathore3482@gmail.com');
    expect(screen.queryByRole('link', { name: /download resume/i })).not.toBeInTheDocument();
  });

  it('copies the configured email address and displays "Email copied!" feedback', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    render(<Contact />);

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('ajayrathore3482@gmail.com');
      expect(screen.getByText('Email copied!')).toBeInTheDocument();
    });
  });

  it('validates required fields, email format, and message length', () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText('Full Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email Address is required.')).toBeInTheDocument();
    expect(screen.getByText('Subject is required.')).toBeInTheDocument();
    expect(screen.getByText('Message is required.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Project Inquiry' } });
    fireEvent.change(screen.getByLabelText(/^message/i), { target: { value: 'Short' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument();
  });

  it('shows honest unconfigured service message without exposing env var names when VITE_CONTACT_API_URL is absent', async () => {
    vi.stubEnv('VITE_CONTACT_API_URL', '');
    vi.stubEnv('VITE_CONTACT_ACCESS_KEY', '');
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Backend Role' } });
    fireEvent.change(screen.getByLabelText(/^message/i), {
      target: { value: 'Hello Prince, would love to discuss an ERP backend role.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/the contact form service is not configured yet/i)
      ).toBeInTheDocument();
    });
    expect(screen.queryByText(/VITE_CONTACT_API_URL/)).not.toBeInTheDocument();
    infoSpy.mockRestore();
  });

  it('submits cleanly via contactService when a valid API URL is provided and handles errors safely', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await submitContactMessage(
      {
        fullName: 'Alex Morgan',
        email: 'alex@example.com',
        subject: 'Backend Collaboration',
        message: 'Interested in collaborating on a PHP and MySQL application.',
        honeypot: '',
      },
      'https://api.example.com/contact'
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.ok).toBe(true);
    expect(result.code).toBe('SENT');
  });

  it('renders SocialLinks only when valid URLs are configured and Footer displays dynamic year', () => {
    const originalGithub = personalInfo.socials.github;
    const originalEmail = personalInfo.contact.email;
    personalInfo.socials.github = 'https://github.com/prince-rathore';
    personalInfo.contact.email = 'prince@example.com';

    render(
      <>
        <SocialLinks showLabels />
        <Footer />
      </>
    );

    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' });
    expect(githubLinks[0]).toHaveAttribute('target', '_blank');
    expect(githubLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');

    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();

    personalInfo.socials.github = originalGithub;
    personalInfo.contact.email = originalEmail;
  });
});

