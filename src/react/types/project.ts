export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  imagePath: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export type ProjectCategory = 'Web Applications' | 'Management Systems' | 'AI Tools' | 'Dashboards' | 'Landing Pages';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Web Applications',
  'Management Systems',
  'AI Tools',
  'Dashboards',
  'Landing Pages',
];
