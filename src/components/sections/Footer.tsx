import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi';
import { personal } from '@/data';
import type Lenis from '@studio-freight/lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const socialLinks = [
  {
    name: 'GitHub',
    href: personal.social.github,
    icon: FiGithub,
  },
  {
    name: 'LinkedIn',
    href: personal.social.linkedin,
    icon: FiLinkedin,
  },
  {
    name: 'Email',
    href: `mailto:${personal.email}`,
    icon: FiMail,
  },
];

export function Footer() {
  const scrollToTop = useCallback(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-bg border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gradient">{personal.name.split(' ')[0]}</span>
            <span className="text-primary-400">.</span>
          </motion.a>

          {/* Tagline */}
          <p className="text-gray-400 text-center text-sm sm:text-base max-w-md mb-6 sm:mb-8 px-4">
            {personal.title} passionate about building exceptional web
            experiences with modern technologies.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary-400 hover:border-primary-500/30 active:bg-white/10 transition-all touch-target"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="mb-6 sm:mb-8 p-2.5 sm:p-3 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 hover:bg-primary-500/20 active:bg-primary-500/30 transition-all touch-target"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* Copyright */}
          <div className="text-center text-xs sm:text-sm text-gray-500">
            <p className="flex items-center justify-center gap-1 flex-wrap">
              Built with <FiHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" /> using
              <span className="hidden sm:inline">React, TypeScript & Tailwind CSS</span>
              <span className="sm:hidden">React & TypeScript</span>
            </p>
            <p className="mt-1.5 sm:mt-2">
              © {currentYear} {personal.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
