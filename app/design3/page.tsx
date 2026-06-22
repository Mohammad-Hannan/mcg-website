"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import DesignSwitcher from "@/components/DesignSwitcher";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/* ── Reveal wrapper ──────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const goldGradientText = {
  background: "linear-gradient(135deg, #F9D27A 0%, #F7931A 45%, #C9A85C 80%, #F7931A 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-gradient-to-r from-[#F7931A] to-[#C9A85C]" />
      <span className="text-[11px] tracking-[0.25em] uppercase font-medium text-[#C9A85C]">{children}</span>
    </div>
  );
}

function GoldButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-sm overflow-hidden font-semibold text-sm tracking-wide"
      style={{ background: "linear-gradient(135deg, #F7931A 0%, #C9A85C 100%)" }}
    >
      <span className="relative text-black">{children}</span>
      <span className="relative text-black group-hover:translate-x-1 transition-transform duration-200" aria-hidden>→</span>
    </Link>
  );
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm border border-white/15 text-white/80 hover:border-[#C9A85C]/50 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function Design3Page() {
  const { scrollYProgress } = useScroll();
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const pillars = [
    { num: "01", title: "Non-Custodial Risk Management", desc: "Your Bitcoin stays with you and your custodian. MCG never takes possession of client assets — strategic oversight only." },
    { num: "02", title: "Market Cycle Awareness", desc: "Strategic timing informed by macro conditions and on-chain signals across Bitcoin's multi-year cycles." },
    { num: "03", title: "Strategic Portfolio Positioning", desc: "Disciplined allocation frameworks designed to hold up across both bull and bear conditions." },
    { num: "04", title: "Drawdown Mitigation", desc: "Structured protocols built to limit downside exposure when markets turn." },
    { num: "05", title: "Long-Term Capital Compounding", desc: "Built for investors thinking in decades — not days, weeks, or single cycles." },
  ];

  return (
    <div className={`${fraunces.variable} font-sans bg-[#070707] text-white antialiased`}>
      {/* Scroll progress bar */}
      <motion.div
        style={{ width: barWidth }}
        className="fixed top-0 left-0 h-[3px] z-[70]"
      >
        <div className="h-full w-full" style={{ background: "linear-gradient(90deg, #F7931A, #C9A85C)" }} />
      </motion.div>

      <DesignSwitcher active="Design 3" />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Image src="/images/logo.png" alt="Market Capital Group" width={1412} height={541} className="h-8 w-auto object-contain" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/advisory" className="hover:text-white transition-colors">Advisory</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold text-black"
            style={{ background: "linear-gradient(135deg, #F7931A 0%, #C9A85C 100%)" }}
          >
            Request Playbook
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/whale-tail.jpg"
          alt="A whale's tail breaking the surface of the ocean"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(7,7,7,0.25) 0%, rgba(7,7,7,0.45) 45%, rgba(7,7,7,0.96) 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 85% 15%, rgba(247,147,26,0.18) 0%, transparent 45%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] tracking-[0.2em] uppercase text-white/45 mb-8 max-w-xl border-l border-[#C9A85C]/50 pl-4"
          >
            Without a Bitcoin risk management strategy, the biggest threat to
            your Bitcoin portfolio is you.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.6rem] sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl mb-8"
          >
            Bitcoin risk management for{" "}
            <span className={`${fraunces.className} italic font-medium`} style={goldGradientText}>
              serious
            </span>{" "}
            long-term investors.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/55 text-lg max-w-xl leading-relaxed mb-10"
          >
            Market Capital Group provides non-custodial Bitcoin risk management
            for investors with meaningful exposure who want a disciplined
            framework for navigating volatility and building generational wealth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-6"
          >
            <GoldButton href="/contact">Request the MCG Playbook</GoldButton>
            <span className="text-white/35 text-xs tracking-wide">Designed for investors with $250K+ Bitcoin exposure.</span>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-16">
          <Reveal>
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight max-w-md">
              Serious Bitcoin investors building generational wealth.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 mb-10">
              {[
                "Accredited investors",
                "Investors with $250,000+ Bitcoin exposure",
                "Business owners and professionals",
                "Long-term investors focused on wealth preservation and growth",
                "Investors who believe in Bitcoin but want a more disciplined approach to managing risk",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #F7931A, #C9A85C)" }} />
                  <span className="text-white/65 text-[16px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <OutlineButton href="/advisory">Learn More About Our Advisory Approach</OutlineButton>
          </Reveal>
        </div>
      </section>

      {/* Pain Point */}
      <section className="relative py-32 px-6 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>The Reality</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-tight mb-6">
              Most Bitcoin investors have exposure — but no strategy.
            </h2>
            <p className="text-white/55 leading-relaxed mb-4">
              Many investors accumulate significant Bitcoin wealth during bull
              markets only to watch a large portion disappear during bear markets.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Traditional advisors often offer Bitcoin access through ETFs but
              rarely provide a specialized framework for managing Bitcoin risk.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {["Large drawdowns", "Emotional decision-making", "Missed opportunities", "Lost compounding"].map((r) => (
                <div key={r} className="flex items-center gap-2.5 text-white/70 text-sm">
                  <span className="w-1 h-1 rounded-full bg-[#C9A85C] flex-shrink-0" />
                  {r}
                </div>
              ))}
            </div>
            <OutlineButton href="/advisory">See How MCG Manages Risk</OutlineButton>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative border border-white/10 rounded-sm p-10 bg-white/[0.02]">
              <span
                className={`${fraunces.className} italic text-2xl sm:text-3xl leading-relaxed block`}
                style={goldGradientText}
              >
                "The greatest risk in Bitcoin is not volatility. It's unmanaged volatility."
              </span>
              <div className="mt-8 h-px bg-gradient-to-r from-[#F7931A]/40 to-transparent" />
              <div className="mt-6 text-white/30 text-xs tracking-widest uppercase">Market Capital Group — Core Philosophy</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solution — alternating rows */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <Eyebrow>
              <span className="mx-auto">The Solution</span>
            </Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight">
              A disciplined framework for every market cycle.
            </h2>
          </Reveal>

          <div className="divide-y divide-white/[0.06]">
            {pillars.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.06}>
                <div className={`flex flex-col sm:flex-row gap-8 py-10 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0">
                    <span className={`${fraunces.className} text-6xl sm:text-7xl font-medium text-white/[0.06]`}>{p.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3">{p.title}</h3>
                    <p className="text-white/45 leading-relaxed max-w-xl">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pt-10 border-t border-white/[0.06]">
              <p className="font-semibold text-lg text-white/90">
                You keep control of your Bitcoin. We help manage the strategy.
              </p>
              <OutlineButton href="/services">Learn more</OutlineButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why MCG */}
      <section className="relative py-32 px-6 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <Eyebrow><span className="mx-auto">Why Market Capital Group</span></Eyebrow>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {["Not Another Bitcoin ETF", "Not A Trading Service", "Not A Crypto Influencer Brand"].map((n, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="border border-white/10 rounded-sm py-8 px-4">
                  <div className="text-white/25 text-xl mb-3">✕</div>
                  <p className="text-white/45 text-sm font-medium">{n}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <p className="text-2xl sm:text-3xl font-semibold leading-tight mb-4">MCG exists for one purpose:</p>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              To help serious Bitcoin investors preserve and compound wealth
              through disciplined risk management.
            </p>
            <OutlineButton href="/about">Learn More</OutlineButton>
          </Reveal>
        </div>
      </section>

      {/* Final CTA + Newsletter */}
      <section className="relative py-36 px-6 overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(247,147,26,0.10) 0%, transparent 60%)" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6">
              Bitcoin created the opportunity.{" "}
              <span className={`${fraunces.className} italic font-medium block mt-2`} style={goldGradientText}>
                Risk management protects it.
              </span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Request access to the MCG Bitcoin Risk Management Playbook and
              learn how disciplined investors manage Bitcoin across market cycles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-6">
              <GoldButton href="/contact">Request Access</GoldButton>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              {!subscribed ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your institutional email…"
                    className="bg-white/[0.03] border border-white/10 focus:border-[#C9A85C]/50 rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors duration-200 w-full sm:w-64"
                  />
                  <button type="submit" className="text-white text-sm font-semibold whitespace-nowrap hover:text-[#C9A85C] transition-colors duration-200">
                    Join Intel →
                  </button>
                </form>
              ) : (
                <p className="text-[#C9A85C] text-sm font-medium">You're on the list.</p>
              )}
            </div>
            <p className="text-white/25 text-xs tracking-widest uppercase">Qualification Required · Built for Serious Long-Term Investors</p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
            <Image src="/images/logo.png" alt="Market Capital Group" width={1412} height={541} className="h-8 w-auto object-contain opacity-70" />
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/45">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/advisory" className="hover:text-white transition-colors">Advisory</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>
          <div className="h-px bg-white/5 mb-8" />
          <div className="text-white/25 text-[11px] leading-relaxed max-w-3xl">
            Nothing on this page constitutes financial, legal, or tax advice. Market
            Capital Group is a non-custodial advisory firm and is not a registered
            investment advisor, broker-dealer, or custodian. MCG does not take
            custody of client assets at any time. Services are offered exclusively
            to accredited investors who meet MCG's qualification criteria.
          </div>
          <div className="text-white/20 text-xs mt-6">© {new Date().getFullYear()} Market Capital Group. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
