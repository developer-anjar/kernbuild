import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug, getRelatedProjects } from '../data/projects';
import type { Project } from '../types/project';
import { ProjectCard } from '../components/ProjectCard';

export function ProjectsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const found = slug ? getProjectBySlug(slug) : undefined;
    setProject(found ?? null);
    setNotFound(!found);
  }, [slug]);

  if (notFound) {
    document.title = 'Project not found | KernBuild';
    return (
      <section className="section">
        <div className="container">
          <header className="page-heading">
            <p className="eyebrow">Project not found</p>
            <h1>We couldn’t find that project</h1>
            <p>The project you’re looking for isn’t available. Browse our other work instead.</p>
          </header>
          <div className="section-action"><Link className="button" to="/projects">Browse projects <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
    );
  }

  if (!project) {
    document.title = 'Loading project | KernBuild';
    return (
      <section className="section">
        <div className="container">
          <p className="empty-state" role="status">Loading project…</p>
        </div>
      </section>
    );
  }

  document.title = `${project.title} | KernBuild`;
  const related = getRelatedProjects(project);

  return (
    <section className="section section--blue project-detail">
      <div className="container">
        <header className="page-heading">
          <p className="eyebrow">{project.category} · {project.status}</p>
          <h1>{project.title}</h1>
          <p>{project.shortDescription}</p>
        </header>

        <div className="project-detail__gallery">
          <div className="project-detail__image">
            {project.thumbnail && <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              loading="lazy"
              onError={event => { event.currentTarget.style.display = 'none'; }}
            />}
            <div className="project-detail__placeholder-fallback" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
          </div>
          {project.gallery.length > 1 && (
            <div className="project-detail__thumbs">
              {project.gallery.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} image ${index + 1}`}
                  loading="lazy"
                  onError={event => { event.currentTarget.style.display = 'none'; }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="project-detail__content">
          <h2>About the project</h2>
          <p>{project.fullDescription}</p>

          <div className="project-detail__features">
            <h3>Features</h3>
            <ul>
              {project.features.map((feature: string) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>

          <div className="project-detail__meta">
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Technologies</span>
              <span className="project-detail__meta-value">{project.technologies.join(', ')}</span>
            </div>
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Completed</span>
              <span className="project-detail__meta-value">{project.completionDate}</span>
            </div>
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Status</span>
              <span className="project-detail__meta-value">{project.status}</span>
            </div>
          </div>

          <div className="project-detail__actions">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">View live <span aria-hidden="true">→</span></a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button button--outline">View source <span aria-hidden="true">→</span></a>}
          </div>

          {related.length > 0 && (
            <div className="project-detail__related">
              <h3>Related work</h3>
              <div className="projects-grid">
                {related.map(relatedProject => <ProjectCard key={relatedProject.id} project={relatedProject} />)}
              </div>
            </div>
          )}
        </div>

        <div className="section-action"><Link className="button button--outline" to="/projects">← Back to projects</Link></div>
      </div>
    </section>
  );
}
