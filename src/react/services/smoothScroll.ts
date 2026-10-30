import type Lenis from 'lenis';

let activeLenis: Lenis | null = null;

export function setActiveLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (activeLenis) activeLenis.scrollTo(target, { offset: -96 });
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToTop(immediate = false) {
  if (activeLenis) activeLenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
