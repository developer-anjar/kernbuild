import { WHY_CHOOSE_DATA } from '../data/why-choose';

export function WhyChooseSection() {
  return (
    <section className="section section--lavender why-choose-section" id="why-choose">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Why KernBuild?</p>
          <h2>We don&apos;t just develop websites. We build digital products around your business goals.</h2>
          <p>
            Experience end-to-end craftsmanship designed to solve operational challenges, captivate users, and deliver measurable impact.
          </p>
        </header>

        <div className="reasons-grid">
          {WHY_CHOOSE_DATA.map((reason, idx) => (
            <article className="reason-card" key={reason.id || reason.title}>
              <div className="reason-card__header">
                <span className="reason-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={reason.icon} />
                  </svg>
                </span>
                <span className="reason-card__number">0{idx + 1}</span>
              </div>
              <div className="reason-card__content">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Strong Visual Statement */}
        <div className="why-choose-statement" aria-label="KernBuild core belief">
          <div className="why-choose-statement__inner">
            <span className="statement-icon">✦</span>
            <h3>&ldquo;Your idea deserves more than just a website. It deserves the right engineering.&rdquo;</h3>
            <p>Every product we craft reflects our commitment to stability, speed, and real business value.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
