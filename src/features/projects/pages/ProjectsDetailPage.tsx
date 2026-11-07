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
    window.scrollTo(0, 0);
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
          <div className="section-action">
            <Link className="button" to="/projects">
              Browse projects <span aria-hidden="true">→</span>
            </Link>
          </div>
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

  document.title = `${project.title} — Case Study | KernBuild`;
  const related = getRelatedProjects(project);
  const study = project.caseStudy;

  return (
    <article className="section project-detail">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav className="project-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/projects">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="project-detail__header">
          <div className="project-detail__meta-badges">
            <span className="project-detail__badge">{project.category}</span>
            <span className="project-detail__status">Status: {project.status}</span>
          </div>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__lead">{project.shortDescription}</p>

          <div className="project-detail__cta-row">
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
                View on GitHub
              </a>
            )}
            <Link to="/#contact" className="button button--outline">
              Inquire About Similar Project →
            </Link>
          </div>
        </header>

        {/* Hero Preview Showcase */}
        <div className="project-detail__hero-preview">
          <img
            src={project.thumbnail}
            alt={`${project.title} preview screenshot`}
            className="project-detail__hero-img"
          />
        </div>

        {/* Structured Case Study Content */}
        <div className="project-detail__grid">
          <div className="project-detail__main">
            {/* 1. Project Overview */}
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">
                <span className="section-num">01</span> Project Overview
              </h2>
              <p className="project-detail__p">
                {study?.overview || project.fullDescription}
              </p>
            </section>

            {/* 2. Problem Statement */}
            {study?.problemStatement && (
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">
                  <span className="section-num">02</span> The Problem
                </h2>
                <p className="project-detail__p">{study.problemStatement}</p>
              </section>
            )}

            {/* 3. Our Solution */}
            {study?.solution && (
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">
                  <span className="section-num">03</span> Our Architectural Solution
                </h2>
                <p className="project-detail__p">{study.solution}</p>
              </section>
            )}

            {/* 4. Key Features */}
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">
                <span className="section-num">04</span> Key Features & Capabilities
              </h2>
              <ul className="project-detail__features-list">
                {(study?.keyFeatures || project.features).map((feature, idx) => (
                  <li key={idx}>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Challenges */}
            {study?.challenges && study.challenges.length > 0 && (
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">
                  <span className="section-num">05</span> Engineering Challenges Overcome
                </h2>
                <ul className="project-detail__challenges-list">
                  {study.challenges.map((challenge, idx) => (
                    <li key={idx}>{challenge}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* 6. Screenshots Showcase */}
            {study?.screenshots && study.screenshots.length > 0 && (
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">
                  <span className="section-num">06</span> Interface Showcase
                </h2>
                <div className="project-detail__screenshots">
                  {study.screenshots.map((shot, idx) => (
                    <figure key={idx} className="project-detail__figure">
                      <img src={shot.url} alt={shot.caption} loading="lazy" />
                      <figcaption>{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="project-detail__sidebar">
            <div className="project-detail__sidebar-card">
              <h3 className="project-detail__sidebar-title">Technology Stack</h3>
              <div className="project-detail__tech-pills">
                {(study?.techStack || project.technologies).map((tech, idx) => (
                  <span className="project-detail__tech-pill" key={idx}>
                    {tech}
                  </span>
                ))}
              </div>

              <hr className="project-detail__divider" />

              <h3 className="project-detail__sidebar-title">Project Details</h3>
              <dl className="project-detail__meta-dl">
                <div>
                  <dt>Category</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Timeline / Status</dt>
                  <dd>{project.status}</dd>
                </div>
                <div>
                  <dt>Studio</dt>
                  <dd>KernBuild</dd>
                </div>
              </dl>

              <hr className="project-detail__divider" />

              <div className="project-detail__sidebar-cta">
                <p>Have an ambitious project like this?</p>
                <Link to="/#contact" className="button">
                  Work With Us →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="project-detail__related">
            <header className="section-heading">
              <p className="eyebrow">Explore More Work</p>
              <h2>Other Projects by KernBuild</h2>
            </header>
            <div className="projects-grid">
              {related.map(relProject => (
                <ProjectCard key={relProject.id} project={relProject} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
