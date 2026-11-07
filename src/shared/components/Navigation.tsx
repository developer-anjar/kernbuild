import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../config/site';
import { environment } from '../config/environment';
import { scrollToPosition, scrollToSection, scrollToTop } from '../services/smoothScroll';
import { MagneticButton } from './animations/MagneticButton';

const NAV_LINKS = [
  { label: 'Home', fragment: 'home' },
  { label: 'About', fragment: 'about' },
  { label: 'Services', fragment: 'services' },
  { label: 'Projects', fragment: 'projects' },
  { label: 'Process', fragment: 'process' },
  { label: 'Team', fragment: 'team' },
  { label: 'Contact', fragment: 'contact' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(window.scrollY > 20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isHomeRoute = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled(current => current === nextScrolled ? current : nextScrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!isHomeRoute) {
      setActiveSection('');
      return () => window.removeEventListener('scroll', onScroll);
    }
    if (!('IntersectionObserver' in window)) return () => window.removeEventListener('scroll', onScroll);

    const visibleSections = new Set<HTMLElement>();
    const sections = NAV_LINKS.map(link => document.getElementById(link.fragment)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const section = entry.target as HTMLElement;
        if (entry.isIntersecting) visibleSections.add(section);
        else visibleSections.delete(section);
      }
      const active = [...visibleSections].sort(
        (left, right) => left.getBoundingClientRect().top - right.getBoundingClientRect().top,
      ).at(-1);
      const preceding = active ? undefined : sections
        .filter(section => section.getBoundingClientRect().top <= window.innerHeight * 0.4)
        .at(-1);
      setActiveSection(active?.id ?? preceding?.id ?? 'home');
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [isHomeRoute]);

  const goTo = (fragment: string) => {
    setMobileMenuOpen(false);
    setActiveSection(fragment);
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${fragment}` });
      return;
    }
    if (location.hash !== `#${fragment}`) {
      navigate({ pathname: '/', hash: `#${fragment}` });
      return;
    }
    scrollToSection(fragment);
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}${isHomeRoute && !scrolled ? ' navbar--cinematic' : ''}`}>
      <div className="navbar__container">
        <a className="navbar__logo" href="/#home" onClick={event => { event.preventDefault(); goTo('home'); }} aria-label="KernBuild home">
          <span className="navbar__logo-icon" aria-hidden="true">
            <img src="/kernbuild-favicon.ico" alt="" width="32" height="32" />
          </span>
          <span className="navbar__brand">
            <span className="navbar__brand-text"><span className="navbar__brand-kern">kern</span><span className="navbar__brand-build">build</span></span>
            <span className="navbar__brand-tagline">Build from the Core</span>
          </span>
        </a>

        <nav id="primary-navigation" className={`navbar__nav${mobileMenuOpen ? ' open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a
              key={link.fragment}
              className={`navbar__link${activeSection === link.fragment ? ' active' : ''}`}
              href={`/#${link.fragment}`}
              aria-current={activeSection === link.fragment ? 'location' : undefined}
              onClick={event => { event.preventDefault(); goTo(link.fragment); }}
            >{link.label}</a>
          ))}
          <a className="navbar__cta navbar__cta--mobile" href="/#contact" onClick={event => { event.preventDefault(); goTo('contact'); }}>Let's Build <span aria-hidden="true">→</span></a>
        </nav>

        <MagneticButton strength={0.25} className="navbar__cta--desktop-wrap">
          <a className="navbar__cta navbar__cta--desktop" href="/#contact" onClick={event => { event.preventDefault(); goTo('contact'); }}>Let's Build <span aria-hidden="true">→</span></a>
        </MagneticButton>
        <button
          className="navbar__hamburger"
          type="button"
          onClick={() => setMobileMenuOpen(value => !value)}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className={`navbar__hamburger-line${mobileMenuOpen ? ' open' : ''}`} />
          <span className={`navbar__hamburger-line${mobileMenuOpen ? ' open' : ''}`} />
          <span className={`navbar__hamburger-line${mobileMenuOpen ? ' open' : ''}`} />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const businessEmail = environment.businessEmail.trim();
  const navLinks = NAV_LINKS;
  const serviceLinks = ['Web Applications', 'Full-Stack Development', 'AI Integration', 'Dashboards', 'Deployment'];
  const socialLinks = [
    { name: 'LinkedIn', icon: 'in', url: SITE_CONFIG.socialLinks.linkedin },
    { name: 'GitHub', icon: 'gh', url: SITE_CONFIG.socialLinks.github },
    { name: 'Instagram', icon: 'ig', url: SITE_CONFIG.socialLinks.instagram },
  ];
  const visibleSocials = socialLinks.filter(social => !!social.url);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia(footer);
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = footer.querySelectorAll('.footer__grid > *, .footer__bottom');
      gsap.fromTo(targets, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 88%', once: true },
      });
    });
    return () => motion.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">
                <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
                  <rect width="32" height="32" rx="8" fill="url(#footer-logo-grad)" />
                  <defs><linearGradient id="footer-logo-grad" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stopColor="#FF5A0A" /><stop offset="100%" stopColor="#6426E8" /></linearGradient></defs>
                  <path d="M10 8l6 8-6 8M16 16h6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="footer__logo-text"><span className="footer__logo-kern">kern</span><span className="footer__logo-build">build</span></span>
            </div>
            <p className="footer__tagline">Build from the Core</p>
            <p className="footer__desc">A full-stack development studio helping startups and businesses build modern, scalable digital products.</p>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <nav className="footer__nav">
              {navLinks.map(link => <Link key={link.fragment} to={`/#${link.fragment}`}>{link.label}</Link>)}
            </nav>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <nav className="footer__nav">
              {serviceLinks.map(service => <Link key={service} to="/#services">{service}</Link>)}
            </nav>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            {businessEmail ? <a className="footer__email" href={`mailto:${businessEmail}`}>{businessEmail}</a> : <p className="footer__placeholder-text">Business email will be added soon.</p>}
            {visibleSocials.length > 0 ? (
              <div className="footer__socials">
                {visibleSocials.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="footer__social-link">{social.icon}</a>)}
              </div>
            ) : <p className="footer__placeholder-text">Social links will be added soon.</p>}
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">&copy; {new Date().getFullYear()} KernBuild. All rights reserved.</p>
          <div className="footer__legal"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(window.scrollY > 500);
  useEffect(() => {
    const onScroll = () => {
      const nextVisible = window.scrollY > 500;
      setVisible(current => current === nextVisible ? current : nextVisible);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button className={`back-to-top${visible ? ' visible' : ''}`} onClick={() => scrollToTop()} aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
    </button>
  );
}

export function RouteScroll() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useEffect(() => {
    let navigationStarted = false;
    const savePosition = () => {
      positions.current.set(location.key, window.scrollY);
      if (positions.current.size > 30) {
        const oldestKey = positions.current.keys().next().value;
        if (oldestKey) positions.current.delete(oldestKey);
      }
    };
    const onScroll = () => {
      if (!navigationStarted) savePosition();
    };
    const onNavigationClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href, window.location.href);
      const current = `${location.pathname}${location.search}${location.hash}`;
      if (destination.origin !== window.location.origin ||
          `${destination.pathname}${destination.search}${destination.hash}` === current) return;
      navigationStarted = true;
      savePosition();
    };

    if (!positions.current.has(location.key)) savePosition();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onNavigationClick, true);
    return () => {
      if (!navigationStarted) savePosition();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onNavigationClick, true);
    };
  }, [location.key, location.pathname, location.search, location.hash]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (navigationType === 'POP' && positions.current.has(location.key)) {
        scrollToPosition(positions.current.get(location.key) ?? 0);
      } else if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        scrollToSection(id);
      } else {
        scrollToTop(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.pathname, location.hash, navigationType]);
  return null;
}
