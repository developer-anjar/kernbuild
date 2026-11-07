import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { animateSplitText } from '../../animations/textAnimations';

interface RevealTextProps {
  children: ReactNode;
  as?: ElementType;
  types?: 'lines' | 'words' | 'chars' | 'words,chars';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function RevealText({
  children,
  as: Component = 'div',
  types = 'words',
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
}: RevealTextProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const cleanup = animateSplitText(el, {
      types,
      delay,
      duration,
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });

    return cleanup;
  }, [types, delay, duration, stagger]);

  return (
    <Component ref={elementRef} className={`reveal-text ${className}`}>
      {children}
    </Component>
  );
}

