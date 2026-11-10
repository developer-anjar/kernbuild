# KernBuild Master Design System

**Status:** Approved design direction — implemented, with remaining QA noted below.  
**Scope:** Visual and interaction guidance for the existing KernBuild React website.  
**Brand:** KernBuild  
**Motto:** Build Ideas. Create Impact.  
**Existing positioning line to retain:** Build from the Core.

> The UI UX Pro Max skill is not installed in this workspace (only `kilo-config` is available via the skill loader). This design system is therefore grounded in the audited repository, established accessibility practices, and premium creative-agency design conventions. It is not represented as output from the UI UX Pro Max skill.

---

## 1. Phase 1 — Project Analysis (Audited Baseline)

### 1.1 Project structure and folder organization

The repository is a **Vite 7, React 19, TypeScript 5.8** application with Sass. The app is organized by feature:

| Directory | Purpose |
|---|---|
| `src/app/` | App shell, route setup, root layout |
| `src/features/contact/` | Contact and feedback forms, EmailJS integration |
| `src/features/feedback/` | Feedback page |
| `src/features/home/` | Homepage sections, hooks, components, data |
| `src/features/home/sections/` | Individual homepage sections (Hero, About, Services, Projects, Process, Team, WhyChoose, Testimonials, Contact, Feedback, Statistics, FinalCta) |
| `src/features/legal/` | Privacy and Terms pages |
| `src/features/projects/` | Projects listing, detail, context, data |
| `src/features/site/` | NotFound page, FAQs |
| `src/features/team/` | Team profile, network, navigation components and data |
| `src/shared/` | Navigation, scroll behavior, animation helpers, config, styles, services, hooks |
| `public/` | Images, icons, loading video |

### 1.2 React components and reusable components

**Shared components:**
- `src/shared/components/Navigation.tsx` — Navbar, Footer, BackToTop, RouteScroll
- `src/shared/components/SmoothScroll.tsx` — Lenis smooth scroll + GSAP ScrollTrigger sync
- `src/shared/components/Preloader.tsx` — Session-aware loading screen with video
- `src/shared/components/animations/MagneticButton.tsx` — Magnetic hover button
- `src/shared/components/animations/AnimatedLink.tsx` — Animated underline link
- `src/shared/components/animations/ScrollProgress.tsx` — Top scroll progress bar
- `src/shared/components/animations/RevealText.tsx` — Text reveal helper
- `src/shared/components/animations/RevealSection.tsx` — Section reveal helper

**Home feature components:**
- `src/features/home/sections/HeroSection.tsx` — Hero with two CTAs, MagneticButton, scroll indicator
- `src/features/home/sections/AboutSection.tsx` — About with art and copy
- `src/features/home/sections/ServicesSection.tsx` — Services carousel with keyboard navigation
- `src/features/home/sections/ProjectsSection.tsx` — Featured projects grid
- `src/features/home/sections/ProcessSection.tsx` — Process steps with timeline
- `src/features/home/sections/TeamSection.tsx` — Team section (imports from `src/features/team/`)
- `src/features/home/sections/WhyChooseSection.tsx` — Reasons grid
- `src/features/home/sections/TestimonialsSection.tsx` — Testimonials grid
- `src/features/home/sections/ContactSection.tsx` — Contact form section
- `src/features/home/sections/FeedbackSection.tsx` — Feedback form section
- `src/features/home/sections/StatisticsSection.tsx` — Animated statistics
- `src/features/home/sections/FinalCtaSection.tsx` — Final CTA
- `src/features/home/components/ServiceCard.tsx` — Service card
- `src/features/home/components/HeroScene.tsx` — Three.js interactive globe hero scene
- `src/features/home/components/BackgroundScene.tsx` — Background scene wrapper

**Team feature components:**
- `src/features/team/components/TeamSection.tsx` — Team section with Motion animations
- `src/features/team/components/TeamProfile.tsx` — Member profile
- `src/features/team/components/TeamNavigation.tsx` — Member navigation
- `src/features/team/components/TeamNetwork.tsx` — Member network visualization

**Contact feature components:**
- `src/features/contact/components/Forms.tsx` — ContactForm, FeedbackForm, QuoteForm with EmailJS

### 1.3 Routing and navigation

`src/app/routes/AppRoutes.tsx` defines routes:
- `/` — HomePage
- `/projects` — ProjectsPage (lazy)
- `/projects/:slug` — ProjectsDetailPage (lazy)
- `/contact` — ContactPage (lazy)
- `/feedback` — FeedbackPage (lazy)
- `/privacy` — LegalPage (lazy)
- `/terms` — LegalPage (lazy)
- `*` — NotFoundPage (lazy)

Route-level lazy loading and vendor chunking are configured in `vite.config.ts`. Route transitions use GSAP with ScrollTrigger reveal groups. Page titles are set per route. Scroll restoration is manual with position saving.

### 1.4 Existing CSS and styling architecture

Global SCSS entry: `src/shared/styles/index.scss` imports:
- `./global` — global styles, buttons, forms, cards, typography
- Component styles in `./components/` — navbar, hero, services, projects, about, contact, feedback, final-cta, statistics, testimonials, why-choose, process, technology-strip, footer, back-to-top, animations, hero-scene, project-card, service-card, app

Design tokens live in `src/shared/styles/_variables.scss` with semantic `--kb-*` tokens plus legacy `--color-*`, `--space-*`, `--transition-*`, `--radius-*`, `--shadow-*` aliases. There is **token duplication** between `--kb-*` and alias families.

### 1.5 Existing design system and colour palette

Current light-theme tokens (from `_variables.scss`):

| Role | Token | Value |
|---|---|---|
| Main background | `--kb-bg` | `#FFFFFF` |
| Soft background | `--kb-surface-muted` | `#F8FAFC` |
| Section background | `--kb-surface-soft` | `#F3F6FC` |
| Card surface | `--kb-surface-card` | `#FFFFFF` |
| Heading/text strong | `--kb-text-strong` | `#101426` |
| Body text | `--kb-text-body` | `#596174` |
| Muted text | `--kb-text-muted` | `#667085` |
| Border | `--kb-border` | `#E8EAF0` |
| Brand orange | `--kb-orange` | `#FF5A1F` |
| Accessible orange | `--kb-orange-strong` | `#B33A0B` |
| Brand purple | `--kb-purple` | `#681FEA` |
| Soft lavender | `--kb-lavender` | `#F3EEFF` |
| Success | `--kb-success` | `#17613A` |
| Error | `--kb-error` | `#A51D31` |

**Contrast measurements (existing):**
- `#FF5A1F` on white: **3.12:1** — decorative only, fails WCAG AA for text
- `#B33A0B` on white: **5.95:1** — passes for text and CTA backgrounds
- `#681FEA` on white: **7.06:1** — passes
- `#596174` on white: **6.20:1** — passes for body text

### 1.6 Typography and font usage

Token: `--kb-font-sans: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`

**Inter is NOT loaded as a web font** — typography depends on system fallbacks. Font size tokens range from `--kb-text-xs` (0.75rem) to `--kb-text-display` (clamp(3rem, 7vw, 6.5rem)).

### 1.7 Existing animations and transitions

**Animation stack (all three installed):**
- **Motion for React** (`motion` ^14.9.1) — used by `TeamSection`, `MagneticButton`, mobile menu variants
- **GSAP 3.15** (`gsap` ^3.15.0 + `@gsap/react` ^2.1.2) — used by `useHomeMotion.ts` for all homepage section reveals, hero SplitType animation, footer entrance, route transitions
- **SplitType** (`split-type` ^0.3.4) — hero heading character/word splitting
- **Three.js** (`three` ^0.149.0) — `HeroScene.tsx` interactive globe
- **Lenis** (`lenis` ^1.3.27) — smooth scroll layer

**Shared animation files:**
- `src/shared/animations/gsapConfig.ts` — ScrollTrigger registration, easing constants, duration constants, breakpoint media queries
- `src/shared/animations/animationPresets.ts` — Motion variants (fadeInUp, scaleIn, mobileMenu, menuItem)
- `src/shared/animations/textAnimations.ts` — SplitType text animation, scramble text effect
- `src/shared/animations/scrollAnimations.ts` — Image mask reveal, parallax, progress line animation
- `src/shared/animations/animationUtils.ts` — prefersReducedMotion, isTouchDevice, safeRAF, generateTriggerId

**Potential conflicts:** Motion, GSAP, and CSS transitions can all target the same elements (e.g., `.project-card`, `.service-card`, `.button`). Animation ownership is not always explicit.

### 1.8 Current scrolling implementation

`src/shared/components/SmoothScroll.tsx`:
- Creates one Lenis instance with `autoRaf: false`, `lerp: 0.18`
- Synchronizes with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(updateScroll)`
- Disabled when `prefers-reduced-motion: reduce` matches
- Proper cleanup on unmount and media query change

`src/shared/services/smoothScroll.ts`:
- `scrollToSection(id)` — Lenis-aware section scrolling with offset
- `scrollToTop(immediate)` — Lenis-aware top scrolling
- `scrollToPosition(position)` — Lenis-aware position restoration

### 1.9 Responsive layouts

Breakpoints in use (overlapping and inconsistent):
- 640px — mobile/small (`--bp-sm`)
- 700px — section padding reduction
- 767/768px — tablet transition (`--bp-md`)
- 900px — services carousel slides
- 1023/1024px — desktop navigation/layout (`--bp-lg`)
- 1280px — wide container (`--bp-xl`)

Navigation switches to mobile menu at 1023px. Services carousel: 1 slide ≤640px, 2 slides ≤900px, 3 slides above.

### 1.10 Installed dependencies and package versions

| Dependency | Version | Purpose |
|---|---|---|
| react | ^19.3.1 | UI framework |
| react-dom | ^19.3.1 | DOM rendering |
| react-router-dom | ^7.18.5 | Routing |
| motion | ^14.9.1 | UI animations |
| gsap | ^3.15.0 | Scroll-triggered animations |
| @gsap/react | ^2.1.2 | GSAP React scoping |
| lenis | ^1.3.27 | Smooth scrolling |
| split-type | ^0.3.4 | Text splitting for animation |
| three | ^0.149.0 | 3D hero scene |
| @emailjs/browser | ^4.4.1 | Form submission |
| sass | ^1.108.0 | CSS preprocessing (dev) |
| vite | ^7.3.7 | Build tool |
| typescript | ~5.8.2 | Type checking |

No test script is defined in `package.json`.

### 1.11 Existing functionality and integrations

- **EmailJS** form submission for contact, feedback, and quote forms
- **Projects context** with filtering, search, and featured project selection
- **Contact form** with validation, privacy consent, success/error states
- **Feedback form** with ratings, project type, recommendation
- **Quote form** with budget, timeline, service selection
- **Skip link** for keyboard users
- **Mobile menu** with Escape-to-close and outside-click dismissal
- **Active section indicators** via IntersectionObserver
- **Back to top** button
- **Scroll progress bar**
- **Preloader** with video, skip button, session storage, reduced-motion exit
- **Three.js hero scene** with fallback image

### 1.12 Potential animation and library conflicts

1. **Motion vs GSAP vs CSS on same elements:** `.project-card`, `.service-card`, `.process-card`, `.reason-card` have CSS hover transitions AND are targeted by GSAP scroll reveals. Motion is used on `TeamSection` elements.
2. **SplitType** reverts on cleanup but hero text is split in `useHomeMotion.ts` without explicit reversion on every route change (scoped via `useGSAP`).
3. **Three.js HeroScene** runs a render loop (30 FPS cap) with pointer tracking — active even when offscreen (intersection-observed but still initialized).
4. **Lenis + CSS scroll-behavior:** `html { scroll-behavior: auto }` is set, which is correct when using Lenis.

### 1.13 Components needing improvement vs unchanged

| Component | Assessment |
|---|---|
| Navbar | Good foundation; needs design system token alignment |
| HeroSection | Good; animation exists via GSAP but could use Motion variants |
| ServicesSection | Good carousel; cards need hover consistency |
| ProjectsSection | Good; grid needs scroll-triggered reveals |
| AboutSection | Good; needs image reveal animation |
| ContactSection | Good form; needs section entrance animation |
| TeamSection | Good Motion usage; consistent |
| Preloader | Good; bounded at 1.6s, skippable |
| SmoothScroll | Good; proper Lenis/GSAP integration |
| All sections | Missing unified Motion variant usage; animation ownership split between GSAP and CSS |

### 1.14 UX inconsistencies

- Token naming: `--kb-*`, `--color-*`, `--space-*`, `--transition-*` all define overlapping values
- Breakpoints: 6 different cutoffs between 640–1280px
- Hero section has two different CSS overrides (`hero.scss` and `index.scss` lines 233–388) that conflict
- Navbar has two variants (standard and cinematic in `index.scss`) with different sizing

### 1.15 Accessibility observations

**Strengths:**
- Skip link with focus visibility
- Semantic HTML (section, nav, header, footer, main)
- Visible focus-visible rings (3px orange)
- Form labels with `aria-describedby` for errors
- Keyboard controls for services carousel
- Reduced-motion support in Lenis, GSAP, and CSS
- Mobile menu Escape-to-close with focus return
- `aria-current` on active nav links
- `aria-label` on icon-only buttons

**Needs verification:**
- Screen-reader testing not performed
- Carousel announcements need AT review
- Form status announcements need AT review
- Active-section indicators with keyboard navigation need review

### 1.16 Performance baseline

- Baseline build: **642.69 kB minified JS** (213.08 kB gzip), with a chunk-size advisory warning
- Current build: app entry **112.51 kB**; React **259.72 kB**; Motion **142.05 kB**; GSAP **114.79 kB**; Lenis **18.80 kB**; EmailJS **2.76 kB**
- Non-home route components are emitted as separate lazy-loaded chunks; no individual JavaScript chunk exceeds Vite's 500 kB advisory threshold
- Chunking separates vendor code and defers route components, but does not by itself establish a reduction in total home-page JavaScript
- Loading video: ~0.9 MB
- No Lighthouse or Core Web Vitals run performed

---

## 2. Phase 2 — Approved Design System

### 2.1 Design style

**Premium creative-technology agency** — light-first, minimal, sophisticated:
- Calm white/soft-neutral surfaces
- Confident navy typography (`#101426`)
- Orange (`#FF5A1F`) for energy and decorative accents
- Purple (`#681FEA`) as secondary innovation accent
- Generous whitespace, clear editorial hierarchy
- Restrained gradients and visual depth
- Fine borders, deliberate image framing
- No glassmorphism, no heavy glows, no decorative motion

Retain **"Build from the Core"** as the existing positioning. "Build Ideas. Create Impact." remains the supporting motto.

### 2.2 Colour palette

Preserve existing brand identity where possible. Approved accessible dark orange derived from current orange (5.95:1 on white).

| Role | Token | Value | WCAG Contrast on White | Use |
|---|---|---|---|---|
| Main background | `--kb-bg` | `#FFFFFF` | — | Main canvas |
| Soft background | `--kb-surface-muted` | `#F8FAFC` | — | Alternate sections |
| Section background | `--kb-surface-soft` | `#F3F6FC` | — | Secondary grouping |
| Card surface | `--kb-surface-card` | `#FFFFFF` | — | Cards and forms |
| Heading/strong text | `--kb-text-strong` | `#101426` | 17.2:1 | Headings, primary text |
| Body text | `--kb-text-body` | `#596174` | 6.20:1 | Paragraphs, descriptions |
| Muted text | `--kb-text-muted` | `#667085` | 4.85:1 | Supporting labels |
| Border | `--kb-border` | `#E8EAF0` | — | Dividers, outlines, fields |
| Brand orange | `--kb-orange` | `#FF5A1F` | 3.12:1 | Decorative accents only |
| Accessible orange | `--kb-orange-strong` | `#B33A0B` | 5.95:1 | Text, CTA backgrounds |
| Brand purple | `--kb-purple` | `#681FEA` | 7.06:1 | Brand accent, links |
| Soft lavender | `--kb-lavender` | `#F3EEFF` | — | Icon/badge backgrounds |
| Success | `--kb-success` | `#17613A` | — | Success states |
| Error | `--kb-error` | `#A51D31` | — | Error text, validation |

**Gradients:**
- `--kb-gradient-brand`: `linear-gradient(110deg, #FF5A1F, #681FEA)` — hero detail, wordmark accent
- `--kb-gradient-cta`: `linear-gradient(110deg, #B33A0B, #681FEA)` — major CTA backgrounds
- `--kb-gradient-purple`: `linear-gradient(135deg, #681FEA, #8B35E8)` — purple accent areas

**Contrast rules:** Minimum 4.5:1 for normal text, 3:1 for large text and meaningful UI boundaries. Orange `#FF5A1F` must never be used for text or small UI on white. Pair every semantic color with a non-color cue (text, icon, underline, state label).

### 2.3 Typography

**Primary font:** Inter-first system sans stack — `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`

Inter is not currently loaded as a web font. Use system fallback unless the team approves self-hosting Inter.

| Style | Desktop size | Weight / line-height | Use |
|---|---|---|---|
| Display | `clamp(3rem, 7vw, 6.5rem)` | 700–800 / 0.98–1.05 | Hero headline |
| H1 | `clamp(2.5rem, 5vw, 4.5rem)` | 700–800 / 1.05–1.12 | Page title |
| H2 | `clamp(2rem, 4vw, 3rem)` | 700–750 / 1.1–1.2 | Section heading |
| H3 | `1.25–1.5rem` | 650–700 / 1.25–1.4 | Card and subsection titles |
| Body | `1–1.125rem` | 400–450 / 1.6–1.75 | Paragraphs |
| Small | `0.875–0.95rem` | 400–600 / 1.45–1.6 | Supporting text and labels |
| Eyebrow | `0.72–0.8rem` | 650–750 / 1.3 | Short section labels |

**Guidelines:** Balanced headings, readable line lengths (60–70 characters), fluid sizes that avoid horizontal scroll at 320px. Avoid letter-spacing or all-caps as sole hierarchy mechanism.

### 2.4 Spacing system

**4px base scale:** `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120px`

| Token | Value | Use |
|---|---|---|
| `--kb-space-1` | 0.25rem (4px) | Tight control spacing |
| `--kb-space-2` | 0.5rem (8px) | Element gaps |
| `--kb-space-3` | 0.75rem (12px) | Component internal padding |
| `--kb-space-4` | 1rem (16px) | Standard section gap |
| `--kb-space-6` | 1.5rem (24px) | Section rhythm |
| `--kb-space-8` | 2rem (32px) | Major section spacing |
| `--kb-space-12` | 3rem (48px) | Large section separation |
| `--kb-space-16` | 4rem (64px) | Hero-scale spacing |
| `--kb-space-20` | 5rem (80px) | Very large separation |
| `--kb-space-24` | 6rem (96px) | Maximum section spacing |

**Layout:**
- Content container: `min(100% - 2 × gutter, 1200px)`; fluid gutter `clamp(1.25rem, 4vw, 3rem)`
- Reading column: ~640–720px
- Card grids: 12-column desktop grid; 2 columns tablet; 1 column narrow mobile
- Section vertical spacing: `clamp(4rem, 8vw, 7rem)`

### 2.5 Responsive breakpoints

**Shared breakpoint aliases:**
| Alias | Value | Use |
|---|---|---|
| `--bp-sm` | 640px | Small / mobile |
| `--bp-md` | 768px | Tablet transition |
| `--bp-lg` | 1024px | Desktop navigation/layout |
| `--bp-xl` | 1280px | Wide container |

Breakpoints are layout thresholds, not target devices. Test at 320/375/768/1024/1440px and immediately above/below each threshold.

Consolidate existing overlapping cutoffs (640, 700, 767/768, 900, 1023/1024, 1280) into these four aliases, preserving deliberate component-specific behavior (e.g., services carousel at 640/900).

### 2.6 Buttons and components

**Primary button:**
- Accessible orange/dark-orange fill (`--kb-gradient-cta`) with white text
- Min-height 46px, border-radius 999px
- Hover: lift -2px, shadow; Active: scale 0.98
- Visible keyboard focus ring

**Secondary button:**
- White or transparent surface with visible border and strong text
- Color shift is not the only hover cue (add border change)

**Text link:**
- Underline or explicit hover/focus indicator
- Preserve recognizable link semantics

**Service cards:**
- 16–20px radius, fine neutral border, restrained shadow
- Stable image ratio, concise metadata, one obvious action
- Hover lift subtle and optional on touch

**Project cards:**
- Consistent card specifications, image transitions on hover
- Badges, tags, action buttons (Live Demo / View Code)

**Input fields:**
- Persistent labels, adequate height (min 46px), spacing
- Explicit required/optional labels
- Inline errors tied with `aria-describedby`
- Success/error status visible and announced

**Badges and labels:**
- Short labels, sufficient contrast, shape or icon that does not rely on color alone

**Focus states:**
- Obvious `:focus-visible` ring with offset on links, buttons, fields, carousel controls, menu items
- Never suppress browser outline without equivalent

### 2.7 Navigation

Keep existing sticky header with clear hierarchy:
- Single visible active-section indicator plus `aria-current`
- Standard anchor behavior; header must not cover destination headings
- Mobile: real menu button with expanded state, Escape-to-close, predictable focus return, large touch targets
- Close menu after navigation; page remains scrollable
- Primary conversion CTA visually distinct but not competing with every navigation link
- Working in-page anchors and direct route links
- Keyboard access at all viewport sizes

### 2.8 Hero section

Distinctive hero layout communicating:
- **What KernBuild does:** full-stack development, web applications, AI-powered tools
- **Who it serves:** startups, businesses, digital agencies, entrepreneurs
- **Value proposition:** thoughtful digital products from custom web apps to AI tools
- **Primary CTA:** "Let's build something" → contact
- **Secondary CTA:** "Explore our work" → projects

Layout: copy/art split on wide screens; stacked copy before artwork on narrow. Main CTA visible without long scroll. Artwork supportive, not the only way to understand the offering.

### 2.9 Animation direction

**Motion language:**
- CSS transitions for simple hover/focus feedback
- Motion for React for localized interactive state/layout
- GSAP + ScrollTrigger for coordinated scroll timelines
- Lenis only for the smooth-scroll layer
- Never two systems controlling the same element/property

**Timings:**
- Control feedback: 150–220ms
- Route/menu transitions: 300–450ms
- Section reveals: 450–750ms
- Ease: `cubic-bezier(0.2, 0.75, 0.25, 1)` (restrained ease-out)

**Stagger:** 40–80ms per item, capped to avoid long waits. Reveal text by word or line; avoid character-by-character for long content.

**Trigger behavior:** Trigger once for simple section entrances; scrubbed motion only for clear scroll-linked indicators. Stop/simplify effects offscreen and when page is hidden.

**Reduced motion:** Remove parallax, magnetic movement, nonessential transitions. Keep all content immediately visible. Respect `prefers-reduced-motion` in JavaScript and CSS.

**Cleanup:** Scope GSAP work to components; clean up timelines, ScrollTriggers, observers, and split text on unmount/route change. Use `@gsap/react` `useGSAP` for lifecycle management.

### 2.10 Section-by-section animation recommendations

| Section | Animation |
|---|---|
| Hero | Staggered headline reveal (SplitType words/chars), eyebrow fade-up, description blur-to-focus, CTA stagger, points stagger, badge entrance, scroll indicator fade |
| Navbar | Smooth entrance, active indicator underline, hover color shift, sticky on scroll, mobile menu Motion variants |
| Services | Staggered card reveals, icon scale/rotate on hover, gradient border transitions |
| Projects | Scroll-triggered card reveals, image scale-in from 1.15→1, hover lift, optional horizontal scroll only where it improves UX |
| About | Clip-path image reveal, copy stagger fade-up |
| Process | Timeline progress line scrub, card stagger reveals |
| Team | Profile card entrance, network hover interactions, Motion-based member switching |
| Contact | Form card reveal, field-level validation feedback, success/error state animation |
| Feedback | Form reveal, rating star animation |
| Statistics | Counter animation on intersect, card stagger |
| Final CTA | Section entrance, CTA button hover |
| Footer | Staggered grid entrance on scroll |

### 2.11 UX and accessibility standards

**Navigation:** Skip link, visible focus states, `aria-current`, keyboard-operable at all viewports, Escape-to-close mobile menu.

**Accessibility:** WCAG AA contrast (4.5:1 normal, 3:1 large), semantic HTML, descriptive alt text, empty alt for decorative images, `aria-describedby` on fields with errors, no hover-only content.

**Conversion:** Clear primary CTA per section, working in-page anchors, form validation with inline errors, success/error states announced.

**Forms:** Persistent labels, required/optional markers, inline errors, values preserved after failed submission, duplicate submission prevention, final status announcement.

**Loading states:** Loader only for real work or short skippable brand moment. Current preloader capped at 1.6s, skippable, exits immediately on reduced motion or video failure.

**Performance:** Prefer transform/opacity, avoid layout shifts, reserve image dimensions, lazy-load non-critical assets, no continuous animation loops, reduced-motion disables nonessential motion.

**Mobile:** Touch targets ≥44px, no horizontal scroll, carousel keyboard controls, readable font sizes at 320px.

---

## 3. Implemented token map

**Centralized tokens** in `src/shared/styles/_variables.scss`:

- **Color:** `--kb-bg`, `--kb-surface-*`, `--kb-text-*`, `--kb-border`, `--kb-orange*`, `--kb-purple`, `--kb-success`, `--kb-error`
- **Typography:** `--kb-font-sans`, `--kb-text-xs` through `--kb-text-display`, plus line-height and weight tokens
- **Space/layout:** `--kb-space-*`, `--kb-container-max`, `--kb-gutter`, `--kb-section-space`; `--bp-sm` through `--bp-xl` breakpoint aliases
- **Shape/elevation:** `--kb-radius-*`, `--kb-shadow-*`, `--kb-focus-ring`
- **Motion/layers:** `--kb-duration-*`, `--kb-ease-*`, documented z-index roles

**Migration:** Legacy aliases (`--color-*`, `--space-*`, `--transition-*`, `--radius-*`, `--shadow-*`) remain for gradual migration. Do not add competing definitions for the same semantic role. Update this document if implementation deviates.

---

## 4. Implementation status

The approved design direction has been implemented in the existing React application. Changes include:

- Centralized semantic design tokens with legacy aliases retained for gradual migration
- Improved text and CTA contrast, preserved discoverable browser scrollbars, and aligned component styles
- GSAP React lifecycle scoping, reduced-motion handling, and coordinated animation ownership
- A session-aware preloader capped at 1.6 seconds with reduced-motion, media-failure, and skip paths
- Mobile navigation dismissal on Escape and outside pointer interaction, with focus restored on Escape
- Lazy loading for non-home routes and separate vendor chunks
- A persistent sticky navbar, with the app-shell positioning override corrected
- A responsive, single-page inquiry form aligned to the supplied reference
- The KernBuild wordmark and tagline in the hero, plus the full logo in the About section
- Additional service cards and recognizable inline tool marks in the technology strip
- Responsive featured-project and project-story carousels with keyboard controls and pagination; placeholder testimonials are not presented as client quotes
- A stronger translucent glass navbar with blur/saturation, including its scrolled state
- Case-study modal focus management, Escape-to-close, focus return, and image fallbacks for project cards

`npm run build` (TypeScript check plus Vite production build) passed on the current worktree. Browser checks confirmed that the navbar remains at the top after scrolling, the desktop contact form uses the two-column reference layout and required-field validation, all four featured project images load, the case-study modal opens and closes with Escape while restoring focus, and the project-story carousel advances. The About logo and tool marks also rendered. Browser automation reported a configured 390 px viewport but a 487 px CSS client width because of its device scale factor; exact 390 px CSS-width behavior is therefore not claimed. Assistive-technology testing and Lighthouse/Core Web Vitals measurement remain outstanding.