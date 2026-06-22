"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const phases = [
  {
    phase: "Phase 01",
    title: "Qualification & Discovery",
    duration: "Initial",
    desc: "MCG begins every relationship with a thorough qualification process. We assess investment objectives, Bitcoin exposure levels, risk tolerance, and long-term wealth goals to determine whether an advisory relationship is appropriate.",
    items: ["Accredited investor verification", "Bitcoin exposure assessment", "Risk and objective alignment", "Long-term goals discovery"],
  },
  {
    phase: "Phase 02",
    title: "Strategic Framework Design",
    duration: "Onboarding",
    desc: "Once qualified, MCG designs a customized Bitcoin risk management framework for the client. This framework defines strategic exposure targets, drawdown protocols, rebalancing discipline, and cycle positioning logic.",
    items: ["Custom allocation framework", "Drawdown threshold protocols", "Cycle positioning strategy", "Rebalancing methodology"],
  },
  {
    phase: "Phase 03",
    title: "Ongoing Advisory Relationship",
    duration: "Continuous",
    desc: "Clients receive continuous strategic oversight, market intelligence, and positioning guidance. MCG monitors macro conditions, on-chain metrics, and Bitcoin market cycle signals to inform ongoing advisory decisions.",
    items: ["Regular strategic reviews", "Market cycle intelligence", "On-chain metric analysis", "Macro positioning context"],
  },
  {
    phase: "Phase 04",
    title: "Long-Term Wealth Architecture",
    duration: "Multi-cycle",
    desc: "Over multiple market cycles, MCG helps clients build robust, enduring Bitcoin wealth. The relationship evolves as client circumstances change — ensuring strategic positioning remains appropriate across decades of compounding.",
    items: ["Multi-cycle compounding strategy", "Generational wealth planning", "Evolving allocation guidance", "Long-horizon positioning"],
  },
];

export default function AdvisoryPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(247,147,26,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto relative">
          <FadeIn><span className="tag-pill mb-8 inline-flex">Advisory Model</span></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8 max-w-4xl">
              How the MCG{" "}
              <span className="bitcoin-gradient">Advisory Model</span>{" "}
              Works
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
              A structured, relationship-based model for institutional-grade Bitcoin risk management.
              Built for investors who think in decades.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-orange max-w-6xl mx-auto" />

      {/* Core principles */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn><h2 className="text-3xl font-black mb-4">Core Advisory Principles</h2></FadeIn>
            <FadeIn delay={0.1}><p className="text-white/45 max-w-xl mx-auto">Everything MCG does is governed by these foundational principles.</p></FadeIn>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { title: "Non-Custodial", icon: "🔐", desc: "Your keys remain yours. MCG never takes custody of client assets — ever. Strategic oversight only." },
              { title: "Non-Speculative", icon: "📊", desc: "No trading signals. No price predictions. No speculation. Disciplined long-term positioning only." },
              { title: "Confidential", icon: "🤝", desc: "All client relationships and advisory content are strictly confidential. Boutique, private advisory." },
            ].map((p) => (
              <FadeIn key={p.title} delay={0.1}>
                <div className="card-glass rounded-sm p-8 text-center hover:border-bitcoin/20 transition-all duration-300">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="text-lg font-black mb-3">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Phases */}
          <div className="space-y-4">
            {phases.map((p, i) => (
              <FadeIn key={p.phase} delay={i * 0.08}>
                <div className="card-glass rounded-sm overflow-hidden group hover:border-bitcoin/20 transition-all duration-400">
                  <div className="grid lg:grid-cols-[280px_1fr] divide-x divide-white/[0.04]">
                    <div className="p-8 lg:p-10">
                      <div className="text-bitcoin/30 text-xs tracking-widest uppercase font-bold mb-3 group-hover:text-bitcoin/50 transition-colors duration-300">{p.phase}</div>
                      <h3 className="text-xl font-black mb-2">{p.title}</h3>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium bg-white/[0.04] text-white/30 border border-white/[0.06]">
                        {p.duration}
                      </div>
                    </div>
                    <div className="p-8 lg:p-10">
                      <p className="text-white/50 leading-relaxed mb-6 text-[15px]">{p.desc}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {p.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-white/40">
                            <div className="w-1 h-1 rounded-full bg-bitcoin/50 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who qualifies */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-obsidian-800/30" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-4xl mx-auto relative text-center">
          <FadeIn><span className="tag-pill mb-6 inline-flex">Qualification Criteria</span></FadeIn>
          <FadeIn delay={0.1}><h2 className="text-4xl font-black mb-8">Who Qualifies for MCG Advisory?</h2></FadeIn>
          <div className="grid md:grid-cols-2 gap-4 text-left mb-12">
            {[
              "Accredited investor status",
              "$250,000 or greater Bitcoin exposure",
              "Long-term investment horizon (3+ years)",
              "Conviction in Bitcoin as a wealth asset",
              "Interest in disciplined risk management",
              "Not seeking speculative or short-term trading advice",
            ].map((item) => (
              <FadeIn key={item} delay={0.1}>
                <div className="card-glass rounded-sm p-5 flex items-center gap-4">
                  <span className="text-bitcoin font-black">✓</span>
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <Link href="/contact" className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-bitcoin text-black font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden">
              <span className="absolute inset-0 bg-bitcoin-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative">Begin Qualification</span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
