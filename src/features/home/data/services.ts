import type { ServiceItem } from '../types/service';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-apps',
    title: 'Web Applications',
    description: 'Custom web applications tailored to your business needs.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    colorClass: 'peach',
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'High-converting, modern, and responsive pages.',
    icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
    colorClass: 'lavender',
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    description: 'Data-driven dashboards for better decisions.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    colorClass: 'blue',
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    description: 'Connected frontend, backend, database, and API development for complete products.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    colorClass: 'peach',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Integrate AI features and intelligent solutions.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    colorClass: 'lavender',
  },
  {
    id: 'deployment',
    title: 'Deployment & Hosting',
    description: 'Production deployment and hosting setup designed for reliability and growth.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    colorClass: 'blue',
  },
];
