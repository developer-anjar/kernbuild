import { PROCESS_DATA } from '../data/process';

export function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="container">
        <header className="section-heading"><p className="eyebrow">How we work</p><h2>A clear path from idea to launch</h2><p>Collaborative at every step, with clear decisions and progress along the way.</p></header>
        <div className="process-grid">
          <div className="process-line-track" aria-hidden="true">
            <div className="process-line-progress" />
          </div>
          {PROCESS_DATA.map(step => <article className="process-card" key={step.step}>
            <span className="process-number">0{step.step}</span>
            <span className="process-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon} /></svg></span>
            <h3>{step.title}</h3><p>{step.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}
