"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, FileText, Sparkles, Linkedin } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
            aria-label="Pramatha H D Portfolio Home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.05] border border-white/15 group-hover:border-amber-400/60 transition-colors">
              <span className="font-mono text-xs font-bold text-white tracking-tighter">P</span>
              <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wider uppercase text-white group-hover:text-amber-300 transition-colors font-display">
                PRAMATHA H D
              </span>
              <span className="text-[10px] font-mono text-neutral-400 tracking-tight hidden sm:inline">
                DATA &bull; AI/ML &bull; DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/20 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />}
                    {item.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/pramatha-hd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-300 hover:text-amber-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="#resume"
              onClick={(e) => handleNavClick(e, "#resume")}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-[#f5f2eb]/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all hover:border-white/20"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative group overflow-hidden px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase text-black bg-white hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#07080c]/98 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-sm font-medium tracking-wide uppercase transition-all ${
                      isActive
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />}
                  </motion.a>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 mt-2">
                <a
                  href="https://www.linkedin.com/in/pramatha-hd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-mono text-neutral-200 bg-white/5 border border-white/10 hover:border-amber-400/40"
                >
                  <Linkedin className="w-4 h-4 text-amber-400" />
                  <span>Connect on LinkedIn</span>
                </a>
                <a
                  href="#resume"
                  onClick={(e) => handleNavClick(e, "#resume")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-mono text-neutral-200 bg-white/5 border border-white/10"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>View / Download Resume</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold tracking-wide uppercase text-black bg-white hover:bg-amber-400"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Start Conversation</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
