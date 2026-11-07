import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';
import { pauseLenis, resumeLenis } from '../../../shared/services/smoothScroll';

interface ProjectCaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  const scrollPositionRef = useRef<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    scrollPositionRef.current = window.scrollY;
    pauseLenis();

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter(element => element.getAttribute('aria-hidden') !== 'true');
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
      resumeLenis();
      window.scrollTo(0, scrollPositionRef.current);
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  const study = project.caseStudy;

  return createPortal(
    <div className="case-study-modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="case-study-modal"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={event => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="case-study-modal__close"
          onClick={onClose}
          aria-label="Close case study modal"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <header className="case-study-modal__header">
          <div className="case-study-modal__meta">
            <span className="case-study-modal__badge">{project.category}</span>
            <span className="case-study-modal__status">Status: {project.status}</span>
          </div>
          <h2 id="modal-title" className="case-study-modal__title">{project.title}</h2>
          <p className="case-study-modal__subtitle">{project.shortDescription}</p>
        </header>

        <div className="case-study-modal__preview">
          <img
            src={project.thumbnail}
            alt={`${project.title} screenshot preview`}
            className="case-study-modal__preview-img"
          />
        </div>

        <div className="case-study-modal__body">
          {/* 1. Project Overview */}
          <section className="case-study-modal__section">
            <h3 className="case-study-modal__section-title">
              <span className="case-study-modal__section-num">01</span> Project Overview
            </h3>
            <p>{study?.overview || project.fullDescription}</p>
          </section>

          {/* 2. Problem Statement */}
          {study?.problemStatement && (
            <section className="case-study-modal__section">
              <h3 className="case-study-modal__section-title">
                <span className="case-study-modal__section-num">02</span> The Problem
              </h3>
              <p>{study.problemStatement}</p>
            </section>
          )}

          {/* 3. Our Solution */}
          {study?.solution && (
            <section className="case-study-modal__section">
              <h3 className="case-study-modal__section-title">
                <span className="case-study-modal__section-num">03</span> Our Solution
              </h3>
              <p>{study.solution}</p>
            </section>
          )}

          {/* 4. Key Features */}
          <section className="case-study-modal__section">
            <h3 className="case-study-modal__section-title">
              <span className="case-study-modal__section-num">04</span> Key Features
            </h3>
            <ul className="case-study-modal__features-list">
              {(study?.keyFeatures || project.features).map((feature, idx) => (
                <li key={idx}>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Technology Stack */}
          <section className="case-study-modal__section">
            <h3 className="case-study-modal__section-title">
              <span className="case-study-modal__section-num">05</span> Technology Stack
            </h3>
            <div className="case-study-modal__tech-grid">
              {(study?.techStack || project.technologies).map((tech, idx) => (
                <span className="case-study-modal__tech-pill" key={idx}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 6. Development Challenges */}
          {study?.challenges && study.challenges.length > 0 && (
            <section className="case-study-modal__section">
              <h3 className="case-study-modal__section-title">
                <span className="case-study-modal__section-num">06</span> Engineering Challenges & Solutions
              </h3>
              <ul className="case-study-modal__challenges-list">
                {study.challenges.map((challenge, idx) => (
                  <li key={idx}>{challenge}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 7. Project Screenshots */}
          {study?.screenshots && study.screenshots.length > 0 && (
            <section className="case-study-modal__section">
              <h3 className="case-study-modal__section-title">
                <span className="case-study-modal__section-num">07</span> Project Showcase
              </h3>
              <div className="case-study-modal__screenshots">
                {study.screenshots.map((shot, idx) => (
                  <figure key={idx} className="case-study-modal__screenshot-figure">
                    <img src={shot.url} alt={shot.caption} loading="lazy" />
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="case-study-modal__footer">
          <div className="case-study-modal__footer-links">
            <Link
              to={`/projects/${project.slug}`}
              className="button button--outline"
              onClick={onClose}
            >
              Open Dedicated Page ↗
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Visit Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--outline"
              >
                View Repository
              </a>
            )}
          </div>
          <button
            type="button"
            className="button button--outline"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
