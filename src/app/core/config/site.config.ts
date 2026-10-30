import { StatisticMetric } from '../../models/statistics.model';

export const SITE_CONFIG = {
  brand: {
    name: 'KernBuild',
    tagline: 'Build from the Core',
    description: 'A full-stack development studio helping startups, businesses, and creators turn ideas into modern, scalable digital products.',
  },
  images: {
    hero: 'images/hero/hero-workspace-placeholder.svg',
    about: 'images/hero/about-illustration-placeholder.svg',
    projects: {
      vyapariAi: 'images/projects/vyapari-ai-placeholder.svg',
      internConnect: 'images/projects/intern-connect-placeholder.svg',
      buildCostAi: 'images/projects/buildcost-ai-placeholder.svg',
    },
  },
  contact: {
    email: '',
    phone: '',
  },
  socialLinks: {
    linkedin: '',
    github: '',
    instagram: '',
  },
};

export const STATISTICS_DATA: StatisticMetric[] = [
  {
    id: 'projects',
    label: 'Projects Delivered',
    value: 10,
    suffix: '+',
    isPlaceholder: true,
    icon: 'folder',
  },
  {
    id: 'clients',
    label: 'Happy Clients',
    value: 8,
    suffix: '+',
    isPlaceholder: true,
    icon: 'users',
  },
  {
    id: 'technologies',
    label: 'Technologies Used',
    value: 15,
    suffix: '+',
    isPlaceholder: true,
    icon: 'code',
  },
  {
    id: 'industries',
    label: 'Industries Served',
    value: 5,
    suffix: '+',
    isPlaceholder: true,
    icon: 'globe',
  },
  {
    id: 'satisfaction',
    label: 'Client Satisfaction',
    value: 100,
    suffix: '%',
    isPlaceholder: true,
    icon: 'heart',
  },
  {
    id: 'support',
    label: 'Support & Collaboration',
    value: '24/7',
    isPlaceholder: true,
    icon: 'headphones',
  },
];
