export type ProjectCategory =
  | 'Web Applications'
  | 'E-commerce'
  | 'Management Systems'
  | 'AI Applications'
  | 'Portfolio'
  | 'SaaS'
  | 'Landing Pages'
  | 'Dashboards';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Concept';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  completionDate: string;
  status: ProjectStatus;
  featured: boolean;
  dummy: boolean;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Web Applications',
  'E-commerce',
  'Management Systems',
  'AI Applications',
  'Portfolio',
  'SaaS',
  'Landing Pages',
  'Dashboards',
];
