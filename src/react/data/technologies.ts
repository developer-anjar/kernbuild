export interface Technology {
  name: string;
  svgIcon: string;
}

export const TECHNOLOGIES_DATA: Technology[] = [
  {
    name: 'React',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>`,
  },
  {
    name: 'Next.js',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 16V8l9 9M15 8v5"/></svg>`,
  },
  {
    name: 'Angular',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L3 7l1.5 10L12 22l7.5-5L21 7z"/><path d="M12 2v20M7.5 12h9"/></svg>`,
  },
  {
    name: 'TypeScript',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 9h10M12 9v9M16 14c0 2 3 2 3 0"/></svg>`,
  },
  {
    name: 'JavaScript',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M13 16c0 2 3 2 3 0V9M7 14v2c0 2 3 2 3 0v-2"/></svg>`,
  },
  {
    name: 'Node.js',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M9 9v6l3 2 3-2V9l-3-2z"/></svg>`,
  },
  {
    name: 'Spring Boot',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L4 22l2-2c4-4 8-4 12-2 0 0 1-4-1-8z"/><circle cx="17" cy="7" r="1"/></svg>`,
  },
  {
    name: 'PostgreSQL',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 19c-2 0-3-2-3-5V8c0-3 3-5 8-5s8 2 8 5v5c0 3-2 5-5 5"/><path d="M8 8c1 3 7 3 8 0M12 13v8M12 18l-3 3M12 18l3 3"/></svg>`,
  },
  {
    name: 'MySQL',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,
  },
  {
    name: 'Firebase',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20l4-16 3 6 2-4 7 14z"/></svg>`,
  },
  {
    name: 'Vercel',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3L2 21h20L12 3z"/></svg>`,
  },
  {
    name: 'Tailwind CSS',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 8c1-3 3.5-4 7-4 5 0 5.5 3 8 3.5-1.5 2-3.5 2.5-5 2-1.5 2.5-3.5 3.5-6 3.5-5 0-5.5-3-8-3.5C4.5 7.5 6.5 7 8 8z"/></svg>`,
  },
];