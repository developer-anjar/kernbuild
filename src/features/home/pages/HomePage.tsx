import { useState } from 'react';
import { useHomeMotion } from '../hooks/useHomeMotion';
import { TeamSection } from '../../team/components/TeamSection';
import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';
import { FeedbackSection } from '../sections/FeedbackSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';
import { HeroSection } from '../sections/HeroSection';
import { ProcessSection } from '../sections/ProcessSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ServicesSection } from '../sections/ServicesSection';
import { StatisticsSection } from '../sections/StatisticsSection';
import { TechnologyStrip } from '../sections/TechnologyStrip';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { WhyChooseSection } from '../sections/WhyChooseSection';

export function HomePage() {
  const [animationRoot, setAnimationRoot] = useState<HTMLDivElement | null>(null);
  useHomeMotion(animationRoot);

  return (
    <div ref={setAnimationRoot} className="home-content">
      <HeroSection />
      <TechnologyStrip />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <TeamSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ContactSection />
      <FeedbackSection />
      <StatisticsSection />
      <FinalCtaSection />
    </div>
  );
}
