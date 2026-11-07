import { BackToTop, Footer, Navbar, RouteScroll } from '../shared/components/Navigation';
import { Preloader } from '../shared/components/Preloader';
import { SmoothScroll } from '../shared/components/SmoothScroll';
import { ScrollProgress } from '../shared/components/animations/ScrollProgress';
import { ProjectsProvider } from '../features/projects/context/ProjectsContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <ProjectsProvider>
      <div className="cinematic-app">
        <ScrollProgress />
        <SmoothScroll />
        <Preloader />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <AppRoutes />
        <Footer />
        <BackToTop />
        <RouteScroll />
      </div>
    </ProjectsProvider>
  );
}
