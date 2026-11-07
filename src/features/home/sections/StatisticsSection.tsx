import { useEffect, useRef } from 'react';
import { STATISTICS_DATA } from '../data/company';

export function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statistics = STATISTICS_DATA;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const frames = new Set<number>();
    const showFinalValue = (card: HTMLElement) => {
      const metric = statistics.find(item => item.id === card.dataset.statId);
      const valueElement = card.querySelector<HTMLElement>('.statistic-value');
      if (metric && valueElement) {
        valueElement.textContent = `${metric.prefix ?? ''}${metric.value}${metric.suffix ?? ''}`;
      }
    };
    if (typeof IntersectionObserver === 'undefined') {
      section.querySelectorAll<HTMLElement>('[data-stat-id]').forEach(showFinalValue);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = (entry.target as HTMLElement).dataset.statId;
        const metric = statistics.find(item => item.id === id);
        if (!metric || typeof metric.value !== 'number') continue;
        observer.unobserve(entry.target);
        const valueElement = entry.target.querySelector<HTMLElement>('.statistic-value');
        if (!valueElement) continue;
        const target = metric.value;
        const started = performance.now();
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850;
        let frame = 0;
        const update = (now: number) => {
          frames.delete(frame);
          const progress = duration === 0 ? 1 : Math.min((now - started) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          valueElement.textContent = `${metric.prefix ?? ''}${Math.round(target * eased)}${metric.suffix ?? ''}`;
          if (progress < 1) {
            frame = requestAnimationFrame(update);
            frames.add(frame);
          }
        };
        frame = requestAnimationFrame(update);
        frames.add(frame);
      }
    }, { threshold: 0.35 });
    section.querySelectorAll<HTMLElement>('[data-stat-id]').forEach(card => observer.observe(card));
    return () => { observer.disconnect(); frames.forEach(cancelAnimationFrame); };
  }, [statistics]);

  return (
    <section className="section section--cinematic statistics-section" ref={sectionRef}>
      <div className="container">
        <header className="section-heading"><p className="eyebrow">KernBuild at a glance</p><h2>Built on capabilities, not inflated numbers</h2><p>Statistics shown are illustrative placeholders and not verified figures.</p></header>
        <div className="statistics-grid">
          {statistics.map(metric => <article className="statistic-card" data-stat-id={metric.id} key={metric.id}>
            <span className="statistic-value">{metric.prefix ?? ''}{typeof metric.value === 'number' ? 0 : metric.value}{metric.suffix ?? ''}</span>
            <h3>{metric.label}</h3><p>{metric.isPlaceholder ? 'Illustrative placeholder · not verified' : 'Current statistic'}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}
