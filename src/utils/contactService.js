/**
 * Reads the configured contact API endpoint from Vite environment variables.
 * Automatically defaults to Web3Forms endpoint if a public access key is provided alone.
 */
export function getContactApiUrl() {
  const rawUrl = (import.meta.env.VITE_CONTACT_API_URL || '').trim().replace(/^["']|["']$/g, '');
  if (rawUrl) {
    return rawUrl;
  }

  const accessKey = (import.meta.env.VITE_CONTACT_ACCESS_KEY || '')
    .trim()
    .replace(/^["']|["']$/g, '');
  return accessKey ? 'https://api.web3forms.com/submit' : '';
}

/**
 * Submits a validated contact message to the configured backend/API endpoint.
 * Never simulates success when no endpoint is configured.
 */
export async function submitContactMessage(formData, apiUrl = getContactApiUrl()) {
  if (formData.honeypot) {
    return {
      ok: false,
      code: 'SPAM_DETECTED',
      message: 'Submission could not be processed.',
    };
  }

  if (!apiUrl) {
    if (import.meta.env.DEV) {
      console.info('[ContactForm] Set VITE_CONTACT_API_URL in .env to enable live form submissions.');
    }
    return {
      ok: false,
      code: 'NOT_CONFIGURED',
      message:
        'The contact form service is not configured yet. Please reach out directly via email once contact details are added.',
    };
  }

  const accessKey = (import.meta.env.VITE_CONTACT_ACCESS_KEY || '')
    .trim()
    .replace(/^["']|["']$/g, '');

  const payload = {
    name: formData.fullName.trim(),
    email: formData.email.trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim(),
    ...(accessKey ? { access_key: accessKey } : {}),
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || (data && data.success === false)) {
      return {
        ok: false,
        code: 'REQUEST_FAILED',
        message:
          data?.message ||
          'Unable to send your message right now. Please try again later.',
      };
    }

    return {
      ok: true,
      code: 'SENT',
      message: 'Thank you for reaching out. Your message has been sent successfully.',
    };
  } catch {
    return {
      ok: false,
      code: 'NETWORK_ERROR',
      message:
        'A network error occurred while sending your message. Please check your connection and try again.',
    };
  }
}

