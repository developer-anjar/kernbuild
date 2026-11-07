import { useCallback, useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const LOADING_VIDEO = '/loading%20video/loading.mp4';

export function Preloader({ onComplete }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finishLoading = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    videoRef.current?.pause();
    window.sessionStorage.setItem('kernbuild_visited', 'true');
    window.dispatchEvent(new CustomEvent('kernbuild:hero-enter'));
    onCompleteRef.current?.();
    setLeaving(true);
    timerRef.current = window.setTimeout(() => setShouldRender(false), 450);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const startFallback = (delay: number) => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(finishLoading, delay);
    };
    const startVideo = () => {
      const video = videoRef.current;
      if (!video || completedRef.current) return;
      void video.play().catch(() => startFallback(1800));
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) {
        videoRef.current?.pause();
        startFallback(900);
      } else {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(finishLoading, 12000);
        startVideo();
      }
    };

    motionPreference.addEventListener('change', onMotionChange);
    if (motionPreference.matches) {
      timerRef.current = window.setTimeout(finishLoading, 900);
    } else {
      timerRef.current = window.setTimeout(finishLoading, 12000);
      startVideo();
    }

    return () => {
      motionPreference.removeEventListener('change', onMotionChange);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      videoRef.current?.pause();
    };
  }, [finishLoading]);

  const updateProgress = () => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress || !Number.isFinite(video.duration) || video.duration <= 0) return;
    progress.style.transform = `scaleX(${Math.min(video.currentTime / video.duration, 1)})`;
  };

  if (!shouldRender) return null;

  return (
    <div className={`loading-screen${leaving ? ' loading-screen--leaving' : ''}`} role="status" aria-label="Loading KernBuild">
      <div className="loading-screen__glow" aria-hidden="true" />
      <div className="loading-screen__content">
        <div className="loading-screen__brand">
          <span className="loading-screen__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
              <rect width="32" height="32" rx="9" fill="url(#loading-mark-gradient)" />
              <defs>
                <linearGradient id="loading-mark-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#FF5A1F" />
                  <stop offset="1" stopColor="#681FEA" />
                </linearGradient>
              </defs>
              <path d="M10 8l6 8-6 8M16 16h6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="loading-screen__wordmark"><b>kern</b><strong>build</strong></span>
        </div>

        <div className="loading-screen__media">
          {reducedMotion ? (
            <div className="loading-screen__still" aria-hidden="true">
              <span className="loading-screen__shape loading-screen__shape--orange" />
              <span className="loading-screen__shape loading-screen__shape--purple" />
              <span className="loading-screen__shape loading-screen__shape--coral" />
            </div>
          ) : (
            <video
              ref={videoRef}
              className="loading-screen__video"
              src={LOADING_VIDEO}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onTimeUpdate={updateProgress}
              onEnded={finishLoading}
              onError={() => finishLoading()}
            />
          )}
        </div>

        <p className="loading-screen__message">Building ideas. Creating impact.</p>
        <div className="loading-screen__progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </div>

      <button className="loading-screen__skip" type="button" onClick={finishLoading}>
        Skip intro <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
