import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn, staggerContainer } from '@/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 overflow-hidden',
        className
      )}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={cn(
          !fullWidth && 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          containerClassName
        )}
      >
        {children}
      </motion.div>
    </section>
  );
}
