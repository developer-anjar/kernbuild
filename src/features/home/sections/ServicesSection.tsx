import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';

export function ServicesSection() {
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
