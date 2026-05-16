import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiLock } from "react-icons/fi";
import { SectionWrapper } from "@/components/common";
import { SectionHeading, GlassCard, Badge } from "@/components/ui";
import { projects, projectCategories, type ProjectCategory } from "@/data";
import { cn, staggerItem } from "@/utils";

const categoryOrder: ProjectCategory[] = ["all", "fintech", "tools", "web"];

const categoryGradients: Record<string, string> = {
  fintech: "from-emerald-500/30 via-dark-card to-teal-500/20",
  web3: "from-violet-500/30 via-dark-card to-indigo-500/20",
  tools: "from-amber-500/30 via-dark-card to-orange-500/20",
  web: "from-sky-500/30 via-dark-card to-cyan-500/20",
};

function ProjectPlaceholder({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const gradient =
    categoryGradients[category] ??
    "from-primary-500/20 via-dark-card to-cyan-500/20";
  return (
    <div
      className={cn(
        "w-full h-full bg-linear-to-br flex flex-col items-center justify-center gap-2",
        gradient,
      )}
    >
      <span className="text-4xl sm:text-5xl font-bold text-white/15 select-none tracking-widest">
        {initials}
      </span>
      <span className="text-[10px] sm:text-xs text-gray-600">
        No preview available
      </span>
    </div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        title="Featured Projects"
        subtitle="A selection of projects I've worked on"
      />

      {/* Filter buttons - horizontal scroll on mobile */}
      <div className="relative mb-6 sm:mb-8 md:mb-12">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoryOrder.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white active:bg-white/15",
              )}
              whileTap={{ scale: 0.95 }}
            >
              {projectCategories[category]}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const hasLinks = !!(project.liveUrl || project.githubUrl);
            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  className="h-full flex flex-col group"
                  padding="none"
                  gradient={project.featured}
                >
                  {/* Project image / placeholder */}
                  <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ProjectPlaceholder
                        title={project.title}
                        category={project.category}
                      />
                    )}

                    {project.featured && (
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <Badge
                          variant="primary"
                          size="sm"
                          className="text-[10px] sm:text-xs"
                        >
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark-bg/80 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 sm:gap-4">
                      {hasLinks ? (
                        <>
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 sm:p-3 rounded-full bg-primary-500 text-white"
                              whileTap={{ scale: 0.95 }}
                              aria-label="View live project"
                            >
                              <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.a>
                          )}
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 sm:p-3 rounded-full bg-white/10 text-white"
                              whileTap={{ scale: 0.95 }}
                              aria-label="View source code"
                            >
                              <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.a>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <FiLock className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                            Private / NDA
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                      <h3 className="text-base sm:text-lg font-bold group-hover:text-primary-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      {!hasLinks && (
                        <span className="shrink-0 flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                          <FiLock className="w-2.5 h-2.5" />
                          Private
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="default"
                          size="sm"
                          className="text-[10px] sm:text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          variant="outline"
                          size="sm"
                          className="text-[10px] sm:text-xs"
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
