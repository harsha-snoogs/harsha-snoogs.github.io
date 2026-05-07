import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/utils';

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none opacity-20',
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  );
}

interface NoiseOverlayProps {
  opacity?: number;
}

export function NoiseOverlay({ opacity = 0.03 }: NoiseOverlayProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating ring - more subtle */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 border border-primary-500/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-24 right-24 w-64 h-64 border border-cyan-500/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Floating code brackets - more subtle */}
      <motion.div
        className="absolute top-1/4 left-12 text-7xl font-mono text-primary-500/[0.07] select-none"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {'</>'}
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-12 text-6xl font-mono text-cyan-500/[0.07] select-none"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {'{ }'}
      </motion.div>
      
      {/* Small accent dots */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary-400/40 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400/40 rounded-full"
        animate={{ 
          scale: [1, 2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Spotlight effect following mouse - more subtle */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Grid dots - more subtle */}
      <div className="absolute inset-0 opacity-40" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20, 184, 166, 0.12) 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />
    </div>
  );
}

function GlowingLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(20, 184, 166, 0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(6, 182, 212, 0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      
      {/* Horizontal animated line */}
      <motion.line
        x1="0%"
        y1="25%"
        x2="100%"
        y2="25%"
        stroke="url(#line-gradient-1)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.line
        x1="0%"
        y1="75%"
        x2="100%"
        y2="75%"
        stroke="url(#line-gradient-1)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />
      
      {/* Vertical animated line */}
      <motion.line
        x1="15%"
        y1="0%"
        x2="15%"
        y2="100%"
        stroke="url(#line-gradient-2)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      <motion.line
        x1="85%"
        y1="0%"
        x2="85%"
        y2="100%"
        stroke="url(#line-gradient-2)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
      />
    </svg>
  );
}

function AuroraEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top left glow - very subtle */}
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-full h-full opacity-15"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, #14b8a6 0deg, #06b6d4 120deg, #10b981 240deg, #14b8a6 360deg)',
          filter: 'blur(120px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
        }}
      />
      
      {/* Bottom right glow */}
      <motion.div
        className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 opacity-10"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #06b6d4 0deg, #14b8a6 180deg, #06b6d4 360deg)',
          filter: 'blur(100px)',
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
        }}
      />
    </div>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Solid dark base for better contrast */}
      <div className="absolute inset-0 bg-[#050508]" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-[#070710] to-dark-bg" />
      
      {/* Aurora effect - very subtle */}
      <AuroraEffect />
      
      {/* Interactive grid with mouse follow */}
      <InteractiveGrid />
      
      {/* Animated glowing lines */}
      <GlowingLines />
      
      {/* Floating decorative elements */}
      <FloatingShapes />
      
      {/* Strong vignette for focus on content */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(5, 5, 8, 0.7) 100%)',
        }}
      />
      
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />
    </div>
  );
}

export function GradientOrb({
  className,
  color = 'primary',
  size = 'lg',
  blur = 'lg',
  animate = true,
}: {
  className?: string;
  color?: 'primary' | 'cyan' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  blur?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}) {
  const colorStyles = {
    primary: 'bg-primary-500/30',
    cyan: 'bg-cyan-500/30',
    accent: 'bg-accent-500/30',
  };

  const sizeStyles = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const blurStyles = {
    sm: 'blur-2xl',
    md: 'blur-3xl',
    lg: 'blur-[100px]',
  };

  if (animate) {
    return (
      <motion.div
        className={cn(
          'absolute rounded-full pointer-events-none',
          colorStyles[color],
          sizeStyles[size],
          blurStyles[blur],
          className
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    );
  }

  return (
    <div
      className={cn(
        'absolute rounded-full pointer-events-none',
        colorStyles[color],
        sizeStyles[size],
        blurStyles[blur],
        className
      )}
    />
  );
}
