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
  {
    id: 'product-design',
    title: 'Product Design & UX',
    description: 'Clear user journeys, responsive interfaces, and polished prototypes shaped around real customer needs.',
    icon: 'M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zM19 14l1.2 3.2L23 18l-2.8 1-1.2 3-1.1-3-2.9-1 2.9-.8L19 14z',
    colorClass: 'lavender',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Online storefronts with product discovery, checkout flows, and practical tools for managing a catalog.',
    icon: 'M3 4h2l2.2 11.2a2 2 0 002 1.6h8.9a2 2 0 001.9-1.4L22 9H6M10 21h.01M18 21h.01',
    colorClass: 'peach',
  },
  {
    id: 'integrations',
    title: 'API & Platform Integrations',
    description: 'Connect the services your team already uses through dependable APIs and third-party integrations.',
    icon: 'M9 7H6a3 3 0 000 6h3m6-6h3a3 3 0 010 6h-3M8 10h8m-8 3h8',
    colorClass: 'blue',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Optimization',
    description: 'Keep existing products healthy with focused improvements, performance tuning, and ongoing technical support.',
    icon: 'M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
    colorClass: 'lavender',
  },
];
