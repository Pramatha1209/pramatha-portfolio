"use client";

import { motion } from "framer-motion";
import { educationData } from "@/data/education";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>05 / ACADEMIC FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Education
        </h2>
        <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
      </motion.div>

      {/* Education Cards */}
      <div className="space-y-6">
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-xs font-mono mb-2 border border-amber-400/20">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Undergraduate Degree</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {edu.degree}
                </h3>
                <div className="text-lg text-amber-300 font-medium mt-1">
                  {edu.institution}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/10 text-white">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  {edu.location}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#f5f2eb]/90 leading-relaxed my-5 font-light">
              {edu.description}
            </p>

            {/* Coursework */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Relevant Coursework &amp; Computational Rigor:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.04] text-neutral-200 border border-white/10"
                  >
                    {course}
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
