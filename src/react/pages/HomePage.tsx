import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, STATISTICS_DATA } from '../../app/core/config/site.config';
import { PROCESS_DATA } from '../../app/data/process.data';
import { SERVICES_DATA } from '../../app/data/services.data';
import { TECHNOLOGIES_DATA } from '../../app/data/technologies.data';
import { WHY_CHOOSE_DATA } from '../../app/data/why-choose.data';
import type { StatisticMetric } from '../../app/models/statistics.model';
import { useProjects } from '../contexts/ProjectsContext';
import { useHomeMotion } from '../hooks/useHomeMotion';
import { ContactForm, FeedbackForm } from '../components/Forms';
import { ProjectCard, ServiceCard } from '../components/Cards';

export function HomePage() {
  const [animationRoot, setAnimationRoot] = useState<HTMLDivElement | null>(null);
  useHomeMotion(animationRoot);
  return (
    <div ref={setAnimationRoot} className="home-content">
      <HeroSection />
      <TechnologyStrip />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ContactSection />
      <FeedbackSection />
      <StatisticsSection />
      <FinalCtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Software that moves your business forward</p>
          <h1>Build from the <span>core.</span></h1>
          <p className="hero-description">We turn your ideas into thoughtful digital products—from custom web applications and dashboards to AI-powered tools.</p>
          <div className="hero-actions">
            <Link className="button" to="/#contact">Let&apos;s build something <span aria-hidden="true">→</span></Link>
            <Link className="button button--outline" to="/#projects">Explore our work</Link>
          </div>
          <div className="hero-points" aria-label="KernBuild capabilities">
            <span><i aria-hidden="true" /> Product-minded development</span>
            <span><i aria-hidden="true" /> From frontend to deployment</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Workspace illustration">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__badge hero-art__badge--one">Ideas, engineered</div>
            <div className="hero-art__badge hero-art__badge--two"><b /> Built to scale</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologyStrip() {
  return (
    <section className="technology-strip" aria-label="Technologies">
      <div className="container technology-content">
        <p>Tools we work with</p>
        <div className="technology-list">{TECHNOLOGIES_DATA.map(technology => <span key={technology.name}>{technology.name}</span>)}</div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [imageVisible, setImageVisible] = useState(true);
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-art">
          <div className="about-art__placeholder">
            <div className="about-art__core"><span>K</span></div>
            <div className="about-art__orbit about-art__orbit--one" />
            <div className="about-art__orbit about-art__orbit--two" />
            <span className="about-art__label about-art__label--one">Design</span>
            <span className="about-art__label about-art__label--two">Engineering</span>
            <span className="about-art__label about-art__label--three">Impact</span>
          </div>
          {imageVisible && <img src={SITE_CONFIG.images.about} alt="KernBuild design and development illustration" loading="lazy" onError={() => setImageVisible(false)} />}
        </div>
        <div className="about-copy">
          <p className="eyebrow">About KernBuild</p>
          <h2>Strong digital products start with a solid core.</h2>
          <p>KernBuild is a software development studio focused on building practical, modern digital experiences. We work from the foundations—understanding the problem, shaping the right solution, and creating software that can grow with your needs.</p>
          <p>Whether you need a focused landing page, a connected web platform, or an AI-enabled workflow, we bring the pieces together with care and clear communication.</p>
          <Link className="text-link" to="/#contact">Tell us about your idea <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef(0);
  const [slidesPerPage, setSlidesPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const pages = Array.from({ length: Math.ceil(SERVICES_DATA.length / slidesPerPage) }, (_, index) => index);

  const scrollToPage = (page: number, smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollTo({ left: page * (track.clientWidth + gap), behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' });
  };
  const updateSlidesPerPage = () => {
    const width = window.innerWidth;
    const count = width <= 640 ? 1 : width <= 900 ? 2 : 3;
    setSlidesPerPage(count);
    setActivePage(current => {
      const bounded = Math.min(current, Math.ceil(SERVICES_DATA.length / count) - 1);
      requestAnimationFrame(() => scrollToPage(bounded, false));
      return bounded;
    });
  };

  useEffect(() => {
    updateSlidesPerPage();
    window.addEventListener('resize', updateSlidesPerPage);
    return () => {
      window.removeEventListener('resize', updateSlidesPerPage);
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  const onTrackScroll = () => {
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const pageDistance = track.clientWidth + gap;
      const page = pageDistance > 0 ? Math.round(track.scrollLeft / pageDistance) : 0;
      setActivePage(Math.max(0, Math.min(page, pages.length - 1)));
    });
  };
  const goToPage = (page: number) => {
    const target = Math.max(0, Math.min(page, pages.length - 1));
    setActivePage(target);
    scrollToPage(target, true);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goToPage(activePage + 1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); goToPage(activePage - 1); }
    else if (event.key === 'Home') { event.preventDefault(); goToPage(0); }
    else if (event.key === 'End') { event.preventDefault(); goToPage(pages.length - 1); }
  };

  return (
    <section className="section section--muted" id="services">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">What we do</p>
          <h2>Everything you need to build and launch</h2>
          <p>Flexible development support to take your idea from first conversation to a dependable product.</p>
        </header>
        <div className="carousel" role="region" aria-roledescription="carousel" aria-label="KernBuild services">
          <div className="carousel__controls">
            <p className="carousel__status" aria-live="polite">Showing {activePage * slidesPerPage + 1}–{Math.min((activePage + 1) * slidesPerPage, SERVICES_DATA.length)} of {SERVICES_DATA.length} services</p>
            <div className="carousel__buttons">
              <button type="button" className="carousel__arrow" aria-label="Previous services" disabled={activePage === 0} onClick={() => goToPage(activePage - 1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" className="carousel__arrow" aria-label="Next services" disabled={activePage >= pages.length - 1} onClick={() => goToPage(activePage + 1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
          <div ref={trackRef} className="carousel__track" tabIndex={0} aria-label="Services. Use the arrow keys to browse." onScroll={onTrackScroll} onKeyDown={onKeyDown}>
            {SERVICES_DATA.map((service, index) => (
              <div className="carousel__slide" key={service.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${SERVICES_DATA.length}`}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          <div className="carousel__pagination" role="group" aria-label="Choose a services page">
            {pages.map(page => <button key={page} type="button" className={`carousel__dot${activePage === page ? ' active' : ''}`} aria-label={`Show services page ${page + 1}`} aria-current={activePage === page ? 'true' : undefined} onClick={() => goToPage(page)}><span className="sr-only">Page {page + 1}</span></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { featuredProjects } = useProjects();
  return (
    <section className="section section--cinematic" id="projects">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Selected projects</p>
          <h2>Ideas taking shape</h2>
          <p>A few of the products we’re building. Project visuals are placeholders until final screenshots are available.</p>
        </header>
        <div className="projects-grid">{featuredProjects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
        <div className="section-action"><Link className="button button--outline" to="/projects">Browse projects and filters <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="container">
        <header className="section-heading"><p className="eyebrow">How we work</p><h2>A clear path from idea to launch</h2><p>Collaborative at every step, with clear decisions and progress along the way.</p></header>
        <div className="process-grid">
          {PROCESS_DATA.map(step => <article className="process-card" key={step.step}>
            <span className="process-number">0{step.step}</span>
            <span className="process-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon} /></svg></span>
            <h3>{step.title}</h3><p>{step.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="section section--lavender">
      <div className="container">
        <header className="section-heading"><p className="eyebrow">Why KernBuild</p><h2>Thoughtful work. Clear collaboration.</h2><p>The way we build matters just as much as what we build.</p></header>
        <div className="reasons-grid">
          {WHY_CHOOSE_DATA.map(reason => <article className="reason-card" key={reason.title}>
            <span className="reason-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={reason.icon} /></svg></span>
            <div><h3>{reason.title}</h3><p>{reason.description}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <header className="section-heading"><p className="eyebrow">Client stories</p><h2>Built together, improved together</h2></header>
        <div className="testimonial-placeholder">
          <span className="testimonial-mark" aria-hidden="true">“</span>
          <p>We’ll share client stories here when we have permission to publish verified feedback.</p>
          <Link className="text-link" to="/feedback">Share your experience <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

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

export function FeedbackSection() {
  return (
    <section className="section section--muted" id="feedback">
      <div className="container feedback-container">
        <header className="section-heading"><p className="eyebrow">Your voice matters</p><h2>Share your experience</h2><p>Worked with KernBuild? Your honest feedback helps us improve how we collaborate and build.</p></header>
        <FeedbackForm />
      </div>
    </section>
  );
}

function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;
    const frames: number[] = [];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = (entry.target as HTMLElement).dataset.statId;
        const metric = STATISTICS_DATA.find(item => item.id === id);
        if (!metric || typeof metric.value !== 'number') continue;
        observer.unobserve(entry.target);
        const target = metric.value;
        const started = performance.now();
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850;
        const update = (now: number) => {
          const progress = duration === 0 ? 1 : Math.min((now - started) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setAnimatedValues(values => ({ ...values, [metric.id]: Math.round(target * eased) }));
          if (progress < 1) frames.push(requestAnimationFrame(update));
        };
        frames.push(requestAnimationFrame(update));
      }
    }, { threshold: 0.35 });
    section.querySelectorAll<HTMLElement>('[data-stat-id]').forEach(card => observer.observe(card));
    return () => { observer.disconnect(); frames.forEach(cancelAnimationFrame); };
  }, []);
  const valueFor = (metric: StatisticMetric) => typeof metric.value !== 'number' ? metric.value : animatedValues[metric.id] ?? 0;
  return (
    <section className="section section--cinematic statistics-section" ref={sectionRef}>
      <div className="container">
        <header className="section-heading"><p className="eyebrow">KernBuild at a glance</p><h2>Built on capabilities, not inflated numbers</h2><p>These are illustrative placeholders only, not verified business results. We’ll replace them with confirmed figures before publishing claims.</p></header>
        <div className="statistics-grid">
          {STATISTICS_DATA.map(metric => <article className="statistic-card" data-stat-id={metric.id} key={metric.id}>
            <span className="statistic-value" aria-label="Illustrative placeholder metric">{metric.prefix ?? ''}{valueFor(metric)}{metric.suffix ?? ''}</span>
            <h3>{metric.label}</h3><p>Illustrative placeholder · not verified</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <p className="eyebrow">Your next idea starts here</p>
        <h2>Ready to build from the core?</h2>
        <p>Let’s shape a practical solution around the people who will use it.</p>
        <Link className="button button--light" to="/#contact">Start a conversation <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
