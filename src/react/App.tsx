import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BackToTop, Footer, Navbar, RouteScroll } from './components/Navigation';
import { BackgroundScene } from './components/BackgroundScene';
import { Preloader } from './components/Preloader';
import { SmoothScroll } from './components/SmoothScroll';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { ContactPage, FeedbackPage, LegalPage, ProjectsPage } from './pages/RoutePages';
import { HomePage } from './pages/HomePage';

function PageTitle() {
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'KernBuild | Build from the Core',
      '/projects': 'Projects | KernBuild',
      '/contact': 'Contact | KernBuild',
      '/feedback': 'Feedback | KernBuild',
      '/privacy': 'Privacy Policy | KernBuild',
      '/terms': 'Terms & Conditions | KernBuild',
    };
    document.title = titles[location.pathname] ?? titles['/'];
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <ProjectsProvider>
      <div className="cinematic-app">
        <BackgroundScene />
        <div className="cinematic-atmosphere" aria-hidden="true" />
        <SmoothScroll />
        <Preloader />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <RouteContent />
        <Footer />
        <BackToTop />
        <RouteScroll />
        <PageTitle />
      </div>
    </ProjectsProvider>
  );
}

function RouteContent() {
  const location = useLocation();
  const routeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const route = routeRef.current;
    if (!route || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(route, { autoAlpha: 0, y: 14, filter: 'blur(3px)' }, {
        autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.48,
        ease: 'power2.out', clearProps: 'opacity,visibility,transform,filter',
      });
    }, route);
    return () => context.revert();
  }, [location.pathname]);

  return (
    <main id="main-content">
      <div ref={routeRef} className="route-layer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </div>
    </main>
  );
}
