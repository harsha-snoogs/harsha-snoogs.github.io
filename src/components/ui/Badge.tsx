import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
  animated?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-dark-card text-gray-300 border border-dark-border',
  primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
  secondary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  outline: 'bg-transparent text-gray-400 border border-gray-600',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs',
  md: 'px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  className,
  animated = false,
}: BadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-1 sm:gap-1.5 rounded-full font-medium',
    'transition-colors duration-200',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (animated) {
    return (
      <motion.span
        className={baseClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </motion.span>
    );
  }

  return (
    <span className={baseClasses}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
