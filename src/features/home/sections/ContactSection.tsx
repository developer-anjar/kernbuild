import { ContactForm } from '../../contact/components/Forms';

export function ContactSection() {
  return (
    <section className="section section--muted" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Have a project in mind?</p>
          <h2>Let’s make something useful.</h2>
          <p>Share a little about your project and we’ll get back to you using the email address you provide.</p>
          <div className="contact-note"><span aria-hidden="true">✦</span><p>No pressure. Just a first conversation about your goals.</p></div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
