import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { ContactInquiry } from '../../app/models/contact.model';
import type { Feedback } from '../../app/models/feedback.model';
import { environment } from '../../environments/environment';
import { submitContact } from '../services/contactService';
import { submitFeedback } from '../services/feedbackService';

type ContactField = keyof ContactInquiry;
type FeedbackField = keyof Feedback;

function validEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

export function ContactForm() {
  const [inquiry, setInquiry] = useState<ContactInquiry>({ name: '', email: '', subject: '', message: '', privacyConsent: false });
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errors = {
    name: inquiry.name.trim() ? '' : 'Enter your name.',
    email: validEmail(inquiry.email) ? '' : 'Enter a valid email address.',
    subject: inquiry.subject.trim() ? '' : 'Enter a subject.',
    message: inquiry.message.length >= 20 ? '' : 'Please share at least 20 characters in your message.',
  };
  const change = (field: ContactField, value: string | boolean) => setInquiry(current => ({ ...current, [field]: value }));
  const blur = (field: ContactField) => setTouched(current => ({ ...current, [field]: true }));
  const show = (field: keyof typeof errors) => Boolean(touched[field] && errors[field]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true, privacyConsent: true });
    if (Object.values(errors).some(Boolean) || !inquiry.privacyConsent || submitting) return;
    setSubmitting(true);
    setSubmitted(false);
    setError(null);
    try {
      await submitContact(inquiry);
      setSubmitted(true);
    } catch {
      const configured = environment.backendAvailable || Boolean(environment.emailJs.publicKey.trim() && environment.emailJs.serviceId.trim() && environment.emailJs.templateId.trim());
      setError(configured ? 'Failed to send your message. Please try again later.' : 'Email delivery is not configured yet. Your message was not sent.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" value={inquiry.name} onChange={event => change('name', event.target.value)} onBlur={() => blur('name')} required autoComplete="name" aria-invalid={show('name') || undefined} aria-describedby={show('name') ? 'contact-name-error' : undefined} />
          {show('name') && <span className="field-error" id="contact-name-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" value={inquiry.email} onChange={event => change('email', event.target.value)} onBlur={() => blur('email')} required autoComplete="email" aria-invalid={show('email') || undefined} aria-describedby={show('email') ? 'contact-email-error' : undefined} />
          {show('email') && <span className="field-error" id="contact-email-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
          <input id="contact-subject" name="subject" value={inquiry.subject} onChange={event => change('subject', event.target.value)} onBlur={() => blur('subject')} required maxLength={160} aria-invalid={show('subject') || undefined} aria-describedby={show('subject') ? 'contact-subject-error' : undefined} />
          {show('subject') && <span className="field-error" id="contact-subject-error">{errors.subject}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
          <textarea id="contact-message" name="message" value={inquiry.message} onChange={event => change('message', event.target.value)} onBlur={() => blur('message')} required minLength={20} rows={5} aria-invalid={show('message') || undefined} aria-describedby={show('message') ? 'contact-message-error' : undefined} />
          {show('message') && <span className="field-error" id="contact-message-error">{errors.message}</span>}
        </div>
        <div className="form-field form-field--full">
          <label className="checkbox-field" htmlFor="contact-consent">
            <input id="contact-consent" name="privacyConsent" type="checkbox" checked={inquiry.privacyConsent} onChange={event => change('privacyConsent', event.target.checked)} onBlur={() => blur('privacyConsent')} required />
            <span>I agree that KernBuild may use these details to respond to my inquiry. <Link to="/privacy">Privacy Policy</Link></span>
          </label>
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>{submitting ? 'Sending…' : <>Send project inquiry <span aria-hidden="true">→</span></>}</button>
        <span className="field-error" aria-live="polite">Fields marked * are required.</span>
      </div>
      {submitted && <p className="form-status form-status--success" role="status">Thanks for reaching out. Your message has been sent.</p>}
      {error && <p className="form-status form-status--error" role="alert">{error}</p>}
    </form>
  );
}

const RATINGS = [1, 2, 3, 4, 5];
const FEEDBACK_REQUIRED_FIELDS: FeedbackField[] = ['fullName', 'email', 'projectType', 'overallExperience', 'communicationQuality', 'workQuality', 'wouldRecommend', 'feedbackMessage', 'privacyConsent'];

export function FeedbackForm() {
  const [feedback, setFeedback] = useState<Feedback>({ fullName: '', email: '', projectType: '', overallExperience: 0, communicationQuality: 0, workQuality: 0, wouldRecommend: null, feedbackMessage: '', suggestion: '', privacyConsent: false });
  const [touched, setTouched] = useState<Partial<Record<FeedbackField, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errors = {
    fullName: feedback.fullName.trim() ? '' : 'Enter your name.',
    email: validEmail(feedback.email) ? '' : 'Enter a valid email address.',
    projectType: feedback.projectType ? '' : 'Choose a project type.',
    overallExperience: feedback.overallExperience >= 1 && feedback.overallExperience <= 5 ? '' : 'Select a rating from 1 to 5.',
    communicationQuality: feedback.communicationQuality >= 1 && feedback.communicationQuality <= 5 ? '' : 'Select a rating from 1 to 5.',
    workQuality: feedback.workQuality >= 1 && feedback.workQuality <= 5 ? '' : 'Select a rating from 1 to 5.',
    wouldRecommend: feedback.wouldRecommend !== null ? '' : 'Choose yes or no.',
    feedbackMessage: feedback.feedbackMessage.length >= 20 ? '' : 'Please write at least 20 characters.',
  };
  const change = (field: FeedbackField, value: string | number | boolean | null) => setFeedback(current => ({ ...current, [field]: value }));
  const blur = (field: FeedbackField) => setTouched(current => ({ ...current, [field]: true }));
  const show = (field: keyof typeof errors) => Boolean(touched[field] && errors[field]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(Object.fromEntries(FEEDBACK_REQUIRED_FIELDS.map(field => [field, true])));
    if (Object.values(errors).some(Boolean) || !feedback.privacyConsent || submitting) return;
    setSubmitting(true);
    setSubmitted(false);
    setError(null);
    try {
      await submitFeedback(feedback);
      setSubmitted(true);
    } catch {
      setError(environment.backendAvailable ? 'Failed to submit feedback. Please check your connection and try again.' : 'The feedback form is not connected yet. Your feedback was not sent.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="feedback-name">Full name <span aria-hidden="true">*</span></label>
          <input id="feedback-name" name="fullName" value={feedback.fullName} onChange={event => change('fullName', event.target.value)} onBlur={() => blur('fullName')} required autoComplete="name" aria-invalid={show('fullName') || undefined} aria-describedby={show('fullName') ? 'feedback-name-error' : undefined} />
          {show('fullName') && <span className="field-error" id="feedback-name-error">{errors.fullName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="feedback-email">Email address <span aria-hidden="true">*</span></label>
          <input id="feedback-email" name="email" type="email" value={feedback.email} onChange={event => change('email', event.target.value)} onBlur={() => blur('email')} required autoComplete="email" aria-invalid={show('email') || undefined} aria-describedby={show('email') ? 'feedback-email-error' : undefined} />
          {show('email') && <span className="field-error" id="feedback-email-error">{errors.email}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="feedback-project-type">Project type <span aria-hidden="true">*</span></label>
          <select id="feedback-project-type" name="projectType" value={feedback.projectType} onChange={event => change('projectType', event.target.value)} onBlur={() => blur('projectType')} required aria-invalid={show('projectType') || undefined} aria-describedby={show('projectType') ? 'feedback-project-type-error' : undefined}>
            <option value="" disabled>Select the type of work</option>
            <option>Web application</option><option>Landing page</option><option>Admin dashboard</option><option>AI integration</option><option>API or backend</option><option>Management system</option><option>Other</option>
          </select>
          {show('projectType') && <span className="field-error" id="feedback-project-type-error">{errors.projectType}</span>}
        </div>
        {([
          { id: 'rating-overall', name: 'overallExperience', label: 'Overall experience', key: 'overallExperience', errorId: 'rating-overall-error' },
          { id: 'rating-communication', name: 'communicationQuality', label: 'Communication', key: 'communicationQuality', errorId: 'rating-communication-error' },
          { id: 'rating-quality', name: 'workQuality', label: 'Work quality', key: 'workQuality', errorId: 'rating-quality-error' },
        ] as const).map(field => (
          <div className="form-field" key={field.id}>
            <label htmlFor={field.id}>{field.label} <span aria-hidden="true">*</span></label>
            <select id={field.id} name={field.name} value={feedback[field.key]} onChange={event => change(field.key, Number(event.target.value))} onBlur={() => blur(field.key)} required aria-invalid={show(field.key) || undefined} aria-describedby={show(field.key) ? field.errorId : undefined}>
              <option value={0} disabled>Select a rating</option>
              {RATINGS.map(rating => <option value={rating} key={rating}>{rating} / 5</option>)}
            </select>
            {show(field.key) && <span className="field-error" id={field.errorId}>{errors[field.key]}</span>}
          </div>
        ))}
        <fieldset className="form-field recommendation">
          <legend className="form-label">Would you recommend KernBuild? <span aria-hidden="true">*</span></legend>
          <label><input type="radio" name="wouldRecommend" checked={feedback.wouldRecommend === true} onChange={() => change('wouldRecommend', true)} onBlur={() => blur('wouldRecommend')} required /> Yes</label>
          <label><input type="radio" name="wouldRecommend" checked={feedback.wouldRecommend === false} onChange={() => change('wouldRecommend', false)} onBlur={() => blur('wouldRecommend')} required /> No</label>
          {show('wouldRecommend') && <span className="field-error">{errors.wouldRecommend}</span>}
        </fieldset>
        <div className="form-field form-field--full">
          <label htmlFor="feedback-message">Your feedback <span aria-hidden="true">*</span></label>
          <textarea id="feedback-message" name="feedbackMessage" value={feedback.feedbackMessage} onChange={event => change('feedbackMessage', event.target.value)} onBlur={() => blur('feedbackMessage')} required minLength={20} rows={5} aria-invalid={show('feedbackMessage') || undefined} aria-describedby={show('feedbackMessage') ? 'feedback-message-error' : undefined} />
          {show('feedbackMessage') && <span className="field-error" id="feedback-message-error">{errors.feedbackMessage}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="feedback-suggestion">Anything we could improve? <span>(optional)</span></label>
          <textarea id="feedback-suggestion" name="suggestion" value={feedback.suggestion ?? ''} onChange={event => change('suggestion', event.target.value)} rows={3} />
        </div>
        <div className="form-field form-field--full">
          <label className="checkbox-field" htmlFor="feedback-consent">
            <input id="feedback-consent" name="privacyConsent" type="checkbox" checked={feedback.privacyConsent} onChange={event => change('privacyConsent', event.target.checked)} onBlur={() => blur('privacyConsent')} required />
            <span>I agree that KernBuild may use these details to review my feedback. <Link to="/privacy">Privacy Policy</Link></span>
          </label>
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : <>Submit feedback <span aria-hidden="true">→</span></>}</button>
        <span className="field-error">Fields marked * are required.</span>
      </div>
      {submitted && <p className="form-status form-status--success" role="status">Thank you. Your feedback has been submitted.</p>}
      {error && <p className="form-status form-status--error" role="alert">{error}</p>}
    </form>
  );
}
