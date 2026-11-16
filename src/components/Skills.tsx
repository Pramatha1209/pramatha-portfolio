"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import {
  Code2,
  BarChart3,
  BrainCircuit,
  Layers,
  Terminal,
  Cpu,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  BarChart3,
  BrainCircuit,
  Layers,
  Terminal,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayedCategories =
    activeCategory === "all"
      ? skillsData
      : skillsData.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>04 / TECHNICAL TOOLKIT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Skills &amp; Technologies
        </h2>
        <p className="text-sm sm:text-base text-[#f5f2eb]/85 mt-2 font-light max-w-2xl">
          Engineered competencies spanning relational querying, predictive modeling, statistical dashboards, and responsive web architecture.
        </p>
        <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
            activeCategory === "all"
              ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              : "bg-white/[0.03] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          All Disciplines
        </button>
        {skillsData.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
              activeCategory === cat.category
                ? "bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                : "bg-white/[0.03] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Skills Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCategories.map((categoryGroup, idx) => {
          const Icon = ICON_MAP[categoryGroup.icon] || Code2;
          return (
            <motion.div
              key={categoryGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/30 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_15px_40px_rgba(245,158,11,0.06)]"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {categoryGroup.skills.length} Technologies
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {categoryGroup.category}
                </h3>
                <p className="text-xs text-[#f5f2eb]/80 font-light leading-relaxed mb-6">
                  {categoryGroup.description}
                </p>

                {/* Skill List */}
                <div className="flex flex-wrap gap-2">
                  {categoryGroup.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                        skill.highlight
                          ? "bg-amber-500/15 border border-amber-400/40 text-amber-200 font-medium shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                          : "bg-white/[0.03] border border-white/10 text-neutral-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                      )}
                      <span>{skill.name}</span>
                      {skill.badge && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 uppercase">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
