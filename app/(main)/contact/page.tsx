"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const exposureOptions = [
  "$250K – $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M+",
  "Prefer not to say",
];

const painPoints = [
  "Managing volatility and drawdowns",
  "Understanding where we are in the cycle",
  "Position sizing and allocation discipline",
  "Long-term compounding strategy",
  "Generational wealth planning",
  "Lacking a systematic framework",
];

export default function ContactPage() {
  const [accredited, setAccredited] = useState<string>("");
  const [exposure, setExposure] = useState<string>("");
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const togglePain = (pain: string) => {
    setSelectedPains((prev) =>
      prev.includes(pain) ? prev.filter((p) => p !== pain) : [...prev, pain]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(247,147,26,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto relative text-center">
          <FadeIn><span className="tag-pill mb-8 inline-flex">Qualification Required</span></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              Request the MCG{" "}
              <span className="bitcoin-gradient">Bitcoin Wealth</span>
              <br />Management Playbook
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Designed for serious long-term investors with meaningful Bitcoin exposure.
              Complete the form below to begin the qualification process.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-orange max-w-6xl mx-auto" />

      {/* Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-2">First Name *</label>
                    <input required type="text" placeholder="James"
                      className="w-full bg-obsidian-700 border border-white/[0.08] rounded-sm px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-bitcoin/40 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-2">Last Name *</label>
                    <input required type="text" placeholder="Williams"
                      className="w-full bg-obsidian-700 border border-white/[0.08] rounded-sm px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-bitcoin/40 transition-colors duration-200" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-2">Email Address *</label>
                  <input required type="email" placeholder="james@company.com"
                    className="w-full bg-obsidian-700 border border-white/[0.08] rounded-sm px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-bitcoin/40 transition-colors duration-200" />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-2">Mobile Number *</label>
                  <input required type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full bg-obsidian-700 border border-white/[0.08] rounded-sm px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-bitcoin/40 transition-colors duration-200" />
                </div>

                {/* Accredited */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-3">Accredited Investor Status *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Yes, I am accredited", "No, I am not accredited"].map((opt) => (
                      <button type="button" key={opt} onClick={() => setAccredited(opt)}
                        className={`px-4 py-3.5 rounded-sm border text-sm font-medium text-left transition-all duration-200 ${
                          accredited === opt
                            ? "border-bitcoin/60 bg-bitcoin/10 text-bitcoin"
                            : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60 bg-obsidian-700"
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exposure */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-3">Bitcoin Exposure Level *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {exposureOptions.map((opt) => (
                      <button type="button" key={opt} onClick={() => setExposure(opt)}
                        className={`px-4 py-3.5 rounded-sm border text-sm font-medium transition-all duration-200 ${
                          exposure === opt
                            ? "border-bitcoin/60 bg-bitcoin/10 text-bitcoin"
                            : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60 bg-obsidian-700"
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pain points */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-3">
                    Primary Challenge(s) — Select all that apply
                  </label>
                  <div className="space-y-2">
                    {painPoints.map((pain) => (
                      <button type="button" key={pain} onClick={() => togglePain(pain)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-sm border text-sm text-left transition-all duration-200 ${
                          selectedPains.includes(pain)
                            ? "border-bitcoin/60 bg-bitcoin/10 text-bitcoin"
                            : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60 bg-obsidian-700"
                        }`}>
                        <span className={`w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center text-[10px] ${
                          selectedPains.includes(pain) ? "border-bitcoin bg-bitcoin text-black" : "border-white/20"
                        }`}>
                          {selectedPains.includes(pain) && "✓"}
                        </span>
                        {pain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 font-medium mb-2">
                    Additional Context (Optional)
                  </label>
                  <textarea rows={4} placeholder="Tell us about your current Bitcoin situation, goals, or questions..."
                    className="w-full bg-obsidian-700 border border-white/[0.08] rounded-sm px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-bitcoin/40 transition-colors duration-200 resize-none" />
                </div>

                {/* Disclaimer */}
                <p className="text-white/25 text-xs leading-relaxed border-l border-white/10 pl-4">
                  By submitting this form you confirm you have read and agree to MCG's
                  terms. Nothing herein constitutes financial, legal, or tax advice.
                  Qualification is required. MCG works exclusively with accredited
                  investors with meaningful Bitcoin exposure.
                </p>

                <button type="submit"
                  className="group relative w-full py-4 bg-bitcoin text-black font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden">
                  <span className="absolute inset-0 bg-bitcoin-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <span className="relative">Submit & Request Playbook →</span>
                </button>
              </form>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-bitcoin/10 border border-bitcoin/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-bitcoin text-2xl font-black">₿</span>
                </div>
                <h2 className="text-3xl font-black mb-4">Request Received.</h2>
                <p className="text-white/50 max-w-md mx-auto leading-relaxed">
                  Thank you. A member of the MCG team will review your submission
                  and reach out within 2–3 business days if your profile aligns with
                  our advisory criteria.
                </p>
                <div className="mt-8 text-white/25 text-xs tracking-widest uppercase">
                  Market Capital Group · Boutique Bitcoin Advisory
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}
