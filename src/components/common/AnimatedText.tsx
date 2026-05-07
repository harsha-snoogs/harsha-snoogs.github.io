import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn('inline-flex flex-wrap', className)}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterText({
  text,
  className,
  speed = 0.05,
  delay = 0,
}: TypewriterTextProps) {
  const characters = text.split('');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0 },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={characterVariants}>
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-primary-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      />
    </motion.span>
  );
}
