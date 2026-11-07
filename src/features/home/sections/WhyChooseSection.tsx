import { WHY_CHOOSE_DATA } from '../data/why-choose';

export function WhyChooseSection() {
  return (
    <section className="section section--lavender">
      <div className="container">
        <header className="section-heading"><p className="eyebrow">Why KernBuild</p><h2>Thoughtful work. Clear collaboration.</h2><p>The way we build matters just as much as what we build.</p></header>
        <div className="reasons-grid">
          {WHY_CHOOSE_DATA.map(reason => <article className="reason-card" key={reason.title}>
            <span className="reason-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={reason.icon} /></svg></span>
            <div><h3>{reason.title}</h3><p>{reason.description}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
