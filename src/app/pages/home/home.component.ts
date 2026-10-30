import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { FeedbackComponent } from '../../sections/feedback/feedback.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { ProcessComponent } from '../../sections/process/process.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { StatisticsComponent } from '../../sections/statistics/statistics.component';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials.component';
import { TechnologyStripComponent } from '../../sections/technology-strip/technology-strip.component';
import { WhyChooseComponent } from '../../sections/why-choose/why-choose.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    TechnologyStripComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    ProcessComponent,
    WhyChooseComponent,
    TestimonialsComponent,
    ContactComponent,
    FeedbackComponent,
    StatisticsComponent,
    FinalCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('animationRoot') private animationRoot?: ElementRef<HTMLElement>;
  private ctx?: { add: (conditions: string, func: () => void) => void; revert: () => void };
  private destroyed = false;

  async ngAfterViewInit(): Promise<void> {
    const root = this.animationRoot?.nativeElement;
    if (!root || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    try {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (this.destroyed || !root.isConnected) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.config({ nullTargetWarn: false });

      this.ctx = gsap.matchMedia(root);
      this.ctx.add('(prefers-reduced-motion: no-preference)', () => {
        if (this.destroyed || !root.isConnected) return;

        const ease = 'power2.out';
        const premium = 'cubic-bezier(0.2, 0.75, 0.25, 1)';

        // 1. Load entrance — hero section
        const intro = gsap.timeline({ defaults: { ease } });
        intro
          .from('.hero-copy .eyebrow', { y: 22, autoAlpha: 0, duration: 0.5 })
          .from('.hero-copy h1', { y: 28, autoAlpha: 0, duration: 0.7 }, '-=0.25')
          .from('.hero-description', { y: 18, autoAlpha: 0, duration: 0.5 }, '-=0.25')
          .from('.hero-actions', { y: 16, autoAlpha: 0, duration: 0.5 }, '-=0.2')
          .from('.hero-points', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.25')
          .from('app-hero-scene', { y: 22, autoAlpha: 0, scale: 0.97, duration: 0.8 }, '-=0.55')
          .from('.hero-art__badge', { y: 14, autoAlpha: 0, duration: 0.4, stagger: 0.15 }, '-=0.4');

        gsap.to('.hero-art__badge--one', {
          y: -6,
          duration: 3.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        gsap.to('.hero-art__badge--two', {
          y: 6,
          duration: 3.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // 2. Hero -> About cinematic exit (scroll-linked scrub)
        gsap.timeline({
          scrollTrigger: { trigger: '.hero', start: 'top bottom', end: 'bottom center', scrub: 0.5 },
        })
          .to(
            '.hero-copy .eyebrow, .hero-copy h1, .hero-description, .hero-actions, .hero-points',
            { y: -34, autoAlpha: 0, duration: 1, stagger: 0.07, ease: 'power2.inOut' },
            0
          )
          .to('app-hero-scene', { scale: 0.8, y: 34, duration: 1 }, 0)
          .to('.hero-visual', { scale: 0.96, y: 12, duration: 1 }, 0);

        // 3. About entrance — coordinated panel mask + copy sequence
        gsap.timeline({
          scrollTrigger: { trigger: '.about-section', start: 'top 90%', end: 'top 60%', once: true },
        })
          .from('.about-art', { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', duration: 0.95, ease: premium }, 0)
          .from('.about-copy .eyebrow', { y: 22, autoAlpha: 0, duration: 0.7 }, 0.05)
          .from('.about-copy h2', { y: 28, autoAlpha: 0, duration: 0.75 }, '-=0.45')
          .from('.about-copy > p', { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.12 }, '-=0.35')
          .from('.about-copy .text-link', { y: 16, autoAlpha: 0, duration: 0.55 }, '-=0.25')
          .from('.about-art__orbit--one', { rotate: -10, autoAlpha: 0, duration: 0.8 }, '-=0.6')
          .from('.about-art__orbit--two', { rotate: 10, autoAlpha: 0, scale: 0.9, duration: 0.8 }, '-=0.55');

        gsap.to('.about-art__orbit--one', {
          rotate: 6,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to('.about-art__orbit--two', {
          rotate: -6,
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.7,
        });

        // reusable section heading reveal
        const revealHeading = (scope: string, start = 'top 92%'): void => {
          gsap.from(`${scope} .section-heading`, {
            y: 24,
            autoAlpha: 0,
            duration: 0.7,
            ease,
            immediateRender: false,
            scrollTrigger: { trigger: `${scope} .section-heading`, start, once: true },
          });
        };

        revealHeading('.technology-strip');
        revealHeading('.section#services');
        revealHeading('.section#projects');
        revealHeading('.section#process');
        revealHeading('.section#contact');
        revealHeading('.final-cta');

        // 4. Technology list stagger
        gsap.from('.technology-list span', {
          y: 14,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.03,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.technology-strip', start: 'top 92%', once: true },
        });

        // 5. Services cards stagger
        gsap.from('.carousel__slide', {
          y: 24,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.09,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.section#services', start: 'top 90%', once: true },
        });

        // 6. Projects cards + image mask reveal
        gsap.from('.project-card', {
          y: 26,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: premium,
          immediateRender: false,
          scrollTrigger: { trigger: '.section#projects', start: 'top 90%', once: true },
        });
        gsap.from('.project-card__image-file', {
          scale: 1.06,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: premium,
          immediateRender: false,
          scrollTrigger: { trigger: '.section#projects', start: 'top 90%', once: true },
        });

        // 7. Process steps
        gsap.from('.process-card', {
          y: 22,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.12,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.section#process', start: 'top 90%', once: true },
        });
        gsap.from('.process-card .process-number', {
          y: 12,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.section#process', start: 'top 90%', once: true },
        });

        // 8. Why choose / statistics / testimonials
        gsap.from('.reason-card', {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.08,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.section.section--lavender', start: 'top 92%', once: true },
        });
        gsap.from('.statistic-card', {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.08,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.statistics-section', start: 'top 92%', once: true },
        });
        gsap.from('.testimonial-placeholder', {
          y: 18,
          autoAlpha: 0,
          duration: 0.6,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.testimonials-section', start: 'top 94%', once: true },
        });

        // 9. Contact section reveal
        const contactTl = gsap.timeline({
          defaults: { ease, immediateRender: false },
          scrollTrigger: { trigger: '.section#contact', start: 'top 92%', once: true },
        });
        contactTl
          .from('.contact-copy .eyebrow', { y: 20, autoAlpha: 0, duration: 0.6 }, 0)
          .from('.contact-copy h2', { y: 26, autoAlpha: 0, duration: 0.7 }, '-=0.35')
          .from('.contact-copy > p:not(.eyebrow)', { y: 18, autoAlpha: 0, duration: 0.6 }, '-=0.25')
          .from('.contact-copy .contact-note', { y: 14, autoAlpha: 0, duration: 0.55 }, '-=0.15')
          .from('.form-card', { y: 18, autoAlpha: 0, duration: 0.65 }, '-=0.1');

        // 10. Final CTA
        gsap.from('.final-cta__inner', {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          ease,
          immediateRender: false,
          scrollTrigger: { trigger: '.final-cta', start: 'top 92%', once: true },
        });
      });
    } catch (error) {
      console.warn('Scroll animations could not be initialized. Page content remains available.', error);
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.ctx?.revert();
  }
}
