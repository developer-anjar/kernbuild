import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Persistent particle-wave artwork behind every route and section. */
export function BackgroundScene() {
  const imageRef = useRef<HTMLImageElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const scope = layerRef.current?.parentElement;
    if (!image || !scope) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia(scope);
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(image, { scale: 1.04, yPercent: -1 }, {
        scale: 1.12,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(image, { xPercent: 1.1, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
    });
    ScrollTrigger.refresh();
    return () => motion.revert();
  }, []);

  return (
    <div ref={layerRef} className="background-scene" aria-hidden="true">
      <img ref={imageRef} className="background-scene__image" src="/images/hero/image.png" alt="" fetchPriority="high" />
      <span className="background-scene__atmosphere" />
    </div>
  );
}
