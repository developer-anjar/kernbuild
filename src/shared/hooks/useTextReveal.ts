import { useEffect, useRef } from 'react';
import { animateSplitText, type SplitTextOptions } from '../animations/textAnimations';

export function useTextReveal(options: SplitTextOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cleanup = animateSplitText(el, options);
    return cleanup;
  }, [options.types, options.stagger, options.duration, options.delay, options.yOffset]);

  return ref;
}

