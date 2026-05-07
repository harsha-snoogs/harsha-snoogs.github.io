import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui";
import { HeroBackground, ScrollIndicator } from "@/components/common";
import { personal } from "@/data";
import { staggerContainer } from "@/utils";
import { StatIcon } from "@/components/ui/StatIcon";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const numericValue = parseInt(value.replace(/\D/g, ""));
          const counter = { val: 0 };

          gsap.to(counter, {
            val: numericValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayValue(Math.floor(counter.val).toString());
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

function BentoStats() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg mx-auto">
      {/* Large featured stat - full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileTap={{ scale: 0.98 }}
        className="col-span-2"
      >
        <div className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/10 to-cyan-500/5 border border-primary-500/20 overflow-hidden">
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-400 mb-1">
                Years of Experience
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-white">
                <AnimatedCounter value="5" suffix="+" />
              </p>
            </div>
            <div className="hidden sm:block">
              <StatIcon
                name="FaBriefcase"
                size={48}
                className="text-primary-400/30"
              />
            </div>
            <div className="sm:hidden">
              <StatIcon
                name="FaBriefcase"
                size={32}
                className="text-primary-400/30"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Second stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="h-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 hover:border-cyan-500/30 active:border-cyan-500/50 transition-colors bg-white/[0.02]">
          <StatIcon
            name="FaUsers"
            size={18}
            className="text-cyan-400 mb-2 sm:mb-3"
          />
          <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
            <AnimatedCounter value="500" suffix="K+" />
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">Users Impacted</p>
        </div>
      </motion.div>

      {/* Third stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="h-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 hover:border-violet-500/30 active:border-violet-500/50 transition-colors bg-white/[0.02]">
          <StatIcon
            name="FaCodeBranch"
            size={18}
            className="text-violet-400 mb-2 sm:mb-3"
          />
          <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
            <AnimatedCounter value="100" suffix="+" />
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">PR Reviews</p>
        </div>
      </motion.div>

      {/* Fourth stat - wide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="col-span-2"
      >
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 hover:border-amber-500/30 active:border-amber-500/50 transition-colors bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <StatIcon name="FaRocket" size={16} className="text-amber-400" />
            <span className="text-xs sm:text-sm text-gray-400">
              Performance Gains
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">
            <AnimatedCounter value="35" suffix="%" />
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -45,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "back.out(1.5)",
        delay: 0.3,
      }
    );
  }, []);

  const firstName = personal.name.split(" ")[0];
  const lastName = personal.name.split(" ").slice(1).join(" ");

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <HeroBackground />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left side - Main content (shown first on mobile for better UX) */}
            <div className="order-1 text-center lg:text-left">
              {/* Name */}
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-2"
                style={{ perspective: "1000px" }}
              >
                <span className="block text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl font-normal mb-1 sm:mb-2">
                  Hello, I'm
                </span>
                {firstName.split("").map((char, index) => (
                  <span
                    key={`first-${index}`}
                    className="char inline-block text-gradient"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {char}
                  </span>
                ))}
              </h1>

              {/* Title and description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-3 sm:mt-4 mb-5 sm:mb-6"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-medium">
                  <span className="text-primary-300">{personal.title}</span>
                </h2>
                <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {personal.tagline}. Building{" "}
                  <span className="text-primary-300 font-medium">scalable</span>
                  ,{" "}
                  <span className="text-cyan-300 font-medium">
                    high-performance
                  </span>{" "}
                  web experiences.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                  iconPosition="right"
                  fullWidth
                  className="sm:w-auto"
                  onClick={() => {
                    const element = document.getElementById("projects");
                    if (element && window.lenis) {
                      window.lenis.scrollTo(element, { offset: -80 });
                    }
                  }}
                >
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />}
                  fullWidth
                  className="sm:w-auto"
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Resume
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <span className="text-xs sm:text-sm text-gray-500">
                  Find me on
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.a
                    href={personal.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-primary-400 hover:border-primary-500/30 hover:bg-white/10 active:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub Profile"
                  >
                    <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                  <motion.a
                    href={personal.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-primary-400 hover:border-primary-500/30 hover:bg-white/10 active:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn Profile"
                  >
                    <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Right side - Bento Grid Stats (shown second on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="order-2"
            >
              <BentoStats />

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2"
              >
                {["React", "TypeScript", "Next.js", "Tailwind"].map(
                  (tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.3 + i * 0.08,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full border border-white/10 text-gray-400 hover:border-primary-500/40 hover:text-primary-400 active:border-primary-500/60 transition-colors cursor-default select-none"
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
