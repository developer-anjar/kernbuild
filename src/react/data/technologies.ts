export interface Technology {
  name: string;
  svgIcon: string;
}

export const TECHNOLOGIES_DATA: Technology[] = [
  {
    name: 'Angular',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L3 7l1.5 10L12 22l7.5-5L21 7z"/><path d="M12 2v20M7.5 12h9"/></svg>`,
  },
  {
    name: 'Spring Boot',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L4 22l2-2c4-4 8-4 12-2 0 0 1-4-1-8z"/><circle cx="17" cy="7" r="1"/></svg>`,
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
    name: 'AWS',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6"/><path d="M3 16c1.5 2 4.5 4 9 4s7.5-2 9-4"/><path d="M19 16l2 1-2 1"/></svg>`,
  },
  {
    name: 'Docker',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="10" width="4" height="3" rx=".5"/><rect x="7" y="10" width="4" height="3" rx=".5"/><rect x="12" y="10" width="4" height="3" rx=".5"/><rect x="7" y="6" width="4" height="3" rx=".5"/><rect x="12" y="6" width="4" height="3" rx=".5"/><path d="M22 12c-1.5-1-3-1.5-5-1 0-1.5-.5-2.5-1-3"/></svg>`,
  },
  {
    name: 'Tailwind CSS',
    svgIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 8c1-3 3.5-4 7-4 5 0 5.5 3 8 3.5-1.5 2-3.5 2.5-5 2-1.5 2.5-3.5 3.5-6 3.5-5 0-5.5-3-8-3.5C4.5 7.5 6.5 7 8 8z"/><path d="M7 15c1-3 3.5-4 7-4 5 0 5.5 3 8 3.5-1.5 2-3.5 2.5-5 2-1.5 2.5-3.5 3.5-6 3.5-5 0-5.5-3-8-3.5 1.5-2 3.5-2.5 5-2z"/></svg>`,
  },
];
