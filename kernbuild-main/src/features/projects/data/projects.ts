import type { Project } from '../types/project';

/**
 * Dummy portfolio projects.
 *
 * These projects are placeholder examples used to demonstrate the portfolio
 * section of a frontend-only website. They are NOT real KernBuild client
 * engagements and must not be presented as genuine client work. Replace
 * this data with real project details as they become available.
 */

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-001',
    slug: 'lumen-business-website',
    title: 'Lumen Business Website',
    category: 'Web Applications',
    shortDescription:
      'A clean, responsive business website for a professional services firm.',
    fullDescription:
      'Lumen is a multi-page business website designed for a consulting practice. It features a services showcase, case studies, a contact inquiry flow, and a content-managed blog. Built with a focus on performance, accessibility, and clear typography, the site presents the firm’s brand while guiding visitors toward consultation requests.',
    thumbnail: '/images/projects/lumen-business-thumb.svg',
    gallery: [
      '/images/projects/lumen-business-thumb.svg',
      '/images/projects/lumen-business-thumb.svg',
      '/images/projects/lumen-business-thumb.svg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    features: [
      'Responsive multi-page layout',
      'Services and case-study showcase',
      'Contact inquiry form',
      'SEO-friendly markup',
      'Fast initial load',
    ],
    liveUrl: 'https://lumen-example.vercel.app',
    githubUrl: 'https://github.com/kernbuild-demo/lumen-business',
    completionDate: '2025-11-10',
    status: 'Completed',
    featured: true,
    dummy: true,
  },
  {
    id: 'proj-002',
    slug: 'cartly-ecommerce-store',
    title: 'Cartly E-commerce Store',
    category: 'E-commerce',
    shortDescription:
      'A small-batch online store with product catalog and checkout flow.',
    fullDescription:
      'Cartly is a lightweight e-commerce storefront for a boutique brand. It includes a product catalog with filtering, a shopping cart, a Stripe-integrated checkout flow, and an order confirmation page. The checkout and payments are simulated for demonstration purposes.',
    thumbnail: '/images/projects/cartly-ecommerce-thumb.svg',
    gallery: [
      '/images/projects/cartly-ecommerce-thumb.svg',
      '/images/projects/cartly-ecommerce-thumb.svg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    features: [
      'Product catalog with category filtering',
      'Shopping cart with persistent state',
      'Simulated Stripe checkout flow',
      'Mobile-responsive product grids',
      'Order confirmation screen',
    ],
    liveUrl: 'https://cartly-example.vercel.app',
    githubUrl: 'https://github.com/kernbuild-demo/cartly-ecommerce',
    completionDate: '2025-10-20',
    status: 'Completed',
    featured: true,
    dummy: true,
  },
  {
    id: 'proj-003',
    slug: 'flowstate-management-system',
    title: 'FlowState Management System',
    category: 'Management Systems',
    shortDescription:
      'An internal operations dashboard for task and team management.',
    fullDescription:
      'FlowState is an internal management system that helps small teams track projects, assign tasks, and monitor progress. It features role-based views, a Kanban-style task board, activity feeds, and reporting summaries. Built as a demonstration of dashboard-oriented interfaces.',
    thumbnail: '/images/projects/flowstate-management-thumb.svg',
    gallery: [
      '/images/projects/flowstate-management-thumb.svg',
      '/images/projects/flowstate-management-thumb.svg',
      '/images/projects/flowstate-management-thumb.svg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Vercel'],
    features: [
      'Kanban task board with drag-and-drop',
      'Role-based team views',
      'Activity feed and notifications',
      'Progress reporting charts',
      'Responsive dashboard layout',
    ],
    liveUrl: 'https://flowstate-example.vercel.app',
    githubUrl: 'https://github.com/kernbuild-demo/flowstate-management',
    completionDate: '2025-09-05',
    status: 'Completed',
    featured: false,
    dummy: true,
  },
  {
    id: 'proj-004',
    slug: 'nexus-ai-powered-app',
    title: 'Nexus AI-Powered Application',
    category: 'AI Applications',
    shortDescription:
      'An AI-assisted content and workflow assistant web application.',
    fullDescription:
      'Nexus demonstrates an AI-powered web application that helps users draft, summarize, and organize content. It integrates a language-model API for generation, includes conversation history, and lets users export results. The AI keys are simulated in this demo build.',
    thumbnail: '/images/projects/nexus-ai-thumb.svg',
    gallery: [
      '/images/projects/nexus-ai-thumb.svg',
      '/images/projects/nexus-ai-thumb.svg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vercel'],
    features: [
      'AI-generated content drafting',
      'Conversation history',
      'Result export and copy',
      'Streaming response UI',
      'Responsive application layout',
    ],
    liveUrl: 'https://nexus-ai-example.vercel.app',
    githubUrl: 'https://github.com/kernbuild-demo/nexus-ai',
    completionDate: '2025-08-15',
    status: 'Completed',
    featured: true,
    dummy: true,
  },
  {
    id: 'proj-005',
    slug: 'ora-portfolio-website',
    title: 'Ora Portfolio Website',
    category: 'Portfolio',
    shortDescription:
      'A minimalist creative portfolio for a freelance designer.',
    fullDescription:
      'Ora is a minimalist portfolio website for a freelance visual designer. It highlights selected work in a visual grid, includes project detail pages, an about section, and a contact form. The design emphasizes imagery, whitespace, and smooth transitions.',
    thumbnail: '/images/projects/ora-portfolio-thumb.svg',
    gallery: [
      '/images/projects/ora-portfolio-thumb.svg',
      '/images/projects/ora-portfolio-thumb.svg',
      '/images/projects/ora-portfolio-thumb.svg',
      '/images/projects/ora-portfolio-thumb.svg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      'Visual project grid',
      'Project detail pages',
      'About and contact sections',
      'Smooth page transitions',
      'Mobile-first responsive design',
    ],
    liveUrl: 'https://ora-portfolio-example.vercel.app',
    githubUrl: 'https://github.com/kernbuild-demo/ora-portfolio',
    completionDate: '2025-07-22',
    status: 'Completed',
    featured: false,
    dummy: true,
  },
  {
    id: 'proj-006',
    slug: 'spire-saas-web-application',
    title: 'Spire SaaS Web Application',
    category: 'SaaS',
    shortDescription:
      'A multi-tenant SaaS application with subscription and billing.',
    fullDescription:
      'Spire is a demonstration SaaS web application featuring multi-tenant organization workspaces, subscription plans, billing integration, and user invitations. Payments are simulated in this build. It showcases dashboard scaffolding, settings management, and team collaboration UI.',
    thumbnail: '/images/projects/spire-saas-thumb.svg',
    gallery: [
      '/images/projects/spire-saas-thumb.svg',
      '/images/projects/spire-saas-thumb.svg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    features: [
      'Multi-tenant organization workspaces',
      'Subscription and billing management',
      'User invitations and team roles',
      'Settings and billing pages',
      'Responsive SaaS dashboard layout',
    ],
    liveUrl: 'https://spire-saas-example.vercel.app',
    githubUrl: 'https://github.com/kernbuild-demo/spire-saas',
    completionDate: '2025-06-30',
    status: 'Completed',
    featured: false,
    dummy: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS_DATA.filter(project => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find(project => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return PROJECTS_DATA
    .filter(item => item.id !== project.id && item.category === project.category)
    .slice(0, limit);
}
