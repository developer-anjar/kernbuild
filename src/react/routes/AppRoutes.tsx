import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ContactPage, FeedbackPage, LegalPage, ProjectsPage } from '../pages/RoutePages';
import { HomePage } from '../pages/HomePage';

const pageTitles: Record<string, string> = {
  '/': 'KernBuild | Build from the Core',
  '/projects': 'Projects | KernBuild',
  '/contact': 'Contact | KernBuild',
  '/feedback': 'Feedback | KernBuild',
  '/privacy': 'Privacy Policy | KernBuild',
  '/terms': 'Terms & Conditions | KernBuild',
};

export function AppRoutes() {
  const location = useLocation();
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? pageTitles['/'];
    const route = routeRef.current;
    if (!route || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(route, { autoAlpha: 0, y: 14, filter: 'blur(3px)' }, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.48,
        ease: 'power2.out',
        clearProps: 'opacity,visibility,transform,filter',
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
