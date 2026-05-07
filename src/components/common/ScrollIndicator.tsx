import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import type Lenis from '@studio-freight/lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

interface ScrollIndicatorProps {
  targetId?: string;
}

export function ScrollIndicator({ targetId = 'about' }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80 });
      } else {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-gray-400 hover:text-primary-400 active:text-primary-300 transition-colors touch-target z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          aria-label="Scroll to next section"
        >
          <span className="text-xs sm:text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
