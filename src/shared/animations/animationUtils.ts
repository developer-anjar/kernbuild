/** Checks if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Check if the device is touch-based */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/** Safe RAF wrapper */
export function safeRAF(callback: () => void): number {
  if (typeof window === 'undefined') return 0;
  return window.requestAnimationFrame(callback);
}

/** Helper to generate unique IDs for scroll triggers */
let triggerCounter = 0;
export function generateTriggerId(prefix = 'st'): string {
  triggerCounter += 1;
  return `${prefix}-${triggerCounter}-${Date.now().toString(36)}`;
}

