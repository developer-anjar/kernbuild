import { useEffect, useRef, type ReactNode } from 'react';
import { animate, stagger, type JSAnimation } from 'animejs';

interface AnimeRevealProps {
  children: ReactNode;
  className?: string;
  /** Selector within the wrapper to animate (defaults to direct children elements). */
  targetSelector?: string;
  staggerMs?: number;
  duration?: number;
  translateY?: [number, number];
  threshold?: number;
}

/**
 * AnimeReveal wraps content and reveals it with anime.js when it enters the viewport.
 * Mobile-responsive: reduces stagger/duration and translate distance on small screens.
 * Respects prefers-reduced-motion by rendering children immediately without animation.
 */
export function AnimeReveal({
  children,
  className,
  targetSelector,
  staggerMs = 80,
  duration = 640,
  translateY = [24, 0],
  threshold = 0.12,
}: AnimeRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<JSAnimation | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || typeof window === 'undefined') return;

    const isMobile = window.innerWidth <= 700;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = targetSelector
      ? wrapper.querySelectorAll(targetSelector)
      : Array.from(wrapper.children).filter(
          (child): child is Element => child.nodeType === 1
        );

    if (!targets.length) return;

    if (reducedMotion) {
      targets.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const isObserving = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || isObserving.has(entry.target as Element)) continue;
          isObserving.add(entry.target as Element);
          observer.unobserve(entry.target as Element);

          instanceRef.current = animate(targets, {
            translateY: isMobile ? [translateY[0] * 0.75, 0] : translateY,
            opacity: [0, 1],
            delay: stagger(isMobile ? Math.round(staggerMs * 0.7) : staggerMs),
            duration: isMobile ? duration * 0.8 : duration,
            easing: 'easeOutCubic',
          });
        }
      },
      { threshold, rootMargin: '-80px' }
    );

    targets.forEach((el) => observer.observe(el as Element));

    return () => {
      observer.disconnect();
      if (instanceRef.current) {
        instanceRef.current.revert();
      }
    };
  }, [children, targetSelector, staggerMs, duration, translateY, threshold]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
