"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = "hdpramatha17@gmail.com";
  const linkedInUrl = "https://linkedin.com/in/pramatha-hd";
  const gitHubUrl = "https://github.com/Pramatha1209";
  const locationText = "Bengaluru, Karnataka, India";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formState.subject || `Inquiry from ${formState.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      )}`;
      window.location.href = mailtoLink;

      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>07 / CONNECT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Let&apos;s Build Together
        </h2>
        <p className="text-sm sm:text-base text-[#f5f2eb]/85 mt-2 font-light max-w-xl">
          Interested in discussing data analytics pipelines, machine learning models, full-stack software development, or engineering roles? Reach out directly.
        </p>
        <div className="w-20 h-1 bg-amber-400 mt-4 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contact Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            <h3 className="text-xl font-display font-bold text-white tracking-tight">
              Direct Channels
            </h3>

            {/* Email item with 1-click copy */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-colors group">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span>PRIMARY EMAIL</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="text-base sm:text-lg font-mono font-semibold text-white hover:text-amber-300 transition-colors break-all"
              >
                {emailAddress}
              </a>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* LinkedIn */}
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 hover:bg-amber-500/[0.05] transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-mono text-neutral-400 uppercase">LinkedIn</div>
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300">pramatha-hd</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* GitHub */}
              <a
                href={gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 hover:bg-sky-500/[0.05] transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-sky-400/10 text-sky-400 border border-sky-400/20 group-hover:scale-110 transition-transform">
                    <Github className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-mono text-neutral-400 uppercase">GitHub</div>
                    <div className="text-sm font-semibold text-white group-hover:text-sky-300">Pramatha1209</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Location & Timezone info */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{locationText}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/[0.06]">
                <span>TIME ZONE</span>
                <span className="text-white">IST &middot; UTC+05:30</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Communication Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-display font-bold text-white tracking-tight">
                Send a Message
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                Direct Dispatch &bull; Quick Turnaround
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
                >
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="e.g. Data Analytics / Software Engineering Collaboration"
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                placeholder="Share project specifications, timeline, or inquiries..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-white hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE DIRECTLY</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono flex items-center gap-2.5"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Message prepared! Opening mail client to dispatch to hdpramatha17@gmail.com.</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
