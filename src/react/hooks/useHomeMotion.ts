import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimeMotion } from './useAnimeMotion';

/**
 * Home page motion coordinator.
 *
 * Delegates all cinematic section animations to useAnimeMotion (animejs),
 * while keeping GSAP registered for any legacy ScrollTrigger needs and
 * ensuring prefers-reduced-motion is honoured across both systems.
 */
export function useHomeMotion(root: HTMLElement | null) {
  useAnimeMotion(root);

  useEffect(() => {
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });

    // Honour reduced motion across GSAP-controlled scroll triggers.
    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: reduce)', () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });

    return () => {
      media.revert();
    };
  }, [root]);
}
