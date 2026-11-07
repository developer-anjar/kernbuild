import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../../shared/config/site';
import { MagneticButton } from '../../../shared/components/animations/MagneticButton';
import { scrollToSection } from '../../../shared/services/smoothScroll';

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Software that moves your business forward</p>
          <h1>Build from<br />the <span>core.</span></h1>
          <p className="hero-description">We turn your ideas into thoughtful digital products—from custom web applications and dashboards to AI-powered tools.</p>
          <div className="hero-actions">
            <MagneticButton strength={0.25}>
              <Link className="button" to="/#contact">Let&apos;s build something <span aria-hidden="true">→</span></Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link className="button button--outline" to="/#projects">Explore our work</Link>
            </MagneticButton>
          </div>
          <div className="hero-points" aria-label="KernBuild capabilities">
            <span><i aria-hidden="true" /> Product-minded development</span>
            <span><i aria-hidden="true" /> From frontend to deployment</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual__glow" aria-hidden="true" />
          <img
            className="hero-visual__image"
            src={`/${SITE_CONFIG.images.hero}`}
            alt="Illustrated software dashboard showing project metrics and progress"
            fetchPriority="high"
          />
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__badge hero-art__badge--one"><span>✦</span> Ideas, engineered</div>
            <div className="hero-art__badge hero-art__badge--two"><b /> Built to scale</div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll down to About section"
      >
        <div className="hero-scroll-indicator__mouse" aria-hidden="true">
          <div className="hero-scroll-indicator__wheel" />
        </div>
        <span>Scroll</span>
      </button>
    </section>
  );
}
