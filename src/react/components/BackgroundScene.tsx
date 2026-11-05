import { HeroScene } from './HeroScene';

/** Persistent particle-wave artwork behind every route and section. */
export function BackgroundScene() {
  return (
    <div className="background-scene" aria-hidden="true">
      <img className="background-scene__image" src="/images/hero/image.png" alt="" fetchPriority="high" />
      <HeroScene fallbackImage="/images/hero/image.png" />
      <span className="background-scene__atmosphere" />
    </div>
  );
}
