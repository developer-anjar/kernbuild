import { useEffect, useRef } from 'react';
import { gsap, EASINGS } from '../animations/gsapConfig';
import { prefersReducedMotion } from '../animations/animationUtils';

export interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
  once?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const children = el.children.length > 0 ? Array.from(el.children) : [el];

    const tween = gsap.fromTo(
      children,
      {
        y: options.y ?? 28,
        x: options.x ?? 0,
        scale: options.scale ?? 1,
        opacity: options.opacity ?? 0,
      },
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: options.duration ?? 0.8,
        stagger: options.stagger ?? 0.08,
        delay: options.delay ?? 0,
        ease: options.ease ?? EASINGS.power3Out,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          once: options.once ?? true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [options.y, options.x, options.scale, options.duration, options.stagger, options.start]);

  return ref;
}
