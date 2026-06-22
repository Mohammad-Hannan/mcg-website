import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Capital Group — Design 2",
  description: "Alternate homepage concept for Market Capital Group.",
};

/* ── Shared bits ─────────────────────────────────────────────────── */
function PillButton({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline";
}) {
  const styles = {
    dark: "bg-[#0A0A0A] text-white hover:bg-[#222]",
    light: "bg-white text-[#0A0A0A] hover:bg-[#f0f0f0]",
    outline: "bg-transparent text-white border border-white/40 hover:border-white",
  };
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${styles[variant]}`}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`text-sm font-medium mb-4 ${light ? "text-white/70" : "text-[#4C5E8C]"}`}>
      {children}
    </div>
  );
}

/* ── Skyline silhouette — CSS/SVG placeholder for the hero photo ──── */
function SkylineBackdrop() {
  const bars = [18, 32, 22, 45, 28, 60, 38, 50, 24, 42, 30, 55, 20, 48, 33, 58, 26, 40];
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-full opacity-90"
    >
      {bars.map((h, i) => {
        const w = 1200 / bars.length;
        return (
          <rect
            key={i}
            x={i * w}
            y={300 - h * 4}
            width={w - 3}
            height={h * 4}
            fill={i % 3 === 0 ? "#11182B" : i % 2 === 0 ? "#161E33" : "#0D1220"}
          />
        );
      })}
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function Design2Page() {
  return (
    <div className={`${serif.variable} font-sans bg-white text-[#0A0A0A]`}>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/design2" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Market Capital Group" width={1412} height={541} className="h-8 w-auto object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#333]">
            <Link href="/services" className="hover:text-black transition-colors">Services</Link>
            <Link href="/advisory" className="hover:text-black transition-colors">Advisory</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/faq" className="hover:text-black transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#222] transition-colors">
              Request Playbook
            </Link>
            <Link href="/" className="inline-flex px-5 py-2.5 rounded-full border border-black/15 text-sm font-medium hover:border-black/40 transition-colors">
              ← Design 1
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[88vh] min-h-[640px] overflow-hidden bg-[#0A0E1A]">
        <SkylineBackdrop />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,14,26,0.55) 0%, rgba(10,14,26,0.35) 40%, rgba(10,14,26,0.92) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 h-full flex flex-col justify-end pb-20">
          <h1
            className={`${serif.className} text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.08] max-w-4xl mb-10`}
          >
            Discipline Protects Capital.
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10">
            <div className="flex gap-12">
              <div>
                <div className={`${serif.className} text-white text-4xl sm:text-5xl`}>$250K+</div>
                <div className="text-white/50 text-sm mt-1 max-w-[10rem]">Minimum Bitcoin Exposure</div>
              </div>
              <div>
                <div className={`${serif.className} text-white text-4xl sm:text-5xl`}>100%</div>
                <div className="text-white/50 text-sm mt-1 max-w-[10rem]">Non-Custodial Structure</div>
              </div>
            </div>
            <Link href="/advisory" className="inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/30 hover:border-white pb-1 transition-colors w-fit">
              Explore Our Framework <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Values strip (replaces a fabricated "trusted by" logo bar) */}
      <section className="bg-[#F4F6FA] py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Eyebrow>Our Principles</Eyebrow>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[#333] text-sm sm:text-base font-medium tracking-wide">
            {["Non-Custodial", "Accredited Investors Only", "Multi-Cycle Strategy", "Boutique Advisory"].map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-black/20">·</span>}
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About — two column */}
      <section className="bg-[#F4F6FA] py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>About MCG</Eyebrow>
            <h2 className={`${serif.className} text-4xl sm:text-5xl leading-[1.1] mb-6`}>
              From Speculation to Strategy
            </h2>
            <p className="text-[#444] text-lg leading-relaxed mb-8 max-w-lg">
              Market Capital Group is the leader in disciplined Bitcoin risk
              management, bridging long-term conviction with institutional-grade
              strategic oversight — without ever taking custody of client assets.
            </p>
            <PillButton href="/about">Learn More</PillButton>
          </div>
          <div className="relative h-[420px]">
            {[
              { label: "Non-Custodial", rotate: "-rotate-3", offset: "left-0 top-8", color: "from-[#1B2438] to-[#0D1220]" },
              { label: "Multi-Cycle", rotate: "rotate-2", offset: "left-1/3 top-0", color: "from-[#22304D] to-[#11182B]" },
              { label: "Disciplined", rotate: "-rotate-1", offset: "left-2/3 top-12", color: "from-[#2A3A5C] to-[#161E33]" },
            ].map((card) => (
              <div
                key={card.label}
                className={`absolute w-48 h-64 rounded-sm shadow-xl bg-gradient-to-br ${card.color} ${card.rotate} ${card.offset} flex items-end p-5`}
              >
                <span className="text-white/80 text-sm font-medium">{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Our Services</Eyebrow>
            <h2 className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl leading-[1.1]`}>
              Strategic Bitcoin Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: "Strategic Bitcoin Positioning",
                tags: ["Advisory", "Non-Custodial"],
                desc: "A systematic, rules-based approach to portfolio positioning across market cycles.",
                color: "from-[#1B2438] to-[#0A0E1A]",
              },
              {
                title: "Drawdown Mitigation",
                tags: ["Risk Management"],
                desc: "Structured protocols designed to reduce downside exposure during bear cycles.",
                color: "from-[#22304D] to-[#0D1220]",
              },
              {
                title: "Portfolio Oversight",
                tags: ["Ongoing Advisory"],
                desc: "Continuous strategic guidance informed by market cycle and on-chain intelligence.",
                color: "from-[#2A3A5C] to-[#11182B]",
              },
            ].map((card) => (
              <div key={card.title} className="border border-black/10 rounded-sm overflow-hidden group">
                <div className={`relative h-48 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <span className={`${serif.className} text-white text-2xl px-4 text-center`}>{card.title}</span>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-2 text-xs text-[#4C5E8C] font-medium mb-3">
                    {card.tags.map((t, i) => (
                      <span key={t} className="flex items-center gap-2">
                        {i > 0 && <span className="text-black/20">|</span>}
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <PillButton href="/services">Learn More</PillButton>
          </div>
        </div>
      </section>

      {/* Insights / news list */}
      <section className="bg-[#F4F6FA] py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h2 className={`${serif.className} text-4xl sm:text-5xl leading-[1.1] mb-8`}>
              Market Intelligence
            </h2>
            <PillButton href="/faq">View All Insights</PillButton>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { date: "Drawdown Management", title: "Why Volatility Isn't the Risk — Unmanaged Volatility Is" },
              { date: "Market Cycles", title: "Positioning Strategically Across Bitcoin's Multi-Year Cycles" },
              { date: "Capital Preservation", title: "What ETF Ownership Doesn't Protect You From" },
            ].map((item) => (
              <div key={item.title} className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-[#4C5E8C] text-sm font-medium mb-1">{item.date}</div>
                  <div className="font-semibold text-lg">{item.title}</div>
                </div>
                <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-medium border-b border-black/20 hover:border-black pb-0.5 transition-colors w-fit flex-shrink-0">
                  Read More <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-[#5571A6] py-28 px-6 text-center">
        <h2 className={`${serif.className} text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.15] max-w-3xl mx-auto mb-10`}>
          Let's Protect Your Bitcoin Wealth, Together.
        </h2>
        <PillButton href="/contact" variant="light">Get in Touch</PillButton>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white/70 pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-white/40 leading-relaxed max-w-3xl mb-12 pb-8 border-b border-white/10">
            Nothing on this page constitutes financial, legal, or tax advice. Market
            Capital Group is a non-custodial advisory firm and is not a registered
            investment advisor, broker-dealer, or custodian. Services are offered
            exclusively to accredited investors who meet MCG's qualification criteria.
          </div>

          <div className="flex items-center gap-2 mb-10 opacity-70">
            <Image src="/images/logo.png" alt="Market Capital Group" width={1412} height={541} className="h-7 w-auto object-contain" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="font-semibold text-white mb-3">Company</div>
              <ul className="space-y-2 text-white/50">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">Services</div>
              <ul className="space-y-2 text-white/50">
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/advisory" className="hover:text-white transition-colors">Advisory</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">Resources</div>
              <ul className="space-y-2 text-white/50">
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">Get Started</div>
              <ul className="space-y-2 text-white/50">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating back-to-design-1 pill */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A0A0A] text-white text-sm font-medium shadow-lg hover:bg-[#222] transition-colors"
      >
        ← Back to Design 1
      </Link>
    </div>
  );
}
