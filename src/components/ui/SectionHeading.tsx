import { motion } from 'framer-motion';
import { cn, fadeInUp, smoothTransition } from '@/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={smoothTransition}
      className={cn('mb-8 sm:mb-10 md:mb-12 lg:mb-16', alignStyles[align], className)}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 sm:px-0">
          {subtitle}
        </p>
      )}
      <motion.div
        className={cn(
          'h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full mt-4 sm:mt-5 md:mt-6',
          align === 'center' && 'mx-auto',
          align === 'right' && 'ml-auto'
        )}
        initial={{ width: 0 }}
        whileInView={{ width: '5rem' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}
