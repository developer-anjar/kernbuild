import { Link } from 'react-router-dom';
import { MagneticButton } from '../../../shared/components/animations/MagneticButton';
import { scrollToSection } from '../../../shared/services/smoothScroll';

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Digital Solutions & Creative Development Agency</p>
          <h1>
            <span className="hero-wordmark" aria-label="KernBuild">
              <span className="hero-wordmark__kern" aria-hidden="true">kern</span>
              <span className="hero-wordmark__build" aria-hidden="true">build</span>
            </span>
            <span className="hero-tagline">Build from the Core</span>
          </h1>
          <p className="hero-description">
            We turn ambitious ideas into thoughtfully engineered digital products, from modern websites and custom applications to intelligent business solutions.
          </p>

          <div className="hero-actions">
            <MagneticButton strength={0.25}>
              <Link
                className="button hero-btn-primary"
                to="/#contact"
                onClick={event => {
                  event.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Let&apos;s Build Something <span aria-hidden="true">→</span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link
                className="button button--outline hero-btn-secondary"
                to="/#projects"
                onClick={event => {
                  event.preventDefault();
                  scrollToSection('projects');
                }}
              >
                Explore Our Work
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Right-side Interactive Hero Illustration with Floating UI Elements */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__glow" />

          {/* Floating Workspace / Dashboard Card */}
          <div className="hero-dashboard-mockup">
            <div className="hero-mockup-header">
              <div className="mockup-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="mockup-url">kernbuild.com/workspace</div>
            </div>

            <div className="hero-mockup-content">
              <div className="mockup-metric-grid">
                <div className="mockup-metric-card">
                  <div className="metric-label">Client Focus</div>
                  <div className="metric-val">100%</div>
                  <div className="metric-sub">Dedicated Engineering</div>
                </div>
                <div className="mockup-metric-card mockup-metric-card--accent">
                  <div className="metric-label">Architecture</div>
                  <div className="metric-val">Modern</div>
                  <div className="metric-sub">Scalable Tech Stack</div>
                </div>
              </div>

              <div className="mockup-code-preview">
                <div className="code-line"><span className="kw">const</span> studio = <span className="str">&quot;KernBuild&quot;</span>;</div>
                <div className="code-line"><span className="fn">createImpact</span>({`{ scalable: true, modern: true }`});</div>
              </div>
            </div>
          </div>

          {/* Floating Interactive Badges */}
          <div className="hero-art">
            <div className="hero-art__badge hero-art__badge--one floating-element">
              <span className="badge-icon">⚡</span>
              <div>
                <strong>High Performance</strong>
                <small>60fps Motion & Speed</small>
              </div>
            </div>

            <div className="hero-art__badge hero-art__badge--two floating-element floating-element--delayed">
              <b className="badge-pulse" />
              <div>
                <strong>Full-Stack Mastery</strong>
                <small>React · Angular · Spring Boot</small>
              </div>
            </div>

            <div className="hero-art__badge hero-art__badge--three floating-element floating-element--slow">
              <span className="badge-icon">✦</span>
              <div>
                <strong>Production Ready</strong>
                <small>Built from the Core</small>
              </div>
            </div>
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
