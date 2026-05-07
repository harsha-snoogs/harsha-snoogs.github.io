import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-5 md:p-6',
  lg: 'p-5 sm:p-6 md:p-8',
};

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient = false,
  padding = 'md',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-xl sm:rounded-2xl overflow-hidden',
        'backdrop-blur-xl bg-white/5',
        'border border-white/10',
        hover && 'transition-all duration-300 hover:bg-white/10 hover:border-primary-500/30 active:bg-white/15',
        glow && 'shadow-lg shadow-primary-500/10',
        gradient && 'gradient-border',
        paddingStyles[padding],
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      whileTap={hover ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
