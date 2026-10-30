import { BackToTop, Footer, Navbar, RouteScroll } from './components/Navigation';
import { BackgroundScene } from './components/BackgroundScene';
import { Preloader } from './components/Preloader';
import { SmoothScroll } from './components/SmoothScroll';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { AppRoutes } from './routes/AppRoutes';

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
        <AppRoutes />
        <Footer />
        <BackToTop />
        <RouteScroll />
      </div>
    </ProjectsProvider>
  );
}
