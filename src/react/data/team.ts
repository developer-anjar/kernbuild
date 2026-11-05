import type { TeamMember } from '../types/team';

/**
 * KernBuild Founding Leadership Team
 *
 * Official founding members and their respective leadership roles.
 */

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Anjar Alam',
    designation: 'Founder & CEO',
    title: 'Chief Executive Officer',
    accentColor: '#FF5A1F',
    profileImage: '/images/team/anjar.jpg',
    skills: [
      'Business Strategy',
      'Full Stack Development',
      'Project Management',
      'Client Relations',
      'Technical Planning',
      'Product Development',
    ],
    socialLinks: {},
    dummy: false,
  },
  {
    id: 'team-002',
    name: 'Atharv Bhoyar',
    designation: 'Co-Founder & CTO',
    title: 'Chief Technology Officer',
    accentColor: '#681FEA',
    profileImage: '/images/team/placeholder-avatar.svg',
    skills: [
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
      'Database Management',
      'API Integration',
      'Web Animations',
    ],
    socialLinks: {},
    dummy: false,
  },
  {
    id: 'team-003',
    name: 'Aryan Dalvi',
    designation: 'Co-Founder & CDO',
    title: 'Chief Design Officer',
    accentColor: '#E5488A',
    profileImage: '/images/team/placeholder-avatar.svg',
    skills: [
      'UI/UX Design',
      'Graphic Design',
      'Brand Identity',
      'Logo Design',
      'Prototyping',
      'Visual Communication',
    ],
    socialLinks: {},
    dummy: false,
  },
  {
    id: 'team-004',
    name: 'Aakanksha Ingoe',
    designation: 'Co-Founder & CMO',
    title: 'Chief Marketing Officer',
    accentColor: '#FF8A00',
    profileImage: '/images/team/placeholder-avatar.svg',
    skills: [
      'Marketing Strategy',
      'Brand Positioning',
      'Social Media Management',
      'Lead Generation',
      'Content Strategy',
      'Client Outreach',
    ],
    socialLinks: {},
    dummy: false,
  },
];

export function getTeamMemberById(
  id: string
): TeamMember | undefined {
  return TEAM_DATA.find(member => member.id === id);
}