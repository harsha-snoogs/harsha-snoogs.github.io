import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-primary-500 to-cyan-500 text-white
    hover:from-primary-400 hover:to-cyan-400
    active:from-primary-600 active:to-cyan-600
    shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40
  `,
  secondary: `
    bg-dark-card text-white border border-dark-border
    hover:bg-dark-border hover:border-primary-500/50
    active:bg-dark-card/80
    dark:bg-dark-card
  `,
  outline: `
    bg-transparent border-2 border-primary-500 text-primary-400
    hover:bg-primary-500/10
    active:bg-primary-500/20
  `,
  ghost: `
    bg-transparent text-gray-300 hover:text-primary-400 hover:bg-white/5
    active:bg-white/10
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm gap-1 sm:gap-1.5',
  md: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base gap-1.5 sm:gap-2',
  lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg gap-2 sm:gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'left',
      isLoading,
      fullWidth,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={cn(
          'relative inline-flex items-center justify-center font-medium rounded-lg sm:rounded-xl',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'touch-target',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="absolute animate-spin h-4 w-4 sm:h-5 sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        <span className={cn('flex items-center gap-1.5 sm:gap-2', isLoading && 'invisible')}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
