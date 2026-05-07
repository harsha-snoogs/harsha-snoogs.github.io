import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { SectionWrapper } from '@/components/common';
import { SectionHeading, GlassCard, Badge } from '@/components/ui';
import { experience } from '@/data';
import { cn, fadeInUp, smoothTransition } from '@/utils';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <SectionWrapper id="experience" className="bg-dark-surface/30">
      <SectionHeading
        title="Work Experience"
        subtitle="My professional journey in software development"
      />

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Timeline line - left on mobile, center on desktop */}
        <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-px bg-dark-border md:-translate-x-px">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-500 to-cyan-500"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: index * 0.1 }}
              className={cn(
                'relative pl-10 sm:pl-14 md:pl-0',
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-500 border-2 sm:border-4 border-dark-bg z-10',
                  'left-2.5 sm:left-4 md:left-1/2 md:-translate-x-1/2'
                )}
              />

              <GlassCard
                className={cn(
                  'relative',
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                )}
                gradient
                padding="md"
              >
                {/* Date and location */}
                <div
                  className={cn(
                    'flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-400',
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  )}
                >
                  <span className="flex items-center gap-1">
                    <FiCalendar className="text-primary-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[11px] sm:text-sm">{exp.startDate} - {exp.endDate}</span>
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-primary-400 w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-[11px] sm:text-sm">{exp.location}</span>
                    </span>
                  )}
                </div>

                {/* Role and company */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1">{exp.role}</h3>
                <p className="text-primary-400 font-medium text-sm sm:text-base mb-3 sm:mb-4">{exp.company}</p>

                {/* Description - show fewer items on mobile */}
                <ul
                  className={cn(
                    'space-y-1.5 sm:space-y-2 mb-3 sm:mb-4',
                    index % 2 === 0 ? 'md:text-right' : 'text-left'
                  )}
                >
                  {exp.description.slice(0, 3).map((item, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-gray-400 flex items-start gap-2"
                    >
                      <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
                      <span className="text-left line-clamp-2 sm:line-clamp-none">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Achievements - hide on very small screens */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div
                    className={cn(
                      'hidden sm:flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4',
                      index % 2 === 0 ? 'md:justify-end' : 'justify-start'
                    )}
                  >
                    {exp.achievements.slice(0, 3).map((achievement) => (
                      <div
                        key={achievement.metric}
                        className="text-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-primary-500/10"
                      >
                        <div className="text-sm sm:text-lg font-bold text-primary-400">
                          {achievement.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-400">
                          {achievement.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div
                  className={cn(
                    'flex flex-wrap gap-1.5 sm:gap-2',
                    index % 2 === 0 ? 'md:justify-end' : 'justify-start'
                  )}
                >
                  {exp.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="default" size="sm" className="text-[10px] sm:text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {exp.technologies.length > 5 && (
                    <Badge variant="outline" size="sm" className="text-[10px] sm:text-xs">
                      +{exp.technologies.length - 5}
                    </Badge>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
