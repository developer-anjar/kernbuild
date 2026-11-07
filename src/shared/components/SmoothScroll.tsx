import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setActiveLenis } from '../services/smoothScroll';

/** One Lenis loop synchronized with ScrollTrigger for the lifetime of the app. */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let updateScroll: ((time: number) => void) | null = null;

    const stopLenis = () => {
      if (!lenis || !updateScroll) return;
      setActiveLenis(null);
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
      lenis = null;
      updateScroll = null;
    };

    const startLenis = () => {
      if (lenis || motionPreference.matches) return;
      lenis = new Lenis({
        autoRaf: false,
        anchors: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.18,
      });
      updateScroll = (time: number) => lenis?.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(updateScroll);
      setActiveLenis(lenis);
      ScrollTrigger.refresh();
    };

    const onMotionPreferenceChange = () => {
      if (motionPreference.matches) stopLenis();
      else startLenis();
    };

    startLenis();
    motionPreference.addEventListener('change', onMotionPreferenceChange);

    return () => {
      motionPreference.removeEventListener('change', onMotionPreferenceChange);
      stopLenis();
    };
  }, []);

  return null;
}
