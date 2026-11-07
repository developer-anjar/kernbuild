import SplitType from 'split-type';
import { gsap, EASINGS } from './gsapConfig';
import { prefersReducedMotion } from './animationUtils';

export interface SplitTextOptions {
  types?: 'lines' | 'words' | 'chars' | 'lines,words' | 'words,chars' | 'lines,words,chars';
  stagger?: number;
  duration?: number;
  delay?: number;
  yOffset?: number;
  ease?: string;
  scrollTrigger?: gsap.DOMTarget | ScrollTrigger.Vars;
  onComplete?: () => void;
}

/**
 * Animate text with SplitType (characters, words, or lines)
 * Returns a cleanup function that kills the tween and reverts the split text cleanly.
 */
export function animateSplitText(
  element: HTMLElement | null,
  options: SplitTextOptions = {},
): () => void {
  if (!element || prefersReducedMotion()) return () => {};

  const types = options.types ?? 'words,chars';
  let split: SplitType | null = null;
  let tween: gsap.core.Tween | null = null;

  try {
    split = new SplitType(element, {
      types,
      tagName: 'span',
    });

    const targets =
      types.includes('chars') && split.chars && split.chars.length > 0
        ? split.chars
        : types.includes('words') && split.words && split.words.length > 0
        ? split.words
        : split.lines;

    if (!targets || targets.length === 0) return () => {};

    // Wrap in overflow-hidden spans if animating lines/words
    targets.forEach((target) => {
      (target as HTMLElement).style.display = 'inline-block';
      (target as HTMLElement).style.willChange = 'transform, opacity';
    });

    tween = gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: options.yOffset ?? 24,
        rotateX: types.includes('chars') ? -15 : 0,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: options.duration ?? 0.8,
        stagger: options.stagger ?? (types.includes('chars') ? 0.025 : 0.08),
        delay: options.delay ?? 0,
        ease: options.ease ?? EASINGS.power4Out,
        scrollTrigger: options.scrollTrigger,
        onComplete: options.onComplete,
      },
    );
  } catch (err) {
    console.warn('SplitType animation error:', err);
  }

  return () => {
    if (tween) tween.kill();
    if (split) split.revert();
  };
}

/**
 * Text scramble effect for high-tech digital agency feel
 */
export function scrambleText(
  element: HTMLElement | null,
  finalText: string,
  duration = 1000,
): () => void {
  if (!element || prefersReducedMotion()) {
    if (element) element.textContent = finalText;
    return () => {};
  }

  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let frame = 0;
  let startTime = performance.now();
  let cancelled = false;

  const update = (now: number) => {
    if (cancelled) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const length = finalText.length;
    let output = '';

    for (let i = 0; i < length; i++) {
      if (progress >= (i + 1) / length) {
        output += finalText[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = output;

    if (progress < 1) {
      frame = requestAnimationFrame(update);
    } else {
      element.textContent = finalText;
    }
  };

  frame = requestAnimationFrame(update);

  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    element.textContent = finalText;
  };
}

