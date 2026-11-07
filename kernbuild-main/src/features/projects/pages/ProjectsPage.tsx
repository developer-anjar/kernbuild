import { useProjects } from '../context/ProjectsContext';
import { ProjectCard } from '../components/ProjectCard';

export function ProjectsPage() {
  const { categories, category, search, projects, loading, error, setCategory, setSearch, refresh } = useProjects();
  return (
    <section className="section section--blue">
      <div className="container">
        <header className="page-heading">
          <p className="eyebrow">Selected work</p>
          <h1>Projects built with purpose</h1>
          <p>A selection of product concepts and platforms. Preview images are placeholders until final project screenshots are available.</p>
        </header>
        <div className="project-filters" role="search">
          <label className="sr-only" htmlFor="project-search">Search projects</label>
          <input id="project-search" type="search" placeholder="Search projects or technologies" value={search} onChange={event => setSearch(event.target.value)} />
          <label className="sr-only" htmlFor="project-category">Filter by category</label>
          <select id="project-category" value={category} onChange={event => setCategory(event.target.value as typeof category)}>
            <option value="All">All categories</option>
            {categories.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
        </div>
        {loading ? <p className="empty-state" role="status">Loading projects...</p> : error ? (
          <div className="empty-state" role="alert">{error} <button className="text-link" type="button" onClick={() => void refresh()}>Try again</button></div>
        ) : <div className="projects-grid">
          {projects.length ? projects.map(project => <ProjectCard project={project} key={project.id} />) : <p className="empty-state" role="status">No projects match that search. Try another term or category.</p>}
        </div>}
      </div>
    </section>
  );
}
