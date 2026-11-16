"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { ExternalLink, Github, Eye, Layers, ArrowUpRight, Sparkles } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenDetail: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onOpenDetail, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hasLive = Boolean(project.liveUrl);
  const hasGithub = Boolean(project.githubUrl);
  const hasNeither = !hasLive && !hasGithub;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative rounded-3xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)] mb-12 sm:mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Bar with Number, Category & Year */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.08] bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-amber-400">
            {project.number}
          </span>
          <span className="text-white/20">/</span>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{project.year}</span>
        </div>
      </div>

      {/* Main Banner Visual Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Large Photographic Banner (7 Cols) */}
        <div
          onClick={() => onOpenDetail(project)}
          className={`lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-neutral-950 cursor-pointer ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
          data-cursor-text="EXPAND"
        >
          <Image
            src={project.image}
            alt={`${project.title} - Authentic Project Visual Banner`}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className={`${project.imageFit === "contain" ? "object-contain" : "object-cover"} ${
              project.imagePosition || "object-center"
            } transition-transform duration-700 ease-out group-hover:scale-103`}
          />

          {/* Smooth directional fade for editorial integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Quick Preview Pill */}
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Case Study Details</span>
          </div>

          {/* Bottom Metric Preview Pill on Image */}
          {project.metrics && project.metrics[0] && (
            <div className="absolute bottom-4 left-5 px-3 py-1.5 rounded-lg bg-neutral-950/85 backdrop-blur-md border border-white/15 text-xs font-mono text-amber-300 shadow-lg">
              <span className="text-neutral-400 mr-1.5">{project.metrics[0].label}:</span>
              <span className="font-semibold">{project.metrics[0].value}</span>
            </div>
          )}
        </div>

        {/* Content & Action Panel (5 Cols) */}
        <div
          className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90 font-medium">
                {project.subtitle}
              </span>
            </div>

            <h3
              onClick={() => onOpenDetail(project)}
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors cursor-pointer mb-4"
            >
              {project.title}
            </h3>

            <p className="text-sm sm:text-base text-[#f5f2eb]/90 font-light leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Metrics Grid */}
            {project.metrics && (
              <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xs font-mono text-neutral-400">{m.label}</div>
                    <div className="text-sm font-semibold text-white font-display mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-neutral-300 border border-white/10 group-hover:border-amber-400/25 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Conditional Action Buttons */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
            {/* VIEW LIVE PROJECT */}
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
              >
                <span>VIEW LIVE PROJECT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* VIEW SOURCE CODE */}
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 transition-all shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>VIEW SOURCE CODE</span>
              </a>
            )}

            {/* EXPLORE CASE STUDY & ARCHITECTURE (when neither external link exists) */}
            {hasNeither && (
              <button
                onClick={() => onOpenDetail(project)}
                className="px-6 py-3 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 hover:text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>EXPLORE CASE STUDY &amp; ARCHITECTURE</span>
              </button>
            )}

            {/* Secondary Case study trigger if buttons already present */}
            {(hasLive || hasGithub) && (
              <button
                onClick={() => onOpenDetail(project)}
                className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs font-mono uppercase transition-colors flex items-center gap-1.5"
                title="View full technical case study"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>Deep Dive</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
