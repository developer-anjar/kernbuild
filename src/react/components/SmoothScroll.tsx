import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setActiveLenis } from '../services/smoothScroll';

/** One Lenis loop synchronized with ScrollTrigger for the lifetime of the app. */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ autoRaf: false, anchors: true, smoothWheel: true, syncTouch: false, lerp: 0.1 });
    const updateScroll = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);
    setActiveLenis(lenis);
    ScrollTrigger.refresh();

    return () => {
      setActiveLenis(null);
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateScroll);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
