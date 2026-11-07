import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../../shared/config/site';

export function AboutSection() {
  const [imageVisible, setImageVisible] = useState(true);

  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-art">
          {imageVisible && <img src={SITE_CONFIG.images.about} alt="KernBuild logo" loading="lazy" onError={() => setImageVisible(false)} />}
        </div>
        <div className="about-copy">
          <p className="eyebrow">About KernBuild</p>
          <h2>Strong digital products start with a solid core.</h2>
          <p>KernBuild is a software development studio focused on building practical, modern digital experiences. We work from the foundations—understanding the problem, shaping the right solution, and creating software that can grow with your needs.</p>
          <p>Whether you need a focused landing page, a connected web platform, or an AI-enabled workflow, we bring the pieces together with care and clear communication.</p>
          <Link className="text-link" to="/#contact">Tell us about your idea <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
