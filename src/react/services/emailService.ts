import { EmailJSResponseStatus, init, send } from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_IDS = {
  contact: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '',
  feedback: import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID || '',
};

function isConfiguredValue(value: string): boolean {
  return Boolean(value.trim()) && !/(your_|example|placeholder|replace[-_ ]?me)/i.test(value);
}

const configured = [PUBLIC_KEY, SERVICE_ID].every(isConfiguredValue);

if (configured && typeof window !== 'undefined') {
  init(PUBLIC_KEY);
}

export interface EmailSendResult {
  ok: boolean;
  status: number;
  text: string;
}

export class EmailServiceError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'EmailServiceError';
  }
}

/**
 * Sends a form submission to the KernBuild business email via EmailJS.
 *
 * Contact and feedback forms use their own EmailJS templates. Submissions are
 * not published automatically; they are reviewed manually by the KernBuild team.
 */
export async function sendSubmission(
  formType: 'contact' | 'feedback' | 'quote',
  params: Record<string, string | number | boolean>,
): Promise<EmailSendResult> {
  if (formType === 'quote') {
    throw new EmailServiceError('Quote requests are currently unavailable.');
  }

  const templateId = TEMPLATE_IDS[formType];
  if (!configured) {
    throw new EmailServiceError(
      'EmailJS service ID or public key is missing or still a placeholder.',
    );
  }
  if (!isConfiguredValue(templateId)) {
    throw new EmailServiceError(`EmailJS ${formType} template ID is missing or still a placeholder.`);
  }

  let response: EmailJSResponseStatus;
  try {
    response = await send(SERVICE_ID, templateId, {
      form_type: formType,
      submitted_at: new Date().toISOString(),
      ...params,
    });
  } catch (error) {
    if (error instanceof EmailJSResponseStatus) {
      throw new EmailServiceError(
        `EmailJS rejected the submission (HTTP ${error.status}): ${error.text}`,
        error.status,
      );
    }
    throw error;
  }

  return {
    ok: response.status >= 200 && response.status < 300,
    status: response.status,
    text: response.text,
  };
}
