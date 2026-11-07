import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '../types/project';
import { PROJECTS_DATA } from '../data/projects';

interface ProjectsContextValue {
  projects: Project[];
  featuredProjects: Project[];
  categories: ProjectCategory[];
  category: ProjectCategory | 'All';
  search: string;
  loading: boolean;
  error: string | null;
  setCategory: (category: ProjectCategory | 'All') => void;
  setSearch: (query: string) => void;
  refresh: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: PropsWithChildren) {
  const [allProjects] = useState<Project[]>(PROJECTS_DATA);
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Static data: nothing to fetch. Resolve after a tick to keep the
      // existing loading/error interface stable for consuming components.
      await new Promise(resolve => setTimeout(resolve, 0));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  const projects = useMemo(() => {
    const query = search.toLowerCase().trim();
    return allProjects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      const matchesQuery = !query || project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.fullDescription.toLowerCase().includes(query) ||
        project.technologies.some((technology) => technology.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [allProjects, category, search]);

  const featuredProjects = useMemo(() => allProjects.filter((project) => project.featured), [allProjects]);
  const value = useMemo<ProjectsContextValue>(() => ({
    projects,
    featuredProjects,
    categories: PROJECT_CATEGORIES,
    category,
    search,
    loading,
    error,
    setCategory,
    setSearch,
    refresh,
  }), [projects, featuredProjects, category, search, loading, error, refresh]);

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects(): ProjectsContextValue {
  const value = useContext(ProjectsContext);
  if (!value) throw new Error('useProjects must be used inside ProjectsProvider.');
  return value;
}
