import { useEffect, useRef } from 'react';
import { animate, stagger, type JSAnimation } from 'animejs';
import { Timeline } from 'animejs';

/**
 * Anime.js cinematic motion hook for the KernBuild homepage.
 *
 * Coordinates scroll-driven and entrance animations across sections using
 * animejs (installed as a dependency and loaded via CDN in index.html).
 *
 * All animations are mobile-responsive and respect prefers-reduced-motion.
 * Instances are cleaned up on unmount to prevent memory leaks.
 */
export function useAnimeMotion(root: HTMLElement | null) {
  const instances = useRef<Array<{ pause: () => void }>>([]);
  const rafs = useRef<Array<number>>([]);
  const observers = useRef<Array<IntersectionObserver>>([]);

  useEffect(() => {
    if (!root) return;

    const isMobile = window.innerWidth <= 700;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const easeOut = 'easeOutCubic';
    const easePremium = 'cubicBezier(0.2, 0.75, 0.25, 1)';

    // Track an anime instance for cleanup.
    const track = (instance: JSAnimation | Timeline) => {
      instances.current.push(instance as unknown as { pause: () => void });
      return instance;
    };

    const trackRaf = (id: number) => {
      rafs.current.push(id);
      return id;
    };

    const trackObserver = (obs: IntersectionObserver) => {
      observers.current.push(obs);
      return obs;
    };

    // ------------------------------------------------------------
    // 1. Hero load entrance (staggered, coordinated)
    // ------------------------------------------------------------
    const heroElements = root.querySelectorAll(
      '.hero-copy .eyebrow, .hero-copy h1, .hero-description, .hero-actions, .hero-points, .hero-art__badge'
    );
    if (heroElements.length) {
      track(
        animate(heroElements, {
          translateY: [isMobile ? 22 : 36, 0],
          opacity: [0, 1],
          delay: stagger(isMobile ? 100 : 140),
          duration: isMobile ? 1100 : 1400,
          easing: easeOut,
        })
      );
    }

    // Floating hero badges (subtle on mobile)
    const firstBadge = root.querySelector('.hero-art__badge--one');
    const secondBadge = root.querySelector('.hero-art__badge--two');
    if (firstBadge) {
      track(
        animate(firstBadge, {
          translateY: [-8, 8, -8],
          duration: isMobile ? 3400 : 4200,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        })
      );
    }
    if (secondBadge) {
      track(
        animate(secondBadge, {
          translateY: [8, -8, 8],
          duration: isMobile ? 4000 : 4800,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        })
      );
    }

    // ------------------------------------------------------------
    // 2. Hero -> About scroll-linked scrub (anime.js keyframes)
    // ------------------------------------------------------------
    const heroScrollInstance = animate(
      '.hero-copy .eyebrow, .hero-copy h1, .hero-description, .hero-actions, .hero-points',
      {
        keyframes: [
          { translateY: 0, opacity: 1, offset: 0 },
          { translateY: -30, opacity: 0, offset: 1 },
        ],
        duration: 1,
        easing: 'linear',
        autoplay: false,
      }
    );
    track(heroScrollInstance);

    const heroVisualScroll = animate('.hero-visual', {
      keyframes: [
        { scale: 1, translateY: 0, offset: 0 },
        { scale: 0.96, translateY: 10, offset: 1 },
      ],
      duration: 1,
      easing: 'linear',
      autoplay: false,
    });
    track(heroVisualScroll);

    const heroScrollUpdate = () => {
      const hero = root.querySelector('.hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Wider scroll window: starts when hero is still below the fold and
      // finishes only after it has travelled well past the top, so the
      // hero->about transition feels slow and deliberate.
      const startTop = windowHeight + 180;
      const endTop = -rect.height - 180;
      const progress = Math.max(0, Math.min(1, (startTop - rect.top) / (startTop - endTop)));
      heroScrollInstance.progress = progress * 100;
      heroVisualScroll.progress = progress * 100;
    };
    heroScrollUpdate();
    window.addEventListener('scroll', heroScrollUpdate);
    trackRaf(requestAnimationFrame(heroScrollUpdate));

    // ------------------------------------------------------------
    // 3. About section entrance (clip-path mask + staggered copy)
    // ------------------------------------------------------------
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          aboutObserver.unobserve(entry.target);

          const aboutArt = root.querySelector('.about-art');
          if (aboutArt) {
            track(
              animate(aboutArt, {
                clipPath: [
                  'polygon(0 0, 100% 0, 100% 0, 0 0)',
                  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                ],
                duration: 1400,
                easing: easePremium,
              })
            );
          }

          const aboutCopyChildren = root.querySelectorAll(
            '.about-copy .eyebrow, .about-copy h2, .about-copy > p, .about-copy .text-link'
          );
          if (aboutCopyChildren.length) {
            track(
              animate(aboutCopyChildren, {
                translateY: [isMobile ? 26 : 34, 0],
                opacity: [0, 1],
                delay: stagger(isMobile ? 130 : 180),
                duration: 1100,
                easing: easeOut,
              })
            );
          }

          const orbitOne = root.querySelector('.about-art__orbit--one');
          const orbitTwo = root.querySelector('.about-art__orbit--two');
          if (orbitOne) {
            track(
              animate(orbitOne, {
                rotate: [-10, 6, -10],
                duration: 5000,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
              })
            );
          }
          if (orbitTwo) {
            track(
              animate(orbitTwo, {
                rotate: [10, -6, 10],
                duration: 5600,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: 700,
              })
            );
          }
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const aboutSection = root.querySelector('.about-section');
    if (aboutSection) trackObserver(aboutObserver).observe(aboutSection);

    // ------------------------------------------------------------
    // Reusable scroll-once reveal helper
    // ------------------------------------------------------------
    const revealOnce = (
      selector: string,
      options: Record<string, unknown> = {}
    ): IntersectionObserver => {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            obs.unobserve(entry.target);
            const targets = root.querySelectorAll(selector);
            if (!targets.length) continue;
            track(
              animate(targets, {
                translateY: [isMobile ? 26 : 34, 0],
                opacity: [0, 1],
                duration: 1100,
                easing: easeOut,
                delay: stagger(isMobile ? 100 : 130),
                ...options,
              })
            );
          }
        },
      { threshold: 0.25, rootMargin: '-150px' }
    );
      const scope = root.querySelector(selector);
      if (scope) obs.observe(scope);
      else {
        root.querySelectorAll('section').forEach((section) => {
          if (section.querySelector(selector)) obs.observe(section);
        });
      }
      return trackObserver(obs);
    };

    revealOnce('.technology-strip .section-heading');
    revealOnce('.section#services .section-heading');
    revealOnce('.section#projects .section-heading');
    revealOnce('.section#process .section-heading');
    revealOnce('.section#contact .section-heading');
    revealOnce('.final-cta');

    // Technology strip items
    const techObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          techObs.unobserve(entry.target);
          const items = root.querySelectorAll('.technology-list span');
          if (!items.length) continue;
            track(
              animate(items, {
                translateY: [14, 0],
                opacity: [0, 1],
                duration: 900,
                easing: easeOut,
                delay: stagger(isMobile ? 40 : 55),
              })
            );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const techStrip = root.querySelector('.technology-strip');
    if (techStrip) trackObserver(techObs).observe(techStrip);

    // Services cards
    const servicesObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          servicesObs.unobserve(entry.target);
          const slides = root.querySelectorAll('.carousel__slide');
          if (!slides.length) continue;
          track(
            animate(slides, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: isMobile ? 900 : 1100,
              easing: easeOut,
              delay: stagger(isMobile ? 110 : 140),
            })
          );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const servicesSection = root.querySelector('.section#services');
    if (servicesSection) trackObserver(servicesObs).observe(servicesSection);

    // Project cards + image reveals
    const projectsObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          projectsObs.unobserve(entry.target);
          const cards = root.querySelectorAll('.project-card');
          if (!cards.length) continue;
          track(
            animate(cards, {
              translateY: [34, 0],
              opacity: [0, 1],
              duration: 1100,
              easing: easePremium,
              delay: stagger(isMobile ? 130 : 160),
            })
          );
          const images = root.querySelectorAll('.project-card__image-file');
          if (images.length) {
            track(
              animate(images, {
                scale: [1.08, 1],
                opacity: [0, 1],
                duration: 1100,
                easing: easePremium,
                delay: stagger(isMobile ? 80 : 110),
              })
            );
          }
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const projectsSection = root.querySelector('.section#projects');
    if (projectsSection) trackObserver(projectsObs).observe(projectsSection);

    // Process steps
    const processObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          processObs.unobserve(entry.target);
          const cards = root.querySelectorAll('.process-card');
          if (!cards.length) continue;
          track(
            animate(cards, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: easeOut,
              delay: stagger(isMobile ? 100 : 130),
            })
          );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const processSection = root.querySelector('.section#process');
    if (processSection) trackObserver(processObs).observe(processSection);

    // Why choose / reasons
    const whyObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          whyObs.unobserve(entry.target);
          const cards = root.querySelectorAll('.reason-card');
          if (!cards.length) continue;
          track(
            animate(cards, {
              translateY: [18, 0],
              opacity: [0, 1],
              duration: 580,
              easing: easeOut,
              delay: stagger(isMobile ? 60 : 80),
            })
          );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const whySection = root.querySelector('.section.section--lavender');
    if (whySection) trackObserver(whyObs).observe(whySection);

    // Statistics cards
    const statsObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          statsObs.unobserve(entry.target);
          const cards = root.querySelectorAll('.statistic-card');
          if (!cards.length) continue;
          track(
            animate(cards, {
              translateY: [18, 0],
              opacity: [0, 1],
              duration: 580,
              easing: easeOut,
              delay: stagger(isMobile ? 60 : 80),
            })
          );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const statsSection = root.querySelector('.statistics-section');
    if (statsSection) trackObserver(statsObs).observe(statsSection);

    // Testimonials
    const testimonialsObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          testimonialsObs.unobserve(entry.target);
          const el = root.querySelector('.testimonial-placeholder');
          if (!el) continue;
          track(
            animate(el, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: easeOut,
            })
          );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const testimonialsSection = root.querySelector('.testimonials-section');
    if (testimonialsSection) trackObserver(testimonialsObs).observe(testimonialsSection);

    // Contact section (timeline)
    const contactObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          contactObs.unobserve(entry.target);
          const contactTl = new Timeline({
            defaults: { ease: easeOut, duration: 900 },
          });
          contactTl
            .add('.contact-copy .eyebrow', { translateY: [30, 0], opacity: [0, 1] })
            .add(
              '.contact-copy h2',
              { translateY: [36, 0], opacity: [0, 1] },
              '-=0.45'
            )
            .add(
              '.contact-copy > p:not(.eyebrow)',
              { translateY: [26, 0], opacity: [0, 1] },
              '-=0.35'
            )
            .add(
              '.contact-copy .contact-note',
              { translateY: [22, 0], opacity: [0, 1] },
              '-=0.25'
            )
            .add('.form-card', { translateY: [28, 0], opacity: [0, 1] }, '-=0.15');
          track(contactTl);
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const contactSection = root.querySelector('.section#contact');
    if (contactSection) trackObserver(contactObs).observe(contactSection);

    // Final CTA
    const finalCtaObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          finalCtaObs.unobserve(entry.target);
          const el = root.querySelector('.final-cta__inner');
          if (!el) continue;
          track(
            animate(el, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: easeOut,
            })
          );
        }
      },
      { threshold: 0.25, rootMargin: '-150px' }
    );
    const finalCta = root.querySelector('.final-cta');
    if (finalCta) trackObserver(finalCtaObs).observe(finalCta);

    // ------------------------------------------------------------
    // Cleanup
    // ------------------------------------------------------------
    return () => {
      window.removeEventListener('scroll', heroScrollUpdate);
      rafs.current.forEach((id) => cancelAnimationFrame(id));
      rafs.current = [];
      instances.current.forEach((inst) => inst.pause());
      instances.current = [];
      observers.current.forEach((obs) => obs.disconnect());
      observers.current = [];
      aboutObserver.disconnect();
    };
  }, [root]);
}
