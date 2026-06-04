"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import BitcoinHero from "@/components/BitcoinHero";

/* ─── Reusable fade-in wrapper ─────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section: Problem ─────────────────────────────────────────────── */
function ProblemSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <span className="tag-pill mb-6 inline-flex">The Core Problem</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-6">
                Owning Bitcoin Is Not the Same as{" "}
                <span className="bitcoin-gradient">Managing Bitcoin.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Most serious Bitcoin investors have conviction in the asset — but
                no systematic framework for managing its volatility. Without a
                disciplined strategy, bear market drawdowns erode years of
                compounding and test even the strongest conviction.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                href="/advisory"
                className="group inline-flex items-center gap-2 text-bitcoin font-semibold text-sm tracking-wide hover:gap-3 transition-all duration-200"
              >
                Explore our advisory model
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          {/* Stats block */}
          <FadeIn delay={0.2} direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "−83%", label: "2018 Bitcoin drawdown from peak to trough", highlight: true },
                { stat: "−77%", label: "2022 drawdown — two years of gains erased in months", highlight: false },
                { stat: "4×", label: "Average cycles MCG positions across per client strategy", highlight: false },
                { stat: "0", label: "Assets held in custody. Clients maintain full control at all times", highlight: true },
              ].map((item) => (
                <div
                  key={item.stat}
                  className={`card-glass p-6 rounded-sm transition-all duration-300 ${
                    item.highlight ? "border-bitcoin/20" : ""
                  }`}
                >
                  <div className={`text-4xl font-black mb-2 ${item.highlight ? "text-bitcoin" : "text-white"}`}>
                    {item.stat}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Pillars ─────────────────────────────────────────────── */
const pillars = [
  {
    number: "01",
    title: "Bitcoin Requires Risk Management",
    body: "Bitcoin is not a traditional passive asset. It experiences severe volatility and multi-year market cycles that require active strategic positioning — not passive holding.",
  },
  {
    number: "02",
    title: "Drawdowns Destroy Compounding",
    body: "The loss of accumulated gains during bear markets materially impacts long-term outcomes. Unmanaged drawdowns are the single greatest threat to generational wealth in Bitcoin.",
  },
  {
    number: "03",
    title: "Non-Custodial Structure Matters",
    body: "Clients retain full custody and control of their assets at all times. MCG provides strategic oversight and advisory — never custody. Your keys. Your Bitcoin.",
  },
  {
    number: "04",
    title: "Long-Term Wealth Requires Discipline",
    body: "MCG exists to help investors compound responsibly across multiple Bitcoin cycles — replacing emotional reaction with structured, institutional-grade positioning.",
  },
];

function PillarsSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <FadeIn>
            <span className="tag-pill mb-6 inline-flex">Core Philosophy</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Four Pillars of{" "}
              <span className="bitcoin-gradient">Disciplined Bitcoin</span>{" "}
              Management
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <FadeIn key={p.number} delay={i * 0.1}>
              <div className="card-glass p-8 rounded-sm group cursor-default transition-all duration-400 hover:border-bitcoin/20">
                <div className="text-bitcoin/30 text-5xl font-black mb-4 font-mono group-hover:text-bitcoin/50 transition-colors duration-300">
                  {p.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{p.title}</h3>
                <p className="text-white/45 leading-relaxed text-[15px]">{p.body}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-bitcoin/20 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Marquee strip ────────────────────────────────────────── */
const marqueeItems = [
  "Bitcoin Risk Management",
  "Drawdown Mitigation",
  "Generational Wealth",
  "Non-Custodial Advisory",
  "Market Cycle Positioning",
  "Capital Preservation",
  "Strategic Bitcoin Allocation",
  "Multi-Cycle Investing",
];

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative py-8 overflow-hidden border-y border-white/[0.04]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase font-medium text-white/25">
            <span className="w-1 h-1 rounded-full bg-bitcoin/50 flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section: How it works ─────────────────────────────────────────── */
const steps = [
  { step: "01", title: "Discovery", desc: "A qualified investor reaches MCG through referral, research, or direct outreach and begins exploring the advisory relationship." },
  { step: "02", title: "Playbook", desc: "Request the MCG Bitcoin Wealth Management Playbook — our framework for strategic Bitcoin positioning across market cycles." },
  { step: "03", title: "Qualification", desc: "Serious investors complete a brief qualification process. MCG is designed for accredited investors with meaningful Bitcoin exposure." },
  { step: "04", title: "Strategy", desc: "Qualified investors enter a strategic discussion to explore advisory onboarding, portfolio positioning, and long-term wealth objectives." },
];

function HowItWorksSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <FadeIn>
            <span className="tag-pill mb-6 inline-flex">The Journey</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              How MCG Works
            </h2>
          </FadeIn>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-bitcoin/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.12}>
                <div className="relative text-center group">
                  <div className="relative inline-flex w-24 h-24 items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full border border-bitcoin/15 group-hover:border-bitcoin/40 transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-full bg-bitcoin/5 group-hover:bg-bitcoin/10 transition-colors duration-300" />
                    <span className="text-bitcoin font-black text-2xl font-mono relative z-10">{s.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: For whom ─────────────────────────────────────────────── */
function AudienceSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute -inset-px rounded-sm border border-bitcoin/15" />
              <div className="card-glass rounded-sm p-10">
                <div className="text-bitcoin/20 text-8xl font-black leading-none mb-6 font-mono">MCG</div>
                <h3 className="text-2xl font-black mb-6">Built for Serious Investors</h3>
                <ul className="space-y-3">
                  {[
                    "Accredited investors with $250K+ Bitcoin exposure",
                    "Business owners and entrepreneurs",
                    "Long-term allocators thinking in decades",
                    "Professionals with growing BTC allocations",
                    "Investors who understand Bitcoin but need strategic discipline",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-bitcoin flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <span className="tag-pill mb-6 inline-flex">Who We Serve</span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-6">
                Not Everyone.{" "}
                <span className="bitcoin-gradient">The Right Investors.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                MCG is intentionally selective. We work with investors who have
                genuine conviction in Bitcoin as a long-term asset and who
                understand that owning Bitcoin requires a disciplined strategic
                framework to preserve and compound wealth across cycles.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-white/35 text-base leading-relaxed mb-8 italic border-l-2 border-bitcoin/30 pl-4">
                "My traditional advisor doesn't understand Bitcoin. I need a
                disciplined framework — not speculation."
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 border border-bitcoin/40 text-bitcoin font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden hover:text-black transition-colors duration-300"
              >
                <span className="absolute inset-0 bg-bitcoin translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative">See If You Qualify</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: CTA Banner ────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(247,147,26,0.06) 0%, transparent 70%)" }}
      />
      <div className="max-w-4xl mx-auto relative text-center">
        <FadeIn>
          <span className="tag-pill mb-8 inline-flex">Qualification Required</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            A Private Bitcoin Advisory Firm{" "}
            <span className="bitcoin-gradient">Built for Serious Investors</span>{" "}
            Thinking in Decades, Not Days.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-white/45 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Designed for investors with meaningful Bitcoin exposure. Request the
            MCG Bitcoin Wealth Management Playbook to begin your journey toward
            disciplined, generational Bitcoin wealth.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 px-10 py-5 bg-bitcoin text-black font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden"
            >
              <span className="absolute inset-0 bg-bitcoin-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative">Request the MCG Playbook</span>
              <svg className="relative w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <p className="text-white/25 text-xs tracking-widest uppercase mt-6 font-medium">
            Built for investors with meaningful Bitcoin exposure
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Home page ─────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <BitcoinHero />
      <MarqueeStrip />
      <ProblemSection />
      <PillarsSection />
      <HowItWorksSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
