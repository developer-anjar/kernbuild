import { NotFoundActions } from './NotFoundActions';
import { NotFoundHeading } from './NotFoundHeading';

export function NotFoundPage() {
  return (
    <section className="section not-found-page">
      <div className="container">
        <NotFoundHeading />
        <NotFoundActions />
      </div>
    </section>
  );
}
