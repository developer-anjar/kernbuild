import { ContactForm } from '../../contact/components/Forms';

export function ContactSection({ page = false }: { page?: boolean }) {
  return (
    <section className={`section section--muted contact-section${page ? ' contact-section--page' : ''}`} id={page ? undefined : 'contact'}>
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Have a project in mind?</p>
          {page ? <h1>Let’s make something useful.</h1> : <h2>Let’s make something useful.</h2>}
          <p>
            Share a little about your project and we’ll get back to you using the email address you provide.
          </p>
          <div className="contact-note">
            <span aria-hidden="true">✦</span>
            <p>No pressure. Just a first conversation about your goals.</p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
