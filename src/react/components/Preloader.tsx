import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Preloader that covers the screen until fonts, images, and the motion system
 * are ready, then fades out smoothly. Prevents the "glitchy" flash of
 * invisible or half-animated content on first load.
 */
export function Preloader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleLoad = () => {
      timer = setTimeout(() => {
        setReady(true);
      }, 900);
    };

    if (document.fonts) {
      document.fonts.ready.then(handleLoad);
    } else {
      handleLoad();
    }

    window.addEventListener('load', handleLoad);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (ready) return <div className="preloader" data-fading="true" />;

  return (
    <div className="preloader">
      <div className="preloader__inner">
        <div className="preloader__logo">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#preloader-grad)" />
            <defs>
              <linearGradient id="preloader-grad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#FF5A0A" />
                <stop offset="100%" stopColor="#6426E8" />
              </linearGradient>
            </defs>
            <path d="M10 8l6 8-6 8M16 16h6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="preloader__label">Loading KernBuild</p>
        <div className="preloader__bar">
          <div className="preloader__bar-fill" />
        </div>
      </div>
      <Link to="/#contact" className="preloader__skip">
        Skip intro <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
