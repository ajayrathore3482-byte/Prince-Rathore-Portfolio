import { useRef, useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Download,
  Loader2,
  Mail,
  MapPin,
  Send,
  User,
} from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { submitContactMessage } from '../../utils/contactService';
import {
  CONTACT_LIMITS,
  isValidConfiguredUrl,
  validateContactForm,
} from '../../utils/validators';
import Button from '../common/Button';
import Container from '../ui/Container';
import GlassCard from '../ui/GlassCard';
import PrimaryButton from '../ui/PrimaryButton';
import SectionHeading from '../ui/SectionHeading';
import SocialLinks from '../ui/SocialLinks';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
  honeypot: '',
};

/**
 * Contact section featuring configurable developer contact cards, social links,
 * conditional resume download, and a validated API-backed contact form.
 */
export default function Contact() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  const configuredEmail = personalInfo.contact?.email?.trim() || '';
  const hasRealEmail = isValidConfiguredUrl(configuredEmail ? `mailto:${configuredEmail}` : '');
  const hasResume = Boolean(personalInfo.resumeUrl?.trim());

  const infoCards = [
    {
      label: 'Name',
      value: personalInfo.name,
      icon: User,
    },
    {
      label: 'Role',
      value: personalInfo.role,
      icon: Briefcase,
    },
    {
      label: 'Email',
      value: hasRealEmail ? configuredEmail : personalInfo.contact?.emailPlaceholder,
      href: hasRealEmail ? `mailto:${configuredEmail}` : '',
      icon: Mail,
    },
    {
      label: 'Location',
      value: personalInfo.location,
      icon: MapPin,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateContactForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus(null);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await submitContactMessage(formValues);

    setIsSubmitting(false);
    setSubmitStatus(result);

    if (result.ok) {
      setFormValues(INITIAL_FORM);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Together"
          subtitle="Have a project in mind, looking for a developer, or simply want to connect? I'd love to hear from you."
        />

        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Contact Information & Direct Actions */}
          <div data-reveal className="space-y-6 lg:col-span-5">
            <GlassCard>
              <h3 className="font-display text-xl font-semibold text-white">
                Contact Information
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                Available for backend development, ERP/web engineering, and full-stack software opportunities.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {infoCards.map(({ label, value, href, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-[#080A12]/65 p-3.5 transition-colors hover:border-[#398BFF]/40"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#398BFF]/30 bg-[#398BFF]/10 text-[#398BFF]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-wider text-[#A1A1AA] uppercase">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 block truncate text-sm font-medium text-white transition-colors hover:text-[#398BFF]"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 truncate text-sm font-medium text-white/90">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links & Conditional Resume Button */}
              <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                <SocialLinks size="md" showLabels />

                {hasResume && (
                  <div>
                    <Button
                      href={personalInfo.resumeUrl}
                      download={personalInfo.resumeDownloadFilename}
                      variant="outline"
                      size="md"
                      icon={Download}
                      className="w-full sm:w-auto"
                    >
                      Download Resume
                    </Button>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Validated Contact Form */}
          <GlassCard data-reveal className="lg:col-span-7">
            <h3 className="font-display text-xl font-semibold text-white">Send a Message</h3>
            <p className="mt-1.5 text-sm text-[#A1A1AA]">
              Fill out the form below and your inquiry will be routed directly when the API endpoint is active.
            </p>

            <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Honeypot anti-spam field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field blank</label>
                <input
                  id="contact-website"
                  name="honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formValues.honeypot}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-fullName"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Full Name <span className="text-[#398BFF]">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    required
                    maxLength={CONTACT_LIMITS.nameMax}
                    value={formValues.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-white/12 bg-[#080A12]/80 px-4 py-2.5 text-sm text-white placeholder-[#A1A1AA]/60 transition-colors focus:border-[#398BFF] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p id="error-fullName" role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Email Address <span className="text-[#398BFF]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={CONTACT_LIMITS.emailMax}
                    value={formValues.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/12 bg-[#080A12]/80 px-4 py-2.5 text-sm text-white placeholder-[#A1A1AA]/60 transition-colors focus:border-[#398BFF] focus:outline-none"
                  />
                  {errors.email && (
                    <p id="error-email" role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Subject <span className="text-[#398BFF]">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={CONTACT_LIMITS.subjectMax}
                  value={formValues.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  placeholder="Project discussion or opportunity"
                  className="w-full rounded-xl border border-white/12 bg-[#080A12]/80 px-4 py-2.5 text-sm text-white placeholder-[#A1A1AA]/60 transition-colors focus:border-[#398BFF] focus:outline-none"
                />
                {errors.subject && (
                  <p id="error-subject" role="alert" className="mt-1.5 text-xs text-rose-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-white"
                  >
                    Message <span className="text-[#398BFF]">*</span>
                  </label>
                  <span className="text-xs text-[#A1A1AA]">
                    {formValues.message.length} / {CONTACT_LIMITS.messageMax}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  maxLength={CONTACT_LIMITS.messageMax}
                  value={formValues.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  placeholder="Tell me about your project, role, or inquiry..."
                  className="w-full resize-y rounded-xl border border-white/12 bg-[#080A12]/80 px-4 py-3 text-sm text-white placeholder-[#A1A1AA]/60 transition-colors focus:border-[#398BFF] focus:outline-none"
                />
                {errors.message && (
                  <p id="error-message" role="alert" className="mt-1.5 text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitStatus && (
                <div
                  role={submitStatus.ok ? 'status' : 'alert'}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                    submitStatus.ok
                      ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-200'
                      : 'border-amber-400/35 bg-amber-500/10 text-amber-100'
                  }`}
                >
                  {submitStatus.ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  )}
                  <div className="space-y-1">
                    <p>{submitStatus.message}</p>
                    {!submitStatus.ok && hasRealEmail && (
                      <p className="text-xs text-white/85">
                        You can also email me directly at{' '}
                        <a
                          href={`mailto:${configuredEmail}`}
                          className="font-medium text-[#398BFF] underline underline-offset-2"
                        >
                          {configuredEmail}
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </div>
              )}

              <PrimaryButton
                type="submit"
                size="lg"
                disabled={isSubmitting}
                icon={isSubmitting ? Loader2 : Send}
                className={isSubmitting ? '[&>svg]:animate-spin' : ''}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </PrimaryButton>
            </form>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
