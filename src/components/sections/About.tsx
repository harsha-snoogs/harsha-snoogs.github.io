import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiCode, FiZap, FiUsers, FiTarget } from 'react-icons/fi';
import { SectionWrapper } from '@/components/common';
import { SectionHeading, GlassCard } from '@/components/ui';
import { personal } from '@/data';
import { slideInLeft, slideInRight, smoothTransition, staggerItem } from '@/utils';

const highlights = [
  {
    icon: FiCode,
    title: 'Clean Architecture',
    description: 'Building scalable, maintainable codebases with modern design patterns',
  },
  {
    icon: FiZap,
    title: 'Performance Focused',
    description: 'Optimizing for speed with code-splitting, lazy loading, and efficient rendering',
  },
  {
    icon: FiUsers,
    title: 'User Experience',
    description: 'Creating intuitive interfaces with accessibility and cross-browser compatibility',
  },
  {
    icon: FiTarget,
    title: 'Real-time Systems',
    description: 'Expert in WebSocket integrations and live data visualization',
  },
];

export function About() {
  return (
    <SectionWrapper id="about" className="bg-dark-surface/30">
      <SectionHeading
        title="About Me"
        subtitle="Passionate about building exceptional web experiences"
      />

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={smoothTransition}
        >
          <GlassCard className="relative overflow-hidden" gradient>
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-2xl" />
            
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
              {personal.summary}
            </p>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
              Experienced in building real-time fintech applications with WebSocket 
              integrations, Web3 wallet connectivity, and live data visualizations. 
              Passionate about code quality, UI consistency, and improving user experience.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <FiMapPin className="text-primary-400 flex-shrink-0" />
                <span className="truncate">{personal.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FiMail className="text-primary-400 flex-shrink-0" />
                <span className="truncate">{personal.email}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={smoothTransition}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlassCard className="h-full" padding="md">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-500/10 flex items-center justify-center mb-3 sm:mb-4">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                </div>
                <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
