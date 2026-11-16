"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white">
              PRAMATHA H D
            </div>
            <div className="text-xs font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
              <span className="text-amber-400">DATA ANALYTICS</span>
              <span className="text-neutral-600">&bull;</span>
              <span className="text-neutral-300">AI &amp; MACHINE LEARNING</span>
              <span className="text-neutral-600">&bull;</span>
              <span className="text-sky-400">DEVELOPMENT</span>
            </div>
          </div>

          {/* Live Bengaluru Clock HUD */}
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 px-4 py-2.5 rounded-2xl text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Bengaluru, IN</span>
            </div>
            <span className="text-neutral-600">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{currentTime || "00:00:00 IST"}</span>
            </div>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 text-xs font-mono text-neutral-300 hover:text-white transition-all"
            aria-label="Back to top of page"
          >
            <span>TOP OF PAGE</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-amber-400" />
          </button>
        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} Pramatha H D. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-[#f5f2eb]/70 font-light">
            <span>Built with Next.js, React, TypeScript, Tailwind CSS, GSAP &amp; Lenis</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
