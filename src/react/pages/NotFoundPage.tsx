import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="section not-found-page">
      <div className="container">
        <header className="page-heading">
          <p className="eyebrow">Page not found</p>
          <h1>404</h1>
          <p>We couldn’t find the page you’re looking for.</p>
        </header>
        <div className="section-action">
          <Link className="button" to="/">Return home <span aria-hidden="true">→</span></Link>
          <Link className="button button--outline" to="/projects">Browse projects <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
