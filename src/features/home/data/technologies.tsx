import type { ReactNode } from 'react';

export interface Technology {
  name: string;
  color: string;
  icon: ReactNode;
}

export const TECHNOLOGIES_DATA: Technology[] = [
  {
    name: 'React',
    color: '#087EA4',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="2" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>,
  },
  {
    name: 'Next.js',
    color: '#111827',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 16V8l9 9M15 8v5" /></svg>,
  },
  {
    name: 'Angular',
    color: '#DD0031',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2 3 5.3l1.4 12.1L12 22l7.6-4.6L21 5.3 12 2Zm0 4.1 5.1 11.6h-2.5l-1-2.6h-3.3l-1 2.6H6.9L12 6.1Zm0 3.3-1 3.4h2l-1-3.4Z" /></svg>,
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="22" height="22" x="1" y="1" rx="2" fill="currentColor" stroke="none" /><path d="M6 9h8M10 9v9m4-4c0 3 4 3 4 0v-5" stroke="#fff" /></svg>,
  },
  {
    name: 'JavaScript',
    color: '#B79500',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="22" height="22" x="1" y="1" rx="2" fill="#F7DF1E" stroke="none" /><path d="M13 15c0 4 5 4 5 0V9M6 14v2c0 3 5 3 5 0v-2" stroke="#111827" /></svg>,
  },
  {
    name: 'Node.js',
    color: '#43853D',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" /><path d="M9 9v6l3 2 3-2V9l-3-2-3 2Z" /></svg>,
  },
  {
    name: 'Spring Boot',
    color: '#5B9A32',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8C8 10 5.9 16.2 3.8 21.3L4 22l2-2c4-4 8-4 12-2 0 0 1-4-1-8Z" /><path d="M17 7c1-2 3-3 5-3M17 7a1 1 0 1 0 0 .1" /></svg>,
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 19c-2 0-3-2-3-5V8c0-3 3-5 8-5s8 2 8 5v5c0 3-2 5-5 5M8 8c1 3 7 3 8 0M12 13v8m0-3-3 3m3-3 3 3" /></svg>,
  },
  {
    name: 'MySQL',
    color: '#00758F',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>,
  },
  {
    name: 'Firebase',
    color: '#E88900',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m4 20 4-16 3 6 2-4 7 14H4Zm7-10 2 4h-3l1-4Z" /></svg>,
  },
  {
    name: 'Vercel',
    color: '#111827',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 3 2 21h20L12 3Z" /></svg>,
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8c1-3 3.5-4 7-4 5 0 5.5 3 8 3.5-1.5 2-3.5 2.5-5 2-1.5 2.5-3.5 3.5-6 3.5-5 0-5.5-3-8-3.5C4.5 7.5 6.5 7 8 8Zm-3 8c1-3 3.5-4 7-4 5 0 5.5 3 8 3.5-1.5 2-3.5 2.5-5 2-1.5 2.5-3.5 3.5-6 3.5-5 0-5.5-3-8-3.5" /></svg>,
  },
];