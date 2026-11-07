import { Link } from 'react-router-dom';
import { useProjects } from '../../projects/context/ProjectsContext';
import { ProjectCard } from '../../projects/components/ProjectCard';

export function ProjectsSection() {
  const { featuredProjects, loading, error, refresh } = useProjects();

  return (
    <section className="section section--cinematic" id="projects">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Selected projects</p>
          <h2>Ideas taking shape</h2>
          <p>A few of the products we’re building. Project visuals are placeholders until final screenshots are available.</p>
        </header>
        {loading ? <p className="empty-state" role="status">Loading projects…</p> : error ? (
          <div className="empty-state" role="alert">{error} <button className="text-link" type="button" onClick={() => void refresh()}>Try again</button></div>
        ) : featuredProjects.length ? (
          <div className="projects-grid">{featuredProjects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
        ) : <p className="empty-state" role="status">No featured projects are available yet.</p>}
        <div className="section-action"><Link className="button button--outline" to="/projects">Browse projects and filters <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}
