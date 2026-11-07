import type Lenis from 'lenis';

let activeLenis: Lenis | null = null;

export function setActiveLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (activeLenis) activeLenis.scrollTo(target, { offset: -96 });
  else {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }
}

export function scrollToTop(immediate = false) {
  if (activeLenis) activeLenis.scrollTo(0, { immediate });
  else {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: immediate || reducedMotion ? 'auto' : 'smooth' });
  }
}

export function scrollToPosition(position: number) {
  if (activeLenis) activeLenis.scrollTo(position, { immediate: true });
  else window.scrollTo({ top: position, behavior: 'auto' });
}
