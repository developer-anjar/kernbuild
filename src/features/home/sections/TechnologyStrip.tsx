import { TECHNOLOGIES_DATA } from '../data/technologies';

export function TechnologyStrip() {
  return (
    <section className="technology-strip" aria-label="Technologies">
      <div className="container technology-content">
        <p>Tools we work with</p>
        <div className="technology-marquee">
          <div className="technology-marquee__track">
            {[0, 1].map(copy => (
              <div
                className="technology-list"
                key={copy}
                role={copy === 0 ? 'list' : undefined}
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                {TECHNOLOGIES_DATA.map(technology => (
                  <span
                    className="technology-item"
                    key={technology.name}
                    role={copy === 0 ? 'listitem' : undefined}
                    style={{ color: technology.color }}
                  >
                    <span className="technology-item__logo">{technology.icon}</span>
                    <span className="technology-item__name">{technology.name}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
