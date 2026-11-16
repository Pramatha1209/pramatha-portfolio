"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { Layers, Sparkles } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Web Platforms", value: "Web & Digital Platform" },
    { label: "Interactive Experience", value: "Interactive Product Showcase" },
    { label: "Audio UI & Creative", value: "Creative Engineering & Audio UI" },
    { label: "Data Analytics & BI", value: "Data Analytics & BI" },
    { label: "Machine Learning", value: "Machine Learning & AI" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter(
          (p) =>
            p.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.category === activeFilter
        );

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>03 / SELECTED WORKS &bull; PRODUCT SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight uppercase">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-[#f5f2eb]/85 mt-2 font-light max-w-2xl">
            Production web platforms, hardware product experiences, operational intelligence pipelines, and predictive machine learning models.
          </p>
          <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
        </div>

        {/* Count Pill */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{filteredProjects.length} Production Systems</span>
        </div>
      </motion.div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
              activeFilter === cat.value
                ? "bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                : "bg-white/[0.03] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Large Horizontal Project Banners (Simple Downward Scrolling Experience) */}
      <div className="space-y-4">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onOpenDetail={setSelectedProject}
          />
        ))}
      </div>

      {/* Central Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
