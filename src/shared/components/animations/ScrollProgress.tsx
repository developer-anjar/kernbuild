import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../animations/animationUtils';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(Math.max((currentScroll / scrollHeight) * 100, 0), 100);
      setProgress(pct);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        transform: `scaleX(${progress / 100})`,
      }}
    />
  );
}

