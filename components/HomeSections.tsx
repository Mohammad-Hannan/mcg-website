"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useQualificationModal } from "@/components/QualificationModal";

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
      y: direction === "up" ? 24 : 0,
      x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section 2: Who We Serve ─────────────────────────────────────── */
export function WhoWeServeSection() {
  const items = [
    "Accredited investors",
    "Investors with $250,000+ Bitcoin exposure",
    "Business owners and professionals",
    "Long-term investors focused on wealth preservation and growth",
    "Investors who believe in Bitcoin but want a more disciplined approach to managing risk",
  ];
  return (
    <section className="relative py-28 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <FadeIn direction="left">
          <div className="eyebrow-mono text-burnt mb-6">Who We Serve</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Serious Bitcoin Long-Term Investors Building Generational Wealth
          </h2>
        </FadeIn>
        <FadeIn direction="right" delay={0.1}>
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-4">
                <span className="bullet-square" />
                <span className="text-silver text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href="/advisory"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm tracking-wide mt-8 hover:text-burnt transition-colors duration-200"
          >
            Learn More About Our Advisory Approach
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Section 3: Pain Point ───────────────────────────────────────── */
function DrawdownChart() {
  // Minimalist monochrome chart: unmanaged (gray) vs managed (orange)
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const unmanagedPath = "M0,40 C40,20 70,10 100,60 C140,120 160,180 200,220 C230,245 260,250 300,255";
  const managedPath = "M0,40 C40,20 70,10 100,60 C130,95 150,110 170,115 C200,122 250,118 300,112";

  return (
    <div ref={ref} className="card-accent-top rounded-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs tracking-widest uppercase text-silver/60">Drawdown Comparison</span>
        <span className="text-xs font-mono-data text-silver/40">2017–2025</span>
      </div>
      <svg viewBox="0 0 300 270" className="w-full h-auto" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="0" y1={i * 67.5} x2="300" y2={i * 67.5} stroke="#2C2C2C" strokeWidth="1" />
        ))}
        <motion.path
          d={unmanagedPath}
          fill="none"
          stroke="#5A5A5A"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <motion.path
          d={managedPath}
          fill="none"
          stroke="#D35400"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#2C2C2C]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-px bg-[#5A5A5A]" style={{ borderTop: "2px dashed #5A5A5A" }} />
          <span className="text-xs text-silver/60">Unmanaged Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-burnt" />
          <span className="text-xs text-silver/60">MCG Framework</span>
        </div>
      </div>
    </div>
  );
}

export function PainPointSection() {
  const results = [
    "Large drawdowns",
    "Emotional decision-making",
    "Missed opportunities",
    "Lost compounding",
  ];
  return (
    <section className="relative py-28 px-6 bg-charcoal-deep">
      <div className="divider-flat max-w-7xl mx-auto mb-20" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn direction="left">
          <div className="eyebrow-mono text-burnt mb-6">The Reality</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15] mb-6">
            Most Bitcoin Investors Have Exposure — But No Strategy
          </h2>
          <p className="text-silver leading-relaxed mb-5">
            Many investors accumulate significant Bitcoin wealth during bull
            markets only to watch a large portion disappear during bear
            markets.
          </p>
          <p className="text-silver/70 leading-relaxed mb-8">
            Traditional advisors often offer Bitcoin access through ETFs but
            rarely provide a specialized framework for managing Bitcoin risk.
          </p>
          <div className="text-xs tracking-widest uppercase text-white/40 mb-4">The Result:</div>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {results.map((r) => (
              <div key={r} className="flex items-center gap-3">
                <span className="bullet-square" />
                <span className="text-white/80 text-sm">{r}</span>
              </div>
            ))}
          </div>
          <blockquote className="border-l-2 border-burnt pl-5 italic text-white/70 text-lg leading-relaxed mb-8">
            "The greatest risk in Bitcoin is not volatility. It's unmanaged
            volatility."
          </blockquote>
          <Link
            href="/advisory"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm tracking-wide hover:text-burnt transition-colors duration-200"
          >
            See How MCG Manages Risk
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </FadeIn>
        <FadeIn direction="right" delay={0.1}>
          <DrawdownChart />
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Section 4: Solution ─────────────────────────────────────────── */
export function SolutionSection() {
  const pillars = [
    { title: "Non-Custodial Risk Management", desc: "Portfolio stays with you and your custodian." },
    { title: "Market Cycle Awareness", desc: "Strategic timing informed by macro and on-chain signals." },
    { title: "Strategic Portfolio Positioning", desc: "Disciplined allocation across market conditions." },
    { title: "Drawdown Mitigation", desc: "Structured protocols to limit downside exposure." },
    { title: "Long-Term Capital Compounding", desc: "Built for decades, not market noise." },
  ];
  return (
    <section className="relative py-28 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="max-w-2xl mb-16">
          <div className="eyebrow-mono text-burnt mb-6">The Solution</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15] mb-6">
            A Disciplined Framework for Managing Bitcoin Through Every Market Cycle
          </h2>
          <p className="text-silver leading-relaxed">
            MCG helps investors navigate Bitcoin's volatility using a structured,
            non-custodial advisory framework focused on:
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.07}>
              <div className="card-accent-top rounded-sm p-6 h-full">
                <div className="text-burnt font-mono-data text-xs mb-4">0{i + 1}</div>
                <h3 className="text-white font-bold text-sm leading-snug mb-3">{p.title}</h3>
                <p className="text-silver/60 text-xs leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#2C2C2C] pt-8">
            <p className="text-white font-bold text-lg">
              You keep control of your Bitcoin. We help manage the strategy.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold tracking-wide rounded-sm hover:border-burnt hover:text-burnt transition-colors duration-200 flex-shrink-0"
            >
              Learn more →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Section 5: Why MCG ──────────────────────────────────────────── */
export function WhyMCGSection() {
  const nots = [
    "Not Another Bitcoin ETF",
    "Not A Trading Service",
    "Not A Crypto Influencer Brand",
  ];
  return (
    <section className="relative py-28 px-6 bg-charcoal-deep">
      <div className="divider-flat max-w-7xl mx-auto mb-20" />
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <div className="eyebrow-mono text-burnt mb-6">Why Market Capital Group</div>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {nots.map((n, i) => (
            <FadeIn key={n} delay={i * 0.08}>
              <div className="border border-[#2C2C2C] rounded-sm py-8 px-4">
                <div className="text-white/30 text-2xl mb-3">✕</div>
                <p className="text-white/50 font-medium text-sm">{n}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.25}>
          <p className="text-white text-2xl sm:text-3xl font-black leading-tight mb-4">
            MCG exists for one purpose:
          </p>
          <p className="text-silver text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            To help serious Bitcoin investors preserve and compound wealth
            through disciplined risk management.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm tracking-wide hover:text-burnt transition-colors duration-200"
          >
            Learn More
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Section 6: Final CTA + Newsletter ───────────────────────────── */
export function FinalCTASection() {
  const { open } = useQualificationModal();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className="relative py-28 px-6 bg-charcoal">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="border border-burnt/30 rounded-sm p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.1] mb-5">
              Bitcoin Created the Opportunity. Risk Management Protects It…
            </h2>
            <p className="text-silver leading-relaxed max-w-xl mx-auto mb-10">
              Request access to the MCG Bitcoin Risk Management Playbook and
              learn how disciplined investors manage Bitcoin across market
              cycles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <button onClick={open} className="btn-burnt">
                Request Access
              </button>

              <div className="hidden sm:block w-px h-10 bg-[#2C2C2C]" />

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your institutional email…"
                    className="bg-charcoal-deep border border-[#2C2C2C] focus:border-burnt rounded-sm px-4 py-3 text-sm text-white placeholder-silver/40 focus:outline-none transition-colors duration-200 w-full sm:w-64"
                  />
                  <button
                    type="submit"
                    className="text-white text-sm font-semibold tracking-wide whitespace-nowrap hover:text-burnt transition-colors duration-200"
                  >
                    Join Intel →
                  </button>
                </form>
              ) : (
                <p className="text-burnt text-sm font-medium">You're on the list.</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
