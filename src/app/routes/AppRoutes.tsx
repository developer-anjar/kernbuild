import { lazy, Suspense, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../../features/home/pages/HomePage';

const ProjectsPage = lazy(() => import('../../features/projects/pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ProjectsDetailPage = lazy(() => import('../../features/projects/pages/ProjectsDetailPage').then(module => ({ default: module.ProjectsDetailPage })));
const ContactPage = lazy(() => import('../../features/contact/pages/ContactPage').then(module => ({ default: module.ContactPage })));
const FeedbackPage = lazy(() => import('../../features/feedback/pages/FeedbackPage').then(module => ({ default: module.FeedbackPage })));
const LegalPage = lazy(() => import('../../features/legal/pages/LegalPage').then(module => ({ default: module.LegalPage })));
const NotFoundPage = lazy(() => import('../../features/site/pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const pageRevealSelectors = [
  '.page-heading > *',
  '.project-filters',
  '.projects-grid > .project-card',
  '.project-detail__gallery',
  '.project-detail__content > *',
  '.legal-copy > section',
  '.contact-copy > *',
  '.form-card',
  '.section-action',
].join(',');

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
    const match = Object.keys(pageTitles).find(titlePath => location.pathname === titlePath || location.pathname.startsWith(`${titlePath}/`));
    document.title = match ? pageTitles[match] : 'KernBuild | Build from the Core';
    const route = routeRef.current;
    if (!route) return;

    const motion = gsap.matchMedia(route);
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(route, { autoAlpha: 0, y: 12 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: 'power2.out',
        clearProps: 'opacity,visibility,transform',
      });

      if (location.pathname === '/') return;
      let nextTriggerId = 0;
      const animations = new Map<HTMLElement, { tween: gsap.core.Tween; triggerId: string }>();
      const syncTargets = () => {
        const currentTargets = new Set(route.querySelectorAll<HTMLElement>(pageRevealSelectors));
        for (const [target, animation] of animations) {
          if (currentTargets.has(target)) continue;
          ScrollTrigger.getById(animation.triggerId)?.kill();
          animation.tween.kill();
          animations.delete(target);
        }

        let index = 0;
        currentTargets.forEach(target => {
          if (animations.has(target)) return;
          const triggerId = `page-reveal-${location.key}-${nextTriggerId++}`;
          const tween = gsap.fromTo(target, { autoAlpha: 0, y: 20 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            delay: (index % 4) * 0.045,
            ease: 'power2.out',
            scrollTrigger: { id: triggerId, trigger: target, start: 'top 88%', once: true },
          });
          animations.set(target, { tween, triggerId });
          index += 1;
        });
      };
      const observer = new MutationObserver(syncTargets);
      observer.observe(route, { childList: true, subtree: true });
      syncTargets();

      return () => {
        observer.disconnect();
        for (const animation of animations.values()) {
          ScrollTrigger.getById(animation.triggerId)?.kill();
          animation.tween.kill();
        }
        animations.clear();
      };
    });
    return () => motion.revert();
  }, [location.pathname]);

  return (
    <main id="main-content">
      <div ref={routeRef} className="route-layer">
        <Suspense fallback={<p className="route-loading" role="status">Loading page…</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectsDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}
