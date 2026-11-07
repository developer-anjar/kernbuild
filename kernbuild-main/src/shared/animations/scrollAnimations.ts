import { gsap, EASINGS } from './gsapConfig';
import { prefersReducedMotion } from './animationUtils';

/**
 * Creates an image mask clip-path reveal
 */
export function revealImageMask(
  target: HTMLElement | null,
  options: {
    trigger?: HTMLElement;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    delay?: number;
    start?: string;
  } = {},
): () => void {
  if (!target || prefersReducedMotion()) return () => {};

  const direction = options.direction ?? 'up';
  let initialClip = 'inset(100% 0% 0% 0%)';
  if (direction === 'down') initialClip = 'inset(0% 0% 100% 0%)';
  else if (direction === 'left') initialClip = 'inset(0% 100% 0% 0%)';
  else if (direction === 'right') initialClip = 'inset(0% 0% 0% 100%)';

  const tween = gsap.fromTo(
    target,
    {
      clipPath: initialClip,
      scale: 1.08,
      opacity: 0.8,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      opacity: 1,
      duration: options.duration ?? 1.1,
      delay: options.delay ?? 0,
      ease: EASINGS.power3Out,
      scrollTrigger: {
        trigger: options.trigger ?? target,
        start: options.start ?? 'top 85%',
        once: true,
      },
    },
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/**
 * Creates a parallax effect on an element tied to scroll
 */
export function createParallax(
  target: HTMLElement | null,
  options: {
    trigger?: HTMLElement;
    speed?: number; // negative for reverse
    start?: string;
    end?: string;
  } = {},
): () => void {
  if (!target || prefersReducedMotion()) return () => {};

  const speed = options.speed ?? 0.2;
  const yDistance = speed * 120;

  const tween = gsap.fromTo(
    target,
    { y: -yDistance },
    {
      y: yDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger ?? target,
        start: options.start ?? 'top bottom',
        end: options.end ?? 'bottom top',
        scrub: true,
      },
    },
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/**
 * Animate a progressive SVG path or progress line during scroll
 */
export function animateProgressLine(
  lineElement: HTMLElement | SVGPathElement | null,
  options: {
    trigger: HTMLElement;
    start?: string;
    end?: string;
  },
): () => void {
  if (!lineElement || prefersReducedMotion()) return () => {};

  const isSvg = lineElement instanceof SVGPathElement;
  let tween: gsap.core.Tween;

  if (isSvg) {
    const length = lineElement.getTotalLength();
    gsap.set(lineElement, { strokeDasharray: length, strokeDashoffset: length });
    tween = gsap.to(lineElement, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger,
        start: options.start ?? 'top 70%',
        end: options.end ?? 'bottom 70%',
        scrub: 0.8,
      },
    });
  } else {
    tween = gsap.fromTo(
      lineElement,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: options.trigger,
          start: options.start ?? 'top 70%',
          end: options.end ?? 'bottom 70%',
          scrub: 0.8,
        },
      },
    );
  }

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
