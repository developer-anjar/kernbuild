import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../../projects/data/projects';

const stories = PROJECTS_DATA.filter(project => !project.dummy);

export function TestimonialsSection() {
  const [activeStory, setActiveStory] = useState(0);
  const story = stories[activeStory];

  const move = (offset: number) => {
    setActiveStory(current => (current + offset + stories.length) % stories.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  };

  return (
    <section className="section testimonials-section">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Client stories</p>
          <h2>Built together, improved together</h2>
          <p>A closer look at products and platforms we’ve helped bring to life.</p>
        </header>

        {story ? (
          <div
            className="stories-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="KernBuild project stories"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <div className="stories-carousel__controls">
              <p aria-live="polite">Project {activeStory + 1} of {stories.length}</p>
              <div>
                <button type="button" onClick={() => move(-1)} aria-label="Previous project story">
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" onClick={() => move(1)} aria-label="Next project story">
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <article className="story-card" aria-live="polite" aria-atomic="true">
              <p className="story-card__eyebrow">Project spotlight <span aria-hidden="true">·</span> {story.category}</p>
              <h3>{story.title}</h3>
              <p>{story.caseStudy?.overview || story.fullDescription}</p>
              <Link className="text-link" to={`/projects/${story.slug}`}>
                Explore the project <span aria-hidden="true">→</span>
              </Link>
            </article>

            <div className="stories-carousel__pagination" role="group" aria-label="Choose a project story">
              {stories.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  aria-label={`Show story ${index + 1}: ${item.title}`}
                  aria-current={activeStory === index ? 'true' : undefined}
                  className={activeStory === index ? 'active' : undefined}
                  onClick={() => setActiveStory(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="testimonial-placeholder">
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <p>Client stories will appear here as soon as we have projects approved to share.</p>
            <Link className="text-link" to="/feedback">
              Share your experience <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
