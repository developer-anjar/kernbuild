import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { ContactInquiry } from '../types/contact';
import type { Feedback } from '../types/feedback';
import { sendSubmission, EmailServiceError } from '../services/emailService';

type ContactField = keyof ContactInquiry;
type FeedbackField = keyof Feedback;

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface UseEmailFormReturn {
  submitting: boolean;
  submitted: boolean;
  submittedMessage: string;
  error: string | null;
  setSubmittedMessage: (message: string) => void;
  setError: (error: string | null) => void;
  submit: (
    event: FormEvent<HTMLFormElement>,
    payload: Record<string, string | number | boolean>,
  ) => Promise<void>;}

function useEmailForm(kind: 'contact' | 'feedback' | 'quote'): UseEmailFormReturn {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submitLock = useRef(false);

  const submit = async (
    event: FormEvent<HTMLFormElement>,
    payload: Record<string, string | number | boolean>,
  ) => {
    event.preventDefault();
    if (submitLock.current) return;
    submitLock.current = true;
    setSubmitting(true);
    setSubmitted(false);
    setError(null);
    try {
      const result = await sendSubmission(kind, payload);
      if (result.ok) {
        setSubmitted(true);
        setSubmittedMessage('Thank you! Your message has been sent to the KernBuild team.');
      } else {
        setError(result.text || 'Unable to submit your message. Please try again.');
      }
    } catch (submissionError) {
      setError(
        submissionError instanceof EmailServiceError
          ? submissionError.message
          : 'Unable to submit your message. Please try again.',
      );
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  };

  return {
    submitting,
    submitted,
    submittedMessage,
    error,
    setSubmittedMessage,
    setError,
    submit,
  };
}

export function ContactForm() {
  const [inquiry, setInquiry] = useState<ContactInquiry>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyConsent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const { submitting, submitted, submittedMessage, error, submit } = useEmailForm('contact');

  const errors = {
    name: inquiry.name.trim() ? '' : 'Enter your name.',
    email: validEmail(inquiry.email) ? '' : 'Enter a valid email address.',
    subject: inquiry.subject.trim() ? '' : 'Enter a subject.',
    message: inquiry.message.length >= 20 ? '' : 'Please share at least 20 characters in your message.',
    privacyConsent: inquiry.privacyConsent ? '' : 'Please consent to our privacy policy.',
  };
  const show = (field: keyof typeof errors) => Boolean(touched[field] && errors[field]);

  const change = (field: ContactField, value: string | boolean) =>
    setInquiry(current => ({ ...current, [field]: value }));

  const blur = (field: ContactField) => setTouched(current => ({ ...current, [field]: true }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true, privacyConsent: true });
    if (Object.values(errors).some(Boolean)) return;

    void submit(event, {
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      subject: inquiry.subject,
      message: inquiry.message,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
          <input
            id="contact-name"
            name="name"
            value={inquiry.name}
            onChange={event => change('name', event.target.value)}
            onBlur={() => blur('name')}
            required
            autoComplete="name"
            aria-invalid={show('name') || undefined}
            aria-describedby={show('name') ? 'contact-name-error' : undefined}
          />
          {show('name') && <span className="field-error" id="contact-name-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={inquiry.email}
            onChange={event => change('email', event.target.value)}
            onBlur={() => blur('email')}
            required
            autoComplete="email"
            aria-invalid={show('email') || undefined}
            aria-describedby={show('email') ? 'contact-email-error' : undefined}
          />
          {show('email') && <span className="field-error" id="contact-email-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-phone">Phone number <span>(optional)</span></label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={inquiry.phone}
            onChange={event => change('phone', event.target.value)}
            onBlur={() => blur('phone')}
            autoComplete="tel"
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
          <input
            id="contact-subject"
            name="subject"
            value={inquiry.subject}
            onChange={event => change('subject', event.target.value)}
            onBlur={() => blur('subject')}
            required
            maxLength={160}
            aria-invalid={show('subject') || undefined}
            aria-describedby={show('subject') ? 'contact-subject-error' : undefined}
          />
          {show('subject') && <span className="field-error" id="contact-subject-error">{errors.subject}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
          <textarea
            id="contact-message"
            name="message"
            value={inquiry.message}
            onChange={event => change('message', event.target.value)}
            onBlur={() => blur('message')}
            required
            minLength={20}
            rows={5}
            aria-invalid={show('message') || undefined}
            aria-describedby={show('message') ? 'contact-message-error' : undefined}
          />
          {show('message') && <span className="field-error" id="contact-message-error">{errors.message}</span>}
        </div>
        <div className="form-field form-field--full">
          <label className="checkbox-field" htmlFor="contact-consent">
            <input
              id="contact-consent"
              name="privacyConsent"
              type="checkbox"
              checked={inquiry.privacyConsent}
              onChange={event => change('privacyConsent', event.target.checked)}
              onBlur={() => blur('privacyConsent')}
              required
            />
            <span>
              I agree that KernBuild may use these details to respond to my inquiry.{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </span>
          </label>
          {show('privacyConsent') && <span className="field-error">{errors.privacyConsent}</span>}
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : <>Send project inquiry <span aria-hidden="true">→</span></>}
        </button>
        <span className="field-error" aria-live="polite">
          Fields marked * are required.
        </span>
      </div>
      {submitted && <p className="form-status form-status--success" role="status">{submittedMessage}</p>}
      {error && <p className="form-status form-status--error" role="alert">{error}</p>}
    </form>
  );
}

const RATINGS = [1, 2, 3, 4, 5];

export function FeedbackForm() {
  const [feedback, setFeedback] = useState<Feedback>({
    fullName: '',
    email: '',
    projectType: '',
    overallExperience: 0,
    communicationQuality: 0,
    workQuality: 0,
    wouldRecommend: null,
    feedbackMessage: '',
    suggestion: '',
    privacyConsent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<FeedbackField, boolean>>>({});
  const { submitting, submitted, submittedMessage, error, submit } = useEmailForm('feedback');

  const errors = {
    fullName: feedback.fullName.trim() ? '' : 'Enter your name.',
    email: validEmail(feedback.email) ? '' : 'Enter a valid email address.',
    projectType: feedback.projectType ? '' : 'Choose a project type.',
    overallExperience:
      feedback.overallExperience >= 1 && feedback.overallExperience <= 5
        ? ''
        : 'Select a rating from 1 to 5.',
    communicationQuality:
      feedback.communicationQuality >= 1 && feedback.communicationQuality <= 5
        ? ''
        : 'Select a rating from 1 to 5.',
    workQuality:
      feedback.workQuality >= 1 && feedback.workQuality <= 5
        ? ''
        : 'Select a rating from 1 to 5.',
    wouldRecommend: feedback.wouldRecommend !== null ? '' : 'Choose yes or no.',
    feedbackMessage:
      feedback.feedbackMessage.length >= 20 ? '' : 'Please write at least 20 characters.',
    privacyConsent: feedback.privacyConsent ? '' : 'Please consent to our privacy policy.',
  };
  const show = (field: keyof typeof errors) => Boolean(touched[field] && errors[field]);

  const change = (field: FeedbackField, value: string | number | boolean | null) =>
    setFeedback(current => ({ ...current, [field]: value }));

  const blur = (field: FeedbackField) => setTouched(current => ({ ...current, [field]: true }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      projectType: true,
      overallExperience: true,
      communicationQuality: true,
      workQuality: true,
      wouldRecommend: true,
      feedbackMessage: true,
      privacyConsent: true,
    });
    if (Object.values(errors).some(Boolean)) return;

    void submit(event, {
      fullName: feedback.fullName,
      email: feedback.email,
      projectType: feedback.projectType,
      overallExperience: feedback.overallExperience,
      communicationQuality: feedback.communicationQuality,
      workQuality: feedback.workQuality,
      wouldRecommend: feedback.wouldRecommend ?? false,
      feedbackMessage: feedback.feedbackMessage,
      suggestion: feedback.suggestion ?? '',
    });
  };

  type RatingField = 'overallExperience' | 'communicationQuality' | 'workQuality';

const RATING_FIELDS: { id: string; name: RatingField; label: string; errorId: string }[] = [
  { id: 'rating-overall', name: 'overallExperience', label: 'Overall experience', errorId: 'rating-overall-error' },
  { id: 'rating-communication', name: 'communicationQuality', label: 'Communication', errorId: 'rating-communication-error' },
  { id: 'rating-quality', name: 'workQuality', label: 'Work quality', errorId: 'rating-quality-error' },
];

return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="feedback-name">Full name <span aria-hidden="true">*</span></label>
          <input
            id="feedback-name"
            name="fullName"
            value={feedback.fullName}
            onChange={event => change('fullName', event.target.value)}
            onBlur={() => blur('fullName')}
            required
            autoComplete="name"
            aria-invalid={show('fullName') || undefined}
            aria-describedby={show('fullName') ? 'feedback-name-error' : undefined}
          />
          {show('fullName') && <span className="field-error" id="feedback-name-error">{errors.fullName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="feedback-email">Email address <span aria-hidden="true">*</span></label>
          <input
            id="feedback-email"
            name="email"
            type="email"
            value={feedback.email}
            onChange={event => change('email', event.target.value)}
            onBlur={() => blur('email')}
            required
            autoComplete="email"
            aria-invalid={show('email') || undefined}
            aria-describedby={show('email') ? 'feedback-email-error' : undefined}
          />
          {show('email') && <span className="field-error" id="feedback-email-error">{errors.email}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="feedback-project-type">Project type <span aria-hidden="true">*</span></label>
          <select
            id="feedback-project-type"
            name="projectType"
            value={feedback.projectType}
            onChange={event => change('projectType', event.target.value)}
            onBlur={() => blur('projectType')}
            required
            aria-invalid={show('projectType') || undefined}
            aria-describedby={show('projectType') ? 'feedback-project-type-error' : undefined}
          >
            <option value="" disabled>Select the type of work</option>
            <option>Web application</option>
            <option>Landing page</option>
            <option>Admin dashboard</option>
            <option>AI integration</option>
            <option>API or backend</option>
            <option>Management system</option>
            <option>Other</option>
          </select>
          {show('projectType') && <span className="field-error" id="feedback-project-type-error">{errors.projectType}</span>}
        </div>
        {RATING_FIELDS.map(field => (
          <div className="form-field" key={field.id}>
            <label htmlFor={field.id}>{field.label} <span aria-hidden="true">*</span></label>
            <select
              id={field.id}
              name={field.name}
              value={feedback[field.name]}
              onChange={event => change(field.name, Number(event.target.value))}
              onBlur={() => blur(field.name)}
              required
              aria-invalid={show(field.name) || undefined}
              aria-describedby={show(field.name) ? field.errorId : undefined}
            >
              <option value={0} disabled>Select a rating</option>
              {RATINGS.map(rating => <option value={rating} key={rating}>{rating} / 5</option>)}
            </select>
            {show(field.name) && <span className="field-error" id={field.errorId}>{errors[field.name]}</span>}
          </div>
        ))}
        <fieldset className="form-field recommendation">
          <legend className="form-label">
            Would you recommend KernBuild? <span aria-hidden="true">*</span>
          </legend>
          <label>
            <input
              type="radio"
              name="wouldRecommend"
              checked={feedback.wouldRecommend === true}
              onChange={() => change('wouldRecommend', true)}
              onBlur={() => blur('wouldRecommend')}
              required
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="wouldRecommend"
              checked={feedback.wouldRecommend === false}
              onChange={() => change('wouldRecommend', false)}
              onBlur={() => blur('wouldRecommend')}
              required
            />
            No
          </label>
          {show('wouldRecommend') && <span className="field-error">{errors.wouldRecommend}</span>}
        </fieldset>
        <div className="form-field form-field--full">
          <label htmlFor="feedback-message">Your feedback <span aria-hidden="true">*</span></label>
          <textarea
            id="feedback-message"
            name="feedbackMessage"
            value={feedback.feedbackMessage}
            onChange={event => change('feedbackMessage', event.target.value)}
            onBlur={() => blur('feedbackMessage')}
            required
            minLength={20}
            rows={5}
            aria-invalid={show('feedbackMessage') || undefined}
            aria-describedby={show('feedbackMessage') ? 'feedback-message-error' : undefined}
          />
          {show('feedbackMessage') && <span className="field-error" id="feedback-message-error">{errors.feedbackMessage}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="feedback-suggestion">Anything we could improve? <span>(optional)</span></label>
          <textarea
            id="feedback-suggestion"
            name="suggestion"
            value={feedback.suggestion ?? ''}
            onChange={event => change('suggestion', event.target.value)}
            rows={3}
          />
        </div>
        <div className="form-field form-field--full">
          <label className="checkbox-field" htmlFor="feedback-consent">
            <input
              id="feedback-consent"
              name="privacyConsent"
              type="checkbox"
              checked={feedback.privacyConsent}
              onChange={event => change('privacyConsent', event.target.checked)}
              onBlur={() => blur('privacyConsent')}
              required
            />
            <span>
              I agree that KernBuild may use these details to review my feedback.{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </span>
          </label>
          {show('privacyConsent') && <span className="field-error">{errors.privacyConsent}</span>}
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : <>Submit feedback <span aria-hidden="true">→</span></>}
        </button>
        <span className="field-error">Fields marked * are required.</span>
      </div>
      {submitted && <p className="form-status form-status--success" role="status">{submittedMessage}</p>}
      {error && <p className="form-status form-status--error" role="alert">{error}</p>}
    </form>
  );
}

export function QuoteForm() {
  const [quote, setQuote] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    serviceRequired: '',
    projectDescription: '',
    estimatedBudget: '',
    expectedTimeline: '',
    privacyConsent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof typeof quote, boolean>>>({});
  const { submitting, submitted, submittedMessage, error, submit } = useEmailForm('quote');

  const errors = {
    name: quote.name.trim() ? '' : 'Enter your name.',
    email: validEmail(quote.email) ? '' : 'Enter a valid email address.',
    serviceRequired: quote.serviceRequired ? '' : 'Choose a service.',
    projectDescription:
      quote.projectDescription.length >= 20 ? '' : 'Please share at least 20 characters.',
    estimatedBudget: quote.estimatedBudget ? '' : 'Choose an estimated budget.',
    expectedTimeline: quote.expectedTimeline ? '' : 'Choose an expected timeline.',
    privacyConsent: quote.privacyConsent ? '' : 'Please consent to our privacy policy.',
  };
  const show = (field: keyof typeof errors) => Boolean(touched[field] && errors[field]);

  const change = (field: keyof typeof quote, value: string | boolean) =>
    setQuote(current => ({ ...current, [field]: value }));

  const blur = (field: keyof typeof quote) => setTouched(current => ({ ...current, [field]: true }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({
      name: true,
      email: true,
      serviceRequired: true,
      projectDescription: true,
      estimatedBudget: true,
      expectedTimeline: true,
      privacyConsent: true,
    });
    if (Object.values(errors).some(Boolean)) return;

    void submit(event, {
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      companyName: quote.companyName,
      serviceRequired: quote.serviceRequired,
      projectDescription: quote.projectDescription,
      estimatedBudget: quote.estimatedBudget,
      expectedTimeline: quote.expectedTimeline,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="quote-name">Full name <span aria-hidden="true">*</span></label>
          <input
            id="quote-name"
            name="name"
            value={quote.name}
            onChange={event => change('name', event.target.value)}
            onBlur={() => blur('name')}
            required
            autoComplete="name"
            aria-invalid={show('name') || undefined}
            aria-describedby={show('name') ? 'quote-name-error' : undefined}
          />
          {show('name') && <span className="field-error" id="quote-name-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="quote-email">Email address <span aria-hidden="true">*</span></label>
          <input
            id="quote-email"
            name="email"
            type="email"
            value={quote.email}
            onChange={event => change('email', event.target.value)}
            onBlur={() => blur('email')}
            required
            autoComplete="email"
            aria-invalid={show('email') || undefined}
            aria-describedby={show('email') ? 'quote-email-error' : undefined}
          />
          {show('email') && <span className="field-error" id="quote-email-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="quote-phone">Phone number</label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            value={quote.phone}
            onChange={event => change('phone', event.target.value)}
            onBlur={() => blur('phone')}
            autoComplete="tel"
          />
        </div>
        <div className="form-field">
          <label htmlFor="quote-company">Company name</label>
          <input
            id="quote-company"
            name="companyName"
            value={quote.companyName}
            onChange={event => change('companyName', event.target.value)}
            onBlur={() => blur('companyName')}
            autoComplete="organization"
          />
        </div>
        <div className="form-field">
          <label htmlFor="quote-service">Service required <span aria-hidden="true">*</span></label>
          <select
            id="quote-service"
            name="serviceRequired"
            value={quote.serviceRequired}
            onChange={event => change('serviceRequired', event.target.value)}
            onBlur={() => blur('serviceRequired')}
            required
            aria-invalid={show('serviceRequired') || undefined}
            aria-describedby={show('serviceRequired') ? 'quote-service-error' : undefined}
          >
            <option value="" disabled>Select a service</option>
            <option>Web application</option>
            <option>E-commerce store</option>
            <option>Management system</option>
            <option>AI integration</option>
            <option>Portfolio website</option>
            <option>SaaS web application</option>
            <option>Landing page</option>
            <option>Other</option>
          </select>
          {show('serviceRequired') && <span className="field-error" id="quote-service-error">{errors.serviceRequired}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="quote-description">Project description <span aria-hidden="true">*</span></label>
          <textarea
            id="quote-description"
            name="projectDescription"
            value={quote.projectDescription}
            onChange={event => change('projectDescription', event.target.value)}
            onBlur={() => blur('projectDescription')}
            required
            minLength={20}
            rows={4}
            aria-invalid={show('projectDescription') || undefined}
            aria-describedby={show('projectDescription') ? 'quote-description-error' : undefined}
          />
          {show('projectDescription') && <span className="field-error" id="quote-description-error">{errors.projectDescription}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="quote-budget">Estimated budget <span aria-hidden="true">*</span></label>
          <select
            id="quote-budget"
            name="estimatedBudget"
            value={quote.estimatedBudget}
            onChange={event => change('estimatedBudget', event.target.value)}
            onBlur={() => blur('estimatedBudget')}
            required
            aria-invalid={show('estimatedBudget') || undefined}
            aria-describedby={show('estimatedBudget') ? 'quote-budget-error' : undefined}
          >
            <option value="" disabled>Select a budget range</option>
            <option>Under $5,000</option>
            <option>$5,000 - $15,000</option>
            <option>$15,000 - $30,000</option>
            <option>$30,000 - $60,000</option>
            <option>$60,000+</option>
            <option>Not sure yet</option>
          </select>
          {show('estimatedBudget') && <span className="field-error" id="quote-budget-error">{errors.estimatedBudget}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="quote-timeline">Expected timeline <span aria-hidden="true">*</span></label>
          <select
            id="quote-timeline"
            name="expectedTimeline"
            value={quote.expectedTimeline}
            onChange={event => change('expectedTimeline', event.target.value)}
            onBlur={() => blur('expectedTimeline')}
            required
            aria-invalid={show('expectedTimeline') || undefined}
            aria-describedby={show('expectedTimeline') ? 'quote-timeline-error' : undefined}
          >
            <option value="" disabled>Select a timeline</option>
            <option>Under 1 month</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6+ months</option>
            <option>Flexible</option>
          </select>
          {show('expectedTimeline') && <span className="field-error" id="quote-timeline-error">{errors.expectedTimeline}</span>}
        </div>
        <div className="form-field form-field--full">
          <label className="checkbox-field" htmlFor="quote-consent">
            <input
              id="quote-consent"
              name="privacyConsent"
              type="checkbox"
              checked={quote.privacyConsent}
              onChange={event => change('privacyConsent', event.target.checked)}
              onBlur={() => blur('privacyConsent')}
              required
            />
            <span>
              I agree that KernBuild may use these details to respond to my quote request.{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </span>
          </label>
          {show('privacyConsent') && <span className="field-error">{errors.privacyConsent}</span>}
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : <>Request a quote <span aria-hidden="true">→</span></>}
        </button>
        <span className="field-error" aria-live="polite">
          Fields marked * are required.
        </span>
      </div>
      {submitted && <p className="form-status form-status--success" role="status">{submittedMessage}</p>}
      {error && <p className="form-status form-status--error" role="alert">{error}</p>}
    </form>
  );
}
