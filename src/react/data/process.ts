export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: 1,
    title: 'Understand',
    description: 'We discuss your idea, goals, and requirements.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    step: 2,
    title: 'Plan',
    description: 'We create a clear plan, technology stack, and timeline.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    step: 3,
    title: 'Build',
    description: 'We develop, test, and keep you updated.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    step: 4,
    title: 'Launch',
    description: 'We deploy and support your product for long-term growth.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
];
