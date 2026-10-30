import { Project } from '../models/project.model';
import { SITE_CONFIG } from '../core/config/site.config';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'vyapari-ai',
    title: 'VyapariAI',
    category: 'Web Applications',
    description: 'A virtual business assistant for local businesses with inventory management, income and expense tracking, invoicing, and AI-powered assistance.',
    imagePath: SITE_CONFIG.images.projects.vyapariAi,
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'AI APIs'],
    featured: true,
  },
  {
    id: 'intern-connect',
    title: 'InternConnect',
    category: 'Management Systems',
    description: 'An internship management platform connecting students and companies through profiles, internship listings, applications, and application approval workflows.',
    imagePath: SITE_CONFIG.images.projects.internConnect,
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT'],
    featured: true,
  },
  {
    id: 'buildcost-ai',
    title: 'BuildCost AI',
    category: 'AI Tools',
    description: 'An intelligent software project estimation platform designed to help users understand potential development costs based on project requirements.',
    imagePath: SITE_CONFIG.images.projects.buildCostAi,
    technologies: ['Angular', 'AI Integration', 'Configurable Backend'],
    featured: true,
  },
];
