import { environment } from '../../environments/environment';
import type { ContactInquiry } from '../../app/models/contact.model';

export async function submitContact(inquiry: ContactInquiry): Promise<void> {
  const { publicKey, serviceId, templateId } = environment.emailJs;
  const emailJsConfigured = Boolean(publicKey.trim() && serviceId.trim() && templateId.trim());

  if (emailJsConfigured) {
    const emailjs = await import('@emailjs/browser');
    const response = await emailjs.default.send(serviceId, templateId, {
      from_name: inquiry.name,
      reply_to: inquiry.email,
      subject: inquiry.subject,
      message: inquiry.message,
    }, { publicKey });
    if (response.status !== 200) {
      throw new Error(`Email provider rejected the request with status ${response.status}.`);
    }
    return;
  }

  if (environment.backendAvailable) {
    const response = await fetch(`${environment.apiBaseUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    if (!response.ok) throw new Error('The contact API request failed.');
    const result = await response.json() as { accepted?: boolean };
    if (!result?.accepted) throw new Error('The contact API did not accept the request.');
    return;
  }

  throw new Error('Configure EmailJS or the contact API before accepting submissions.');
}
