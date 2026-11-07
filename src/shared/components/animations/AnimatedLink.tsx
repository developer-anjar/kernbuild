import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface AnimatedLinkProps {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export function AnimatedLink({
  to,
  href,
  children,
  className = '',
  onClick,
  target,
  rel,
}: AnimatedLinkProps) {
  const content = (
    <span className="animated-link__inner">
      <span className="animated-link__text">{children}</span>
      <span className="animated-link__line" aria-hidden="true" />
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={`animated-link ${className}`} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <motion.a
      href={href}
      className={`animated-link ${className}`}
      onClick={onClick}
      target={target}
      rel={rel}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.a>
  );
}

