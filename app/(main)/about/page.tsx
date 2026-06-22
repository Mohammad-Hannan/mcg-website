"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: direction === "up" ? 30 : 0, x: direction === "left" ? -30 : direction === "right" ? 30 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(247,147,26,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto relative">
          <FadeIn>
            <span className="tag-pill mb-8 inline-flex">About MCG</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8 max-w-4xl">
              Discipline.{" "}
              <span className="bitcoin-gradient">Preservation.</span>{" "}
              Generational Wealth.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/55 text-xl leading-relaxed max-w-3xl">
              Market Capital Group is a boutique, non-custodial Bitcoin risk management
              advisory firm. We were built for one purpose: to help serious long-term
              investors navigate Bitcoin's volatility with institutional discipline.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-orange mx-auto max-w-6xl" />

      {/* Mission */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <span className="tag-pill mb-6 inline-flex">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] mb-6">
                We Exist Because Conviction Alone Is Not Enough.
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-6">
                Most serious Bitcoin investors understand the long-term thesis. What they lack
                is a disciplined, systematic framework for managing volatility across market
                cycles — one that preserves and compounds their wealth rather than surrendering
                gains to fear or complacency.
              </p>
              <p className="text-white/45 leading-relaxed">
                MCG fills that gap. We bring institutional-grade risk management thinking
                to the individual investor — without taking custody of your assets, without
                speculating, and without the noise of retail crypto culture.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} direction="right">
            <div className="space-y-4">
              {[
                { title: "Non-Custodial", desc: "You keep your keys. We provide the strategy." },
                { title: "Non-Speculative", desc: "No trading signals. No moonshots. No noise." },
                { title: "Long-Term Focused", desc: "We think in cycles, not candles." },
                { title: "Institutionally Disciplined", desc: "Macro thinking applied to Bitcoin positioning." },
              ].map((item) => (
                <div key={item.title} className="card-glass p-6 rounded-sm flex gap-5 items-start transition-all duration-300 hover:border-bitcoin/20">
                  <div className="w-2 h-2 rounded-full bg-bitcoin mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white mb-1">{item.title}</div>
                    <div className="text-white/45 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What we are / aren't */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-obsidian-800/30" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <FadeIn><h2 className="text-4xl font-black tracking-tight">Know Exactly What We Are — and What We're Not.</h2></FadeIn>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1} direction="left">
              <div className="rounded-sm border border-bitcoin/15 bg-bitcoin/[0.03] p-8">
                <div className="text-bitcoin font-black text-sm tracking-widest uppercase mb-6">MCG Is</div>
                <ul className="space-y-4">
                  {["Bitcoin risk management advisory", "Non-custodial strategic oversight", "Customized institutional portfolio guidance", "Multi-cycle Bitcoin positioning", "Generational wealth focused", "Boutique advisory for serious investors"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                      <span className="text-bitcoin">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="card-glass rounded-sm p-8">
                <div className="text-white/30 font-black text-sm tracking-widest uppercase mb-6">MCG Is Not</div>
                <ul className="space-y-4">
                  {["Crypto influencer brand", "Trading signal service", "Retail crypto education site", "Meme coin platform", "High-frequency trading operation", "Day trading community"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/35 text-sm line-through decoration-white/20">
                      <span className="text-white/20 no-underline" style={{ textDecoration: "none" }}>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="text-bitcoin/20 text-8xl font-black leading-none mb-4">"</div>
            <blockquote className="text-3xl sm:text-4xl font-black text-white/90 leading-[1.2] tracking-tight mb-8">
              The greatest risk in Bitcoin is not Bitcoin itself. It is an
              investor without a strategy.
            </blockquote>
            <div className="text-white/30 text-sm tracking-widest uppercase font-medium">
              Market Capital Group — Core Philosophy
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-black mb-4">Begin the Conversation.</h2>
            <p className="text-white/45 mb-8">Designed for serious long-term investors with meaningful Bitcoin exposure.</p>
            <Link href="/contact" className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-bitcoin text-black font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden">
              <span className="absolute inset-0 bg-bitcoin-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative">Request the MCG Playbook</span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
