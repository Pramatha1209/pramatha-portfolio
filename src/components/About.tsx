"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Brain,
  Database,
  BarChart2,
  Code,
  GraduationCap,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Sparkles,
} from "lucide-react";

const STATS = [
  { label: "Data Records Analyzed", value: "2,900+", note: "Operations & Fulfillment", accent: "amber" },
  { label: "Engineered Projects", value: "5+", note: "Full-Stack & ML", accent: "blue" },
  { label: "Core Disciplines", value: "3", note: "Analytics • ML • Dev", accent: "amber" },
  { label: "Academic Cohort", value: "2026", note: "B.E. ECE • NMIT", accent: "blue" },
];

const HIGHLIGHTS = [
  {
    icon: Database,
    title: "Data Analytics & SQL",
    desc: "Rigorous exploratory data analysis, data wrangling with Pandas & NumPy, and advanced SQL querying for business analytics.",
    tag: "Analytics",
  },
  {
    icon: BarChart2,
    title: "Business Intelligence",
    desc: "Executive Power BI dashboards, DAX modeling, Power Query transformations, and interactive KPI tracking.",
    tag: "BI & DAX",
  },
  {
    icon: Brain,
    title: "Machine Learning & AI",
    desc: "Predictive modeling, regression analysis, Scikit-learn pipelines, feature engineering, and model evaluation.",
    tag: "ML & AI",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "Modern web engineering with Next.js, React, TypeScript, Tailwind CSS, Flask REST APIs, and Flutter mobile apps.",
    tag: "Web / App",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>01 / ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Bridging Raw Data, Intelligence &amp; Software
        </h2>
        <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
      </motion.div>

      {/* Main Grid: Narrative Storytelling + Stats + Visual Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (5 Cols): Portrait Spotlight Card & Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-md shadow-2xl">
            {/* Top HUD Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SYSTEM &middot; IDENTITY
              </span>
              <span className="text-amber-400/90 font-medium">BENGALURU, IN</span>
            </div>

            {/* Profile Photo Display with Cinematic Portrait */}
            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden my-5 border border-white/10 group">
              <Image
                src="/images/cinematic-portrait.png"
                alt="Pramatha H D Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold">PRAMATHA H D</span>
                <span className="text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-white/15">
                  BE ECE &middot; 2026
                </span>
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-300">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Nitte Meenakshi Institute of Technology</div>
                  <div className="text-neutral-400">B.E. Electronics &amp; Communication Engineering (2022–2026)</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className={`text-xs font-semibold mt-1 uppercase font-mono ${stat.accent === 'amber' ? 'text-amber-400' : 'text-sky-400'}`}>
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column (7 Cols): Deep Narrative & Core Competencies */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="space-y-4 text-[#f5f2eb]/90 text-base sm:text-lg leading-relaxed font-light">
            <p>
              I am an engineering graduate with hands-on experience across{" "}
              <span className="text-white font-medium">Python, SQL, Power BI, machine learning, web development, and data analytics</span>.
              My work focuses on translating chaotic, high-dimensional datasets into high-fidelity predictive models,
              executive dashboards, and performant web applications.
            </p>
            <p className="text-neutral-300/90 text-sm sm:text-base leading-relaxed">
              With a background in Electronics &amp; Communication Engineering from Nitte Meenakshi Institute of Technology,
              I approach software engineering and data science with first-principles problem solving. Whether analyzing 2,900+
              urban logistics records to isolate fulfillment bottlenecks, engineering regression models with Scikit-learn, or
              architecting responsive hospitality portals with Next.js and Tailwind CSS, I focus on measurable impact and elegant execution.
            </p>
          </div>

          {/* Core Highlights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {HIGHLIGHTS.map((h, idx) => {
              const Icon = h.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-amber-400/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {h.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                    {h.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {h.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Core Technical Methodology list */}
          <div className="p-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.02] flex flex-col gap-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>CORE TECHNICAL METHODOLOGY</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Data-driven decisions over intuition</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>End-to-end reproducibility &amp; clean pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Intuitive UI/UX for complex quantitative metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Scalable code architecture with TypeScript &amp; Python</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
