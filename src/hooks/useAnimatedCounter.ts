import { useEffect, useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: UseAnimatedCounterOptions) {
  const { ref, isInView } = useScrollAnimation<HTMLSpanElement>({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return {
    ref,
    value: `${prefix}${count}${suffix}`,
    isInView,
  };
}
