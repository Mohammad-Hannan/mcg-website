"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Advisory", href: "/advisory" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-obsidian-900">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative">
                <div className="w-9 h-9 rounded-sm bg-bitcoin flex items-center justify-center">
                  <span className="text-black font-black text-lg leading-none">₿</span>
                </div>
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-wider uppercase leading-none">Market Capital</div>
                <div className="text-bitcoin/80 text-[9px] tracking-[0.25em] uppercase font-medium leading-none mt-0.5">Group</div>
              </div>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              A non-custodial Bitcoin risk management firm helping serious long-term
              investors manage volatility, reduce drawdowns, and build generational
              wealth through disciplined strategic positioning.
            </p>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/20 font-medium">
              Boutique · Non-Custodial · Institutional
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-bold mb-5">Navigation</div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200 animated-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-orange" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/20 text-xs">
            © {new Date().getFullYear()} Market Capital Group. All rights reserved.
          </div>
          <div className="text-white/15 text-xs max-w-lg text-center sm:text-right leading-relaxed">
            Nothing on this website constitutes financial, legal, or tax advice.
            Market Capital Group is not a registered investment advisor.
            For accredited investors only. Qualification required.
          </div>
        </div>
      </div>
    </footer>
  );
}
