"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import DesignSwitcher from "@/components/DesignSwitcher";

/* ── Brand glow gradient — vivid, more saturated than Design 3 ──────── */
const GLOW = "linear-gradient(135deg, #FFB347 0%, #F7931A 45%, #FF4D2E 100%)";

function GlowText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: GLOW,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 mb-5 ${center ? "justify-center" : ""}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: GLOW }} />
      <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white/50">{children}</span>
    </div>
  );
}

function GlowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-black overflow-hidden"
      style={{ background: GLOW }}
    >
      <span className="relative">{children}</span>
      <span className="relative group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden>→</span>
    </Link>
  );
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/[0.03] text-white/80 hover:text-white hover:border-white/30 text-sm font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

/* ── Dot-grid texture backdrop ───────────────────────────────────── */
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)",
      }}
    />
  );
}

/* ── Live Bitcoin price dashboard card ──────────────────────────── */
interface ChartPoint { t: number; p: number; }
const RANGES = [
  { label: "1D", days: "1" },
  { label: "7D", days: "7" },
  { label: "1M", days: "30" },
  { label: "1Y", days: "365" },
];

function BitcoinDashboardCard() {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [range, setRange] = useState(RANGES[1]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  const fetchChart = useCallback(async (days: string) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
      );
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      const prices: [number, number][] = data.prices || [];
      const sampled = prices
        .filter((_, i) => i % Math.max(1, Math.floor(prices.length / 60)) === 0)
        .map(([t, p]) => ({ t, p }));
      setPoints(sampled);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        );
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (cancelled) return;
        setPrice(data.bitcoin?.usd ?? null);
        setChange(data.bitcoin?.usd_24h_change ?? null);
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    fetchChart(range.days);
  }, [range, fetchChart]);

  // Fallback illustrative series if the live API is unreachable
  const fallback = [10, 14, 11, 18, 15, 22, 19, 26, 23, 30, 27, 34, 31, 38];
  const series = points.length > 1 ? points.map((p) => p.p) : fallback;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const norm = series.map((v) => (max === min ? 0.5 : (v - min) / (max - min)));
  const w = 280;
  const h = 90;
  const path = norm
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (norm.length - 1)) * w} ${h - v * h}`)
    .join(" ");
  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`;

  const isUp = (change ?? 0) >= 0;

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: GLOW }}>
            ₿
          </div>
          <div>
            <div className="text-white text-sm font-semibold leading-none">Bitcoin</div>
            <div className="text-white/35 text-[11px] leading-none mt-0.5">BTC · USD</div>
          </div>
        </div>
        <span className={`text-[11px] font-medium px-2 py-1 rounded-md ${status === "ok" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/30"}`}>
          {status === "ok" ? "Live" : status === "loading" ? "Loading…" : "Illustrative"}
        </span>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-white tabular-nums">
            {price ? `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—"}
          </div>
          {change !== null && (
            <div className={`text-sm font-medium mt-1 ${isUp ? "text-emerald-400" : "text-red-400"}`}>
              {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}% (24h)
            </div>
          )}
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24 mb-4" preserveAspectRatio="none">
        <defs>
          <linearGradient id="btcFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F7931A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="btcLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#FF4D2E" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#btcFill)" />
        <path d={path} fill="none" stroke="url(#btcLine)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="flex items-center gap-1.5">
        {RANGES.map((r) => (
          <button
            key={r.label}
            onClick={() => setRange(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
              r.label === range.label ? "bg-white/10 text-white" : "text-white/35 hover:text-white/60"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function Design4Page() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const pillars = [
    { title: "Non-Custodial Risk Management", desc: "Your Bitcoin stays with you and your custodian. MCG provides strategic oversight only — never custody." },
    { title: "Market Cycle Awareness", desc: "Strategic positioning informed by macro conditions and on-chain signals across multi-year cycles." },
    { title: "Strategic Portfolio Positioning", desc: "Disciplined allocation frameworks built to hold up across bull and bear conditions alike." },
    { title: "Drawdown Mitigation", desc: "Structured protocols designed to limit downside exposure when markets turn." },
    { title: "Long-Term Capital Compounding", desc: "Built for investors thinking in decades — not days." },
  ];

  return (
    <div className="bg-[#080808] text-white font-sans antialiased min-h-screen">
      <DesignSwitcher active="Design 4" />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#080808]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Image src="/images/logo.png" alt="Market Capital Group" width={1412} height={541} className="h-8 w-auto object-contain" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/advisory" className="hover:text-white transition-colors">Advisory</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <Link href="/contact" className="inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold text-black" style={{ background: GLOW }}>
            Request Playbook
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-44 pb-28 px-6 overflow-hidden">
        <DotGrid />
        <div
          className="absolute -top-40 right-[-10%] w-[700px] h-[700px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: GLOW }}
        />
        <div
          className="absolute top-1/3 left-[-15%] w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF4D2E, transparent)" }}
        />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow>Bitcoin Risk Management Advisory</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-7"
            >
              Bitcoin built the upside.{" "}
              <GlowText>We engineer the downside.</GlowText>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/55 text-lg leading-relaxed max-w-lg mb-9"
            >
              Market Capital Group provides non-custodial Bitcoin risk
              management for investors with meaningful exposure who want a
              disciplined framework for navigating volatility and building
              generational wealth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-5 mb-10"
            >
              <GlowButton href="/contact">Request the MCG Playbook</GlowButton>
              <OutlineButton href="/advisory">Explore the Framework</OutlineButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/35 text-xs tracking-wide"
            >
              <span>Non-Custodial</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Accredited Investors Only</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>$250K+ Min. Exposure</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <BitcoinDashboardCard />
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-16">
          <Reveal>
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight max-w-md">
              Serious Bitcoin investors building generational wealth.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4 mb-9">
              {[
                "Accredited investors",
                "Investors with $250,000+ Bitcoin exposure",
                "Business owners and professionals",
                "Long-term investors focused on wealth preservation and growth",
                "Investors who want a more disciplined approach to managing risk",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-black flex-shrink-0" style={{ background: GLOW }}>✓</span>
                  <span className="text-white/65 text-[15px] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <OutlineButton href="/advisory">Learn About Our Advisory Approach</OutlineButton>
          </Reveal>
        </div>
      </section>

      {/* Pain Point */}
      <section className="relative py-28 px-6 bg-white/[0.015] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>The Reality</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight mb-5">
              Most Bitcoin investors have exposure — but no strategy.
            </h2>
            <p className="text-white/55 leading-relaxed mb-4">
              Many investors accumulate significant Bitcoin wealth during bull
              markets only to watch a large portion disappear during bear markets.
            </p>
            <p className="text-white/40 leading-relaxed mb-7">
              Traditional advisors often offer Bitcoin access through ETFs but
              rarely provide a specialized framework for managing Bitcoin risk.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {["Large drawdowns", "Emotional decision-making", "Missed opportunities", "Lost compounding"].map((r) => (
                <div key={r} className="flex items-center gap-2.5 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GLOW }} />
                  {r}
                </div>
              ))}
            </div>
            <OutlineButton href="/advisory">See How MCG Manages Risk</OutlineButton>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-9">
              <p className="text-2xl sm:text-3xl font-semibold leading-relaxed mb-7">
                "The greatest risk in Bitcoin is not volatility.{" "}
                <GlowText>It's unmanaged volatility.</GlowText>"
              </p>
              <div className="h-px bg-white/10 mb-5" />
              <div className="text-white/35 text-xs tracking-widest uppercase">Market Capital Group — Core Philosophy</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solution */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>The Solution</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
              A disciplined framework for every market cycle.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 h-full overflow-hidden group hover:border-white/20 transition-colors duration-300">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: GLOW }} />
                  <div className="text-3xl font-bold mb-4" style={{ color: "#F7931A" }}>0{i + 1}</div>
                  <h3 className="text-lg font-bold mb-2.5">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <p className="font-semibold text-lg">You keep control of your Bitcoin. We help manage the strategy.</p>
              <OutlineButton href="/services">Learn more</OutlineButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why MCG */}
      <section className="relative py-28 px-6 bg-white/[0.015] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <Eyebrow center>Why Market Capital Group</Eyebrow>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {["Not Another Bitcoin ETF", "Not A Trading Service", "Not A Crypto Influencer Brand"].map((n, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-8 px-4">
                  <div className="text-white/20 text-xl mb-3">✕</div>
                  <p className="text-white/45 text-sm font-medium">{n}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <p className="text-2xl sm:text-3xl font-bold leading-tight mb-4">MCG exists for one purpose:</p>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto mb-9">
              To help serious Bitcoin investors preserve and compound wealth
              through disciplined risk management.
            </p>
            <OutlineButton href="/about">Learn More</OutlineButton>
          </Reveal>
        </div>
      </section>

      {/* Final CTA + Newsletter */}
      <section className="relative py-32 px-6 overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, #F7931A, transparent)" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
              Bitcoin created the opportunity.{" "}
              <GlowText>Risk management protects it.</GlowText>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto mb-11 leading-relaxed">
              Request access to the MCG Bitcoin Risk Management Playbook and
              learn how disciplined investors manage Bitcoin across market cycles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-6">
              <GlowButton href="/contact">Request Access</GlowButton>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              {!subscribed ? (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your institutional email…"
                    className="bg-white/[0.04] border border-white/10 focus:border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors duration-200 w-full sm:w-64"
                  />
                  <button type="submit" className="text-white text-sm font-semibold whitespace-nowrap hover:opacity-80 transition-opacity duration-200">
                    Join Intel →
                  </button>
                </form>
              ) : (
                <p className="text-sm font-medium"><GlowText>You're on the list.</GlowText></p>
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
            to accredited investors who meet MCG's qualification criteria. Bitcoin
            price data shown is provided by a third-party public API for
            illustrative purposes and is not investment advice.
          </div>
          <div className="text-white/20 text-xs mt-6">© {new Date().getFullYear()} Market Capital Group. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
