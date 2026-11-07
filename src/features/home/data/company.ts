import type { CompanyInfo } from '../types/company';
import type { StatisticMetric } from '../types/statistics';

export const COMPANY_INFO: CompanyInfo = {
  name: 'KernBuild',
  tagline: 'Build from the Core',
  description:
    'A full-stack development studio helping startups, businesses, and creators turn ideas into modern, scalable digital products.',
  email: '',
  phone: '',
  location: '',
  socialLinks: {
    linkedin: '',
    github: '',
    instagram: '',
  },
};

export const STATISTICS_DATA: StatisticMetric[] = [
  {
    id: 'stat-projects',
    label: 'Projects delivered',
    value: 0,
    suffix: '+',
    isPlaceholder: true,
    icon: 'M12 2L2 7l10 12 10-12L12 2z',
  },
  {
    id: 'stat-years',
    label: 'Years of experience',
    value: 0,
    suffix: '+',
    isPlaceholder: true,
    icon: 'M12 2L2 7l10 12 10-12L12 2z',
  },
  {
    id: 'stat-clients',
    label: 'Happy clients',
    value: 0,
    suffix: '+',
    isPlaceholder: true,
    icon: 'M12 2L2 7l10 12 10-12L12 2z',
  },
  {
    id: 'stat-retention',
    label: 'Client retention',
    value: 100,
    suffix: '%',
    isPlaceholder: true,
    icon: 'M12 2L2 7l10 12 10-12L12 2z',
  },
];
