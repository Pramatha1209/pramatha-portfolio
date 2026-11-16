"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Calendar,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090b10] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 p-6 sm:p-8 lg:p-10 text-neutral-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 font-semibold">
              PROJECT {project.number}
            </span>
            <span>&bull;</span>
            <span className="text-neutral-300">{project.category}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {project.year}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-amber-400 font-mono mb-6">
            {project.subtitle}
          </p>

          {/* Project Visual Banner */}
          <div className="relative w-full h-60 sm:h-96 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-neutral-900">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className={`${project.imageFit === "contain" ? "object-contain" : "object-cover"} ${
                project.imagePosition || "object-center"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Key Metrics row */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/10">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-base sm:text-xl font-bold text-white font-display">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-mono uppercase mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Description */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Project Overview:
            </h3>
            <p className="text-sm sm:text-base text-[#f5f2eb]/90 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Deep Case Study Analysis (if available) */}
          {project.caseStudy && (
            <div className="space-y-6 mb-8 pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2">
                    Operational Challenge:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#f5f2eb]/85 leading-relaxed font-light">
                    {project.caseStudy.challenge}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                    Engineered Solution:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#f5f2eb]/85 leading-relaxed font-light">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Details */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Technical Architecture:</span>
                </h4>
                <ul className="space-y-2">
                  {project.caseStudy.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f5f2eb]/85 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Measurable Outcomes */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Quantifiable Outcomes:</span>
                </h4>
                <ul className="space-y-2">
                  {project.caseStudy.outcomes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f5f2eb]/85 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
              Technologies &amp; Frameworks:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-neutral-200 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Conditional Project Action Destinations */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 justify-end">
            {/* View Live Project (Conditional) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
              >
                <span>VIEW LIVE PROJECT</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* View Source Code (Conditional) */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs tracking-wider uppercase flex items-center gap-2 border border-white/15 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>VIEW SOURCE CODE</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono uppercase transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
