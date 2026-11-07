import type { Testimonial } from '../types/testimonial';

/**
 * Dummy testimonials.
 *
 * These testimonials are placeholder examples used to demonstrate the
 * testimonials section of a frontend-only website. They are NOT real client
 * feedback and must not be presented as verified reviews. No verification
 * badges are displayed for these entries. Submitted testimonials through the
 * public feedback form are not published automatically; they are reviewed and
 * approved manually by the KernBuild team.
 */

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-001',
    clientName: 'Alex Morgan',
    designation: 'Product Lead',
    companyName: 'Lumen Consulting',
    projectName: 'Lumen Business Website',
    feedback:
      'KernBuild turned our vision into a polished, performant website. The team communicated clearly at every stage and delivered ahead of schedule.',
    rating: 5,
    profileImage: '/images/team/placeholder-avatar.svg',
    date: '2025-11-12',
    featured: true,
    verified: false,
    dummy: true,
  },
  {
    id: 'test-002',
    clientName: 'Samira Patel',
    designation: 'Founder',
    companyName: 'Cartly Goods',
    projectName: 'Cartly E-commerce Store',
    feedback:
      'The online store KernBuild built for us is easy to manage and looks great on every device. Our customers have already commented on the smooth checkout experience.',
    rating: 5,
    profileImage: '/images/team/placeholder-avatar.svg',
    date: '2025-10-24',
    featured: true,
    verified: false,
    dummy: true,
  },
  {
    id: 'test-003',
    clientName: 'Jordan Lee',
    designation: 'Operations Manager',
    companyName: 'FlowState Ops',
    projectName: 'FlowState Management System',
    feedback:
      'Our team now tracks tasks and progress in one place. The dashboard is intuitive and has already improved how we run weekly reviews.',
    rating: 4,
    profileImage: '/images/team/placeholder-avatar.svg',
    date: '2025-09-10',
    featured: false,
    verified: false,
    dummy: true,
  },
  {
    id: 'test-004',
    clientName: 'Taylor Chen',
    designation: 'Marketing Director',
    companyName: 'Nexus Labs',
    projectName: 'Nexus AI-Powered Application',
    feedback:
      'The AI assistant KernBuild prototyped for us saves hours of drafting each week. It is a impressive starting point for our internal tooling.',
    rating: 5,
    profileImage: '/images/team/placeholder-avatar.svg',
    date: '2025-08-19',
    featured: true,
    verified: false,
    dummy: true,
  },
  {
    id: 'test-005',
    clientName: 'Casey Ruiz',
    designation: 'Freelance Designer',
    companyName: 'Ora Studio',
    projectName: 'Ora Portfolio Website',
    feedback:
      'A minimalist portfolio that puts my work front and center. KernBuild captured exactly the tone I wanted, and the site loads quickly on mobile.',
    rating: 4,
    profileImage: '/images/team/placeholder-avatar.svg',
    date: '2025-07-26',
    featured: false,
    verified: false,
    dummy: true,
  },
  {
    id: 'test-006',
    clientName: 'Riley Quinn',
    designation: 'CTO',
    companyName: 'Spire Systems',
    projectName: 'Spire SaaS Web Application',
    feedback:
      'The multi-tenant SaaS scaffolding KernBuild delivered gave us a strong foundation. The billing and team-role features work exactly as discussed.',
    rating: 5,
    profileImage: '/images/team/placeholder-avatar.svg',
    date: '2025-07-05',
    featured: false,
    verified: false,
    dummy: true,
  },
];

export const FEATURED_TESTIMONIALS = TESTIMONIALS_DATA.filter(
  testimonial => testimonial.featured,
);

export function getTestimonialById(id: string): Testimonial | undefined {
  return TESTIMONIALS_DATA.find(testimonial => testimonial.id === id);
}
