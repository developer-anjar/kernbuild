import { useState, type FormEvent } from 'react';
import { sendSubmission, EmailServiceError } from '../services/emailService';

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const PROJECT_TYPES = [
  'Business Website',
  'Web Application',
  'E-commerce Website',
  'Admin Dashboard',
  'AI Integration',
  'UI/UX Design',
  'Other',
];

const BUDGET_RANGES = [
  'Under $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
  'Flexible / To be discussed',
];

const TIMELINES = [
  'Less than 1 month',
  '1 to 2 months',
  '2 to 3 months',
  '3+ months',
  'Flexible',
];

export function MultiStepInquiryForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: About You
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    // Step 2: Project Requirements
    selectedRequirements: [] as string[],
    // Step 3: Project Details
    description: '',
    budget: '',
    timeline: '',
    additionalRequirements: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation
  const validateStep1 = () => {
    return formData.fullName.trim().length >= 2 && validEmail(formData.email);
  };

  const validateStep2 = () => {
    return formData.selectedRequirements.length > 0;
  };

  const validateStep3 = () => {
    return formData.description.trim().length >= 10;
  };

  const toggleRequirement = (req: string) => {
    setFormData(prev => {
      const exists = prev.selectedRequirements.includes(req);
      const updated = exists
        ? prev.selectedRequirements.filter(item => item !== req)
        : [...prev.selectedRequirements, req];
      return { ...prev, selectedRequirements: updated };
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setTouched(prev => ({ ...prev, fullName: true, email: true }));
      if (!validateStep1()) return;
    } else if (currentStep === 2) {
      setTouched(prev => ({ ...prev, selectedRequirements: true }));
      if (!validateStep2()) return;
    } else if (currentStep === 3) {
      setTouched(prev => ({ ...prev, description: true }));
      if (!validateStep3()) return;
    }

    setError(null);
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone || 'N/A',
      company: formData.companyName || 'N/A',
      requirements: formData.selectedRequirements.join(', '),
      description: formData.description,
      budget: formData.budget || 'Not specified',
      timeline: formData.timeline || 'Flexible',
      additionalRequirements: formData.additionalRequirements || 'None',
      submittedAt: new Date().toISOString(),
    };

    try {
      const result = await sendSubmission('contact', payload);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.text || 'Unable to submit your inquiry. Please try again.');
      }
    } catch (err) {
      if (err instanceof EmailServiceError) {
        // Fallback or specific message
        setError(err.message);
      } else {
        setError('Submission failed. Please reach out to us directly.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="inquiry-form-card inquiry-form-card--success" role="status">
        <div className="inquiry-success-icon">✦</div>
        <h3>Your project inquiry has been received.</h3>
        <p>The KernBuild team will review your requirements and get back to you shortly.</p>
        <button
          type="button"
          className="button"
          onClick={() => {
            setSubmitted(false);
            setCurrentStep(1);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              companyName: '',
              selectedRequirements: [],
              description: '',
              budget: '',
              timeline: '',
              additionalRequirements: '',
            });
          }}
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="inquiry-form-card">
      {/* Step Progress Header */}
      <div className="inquiry-stepper">
        {[
          { num: 1, label: 'About You' },
          { num: 2, label: 'Requirements' },
          { num: 3, label: 'Details' },
          { num: 4, label: 'Review' },
        ].map(step => (
          <div
            key={step.num}
            className={`inquiry-step-indicator ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
            onClick={() => {
              if (step.num < currentStep) setCurrentStep(step.num);
            }}
          >
            <span className="step-circle">{currentStep > step.num ? '✓' : step.num}</span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="inquiry-form">
        {/* STEP 1: ABOUT YOU */}
        {currentStep === 1 && (
          <div className="inquiry-step-content animate-step">
            <h3 className="inquiry-step-title">Step 1 — Tell Us About Yourself</h3>
            <p className="inquiry-step-desc">Who should we contact regarding this project?</p>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="inquiry-name">Full Name *</label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  onBlur={() => setTouched({ ...touched, fullName: true })}
                  aria-invalid={touched.fullName && formData.fullName.trim().length < 2}
                />
                {touched.fullName && formData.fullName.trim().length < 2 && (
                  <span className="field-error">Please enter your full name.</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="inquiry-email">Email Address *</label>
                <input
                  id="inquiry-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  aria-invalid={touched.email && !validEmail(formData.email)}
                />
                {touched.email && !validEmail(formData.email) && (
                  <span className="field-error">Please enter a valid email address.</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="inquiry-phone">Phone Number (Optional)</label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor="inquiry-company">Company / Business Name (Optional)</label>
                <input
                  id="inquiry-company"
                  type="text"
                  placeholder="e.g. Acme Studio"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT REQUIREMENTS */}
        {currentStep === 2 && (
          <div className="inquiry-step-content animate-step">
            <h3 className="inquiry-step-title">Step 2 — What are you looking to build?</h3>
            <p className="inquiry-step-desc">Select all project categories that apply to your goals.</p>

            <div className="requirements-checkbox-grid">
              {PROJECT_TYPES.map(type => {
                const isSelected = formData.selectedRequirements.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    className={`requirement-pill-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleRequirement(type)}
                    aria-pressed={isSelected}
                  >
                    <span className="pill-check">{isSelected ? '✓' : '+'}</span>
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>

            {touched.selectedRequirements && formData.selectedRequirements.length === 0 && (
              <span className="field-error" style={{ marginTop: '1rem', display: 'block' }}>
                Please select at least one requirement.
              </span>
            )}
          </div>
        )}

        {/* STEP 3: PROJECT DETAILS */}
        {currentStep === 3 && (
          <div className="inquiry-step-content animate-step">
            <h3 className="inquiry-step-title">Step 3 — Project Scope & Timeline</h3>
            <p className="inquiry-step-desc">Help us understand the scale, timeline, and expectations.</p>

            <div className="form-field form-field--full">
              <label htmlFor="inquiry-desc">Project Description *</label>
              <textarea
                id="inquiry-desc"
                rows={4}
                required
                placeholder="Describe your project, main problems to solve, target audience, and key features..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                onBlur={() => setTouched({ ...touched, description: true })}
                aria-invalid={touched.description && formData.description.trim().length < 10}
              />
              {touched.description && formData.description.trim().length < 10 && (
                <span className="field-error">Please provide a brief description (at least 10 characters).</span>
              )}
            </div>

            <div className="form-grid" style={{ marginTop: '1rem' }}>
              <div className="form-field">
                <label htmlFor="inquiry-budget">Expected Budget</label>
                <select
                  id="inquiry-budget"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">Select a budget range</option>
                  {BUDGET_RANGES.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="inquiry-timeline">Preferred Timeline</label>
                <select
                  id="inquiry-timeline"
                  value={formData.timeline}
                  onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                >
                  <option value="">Select a target timeline</option>
                  {TIMELINES.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="inquiry-additional">Additional Requirements (Optional)</label>
                <input
                  id="inquiry-additional"
                  type="text"
                  placeholder="e.g. Existing API documentation, design files ready in Figma..."
                  value={formData.additionalRequirements}
                  onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW AND SUBMIT */}
        {currentStep === 4 && (
          <div className="inquiry-step-content animate-step">
            <h3 className="inquiry-step-title">Step 4 — Review Your Inquiry</h3>
            <p className="inquiry-step-desc">Please verify your details before submitting to KernBuild.</p>

            <div className="inquiry-review-card">
              <div className="review-section">
                <div className="review-header">
                  <h4>Client Information</h4>
                  <button type="button" className="review-edit-btn" onClick={() => setCurrentStep(1)}>
                    Edit
                  </button>
                </div>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
                {formData.companyName && <p><strong>Company:</strong> {formData.companyName}</p>}
              </div>

              <div className="review-section">
                <div className="review-header">
                  <h4>Project Requirements</h4>
                  <button type="button" className="review-edit-btn" onClick={() => setCurrentStep(2)}>
                    Edit
                  </button>
                </div>
                <div className="review-tags">
                  {formData.selectedRequirements.map(req => (
                    <span key={req} className="review-tag">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="review-section">
                <div className="review-header">
                  <h4>Project Scope & Budget</h4>
                  <button type="button" className="review-edit-btn" onClick={() => setCurrentStep(3)}>
                    Edit
                  </button>
                </div>
                <p><strong>Description:</strong> {formData.description}</p>
                <p><strong>Budget:</strong> {formData.budget || 'Not specified'}</p>
                <p><strong>Timeline:</strong> {formData.timeline || 'Flexible'}</p>
                {formData.additionalRequirements && (
                  <p><strong>Notes:</strong> {formData.additionalRequirements}</p>
                )}
              </div>
            </div>

            {error && (
              <div className="form-status form-status--error" role="alert">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="inquiry-actions">
          {currentStep > 1 && (
            <button
              type="button"
              className="button button--outline"
              onClick={handleBack}
              disabled={submitting}
            >
              ← Back
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              className="button inquiry-btn-next"
              onClick={handleNext}
            >
              Continue to Step {currentStep + 1} →
            </button>
          ) : (
            <button
              type="submit"
              className="button inquiry-btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting Inquiry…' : 'Submit Project Inquiry 🚀'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
