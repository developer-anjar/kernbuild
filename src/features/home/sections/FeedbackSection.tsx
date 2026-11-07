import { FeedbackForm } from '../../contact/components/Forms';

interface FeedbackSectionProps {
  standalonePage?: boolean;
}

export function FeedbackSection({ standalonePage = false }: FeedbackSectionProps) {
  const Heading = standalonePage ? 'h1' : 'h2';

  return (
    <section className="section section--muted" id="feedback">
      <div className="container feedback-container">
        <header className={standalonePage ? 'page-heading' : 'section-heading'}><p className="eyebrow">Your voice matters</p><Heading>Share your experience</Heading><p>Worked with KernBuild? Your honest feedback helps us improve how we collaborate and build.</p></header>
        <FeedbackForm />
      </div>
    </section>
  );
}
