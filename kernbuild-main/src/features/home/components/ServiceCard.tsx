import { Link } from 'react-router-dom';
import type { ServiceItem } from '../types/service';

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className={`service-card service-card--${service.colorClass}`}>
      <div className="service-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={service.icon} />
        </svg>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <Link className="service-card__link" to="/#contact">Learn More <span aria-hidden="true">→</span></Link>
    </article>
  );
}
