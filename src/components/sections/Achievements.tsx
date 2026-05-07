import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/common';
import { SectionHeading, GlassCard, StatIcon } from '@/components/ui';
import { achievements } from '@/data';
import { staggerItem, fadeInUp, smoothTransition } from '@/utils';

export function Achievements() {
  const highlightedAchievements = achievements.filter((a) => a.highlight);
  const otherAchievements = achievements.filter((a) => !a.highlight);

  return (
    <SectionWrapper id="achievements" className="bg-dark-surface/30">
      <SectionHeading
        title="Achievements"
        subtitle="Milestones and accomplishments in my career"
      />

      {/* Highlighted achievements */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {highlightedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <GlassCard
              className="h-full relative overflow-hidden"
              gradient
              padding="md"
            >
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl bg-primary-500/10 flex items-center justify-center mb-3 sm:mb-4">
                  <StatIcon
                    name={achievement.icon}
                    size={20}
                    className="text-primary-400 sm:hidden"
                  />
                  <StatIcon
                    name={achievement.icon}
                    size={28}
                    className="text-primary-400 hidden sm:block"
                  />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">{achievement.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">{achievement.description}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Other achievements */}
      {otherAchievements.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {otherAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlassCard className="h-full" padding="sm">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <StatIcon
                      name={achievement.icon}
                      size={16}
                      className="text-gray-400 sm:hidden"
                    />
                    <StatIcon
                      name={achievement.icon}
                      size={20}
                      className="text-gray-400 hidden sm:block"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1 truncate">{achievement.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
