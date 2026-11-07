import { Link } from 'react-router-dom';
import { TESTIMONIALS_DATA } from '../data/testimonials';

export function TestimonialsSection() {
  const testimonials = TESTIMONIALS_DATA;

  return (
    <section className="section testimonials-section">
      <div className="container">
        <header className="section-heading"><p className="eyebrow">Client stories</p><h2>Built together, improved together</h2></header>
        {testimonials.length ? (
          <div className="testimonials-grid">
            {testimonials.map(testimonial => <article className="testimonial-card" key={testimonial.id}>
              <span className="testimonial-card__rating" aria-label={`${testimonial.rating} out of 5 stars`}>{'★'.repeat(testimonial.rating)}</span>
              <blockquote>{testimonial.feedback}</blockquote>
              <p className="testimonial-card__author">{testimonial.clientName}</p>
              {(testimonial.designation || testimonial.companyName) && <p className="testimonial-card__detail">{[testimonial.designation, testimonial.companyName].filter(Boolean).join(' · ')}</p>}
            </article>)}
          </div>
        ) : (
          <div className="testimonial-placeholder">
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <p>We’ll share client stories here when we have permission to publish verified feedback.</p>
            <Link className="text-link" to="/feedback">Share your experience <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </div>
    </section>
  );
}
