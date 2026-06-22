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

const services = [
  {
    number: "01",
    title: "Strategic Bitcoin Positioning",
    subtitle: "Multi-cycle allocation framework",
    desc: "A systematic, rules-based approach to Bitcoin portfolio positioning across bull and bear market cycles. MCG helps clients establish and maintain strategic exposure levels designed to preserve capital and compound wealth over the long term.",
    features: ["Cycle-aware allocation framework", "Position sizing methodology", "Entry and exit discipline", "Rebalancing strategy"],
  },
  {
    number: "02",
    title: "Drawdown Mitigation Advisory",
    subtitle: "Volatility management & capital preservation",
    desc: "Bitcoin's multi-year bear markets have historically erased 70–85% of peak value. MCG provides structured advisory to help serious investors reduce drawdown exposure without abandoning their long-term Bitcoin conviction.",
    features: ["Bear market positioning strategy", "Drawdown threshold protocols", "Capital preservation planning", "Risk-adjusted exposure management"],
  },
  {
    number: "03",
    title: "Portfolio Oversight & Intelligence",
    subtitle: "Ongoing strategic guidance",
    desc: "Clients receive continuous strategic oversight, market cycle intelligence, and positioning guidance throughout the advisory relationship. MCG monitors macro conditions and Bitcoin-specific metrics to inform ongoing strategic decisions.",
    features: ["Market cycle analysis", "On-chain intelligence", "Macro positioning context", "Ongoing strategic reviews"],
  },
  {
    number: "04",
    title: "Generational Wealth Planning",
    subtitle: "Long-term Bitcoin wealth architecture",
    desc: "For investors building multi-generational Bitcoin wealth, MCG provides strategic counsel on long-horizon allocation, estate planning considerations for Bitcoin, and structuring wealth for generational transfer.",
    features: ["Long-horizon allocation strategy", "Generational transfer planning", "Wealth preservation framework", "Family office-level advisory"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <FadeIn><span className="tag-pill mb-8 inline-flex">Our Services</span></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Strategic Bitcoin{" "}
              <span className="bitcoin-gradient">Advisory Services</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
              A focused suite of advisory services for serious long-term Bitcoin investors.
              Non-custodial. Non-speculative. Institutionally disciplined.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-orange max-w-6xl mx-auto" />

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {services.map((s, i) => (
            <FadeIn key={s.number} delay={i * 0.08}>
              <div className="card-glass rounded-sm p-8 lg:p-10 group hover:border-bitcoin/20 transition-all duration-400">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
                  <div>
                    <div className="text-bitcoin/25 font-black text-5xl font-mono mb-3 group-hover:text-bitcoin/40 transition-colors duration-300">{s.number}</div>
                    <h3 className="text-2xl font-black mb-2">{s.title}</h3>
                    <div className="text-bitcoin text-sm font-medium tracking-wide">{s.subtitle}</div>
                  </div>
                  <div>
                    <p className="text-white/55 leading-relaxed mb-8 text-[15px]">{s.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm text-white/50">
                          <div className="w-1 h-1 rounded-full bg-bitcoin/60 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 h-px bg-gradient-to-r from-bitcoin/20 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Non-custodial note */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-sm border border-bitcoin/20 bg-bitcoin/[0.04] p-10 text-center">
              <div className="text-bitcoin font-black text-4xl mb-2">₿</div>
              <h3 className="text-2xl font-black mb-4">All Services are Non-Custodial</h3>
              <p className="text-white/50 leading-relaxed max-w-2xl mx-auto">
                At no point does Market Capital Group take custody of client assets. Clients
                maintain full control of their Bitcoin at all times. MCG provides strategic
                oversight and advisory guidance — never custody, never control.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-black mb-4">Begin the Advisory Relationship</h2>
            <p className="text-white/40 mb-8 text-sm tracking-wide uppercase">Qualification Required · Accredited Investors · $250K+ Bitcoin Exposure</p>
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
