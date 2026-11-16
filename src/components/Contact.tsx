"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  Shield,
  Loader2,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submitLockRef = useRef(false); // prevents duplicate rapid submissions

  const emailAddress = "hdpramatha17@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/pramatha-hd/";
  const gitHubUrl = "https://github.com/Pramatha1209";
  const locationText = "Bengaluru, Karnataka, India";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing again
    if (formStatus === "error") {
      setFormStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Prevent duplicate submissions
      if (submitLockRef.current || formStatus === "submitting") return;
      submitLockRef.current = true;

      setFormStatus("submitting");
      setErrorMessage("");

      try {
        // Read honeypot from form
        const honeypotEl = formRef.current?.querySelector(
          'input[name="_honeypot"]'
        ) as HTMLInputElement | null;

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            _honeypot: honeypotEl?.value || "",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset after 8 seconds so user can send another message
        setTimeout(() => {
          setFormStatus("idle");
        }, 8000);
      } catch (err) {
        setFormStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Failed to send message. Please try again."
        );
      } finally {
        submitLockRef.current = false;
      }
    },
    [formData, formStatus]
  );

  const isFormDisabled = formStatus === "submitting" || formStatus === "success";

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
    >
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
          Interested in discussing data analytics pipelines, machine learning
          models, full-stack software development, or engineering roles? Reach
          out directly.
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
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      LinkedIn
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300">
                      pramatha-hd
                    </div>
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
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      GitHub
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-sky-300">
                      Pramatha1209
                    </div>
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

        {/* Right Column: Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-display font-bold text-white tracking-tight">
                Send a Message
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                Secure &bull; Server-side Delivery
              </span>
            </div>

            {/* Honeypot — invisible to humans, traps bots */}
            <div
              aria-hidden="true"
              tabIndex={-1}
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                height: 0,
                overflow: "hidden",
              }}
            >
              <label htmlFor="contact-hp">Leave blank</label>
              <input
                id="contact-hp"
                type="text"
                name="_honeypot"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  disabled={isFormDisabled}
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  disabled={isFormDisabled}
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
              >
                Subject *
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                minLength={2}
                maxLength={200}
                disabled={isFormDisabled}
                placeholder="e.g. Data Analytics / Software Engineering Collaboration"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                name="message"
                rows={5}
                required
                minLength={10}
                maxLength={5000}
                disabled={isFormDisabled}
                placeholder="Share project specifications, timeline, or inquiries..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-neutral-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex justify-end mt-1">
                <span className="text-[11px] font-mono text-neutral-500">
                  {formData.message.length} / 5,000
                </span>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <Shield className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-neutral-400">
                Your information will only be used to respond to your enquiry
                and will not be shared with third parties.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isFormDisabled}
                className="w-full py-4 rounded-xl bg-white hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                {formStatus === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>MESSAGE SENT SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {formStatus === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono flex items-center gap-2.5"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Your message has been sent successfully. Thank you for reaching out!
                  </span>
                </motion.div>
              )}

              {formStatus === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 text-xs font-mono flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
