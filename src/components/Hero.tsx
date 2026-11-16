"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Download, Layers, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Simple, elegant scroll-linked parallax without heavy libraries
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "15%"]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.65],
    prefersReducedMotion ? ["0px", "0px"] : ["0px", "-25px"]
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 1. CINEMATIC FULL-WIDTH, FULL-SCREEN PORTRAIT BACKGROUND */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[115%] -top-[4%] pointer-events-none select-none z-0"
      >
        <Image
          src="/images/cinematic-portrait.png"
          alt="Pramatha H D – Cinematic Portrait Background"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[center_18%] sm:object-[center_20%] md:object-center"
        />

        {/* Top subtle vignette for navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#060709]/80 via-[#060709]/30 to-transparent" />

        {/* Left & Right subtle edge vignettes (preserving amber & electric blue glow) */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#060709]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#060709]/60 to-transparent" />

        {/* Lower-third dark gradient: leaves face & chest clear, blends seamlessly into page */}
        <div className="absolute inset-x-0 bottom-0 h-[68%] sm:h-[62%] md:h-[58%] bg-gradient-to-t from-[#060709] via-[#060709]/90 via-45% to-transparent" />
      </motion.div>

      {/* 2. TOP STATUS BAR (under navigation) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 pt-2"
      >
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-xs font-mono text-neutral-200 tracking-wide">
            AVAILABLE FOR ROLES &middot; B.E. 2026
          </span>
        </div>

        {/* Location & Academic Note */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-300 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-sky-400">
            <MapPin className="w-3.5 h-3.5" />
            Bengaluru, India
          </span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-amber-400/90">
            NMIT &middot; Electronics &amp; Communication
          </span>
        </div>
      </motion.div>

      {/* 3. HERO CONTENT CONTAINER (Elegantly positioned in lower half without covering face) */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center mt-auto pt-24 sm:pt-32 pb-4"
      >
        {/* Verified Professional Identity Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/80 border border-white/15 backdrop-blur-md text-xs font-mono text-neutral-300 mb-4 shadow-lg"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>ENGINEERING GRADUATE &middot; PORTFOLIO</span>
        </motion.div>

        {/* Main Name Heading: PRAMATHA H D (Kept on a single line when viewport allows) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden mb-3"
        >
          <h1 className="font-display font-extrabold uppercase tracking-tight text-white leading-none whitespace-nowrap text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.2vw] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            PRAMATHA H D
          </h1>
        </motion.div>

        {/* Professional Headline with Amber & Electric Blue Lighting Accents */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="inline-flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono font-semibold tracking-wider uppercase mb-5"
        >
          <span className="text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
            DATA ANALYTICS
          </span>
          <span className="text-neutral-500">&bull;</span>
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            AI &amp; MACHINE LEARNING
          </span>
          <span className="text-neutral-500">&bull;</span>
          <span className="text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
            DEVELOPMENT
          </span>
        </motion.div>

        {/* Personal Introduction in Warm Ivory Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl mx-auto text-[#f5f2eb]/90 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          &ldquo;Engineering graduate exploring the intersection of data, artificial intelligence and application development.&rdquo;
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Explore Projects Button */}
          <button
            onClick={() => scrollToSection("projects")}
            className="group px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 hover:bg-amber-400 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Projects</span>
            <span className="text-xs font-mono opacity-60 ml-1 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </button>

          {/* Download Resume Button */}
          <a
            href="/resume/Pramatha_HD_Resume.pdf"
            download="Pramatha_HD_Resume.pdf"
            className="px-6 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-sky-400/50 text-neutral-100 hover:text-white font-mono text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-md shadow-lg"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Download Resume</span>
          </a>

          {/* About Me Button */}
          <button
            onClick={() => scrollToSection("about")}
            className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/[0.06] text-neutral-300 hover:text-white text-xs sm:text-sm font-mono transition-colors"
          >
            About Me &darr;
          </button>
        </motion.div>
      </motion.div>

      {/* 4. SIMPLE & ELEGANT SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 flex flex-col items-center justify-center gap-2 pt-2"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 group text-neutral-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Scroll down to About section"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-amber-400 transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 rounded-full border border-neutral-600 group-hover:border-amber-400 transition-colors flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
