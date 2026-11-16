"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Palette, BrainCircuit, ArrowUpRight, Compass } from "lucide-react";

const IDENTITIES = [
  {
    title: "Product-focused Web Designer",
    tagline: "Form follows function with architectural polish",
    accent: "amber",
    color: "#f59e0b",
    icon: Palette,
  },
  {
    title: "Creative Web Developer",
    tagline: "High-performance React, TypeScript & Next.js systems",
    accent: "blue",
    color: "#38bdf8",
    icon: Code2,
  },
  {
    title: "UI/UX Enthusiast",
    tagline: "Tactile micro-interactions & fluid motion choreography",
    accent: "amber",
    color: "#fbbf24",
    icon: Compass,
  },
  {
    title: "Data & AI Explorer",
    tagline: "Extracting intelligence from quantitative datasets",
    accent: "blue",
    color: "#60a5fa",
    icon: BrainCircuit,
  },
];

const PILLARS = [
  {
    number: "01",
    title: "Product & UI/UX Design",
    description: "Designing modern digital products with purposeful visual hierarchies, intuitive navigation flows, and tactile feedback.",
    tags: ["Visual Design", "Design Systems", "Prototyping", "Ergonomics"],
    accentColor: "border-amber-400/40 text-amber-400",
  },
  {
    number: "02",
    title: "Full-Stack Web Engineering",
    description: "Building production-grade web applications with Next.js, React, TypeScript, and clean modular architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    accentColor: "border-sky-400/40 text-sky-400",
  },
  {
    number: "03",
    title: "Data Analytics & Machine Learning",
    description: "Analyzing high-dimensional operational telemetry, modeling predictive estimators, and building actionable business dashboards.",
    tags: ["Python & SQL", "Power BI / DAX", "Scikit-Learn", "EDA"],
    accentColor: "border-amber-400/40 text-amber-400",
  },
];

export default function ProfessionalIdentity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IDENTITIES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const currentIdentity = IDENTITIES[currentIndex];
  const CurrentIcon = currentIdentity.icon;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono uppercase tracking-widest text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>PROFESSIONAL IDENTITY &bull; CORE PHILOSOPHY</span>
        </div>
      </motion.div>

      {/* Main Big Typographic Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-5xl mx-auto mb-8"
      >
        <h2 className="font-display font-extrabold uppercase tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
          I DESIGN AND BUILD DIGITAL EXPERIENCES.
        </h2>
      </motion.div>

      {/* Animated Rotating Identity Showcase */}
      <div className="flex flex-col items-center justify-center mb-10 min-h-[90px]">
        <div className="relative inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-neutral-900/80 border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden group">
          {/* Subtle colored backlight matching the identity */}
          <div
            className="absolute inset-0 opacity-20 blur-xl transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: currentIdentity.color }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdentity.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 relative z-10"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                style={{
                  backgroundColor: `${currentIdentity.color}15`,
                  borderColor: `${currentIdentity.color}40`,
                  color: currentIdentity.color,
                }}
              >
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-left">
                <span
                  className="font-display font-bold text-lg sm:text-2xl tracking-tight transition-colors"
                  style={{ color: currentIdentity.color }}
                >
                  {currentIdentity.title}
                </span>
                <span className="text-xs font-mono text-neutral-400 hidden md:inline">
                  &bull; {currentIdentity.tagline}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Identity Selector Indicators */}
        <div className="flex items-center gap-2 mt-4">
          {IDENTITIES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Select identity: ${item.title}`}
            />
          ))}
        </div>
      </div>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center max-w-2xl mx-auto text-[#f5f2eb]/90 text-base sm:text-lg font-light leading-relaxed mb-16"
      >
        &ldquo;Transforming ideas into meaningful digital experiences through design, technology and creativity.&rdquo;
      </motion.p>

      {/* Three Core Competency Pillars (Interactive Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.number}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => setActivePillar(idx)}
            className={`p-7 rounded-2xl border backdrop-blur-md transition-all duration-500 cursor-pointer flex flex-col justify-between group ${
              activePillar === idx
                ? "bg-neutral-900/90 border-amber-400/40 shadow-[0_15px_40px_rgba(245,158,11,0.08)] transform -translate-y-1"
                : "bg-neutral-900/40 border-white/10 hover:border-white/25"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border bg-white/[0.03] ${pillar.accentColor}`}>
                  {pillar.number}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Core Capability</span>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-amber-300 transition-colors">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#f5f2eb]/80 font-light leading-relaxed mb-6">
                {pillar.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
              {pillar.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
