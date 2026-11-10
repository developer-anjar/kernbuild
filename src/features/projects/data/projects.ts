import type { Project } from '../types/project';

/**
 * KernBuild Portfolio Projects Configuration
 *
 * Reusable project configuration containing actual studio projects.
 * Easily add or edit projects here without modifying UI components.
 */

export const PROJECTS_DATA: Project[] = [
  {
    id: 'intern-connect',
    slug: 'intern-connect',
    title: 'InternConnect',
    category: 'Full-Stack Web Application',
    shortDescription:
      'A centralized internship management platform connecting students with hiring companies and simplifying tracking workflows.',
    fullDescription:
      'InternConnect is an internship management platform designed to connect students with companies offering internship opportunities. The platform provides a centralized environment where students can discover internships, apply for opportunities, and track their applications in real-time while giving companies tools to manage postings and applicants.',
    thumbnail: '/images/projects/internconnect/IC1.png',
    gallery: [
      '/images/projects/internconnect/IC1.png',
      '/images/projects/internconnect/IC2.png',
      '/images/projects/internconnect/IC3.png',
      '/images/projects/internconnect/IC4.png',
      '/images/projects/internconnect/IC5.png',
      '/images/projects/internconnect/IC6.png',
    ],
    technologies: ['Angular', 'Java Spring Boot', 'MySQL', 'REST APIs', 'JWT Authentication'],
    features: [
      'Student registration and secure authentication',
      'Student profile management',
      'Internship discovery and advanced browsing',
      'Internship application system',
      'Application status tracking in real-time',
      'Company registration and dedicated dashboard',
      'Internship posting and management',
      'Applicant review and management pipeline',
      'Comprehensive Admin dashboard and oversight',
    ],
    completionDate: '2025-11-01',
    status: 'Completed',
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'InternConnect was engineered to bridge the communication and workflow gap between higher education students seeking internships and enterprise teams looking to recruit emerging talent.',
      problemStatement:
        'Internship hunts are often fragmented across multiple job boards, unstandardized email chains, and opaque hiring statuses, making tracking frustrating for students and candidate management overwhelming for employers.',
      solution:
        'We created a secure, unified portal featuring dedicated portals for students, companies, and platform administrators. Students can manage profiles and monitor application stages, while recruiters can post listings and review applicants with clear status workflows.',
      keyFeatures: [
        'Role-based access control with JWT authentication for students, company recruiters, and administrators',
        'Student profile builder with resume, skills, education, and portfolio attachments',
        'Company dashboard for posting vacancies, filtering applicants, and updating candidate status',
        'Real-time application tracking with immediate status progression feedback',
        'Admin oversight console with audit controls and account validation',
      ],
      techStack: [
        'Angular (Frontend Architecture & Component System)',
        'Java Spring Boot (Robust RESTful Backend Services)',
        'MySQL (Relational Data Modeling & Integrity)',
        'JSON Web Tokens (Stateless Security & Session Handling)',
        'REST APIs (Clean decoupled service communication)',
      ],
      challenges: [
        'Architecting strict role-based data isolation between students, multiple recruiting companies, and global admins',
        'Building a resilient application tracking pipeline with concurrent state updates',
        'Designing an intuitive multi-step registration workflow for corporate recruiters',
      ],
      screenshots: [
        {
          url: '/images/projects/internconnect/IC1.png',
          caption: 'InternConnect internship discovery landing page',
        },
        {
          url: '/images/projects/internconnect/IC2.png',
          caption: 'InternConnect student profile and application dashboard',
        },
        {
          url: '/images/projects/internconnect/IC3.png',
          caption: 'Internship listings and recommendations',
        },
        {
          url: '/images/projects/internconnect/IC4.png',
          caption: 'Student internship application history',
        },
        {
          url: '/images/projects/internconnect/IC5.png',
          caption: 'Company internship application management',
        },
        {
          url: '/images/projects/internconnect/IC6.png',
          caption: 'Company review of internship applicants',
        },
      ],
    },
  },
  {
    id: 'vyapari-ai',
    slug: 'vyapari-ai',
    title: 'VyapariAI',
    category: 'AI-Powered Business Application',
    shortDescription:
      'An intelligent AI-powered business assistant designed to simplify inventory, sales, invoices, and expenses for small businesses.',
    fullDescription:
      'VyapariAI is an AI-powered business assistant designed to simplify everyday business operations for small businesses and shopkeepers. It combines AI assistance with business management functionality to help users manage their inventory, sales, invoices, income, and expenses with ease.',
    thumbnail: '/images/projects/vyapariAI.png',
    gallery: [
      '/images/projects/vyapariAI.png',
    ],
    technologies: [
      'Angular',
      'Java Spring Boot',
      'MySQL',
      'Firebase Authentication',
      'Groq API',
      'REST APIs',
    ],
    features: [
      'AI-powered business assistant for operational queries',
      'Business profile and store setup management',
      'Real-time inventory and stock tracking',
      'Instant invoice creation with PDF generation',
      'Income and daily expense logging',
      'Visual sales, profit, and financial dashboard',
      'Firebase authentication and data security',
      'Groq API integration for fast LLM inference',
    ],
    completionDate: '2025-10-15',
    status: 'Completed',
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'VyapariAI provides local retailers and small business operators with an accessible, AI-powered system to digitize operations without complex enterprise software overhead.',
      problemStatement:
        'Small businesses and independent shopkeepers frequently rely on manual ledgers or cumbersome ERP tools, leading to stock discrepancies, lost invoice histories, and zero actionable insights into their daily margins.',
      solution:
        'We designed a clean, mobile-first web app backed by ultra-fast Groq LLM inference. Business owners can generate branded PDF invoices, track real-time stock levels, record expenses, and consult an AI assistant for quick operational decisions.',
      keyFeatures: [
        'AI conversational assistant powered by Groq API for rapid business queries and summaries',
        'Dynamic invoice generation with downloadable PDF output and customer records',
        'Inventory threshold notifications to prevent stockouts and over-ordering',
        'Daily income, expenditure, and gross profit visual reporting',
        'Multi-device access secured via Firebase Authentication',
      ],
      techStack: [
        'Angular (Modern Reactive Client Interface)',
        'Java Spring Boot (Enterprise-grade Transaction Management)',
        'MySQL (ACID-compliant Financial & Stock Records)',
        'Firebase Authentication (Seamless OAuth & Phone/Email Login)',
        'Groq API (Ultra-low Latency AI Inference)',
        'REST APIs (Microservices Architecture)',
      ],
      challenges: [
        'Achieving sub-second response times for the business AI assistant using Groq API',
        'Designing client-side PDF invoice generation that renders consistently across devices',
        'Structuring inventory transactions to eliminate race conditions during high-volume sales',
      ],
      screenshots: [
        {
          url: '/images/projects/vyapariAI.png',
          caption: 'VyapariAI business dashboard, AI assistant, and invoice generator',
        },
      ],
    },
  },
  {
    id: 'cost-build',
    slug: 'cost-build',
    title: 'CostBuild',
    category: 'Web Application',
    shortDescription:
      'An intelligent software project estimation platform that analyzes project scope and generates transparent cost breakdowns.',
    fullDescription:
      'CostBuild is an intelligent software project estimation web application designed to help businesses, startups, and founders understand potential development costs based on their exact functional requirements, tech stack selections, and delivery timelines.',
    thumbnail: '/images/projects/buildcost.png',
    gallery: [
      '/images/projects/buildcost.png',
    ],
    technologies: ['Angular', 'Spring Boot', 'REST APIs', 'AI Estimation Engine'],
    features: [
      'Interactive project scope and requirement breakdown',
      'Feature-by-feature cost calculation algorithms',
      'Tech stack and infrastructure resource modeling',
      'Tiered timeline and milestone estimations',
      'Downloadable estimate summaries and transparent budgeting',
      'Configurable backend pricing models for software agencies',
    ],
    completionDate: '2025-09-20',
    status: 'In Progress',
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'CostBuild is an estimation engine engineered to demystify software development pricing for founders and agency clients.',
      problemStatement:
        'Estimating custom software is traditionally opaque, slow, and inconsistent. Clients frequently face unexpected scope creep or inaccurate initial quotes.',
      solution:
        'CostBuild turns complex project requirements into transparent, itemized cost models and realistic milestone roadmaps using structured estimation parameters.',
      keyFeatures: [
        'Step-by-step feature requirement selector tailored for web and mobile software',
        'Dynamic computation of engineering hours, team composition, and tech stack costs',
        'Visual cost distribution chart categorized by frontend, backend, UI/UX, and cloud infra',
        'Exportable proposal summary for client planning and internal validation',
      ],
      techStack: [
        'Angular (Interactive Dynamic Calculator UI)',
        'Java Spring Boot (Estimation Algorithms & Rules Engine)',
        'REST APIs (Service integration & export pipelines)',
        'AI Estimation Engine (Configurable estimation rules)',
      ],
      challenges: [
        'Formulating dynamic formulas that balance variable project complexities without confusing non-technical users',
        'Ensuring client estimations accurately reflect current engineering market standards',
      ],
      screenshots: [
        {
          url: '/images/projects/buildcost.png',
          caption: 'CostBuild software project scope calculator and estimation summary',
        },
      ],
    },
  },
  {
    id: 'developer-portfolio',
    slug: 'personal-developer-portfolio',
    title: 'Personal Developer Portfolio',
    category: 'Portfolio Website',
    shortDescription:
      'A sleek, high-performance personal developer portfolio showcasing technical skills, full-stack projects, and engineering experience.',
    fullDescription:
      'A personal developer portfolio designed to showcase technical skills, development projects, verified experience, and professional background with smooth modern interactions, clear project walkthroughs, and a responsive design.',
    thumbnail: '/images/projects/portfolio.png',
    gallery: [
      '/images/projects/portfolio.png',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      'Interactive developer about section and personal story',
      'Comprehensive technical skills and competency matrix',
      'Curated project showcase with live links and code repositories',
      'Direct contact workflow with social integration',
      'Fully responsive, accessible, and high-performance design',
    ],
    liveUrl: 'https://portfolio-topaz-beta-84.vercel.app/',
    completionDate: '2025-08-10',
    status: 'Completed',
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'A bespoke developer portfolio crafted to highlight modern engineering capabilities, creative motion, and clean code practices.',
      problemStatement:
        'Standard resume templates fail to demonstrate real frontend craftsmanship, responsive performance, or the interactive polish expected of top-tier software developers.',
      solution:
        'Built with a modern web stack, this portfolio delivers instant page responsiveness, smooth micro-interactions, dark/light visual harmony, and clear project case studies that elevate recruiter and client engagement.',
      keyFeatures: [
        'Clean typography and modern layout designed for high readability',
        'Interactive skill categories detailing full-stack and cloud competencies',
        'Live project cards with quick access to case studies and demos',
        'Optimized asset loading achieving high Lighthouse audit scores',
      ],
      techStack: [
        'React & Next.js (Server-side rendering & client hydration)',
        'TypeScript (Strict type safety and robust component contracts)',
        'Tailwind CSS (Utility-first design system and adaptive spacing)',
        'Framer Motion (Fluid, accessible interface animations)',
        'Vercel (Global Edge CDN deployment)',
      ],
      challenges: [
        'Crafting fluid entry and scroll animations while maintaining 60fps performance across mobile devices',
        'Structuring content to balance technical depth with immediate visual clarity',
      ],
      screenshots: [
        {
          url: '/images/projects/portfolio.png',
          caption: 'Personal Developer Portfolio landing page and project showcase',
        },
      ],
    },
  },
  {
    id: 'petiora-ai',
    slug: 'petiora-ai',
    title: 'Petiora.ai',
    category: 'AI-Powered Pet Rescue Platform',
    shortDescription:
      'An AI-powered animal welfare platform combining intelligent assistance, image analysis, pet adoption and donation services to make animal rescue and responsible pet ownership more accessible.',
    fullDescription:
      'Petiora.ai is an AI-powered animal welfare platform designed to make pet rescue, adoption and animal care more accessible through technology. It integrates intelligent assistance, image analysis, adoption services and donation features into a unified digital ecosystem. The platform connects people with animal welfare resources while encouraging responsible pet ownership and supporting rescue initiatives.',
    thumbnail: '/images/projects/petiora/pet1.png',
    gallery: [
      '/images/projects/petiora/pet1.png',
      '/images/projects/petiora/pet2.png',
      '/images/projects/petiora/pet3.png',
    ],
    technologies: ['Angular 20', 'Java', 'Spring Boot', 'OpenAI API'],
    features: [
      'AI-powered rescue chatbot',
      'Image analysis',
      'Pet adoption module',
      'Donation management',
      'GreenPaws initiative',
    ],
    role: 'Technical Lead',
    status: 'Deployed',
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'Petiora.ai is an AI-powered animal welfare platform designed to make pet rescue, adoption and animal care more accessible through technology. It integrates intelligent assistance, image analysis, adoption services and donation features into a unified digital ecosystem.',
      problemStatement:
        'Making pet rescue, adoption and animal care more accessible while supporting responsible pet ownership and rescue initiatives.',
      solution:
        'The platform connects people with animal welfare resources through intelligent assistance, image analysis, adoption services and donation features.',
      keyFeatures: [
        'AI-powered rescue chatbot',
        'Image analysis',
        'Pet adoption module',
        'Donation management',
        'GreenPaws initiative',
      ],
      techStack: ['Angular 20', 'Java', 'Spring Boot', 'OpenAI API'],
      screenshots: [
        {
          url: '/images/projects/petiora/pet1.png',
          caption: 'Petiora.ai animal welfare platform landing page',
        },
        {
          url: '/images/projects/petiora/pet2.png',
          caption: 'Animal-in-need reporting form and location map',
        },
        {
          url: '/images/projects/petiora/pet3.png',
          caption: 'Pet adoption listings',
        },
      ],
    },
  },
  {
    id: 'aquashield',
    slug: 'aquashield',
    title: 'AquaShield — Environmental Action Hub',
    category: 'Environmental Web Application',
    shortDescription:
      'An interactive environmental awareness platform focused on water pollution, personalized action planning and community-driven environmental initiatives.',
    fullDescription:
      'AquaShield is an interactive environmental awareness and action platform focused on addressing water pollution. It provides users with educational resources, personalized action plans, incident reporting and interactive learning experiences. The platform transforms environmental awareness into meaningful individual and community action through accessible digital tools.',
    thumbnail: '/images/projects/aquashield/aq1.png',
    gallery: [
      '/images/projects/aquashield/aq1.png',
      '/images/projects/aquashield/aq2.png',
      '/images/projects/aquashield/aq3.png',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    features: [
      'Personalized environmental dashboards',
      'Custom action planner',
      'Water pollution incident reporting',
      'Educational guidance',
      'Interactive quizzes',
      'Supabase authentication',
      'Cloud storage integration',
    ],
    status: 'Deployed',
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'AquaShield is an interactive environmental awareness and action platform focused on addressing water pollution. It provides users with educational resources, personalized action plans, incident reporting and interactive learning experiences.',
      problemStatement:
        'Turning environmental awareness about water pollution into meaningful individual and community action.',
      solution:
        'AquaShield brings personalized action planning, incident reporting, educational resources and interactive learning experiences together in accessible digital tools.',
      keyFeatures: [
        'Personalized environmental dashboards',
        'Custom action planner',
        'Water pollution incident reporting',
        'Educational guidance',
        'Interactive quizzes',
        'Supabase authentication',
        'Cloud storage integration',
      ],
      techStack: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
      screenshots: [
        {
          url: '/images/projects/aquashield/aq1.png',
          caption: 'AquaShield environmental action dashboard',
        },
        {
          url: '/images/projects/aquashield/aq2.png',
          caption: 'Personalized environmental action planner',
        },
        {
          url: '/images/projects/aquashield/aq3.png',
          caption: 'Water pollution incident reporting workflow',
        },
      ],
    },
  },
  {
    id: 'recon-x',
    slug: 'recon-x',
    title: 'RECON-X',
    category: 'Database Security / Cybersecurity',
    shortDescription:
      'A database security gateway designed to inspect SQL queries, assess security risks, enforce access policies and prevent unauthorized database access.',
    fullDescription:
      'RECON-X is a database security gateway designed to inspect SQL queries, assess security risks, enforce access policies and prevent unauthorized data access before queries reach a protected database. It provides a centralized security dashboard for query analysis, risk assessment, policy enforcement, audit logs and protected database execution.',
    thumbnail: '/images/projects/recon-x/recon1.png',
    gallery: [
      '/images/projects/recon-x/recon1.png',
      '/images/projects/recon-x/recon2.png',
      '/images/projects/recon-x/recon3.png',
    ],
    technologies: [],
    features: [
      'Inspect SQL statements before execution using SQL parsing and security rules',
      'Assess query risk and provide security decisions',
      'Apply configured policies to allow, flag, restrict or block queries',
      'Execute supported PostgreSQL queries through a restricted database account',
      'Integrate with PostgreSQL and existing demo datasets',
      'Display query activity, risk indicators, execution results and system status',
      'Record security decisions and relevant query activity',
      'Detect suspicious query patterns that may reveal protected information',
      'Apply access restrictions according to configured user roles and permissions',
      'Support privacy-oriented mechanisms such as differential privacy in applicable workflows',
    ],
    featured: true,
    dummy: false,
    caseStudy: {
      overview:
        'RECON-X is a database security gateway designed to inspect SQL queries, assess security risks, enforce access policies and prevent unauthorized data access before queries reach a protected database. It provides a centralized security dashboard for query analysis, risk assessment, policy enforcement, audit logs and protected database execution.',
      problemStatement:
        'SQL queries need to be inspected and checked against access policies before reaching a protected database.',
      solution:
        'RECON-X provides a gateway and centralized security dashboard for query analysis, risk assessment, policy enforcement, audit logs and protected database execution.',
      keyFeatures: [
        'SQL inspection using query parsing and security rules',
        'Query risk assessment and security decisions',
        'Configurable policies to allow, flag, restrict or block queries',
        'Protected execution of supported PostgreSQL queries',
        'PostgreSQL and demo dataset integration',
        'Security dashboard for query activity and system status',
        'Audit logging for security decisions and query activity',
        'Detection of suspicious query patterns',
        'Role-based access restrictions',
        'Privacy-oriented controls, including differential privacy in supported workflows',
      ],
      techStack: [],
      screenshots: [
        {
          url: '/images/projects/recon-x/recon1.png',
          caption: 'RECON-X database security overview dashboard',
        },
        {
          url: '/images/projects/recon-x/recon2.png',
          caption: 'RECON-X SQL query analysis and risk assessment',
        },
        {
          url: '/images/projects/recon-x/recon3.png',
          caption: 'RECON-X security event and session activity dashboard',
        },
      ],
    },
  },
];

export const FEATURED_PROJECTS = PROJECTS_DATA.filter(project => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find(project => project.slug === slug || project.id === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return PROJECTS_DATA
    .filter(item => item.id !== project.id)
    .slice(0, limit);
}
