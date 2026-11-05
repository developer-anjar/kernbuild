import type { Variants } from 'motion/react';

export const motionTransitions = {
  springQuick: { type: 'spring', stiffness: 400, damping: 28 },
  springGentle: { type: 'spring', stiffness: 260, damping: 20 },
  smoothEase: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  staggerQuick: 0.06,
  staggerStandard: 0.1,
} as const;

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const menuItemVariants: Variants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 },
};
