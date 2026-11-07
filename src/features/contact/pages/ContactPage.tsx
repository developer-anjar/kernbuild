import { ContactSection } from '../../home/sections/ContactSection';

export function ContactPage() {
  return (
    <section className="section" id="contact-page">
      <div className="container">
        <header className="page-heading">
          <p className="eyebrow">Start a conversation</p>
          <h1>Tell us what you’re building</h1>
          <p>Share a little about your idea. We’ll use your details only to follow up about your inquiry.</p>
        </header>
        <ContactSection />
      </div>
    </section>
  );
}
