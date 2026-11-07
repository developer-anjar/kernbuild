import { type ReactNode, type HTMLAttributes } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'section' | 'div' | 'article' | 'header';
  y?: number;
  duration?: number;
  stagger?: number;
}

export function RevealSection({
  children,
  as: Component = 'section',
  y = 28,
  duration = 0.85,
  stagger = 0.08,
  className = '',
  ...rest
}: RevealSectionProps) {
  const ref = useScrollReveal({ y, duration, stagger });

  return (
    <Component ref={ref as any} className={`reveal-section ${className}`} {...rest}>
      {children}
    </Component>
  );
}

