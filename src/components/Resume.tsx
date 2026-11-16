"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  X,
} from "lucide-react";

export default function Resume() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>06 / OFFICIAL CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Curriculum Vitae
        </h2>
        <p className="text-sm sm:text-base text-[#f5f2eb]/85 mt-2 font-light max-w-2xl">
          Download or preview the official, verified resume for Pramatha H D, detailing professional experience, machine learning implementations, and technical competencies.
        </p>
        <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
      </motion.div>

      {/* Main Resume Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/30 backdrop-blur-xl p-8 sm:p-12 relative overflow-hidden shadow-2xl transition-all"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left info column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <FileCheck className="w-7 h-7" />
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Pramatha_HD_Resume.pdf
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  VERIFIED DOCUMENT &bull; PDF FORMAT &bull; 54.5 KB
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#f5f2eb]/90 font-light leading-relaxed">
              Contains exhaustive information regarding engineering coursework at NMIT, data science internship tenure at Place Mantra, predictive modeling projects in Python &amp; Scikit-learn, and live full-stack implementations.
            </p>

            {/* Quick check points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#f5f2eb]/80 pt-2 font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Data Analytics &amp; SQL Querying</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Power BI &amp; DAX Visualizations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Machine Learning &amp; Feature Pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full-Stack Web &amp; Mobile Deployment</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/resume/Pramatha_HD_Resume.pdf"
                download="Pramatha_HD_Resume.pdf"
                onClick={handleDownload}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <button
                onClick={() => setIsPreviewOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-amber-400/30 text-neutral-200 hover:text-white font-mono text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>PREVIEW RESUME</span>
              </button>

              <a
                href="/resume/Pramatha_HD_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/[0.04] text-neutral-400 hover:text-neutral-200 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <span>Direct Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Download Confirmation Feedback */}
            {downloadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pramatha_HD_Resume.pdf downloaded successfully!</span>
              </motion.div>
            )}
          </div>

          {/* Right mini document mockup column */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="relative w-full max-w-sm rounded-2xl bg-neutral-950 border border-white/15 p-5 shadow-2xl cursor-pointer group hover:border-amber-400/50 transition-all duration-300 transform group-hover:-translate-y-1"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <FileText className="w-3.5 h-3.5" />
                  <span>PREVIEW WINDOW</span>
                </span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-neutral-300">1 PAGE</span>
              </div>

              {/* Document silhouette simulation */}
              <div className="py-4 space-y-3">
                <div className="space-y-1.5 text-center">
                  <div className="text-sm font-bold text-white tracking-widest uppercase">
                    PRAMATHA H D
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    Bengaluru &bull; Data Analytics &bull; Machine Learning
                  </div>
                </div>

                <div className="w-full h-px bg-white/10 my-2" />

                <div className="space-y-1.5">
                  <div className="h-2 w-28 bg-amber-400/30 rounded" />
                  <div className="h-1.5 w-full bg-white/10 rounded" />
                  <div className="h-1.5 w-5/6 bg-white/10 rounded" />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="h-2 w-32 bg-sky-400/30 rounded" />
                  <div className="h-1.5 w-full bg-white/10 rounded" />
                  <div className="h-1.5 w-4/5 bg-white/10 rounded" />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="h-2 w-24 bg-amber-400/30 rounded" />
                  <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                </div>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Click to Inspect</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Modal PDF Preview */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl h-[88vh] rounded-2xl bg-[#090b10] border border-white/20 shadow-2xl z-10 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Pramatha_HD_Resume.pdf
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Original Document Preview
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/resume/Pramatha_HD_Resume.pdf"
                    download="Pramatha_HD_Resume.pdf"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white"
                    aria-label="Close resume preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF iframe */}
              <div className="flex-1 w-full bg-neutral-950 p-2 sm:p-4">
                <iframe
                  src="/resume/Pramatha_HD_Resume.pdf#toolbar=1"
                  className="w-full h-full rounded-xl border border-white/10 bg-neutral-900"
                  title="Pramatha H D Official Resume"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
