import { Link } from 'react-router-dom';

export function NotFoundActions() {
  return (
    <div className="section-action">
      <Link className="button" to="/">Return home <span aria-hidden="true">→</span></Link>
      <Link className="button button--outline" to="/projects">Browse projects <span aria-hidden="true">→</span></Link>
    </div>
  );
}
