import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { SectionWrapper } from '@/components/common';
import { SectionHeading, GlassCard, SkillIcon } from '@/components/ui';
import { skills, skillCategories, type SkillCategory } from '@/data';
import { cn, staggerItem } from '@/utils';

const categoryOrder: SkillCategory[] = ['languages', 'frameworks', 'css', 'state', 'tools', 'apis'];

// Group skills by category
function getSkillsByCategory() {
  const grouped: Record<SkillCategory, typeof skills> = {
    languages: [],
    frameworks: [],
    css: [],
    state: [],
    tools: [],
    apis: [],
  };
  
  skills.forEach(skill => {
    grouped[skill.category].push(skill);
  });
  
  return grouped;
}

// Mobile: Compact grouped view
function MobileSkillsView() {
  const [expandedCategory, setExpandedCategory] = useState<SkillCategory | null>(null);
  const groupedSkills = getSkillsByCategory();

  return (
    <div className="space-y-3 md:hidden">
      {categoryOrder.map((category) => {
        const categorySkills = groupedSkills[category];
        const isExpanded = expandedCategory === category;
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            {/* Category header - tappable to expand */}
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category)}
              className="w-full flex items-center justify-between p-4 text-left active:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">
                  {skillCategories[category]}
                </span>
                <span className="text-xs text-gray-500">
                  {categorySkills.length} skills
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>

            {/* Skills chips - always visible preview + expanded full view */}
            <div className="px-4 pb-4">
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  // Expanded: Show all with proficiency
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-center gap-3 py-1.5"
                      >
                        <SkillIcon
                          name={skill.icon}
                          size={18}
                          className="text-primary-400 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-300 flex-1">{skill.name}</span>
                        <div className="w-16 h-1.5 bg-dark-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">
                          {skill.proficiency}%
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  // Collapsed: Show compact chips
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap gap-2"
                  >
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400"
                      >
                        <SkillIcon name={skill.icon} size={12} className="text-primary-400" />
                        {skill.name}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Desktop: Full card grid view with filters
function DesktopSkillsView() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div className="hidden md:block">
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <motion.button
          onClick={() => setActiveCategory('all')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeCategory === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          All
        </motion.button>
        {categoryOrder.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {skillCategories[category]}
          </motion.button>
        ))}
      </div>

      {/* Skills grid */}
      <motion.div
        layout
        className="grid grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              transition={{ delay: index * 0.02 }}
            >
              <GlassCard
                className="text-center group cursor-default"
                padding="md"
              >
                <div className="relative mb-3">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-primary-500/10 transition-colors">
                    <SkillIcon
                      name={skill.icon}
                      size={28}
                      className="text-gray-400 group-hover:text-primary-400 transition-colors"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-medium mb-2 truncate">{skill.name}</h3>
                <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.03 }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {skill.proficiency}%
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="The tools and technologies I work with"
      />

      {/* Mobile: Grouped accordion view */}
      <MobileSkillsView />

      {/* Desktop: Filterable grid view */}
      <DesktopSkillsView />
    </SectionWrapper>
  );
}
