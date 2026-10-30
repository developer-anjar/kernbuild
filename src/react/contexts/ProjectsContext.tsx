import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '../types/project';

interface ProjectsContextValue {
  projects: Project[];
  featuredProjects: Project[];
  categories: ProjectCategory[];
  category: ProjectCategory | 'All';
  search: string;
  setCategory: (category: ProjectCategory | 'All') => void;
  setSearch: (query: string) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: PropsWithChildren) {
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All');
  const [search, setSearch] = useState('');

  const projects = useMemo(() => {
    const query = search.toLowerCase().trim();
    return PROJECTS_DATA.filter(project => {
      const matchesCategory = category === 'All' || project.category === category;
      const matchesQuery = !query || project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(technology => technology.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [category, search]);

  const value = useMemo<ProjectsContextValue>(() => ({
    projects,
    featuredProjects: PROJECTS_DATA.filter(project => project.featured),
    categories: PROJECT_CATEGORIES,
    category,
    search,
    setCategory,
    setSearch,
  }), [projects, category, search]);

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects(): ProjectsContextValue {
  const value = useContext(ProjectsContext);
  if (!value) throw new Error('useProjects must be used inside ProjectsProvider.');
  return value;
}
