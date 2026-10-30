import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useHomeMotion(root: HTMLElement | null) {
  useEffect(() => {
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const context = gsap.context(() => {
      const heroElements = root.querySelectorAll(
        '.hero-copy .eyebrow, .hero-copy h1, .hero-description, .hero-actions, .hero-points, .hero-art__badge',
      );
      if (heroElements.length) {
        gsap.fromTo(heroElements, { y: mobile ? 22 : 36, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: mobile ? 0.9 : 1.1,
          stagger: mobile ? 0.1 : 0.14,
          ease: 'power3.out',
          delay: 0.1,
        });
      }

      root.querySelectorAll<HTMLElement>('.hero-art__badge').forEach((badge, index) => {
        gsap.to(badge, {
          y: index % 2 === 0 ? 8 : -8,
          duration: index % 2 === 0 ? 2.1 : 2.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.to('.hero-copy', {
        y: -24,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-visual', {
        scale: 0.96,
        y: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      const reveal = (
        triggerSelector: string,
        targetSelector: string,
        options: { y?: number; duration?: number; stagger?: number; scale?: number } = {},
      ) => {
        const trigger = root.querySelector(triggerSelector);
        const targets = root.querySelectorAll(targetSelector);
        if (!trigger || !targets.length) return;

        gsap.fromTo(targets, {
          y: options.y ?? 28,
          scale: options.scale ?? 1,
          autoAlpha: 0,
        }, {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: options.duration ?? 0.8,
          stagger: options.stagger ?? (mobile ? 0.08 : 0.12),
          ease: 'power3.out',
          scrollTrigger: { trigger, start: 'top 82%', once: true },
        });
      };

      reveal('.about-section', '.about-art', { y: 0, scale: 0.96, duration: 1 });
      reveal('.about-section', '.about-copy .eyebrow, .about-copy h2, .about-copy > p, .about-copy .text-link');
      reveal('.technology-strip', '.technology-list span', { y: 14, duration: 0.6, stagger: mobile ? 0.04 : 0.055 });
      reveal('.section#services', '.section-heading, .carousel__slide');
      reveal('.section#projects', '.section-heading, .project-card');
      reveal('.section#process', '.section-heading, .process-card');
      reveal('.section.section--lavender', '.section-heading, .reason-card', { y: 18, duration: 0.65 });
      reveal('.testimonials-section', '.section-heading, .testimonial-placeholder');
      reveal('.section#contact', '.section-heading, .contact-copy > *, .form-card', { y: 24 });
      reveal('.feedback-section', '.section-heading, .form-card', { y: 24 });
      reveal('.statistics-section', '.section-heading, .statistic-card', { y: 18, duration: 0.65 });
      reveal('.final-cta', '.final-cta__inner', { y: 30, duration: 0.85, stagger: 0 });
    }, root);

    return () => context.revert();
  }, [root]);
}
