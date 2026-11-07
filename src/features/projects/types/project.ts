export type ProjectCategory =
  | 'Full-Stack Web Application'
  | 'AI-Powered Business Application'
  | 'Web Application'
  | 'Portfolio Website'
  | 'Web Applications'
  | 'E-commerce'
  | 'Management Systems'
  | 'AI Applications'
  | 'Portfolio'
  | 'SaaS';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Concept';

export interface ProjectCaseStudy {
  overview: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  challenges: string[];
  screenshots: {
    url: string;
    caption: string;
  }[];
}

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
  caseStudy?: ProjectCaseStudy;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Full-Stack Web Application',
  'AI-Powered Business Application',
  'Web Application',
  'Portfolio Website',
  'Web Applications',
  'E-commerce',
  'Management Systems',
  'AI Applications',
  'Portfolio',
  'SaaS',
];
