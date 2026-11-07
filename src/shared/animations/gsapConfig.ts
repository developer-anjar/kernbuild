import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register core plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const EASINGS = {
  power2Out: 'power2.out',
  power3Out: 'power3.out',
  power4Out: 'power4.out',
  expoOut: 'expo.out',
  backOut: 'back.out(1.7)',
  circOut: 'circ.out',
  sineInOut: 'sine.inOut',
  smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
  energetic: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  medium: 0.85,
  slow: 1.2,
  epic: 1.8,
} as const;

export const BREAKPOINTS = {
  mobile: '(max-width: 640px)',
  tablet: '(min-width: 641px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;

export { gsap, ScrollTrigger };
