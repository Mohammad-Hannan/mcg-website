"use client";

import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Advisory", href: "/advisory" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal-black border-t border-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-sm bg-burnt flex items-center justify-center opacity-70">
                <span className="text-white font-black text-lg leading-none">₿</span>
              </div>
              <div>
                <div className="text-silver font-bold text-sm tracking-wider uppercase leading-none">Market Capital</div>
                <div className="text-silver/50 text-[9px] tracking-[0.25em] uppercase font-medium leading-none mt-0.5">Group</div>
              </div>
            </Link>
            <p className="text-silver/40 text-sm leading-relaxed mb-6">
              A non-custodial Bitcoin risk management firm helping serious long-term
              investors manage volatility, reduce drawdowns, and build generational
              wealth through disciplined strategic positioning.
            </p>
            <div className="text-[10px] tracking-[0.25em] uppercase text-silver/25 font-medium">
              Boutique · Non-Custodial · Institutional
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-silver/30 font-bold mb-5">Navigation</div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-silver/50 hover:text-burnt transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-flat" />

        {/* Bottom bar — legal / disclosure */}
        <div className="py-8 flex flex-col gap-4">
          <div className="text-silver/20 text-xs">
            © {new Date().getFullYear()} Market Capital Group. All rights reserved.
          </div>
          <div className="font-mono-data text-silver/25 text-[11px] leading-relaxed max-w-4xl">
            Nothing on this website constitutes financial, legal, or tax advice. Market
            Capital Group is a non-custodial advisory firm and is not a registered
            investment advisor, broker-dealer, or custodian. MCG does not take custody
            of client assets at any time. Services are offered exclusively to accredited
            investors who meet MCG's qualification criteria. Past performance and
            historical drawdown data are not indicative of future results. Qualification
            required prior to receiving advisory materials or the MCG Playbook.
          </div>
        </div>
      </div>
    </footer>
  );
}
