import { Link } from 'react-router-dom';
import { MagneticButton } from '../../../shared/components/animations/MagneticButton';

export function FinalCtaSection() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <p className="eyebrow">Your next idea starts here</p>
        <h2>Ready to build from the core?</h2>
        <p>Let’s shape a practical solution around the people who will use it.</p>
        <MagneticButton strength={0.3}>
          <Link className="button button--light" to="/#contact">Start a conversation <span aria-hidden="true">→</span></Link>
        </MagneticButton>
      </div>
    </section>
  );
}
