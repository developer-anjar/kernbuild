import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

export function ProjectCard({ project }: { project: Project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <>
      <article className="project-card">
        <div className="project-card__image">
          {project.thumbnail && !imageFailed ? (
            <img
              className="project-card__image-file"
              src={project.thumbnail}
              alt={`${project.title} project preview`}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="project-card__placeholder">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              <span className="project-card__placeholder-text">{project.title}</span>
            </div>
          )}
          <div className="project-card__overlay" aria-hidden="true" />
          <button
            type="button"
            className="project-card__quick-view"
            onClick={() => setModalOpen(true)}
            aria-label={`Quick view case study for ${project.title}`}
          >
            <span>View Case Study</span>
          </button>
        </div>

        <div className="project-card__body">
          <div className="project-card__header-row">
            <span className="project-card__badge">{project.category}</span>
            {project.status === 'In Progress' && (
              <span className="project-card__status-tag">In Development</span>
            )}
          </div>

          <h3 className="project-card__title">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>

          <p className="project-card__desc">{project.shortDescription}</p>

          <div className="project-card__tags">
            {project.technologies.slice(0, 4).map(technology => (
              <span className="project-card__tag" key={technology}>
                {technology}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="project-card__tag project-card__tag--more">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="project-card__actions">
            <button
              type="button"
              className="project-card__btn project-card__btn--primary"
              onClick={() => setModalOpen(true)}
            >
              View Case Study <span aria-hidden="true">→</span>
            </button>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__btn project-card__btn--outline"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </article>

      {modalOpen && (
        <ProjectCaseStudyModal
          project={project}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
