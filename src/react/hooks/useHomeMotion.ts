import { useEffect } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, EASINGS } from '../animations/gsapConfig';
import { prefersReducedMotion } from '../animations/animationUtils';

export function useHomeMotion(root: HTMLElement | null) {
  useEffect(() => {
    if (!root || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia(root);
    const splits: SplitType[] = [];

    motion.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 768px)',
      },
      ({ conditions }) => {
        if (conditions?.reduce) return;
        const mobile = Boolean(conditions?.mobile);

        // ====================================================================
        // HERO SECTION ANIMATION
        // ====================================================================
        const hero = root.querySelector('.hero');
        const heroHeading = root.querySelector('.hero-copy h1') as HTMLElement | null;
        const heroEyebrow = root.querySelector('.hero-copy .eyebrow');
        const heroDesc = root.querySelector('.hero-description');
        const heroActions = root.querySelector('.hero-actions');
        const heroPoints = root.querySelectorAll('.hero-points span');
        const badges = root.querySelectorAll('.hero-art__badge');
        const scrollIndicator = root.querySelector('.hero-scroll-indicator');

        const playHeroAnimation = () => {
          if (!hero) return;

          const heroTl = gsap.timeline({
            defaults: { ease: EASINGS.power4Out },
          });

          // 1. Eyebrow
          if (heroEyebrow) {
            heroTl.fromTo(
              heroEyebrow,
              { y: -16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: EASINGS.power3Out },
              0.1,
            );
          }

          // 2. Heading with SplitType
          if (heroHeading) {
            try {
              const split = new SplitType(heroHeading, { types: 'words,chars' });
              splits.push(split);
              if (split.chars && split.chars.length) {
                gsap.set(split.chars, { display: 'inline-block', willChange: 'transform, opacity' });
                heroTl.fromTo(
                  split.chars,
                  {
                    opacity: 0,
                    y: mobile ? 22 : 36,
                    rotateX: -20,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.024,
                    duration: 0.9,
                    ease: EASINGS.power4Out,
                  },
                  0.2,
                );
              }
            } catch (err) {
              heroTl.fromTo(
                heroHeading,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.8 },
                0.2,
              );
            }
          }

          // 3. Description fade-up with blur-to-focus
          if (heroDesc) {
            heroTl.fromTo(
              heroDesc,
              { y: 20, opacity: 0, filter: 'blur(4px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.85,
                ease: EASINGS.power3Out,
              },
              0.45,
            );
          }

          // 4. CTA Actions
          if (heroActions) {
            heroTl.fromTo(
              heroActions,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.75, ease: EASINGS.backOut },
              0.6,
            );
          }

          // 5. Points
          if (heroPoints.length) {
            heroTl.fromTo(
              heroPoints,
              { y: 15, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: EASINGS.power2Out,
              },
              0.7,
            );
          }

          // 6. Badges entrance
          if (badges.length) {
            heroTl.fromTo(
              badges,
              { scale: 0.85, opacity: 0, y: 20 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.9,
                ease: EASINGS.backOut,
              },
              0.65,
            );
          }

          // 7. Scroll indicator
          if (scrollIndicator) {
            heroTl.fromTo(
              scrollIndicator,
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, duration: 0.7, ease: EASINGS.power2Out },
              0.9,
            );
          }
        };

        // Trigger on custom event from preloader or immediately if already visited
        const isVisited = sessionStorage.getItem('kernbuild_visited');
        if (isVisited) {
          playHeroAnimation();
        } else {
          window.addEventListener('kernbuild:hero-enter', playHeroAnimation, { once: true });
        }

        // Floating badge subtle idle hovering animation
        if (badges.length) {
          gsap.to(badges, {
            y: 8,
            duration: 2.8,
            ease: EASINGS.sineInOut,
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              toggleActions: 'play pause resume pause',
            },
          });
        }

        // ====================================================================
        // HELPER FOR SECTION REVEALS
        // ====================================================================
        const revealGroup = (
          triggerSelector: string,
          targetSelector: string,
          options: {
            y?: number;
            scale?: number;
            duration?: number;
            stagger?: number;
            start?: string;
          } = {},
        ) => {
          const trigger = root.querySelector(triggerSelector);
          const targets = root.querySelectorAll(targetSelector);
          if (!trigger || !targets.length) return;

          targets.forEach((target, index) => {
            gsap.fromTo(
              target,
              {
                y: options.y ?? 30,
                scale: options.scale ?? 1,
                autoAlpha: 0,
              },
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: options.duration ?? 0.85,
                delay: Math.min(index, 6) * (options.stagger ?? (mobile ? 0.08 : 0.12)),
                ease: EASINGS.power3Out,
                scrollTrigger: {
                  trigger: target,
                  start: options.start ?? 'top 86%',
                  once: true,
                },
              },
            );
          });
        };

        // ====================================================================
        // ABOUT SECTION: Clip-path image reveal
        // ====================================================================
        const aboutArt = root.querySelector('.about-art') as HTMLElement | null;
        if (aboutArt) {
          gsap.fromTo(
            aboutArt,
            { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0, scale: 0.95 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              scale: 1,
              duration: 1.1,
              ease: EASINGS.power3Out,
              scrollTrigger: {
                trigger: aboutArt,
                start: 'top 85%',
                once: true,
              },
            },
          );
        }
        revealGroup('.about-section', '.about-copy .eyebrow, .about-copy h2, .about-copy > p, .about-copy .text-link', {
          y: 24,
          stagger: 0.09,
        });

        // ====================================================================
        // SERVICES SECTION
        // ====================================================================
        revealGroup('.section#services', '.section-heading');
        revealGroup('.section#services', '.carousel__slide', {
          y: 32,
          scale: 0.97,
          stagger: 0.1,
        });

        // ====================================================================
        // PROJECTS SECTION: Image mask reveal & cards
        // ====================================================================
        revealGroup('.section#projects', '.section-heading');
        const projectCards = root.querySelectorAll('.projects-grid .project-card');
        if (projectCards.length) {
          projectCards.forEach((card, index) => {
            gsap.fromTo(
              card,
              { y: 35, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                delay: index * 0.12,
                ease: EASINGS.power3Out,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  once: true,
                },
              },
            );

            const img = card.querySelector('.project-card__image-file');
            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.15 },
                {
                  scale: 1,
                  duration: 1.2,
                  ease: EASINGS.power2Out,
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    once: true,
                  },
                },
              );
            }
          });
        }

        // ====================================================================
        // PROCESS SECTION: Timeline Progress Line
        // ====================================================================
        revealGroup('.section#process', '.section-heading');
        const processLine = root.querySelector('.process-line-progress');
        const processSection = root.querySelector('.section#process');
        if (processLine && processSection) {
          gsap.fromTo(
            processLine,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: processSection,
                start: 'top 70%',
                end: 'bottom 75%',
                scrub: 0.6,
              },
            },
          );
        }
        revealGroup('.section#process', '.process-card', {
          y: 28,
          stagger: 0.12,
        });

        // ====================================================================
        // WHY CHOOSE & TESTIMONIALS
        // ====================================================================
        revealGroup('.section.section--lavender', '.section-heading, .reason-card', {
          y: 20,
          duration: 0.7,
          stagger: 0.08,
        });
        revealGroup('.testimonials-section', '.section-heading, .testimonial-card, .testimonial-placeholder', {
          y: 24,
          duration: 0.8,
        });

        // ====================================================================
        // CONTACT & FEEDBACK FORMS
        // ====================================================================
        revealGroup('.section#contact', '.section-heading, .contact-copy > *, .form-card', {
          y: 26,
          stagger: 0.08,
        });
        revealGroup('.feedback-section', '.section-heading, .form-card', {
          y: 26,
        });

        // ====================================================================
        // STATISTICS SECTION
        // ====================================================================
        revealGroup('.statistics-section', '.section-heading, .statistic-card', {
          y: 22,
          duration: 0.75,
          stagger: 0.09,
        });

        // ====================================================================
        // FINAL CTA SECTION
        // ====================================================================
        revealGroup('.final-cta', '.final-cta__inner', {
          y: 35,
          duration: 0.9,
          stagger: 0,
        });
      },
    );

    return () => {
      splits.forEach(s => s.revert());
      motion.revert();
    };
  }, [root]);
}
