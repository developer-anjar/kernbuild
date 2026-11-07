import { useState } from 'react';
import { PROCESS_DATA } from '../data/process';

export function ProcessSection() {
  const [activeStage, setActiveStage] = useState<number>(1);

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">How We Work</p>
          <h2>An Interactive Path from Idea to Impact</h2>
          <p>
            Collaborative at every milestone, with complete transparency, regular sprint demos, and iterative progress.
          </p>
        </header>

        {/* Timeline Interactive Component */}
        <div className="process-timeline-wrapper">
          {/* Animated Connecting Track */}
          <div className="process-timeline-bar" aria-hidden="true">
            <div
              className="process-timeline-bar__fill"
              style={{ width: `${((activeStage - 1) / (PROCESS_DATA.length - 1)) * 100}%` }}
            />
          </div>

          <div className="process-grid">
            {PROCESS_DATA.map(step => {
              const isActive = activeStage === step.step;
              const isPassed = activeStage >= step.step;

              return (
                <article
                  key={step.step}
                  className={`process-card ${isActive ? 'process-card--active' : ''} ${isPassed ? 'process-card--passed' : ''}`}
                  onMouseEnter={() => setActiveStage(step.step)}
                  onClick={() => setActiveStage(step.step)}
                  tabIndex={0}
                  onFocus={() => setActiveStage(step.step)}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Step 0${step.step}: ${step.title}`}
                >
                  <div className="process-card__node" aria-hidden="true">
                    <span className="process-card__dot" />
                  </div>

                  <span className="process-number">0{step.step}</span>

                  <span className="process-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={step.icon} />
                    </svg>
                  </span>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <div className="process-card__status-indicator">
                    {isActive ? (
                      <span className="active-badge">Active Stage</span>
                    ) : isPassed ? (
                      <span className="completed-badge">✓ Stage Complete</span>
                    ) : (
                      <span className="upcoming-badge">Upcoming</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
