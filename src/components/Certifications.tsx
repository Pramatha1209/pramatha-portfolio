"use client";

import { motion } from "framer-motion";
import { certificationsData } from "@/data/education";
import { Award, Calendar, CheckCircle, ExternalLink, Sparkles } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Sub-header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>CREDENTIALS &amp; ACCOMPLISHMENTS</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight uppercase">
          Certifications &amp; Training
        </h3>
        <p className="text-sm text-neutral-400 mt-1 font-light">
          Industry-recognized certifications in full-stack data analytics, machine learning workflows, and technology entrepreneurship.
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificationsData.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-amber-400/40 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_10px_30px_rgba(251,191,36,0.08)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Award className="w-4 h-4" />
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-neutral-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/10">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {cert.year}
                </span>
              </div>

              <h4 className="text-lg font-display font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                {cert.title}
              </h4>
              <div className="text-xs font-mono text-sky-400 mb-3 uppercase tracking-wide">
                {cert.issuer}
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-5">
                {cert.description}
              </p>
            </div>

            {/* Skill tags */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
              {cert.skills.map((s, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-neutral-400 border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
