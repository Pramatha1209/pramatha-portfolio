"use client";

import { motion } from "framer-motion";

export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top subtle dual spotlight: amber on left, blue on right */}
      <div className="absolute top-[-15%] left-[10%] w-[600px] h-[450px] rounded-full bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[-15%] right-[10%] w-[600px] h-[450px] rounded-full bg-gradient-to-b from-sky-500/10 via-sky-600/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Right ambient electric blue orb */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[-8%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/5 blur-[140px] pointer-events-none"
      />

      {/* Left ambient warm amber orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-[25%] left-[-8%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-500/5 blur-[150px] pointer-events-none"
      />

      {/* Subtle background architectural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top and bottom subtle vignette fades */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060709] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060709] to-transparent pointer-events-none" />
    </div>
  );
}
