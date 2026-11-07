import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../projects/context/ProjectsContext';
import { ProjectCard } from '../../projects/components/ProjectCard';

export function ProjectsSection() {
  const { featuredProjects, loading, error, refresh } = useProjects();
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [slidesPerPage, setSlidesPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const projectPages = Array.from(
    { length: Math.ceil(featuredProjects.length / slidesPerPage) },
    (_, page) => featuredProjects.slice(page * slidesPerPage, (page + 1) * slidesPerPage),
  );
  const pageCount = projectPages.length;

  const scrollToPage = (page: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: page * track.clientWidth,
      behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto',
    });
  };

  useEffect(() => {
    const updateSlidesPerPage = () => {
      const count = window.innerWidth <= 640 ? 1 : window.innerWidth <= 900 ? 2 : 3;
      setSlidesPerPage(current => {
        if (current === count) return current;
        const nextPage = Math.min(activePage, Math.max(Math.ceil(featuredProjects.length / count) - 1, 0));
        setActivePage(nextPage);
        requestAnimationFrame(() => scrollToPage(nextPage, false));
        return count;
      });
    };

    updateSlidesPerPage();
    window.addEventListener('resize', updateSlidesPerPage);
    return () => {
      window.removeEventListener('resize', updateSlidesPerPage);
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [activePage, featuredProjects.length]);

  const onTrackScroll = () => {
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track?.clientWidth) return;
      setActivePage(Math.max(0, Math.min(Math.round(track.scrollLeft / track.clientWidth), pageCount - 1)));
    });
  };

  const goToPage = (page: number) => {
    const nextPage = Math.max(0, Math.min(page, pageCount - 1));
    setActivePage(nextPage);
    scrollToPage(nextPage);
  };

  const onTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToPage(activePage + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPage(activePage - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToPage(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToPage(pageCount - 1);
    }
  };

  return (
    <section className="section section--cinematic" id="projects">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Real Projects · Real Impact</p>
          <h2>Crafted With Precision</h2>
          <p>
            Explore actual digital products, AI applications, and enterprise systems built by the KernBuild team.
          </p>
        </header>

        {loading ? (
          <p className="empty-state" role="status">Loading projects…</p>
        ) : error ? (
          <div className="empty-state" role="alert">
            {error}{' '}
            <button className="text-link" type="button" onClick={() => void refresh()}>
              Try again
            </button>
          </div>
        ) : featuredProjects.length ? (
          <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Featured projects">
            <div className="project-carousel__controls">
              <p className="project-carousel__status" aria-live="polite">
                Showing {Math.min(activePage * slidesPerPage + 1, featuredProjects.length)}–{Math.min((activePage + 1) * slidesPerPage, featuredProjects.length)} of {featuredProjects.length} projects
              </p>
              <div className="project-carousel__arrows">
                <button type="button" aria-label="Previous projects" disabled={activePage === 0} onClick={() => goToPage(activePage - 1)}>
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" aria-label="Next projects" disabled={activePage >= pageCount - 1} onClick={() => goToPage(activePage + 1)}>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <div
              ref={trackRef}
              className="project-carousel__track"
              tabIndex={0}
              aria-label="Featured projects. Use the arrow keys to browse."
              onScroll={onTrackScroll}
              onKeyDown={onTrackKeyDown}
            >
              {projectPages.map((projects, page) => (
                <div className="project-carousel__slide" key={projects[0]?.id ?? page} role="group" aria-roledescription="slide" aria-label={`Page ${page + 1} of ${pageCount}`}>
                  <div className="project-carousel__page-grid">
                    {projects.map(project => <ProjectCard key={project.id} project={project} />)}
                  </div>
                </div>
              ))}
            </div>
            {pageCount > 1 && (
              <div className="project-carousel__pagination" role="group" aria-label="Choose a projects page">
                {Array.from({ length: pageCount }, (_, page) => (
                  <button
                    key={page}
                    type="button"
                    className={activePage === page ? 'active' : undefined}
                    aria-label={`Show projects page ${page + 1}`}
                    aria-current={activePage === page ? 'true' : undefined}
                    onClick={() => goToPage(page)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="empty-state" role="status">No featured projects are available yet.</p>
        )}

        <div className="section-action">
          <Link className="button button--outline" to="/projects">
            View All Projects & Case Studies <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
