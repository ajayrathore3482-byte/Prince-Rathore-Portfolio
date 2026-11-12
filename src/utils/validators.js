export const CONTACT_LIMITS = {
  nameMax: 80,
  emailMax: 120,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 1000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates all contact form inputs and returns an object keyed by field name.
 */
export function validateContactForm(values) {
  const errors = {};

  const fullName = values.fullName?.trim() || '';
  const email = values.email?.trim() || '';
  const subject = values.subject?.trim() || '';
  const message = values.message?.trim() || '';

  if (!fullName) {
    errors.fullName = 'Full Name is required.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Full Name must be at least 2 characters.';
  } else if (fullName.length > CONTACT_LIMITS.nameMax) {
    errors.fullName = `Full Name must be under ${CONTACT_LIMITS.nameMax} characters.`;
  }

  if (!email) {
    errors.email = 'Email Address is required.';
  } else if (!EMAIL_PATTERN.test(email) || email.length > CONTACT_LIMITS.emailMax) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Subject is required.';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (subject.length > CONTACT_LIMITS.subjectMax) {
    errors.subject = `Subject must be under ${CONTACT_LIMITS.subjectMax} characters.`;
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message cannot exceed ${CONTACT_LIMITS.messageMax} characters.`;
  }

  return errors;
}

/**
 * Verifies whether a configured URL uses a safe http(s) or mailto protocol.
 */
export function isValidConfiguredUrl(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }

  if (trimmed.startsWith('mailto:')) {
    return EMAIL_PATTERN.test(trimmed.slice(7));
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

