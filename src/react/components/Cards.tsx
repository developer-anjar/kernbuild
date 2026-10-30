import { Link } from 'react-router-dom';
import type { Project } from '../types/project';
import type { ServiceItem } from '../types/service';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__image">
        <div className="project-card__placeholder">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <span className="project-card__placeholder-text">{project.title}</span>
        </div>
        <img
          className="project-card__image-file"
          src={project.imagePath}
          alt={`${project.title} project preview`}
          loading="lazy"
          onError={event => { event.currentTarget.style.display = 'none'; }}
        />
      </div>
      <div className="project-card__body">
        <span className="project-card__badge">{project.category}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.technologies.map(technology => <span className="project-card__tag" key={technology}>{technology}</span>)}
        </div>
        <div className="project-card__actions">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card__btn project-card__btn--primary">Live Demo →</a>}
          {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="project-card__btn project-card__btn--outline">View Code</a>}
          {!project.liveUrl && !project.sourceUrl && <span className="project-card__coming-soon">Links coming soon</span>}
        </div>
      </div>
    </article>
  );
}

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
