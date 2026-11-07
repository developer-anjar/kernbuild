export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const WHY_CHOOSE_DATA: WhyChooseItem[] = [
  {
    id: 'business-first',
    title: 'Business-First Thinking',
    description: 'We understand your business requirements before choosing technologies or writing code.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 'complete-ownership',
    title: 'Complete Ownership',
    description: 'From initial planning and UI/UX to development, testing and deployment.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    id: 'built-around-you',
    title: 'Built Around You',
    description: 'Every solution is designed around your specific workflow and business requirements.',
    icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1 2 2 0 110-4 1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  },
  {
    id: 'engineering-scale',
    title: 'Engineering That Scales',
    description: 'Maintainable architecture, structured code and reliable integrations.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    id: 'transparent-collaboration',
    title: 'Transparent Collaboration',
    description: 'Regular updates, clear timelines and direct communication throughout development.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    id: 'beyond-launch',
    title: 'Beyond Launch',
    description: 'We help with hosting, maintenance, improvements and future development.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
];
