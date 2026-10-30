import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';
import { environment } from '../config/environment';
import { scrollToSection, scrollToTop } from '../services/smoothScroll';

const NAV_LINKS = [
  { label: 'Home', fragment: 'home' },
  { label: 'About', fragment: 'about' },
  { label: 'Services', fragment: 'services' },
  { label: 'Projects', fragment: 'projects' },
  { label: 'Process', fragment: 'process' },
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
      setScrolled(window.scrollY > 20);
      if (!isHomeRoute) return;
      const active = NAV_LINKS.filter(link => {
        const section = document.getElementById(link.fragment);
        return Boolean(section && section.getBoundingClientRect().top <= 160);
      }).at(-1);
      setActiveSection(active?.fragment ?? 'home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
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
            <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
              <defs><linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stopColor="#FF5A0A" /><stop offset="100%" stopColor="#6426E8" /></linearGradient></defs>
              <path d="M10 8l6 8-6 8M16 16h6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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

        <a className="navbar__cta navbar__cta--desktop" href="/#contact" onClick={event => { event.preventDefault(); goTo('contact'); }}>Let's Build <span aria-hidden="true">→</span></a>
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
  const businessEmail = environment.businessEmail.trim();
  const navLinks = NAV_LINKS;
  const serviceLinks = ['Web Applications', 'Full-Stack Development', 'AI Integration', 'Dashboards', 'Deployment'];
  const socialLinks = [
    { name: 'LinkedIn', icon: 'in', url: SITE_CONFIG.socialLinks.linkedin },
    { name: 'GitHub', icon: 'gh', url: SITE_CONFIG.socialLinks.github },
    { name: 'Instagram', icon: 'ig', url: SITE_CONFIG.socialLinks.instagram },
  ];
  const visibleSocials = socialLinks.filter(social => !!social.url);

  return (
    <footer className="footer">
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
    const onScroll = () => setVisible(window.scrollY > 500);
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
  useEffect(() => {
    if (!location.hash) {
      scrollToTop(true);
      return;
    }
    const id = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => scrollToSection(id));
  }, [location.pathname, location.hash]);
  return null;
}
