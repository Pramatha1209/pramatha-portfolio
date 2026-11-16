"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle, TrendingUp, Award, Sparkles } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>02 / PROFESSIONAL JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Work Experience
        </h2>
        <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
      </motion.div>

      {/* Elegant Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-12">
        {experienceData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className="relative group"
          >
            {/* Milestone Marker on timeline */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-neutral-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_12px_#f59e0b]">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>

            {/* Experience Card */}
            <div className="rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-amber-400/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-xl group-hover:shadow-[0_10px_35px_rgba(245,158,11,0.08)]">
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-xs font-mono mb-2 border border-amber-400/20">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.type}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                  <div className="text-base text-amber-300 font-medium mt-0.5">
                    {item.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/10 text-white">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Summary in warm ivory */}
              <p className="text-[#f5f2eb]/90 text-sm sm:text-base leading-relaxed my-5 font-light">
                {item.summary}
              </p>

              {/* Responsibilities */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Key Deliverables &amp; Core Contributions:
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {item.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-sm text-[#f5f2eb]/85 font-light">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Highlight */}
              {item.achievements && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
                    <Award className="w-4 h-4" />
                    <span>Notable Milestones &amp; Outcomes:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-300 pl-1 font-light">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Badges */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 mr-2 uppercase">
                  Tech Applied:
                </span>
                {item.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-neutral-300 border border-white/10 hover:border-amber-400/40 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
