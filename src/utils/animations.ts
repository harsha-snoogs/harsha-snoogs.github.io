import type { Variants, Transition } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const quickTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

export function createStaggerDelay(index: number, baseDelay = 0.1): number {
  return index * baseDelay;
}

export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const pathAnimation: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};
