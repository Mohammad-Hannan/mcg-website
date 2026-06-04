"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const faqs = [
  {
    q: "What exactly is Market Capital Group?",
    a: "Market Capital Group is a non-custodial Bitcoin risk management advisory firm. We provide strategic oversight, market cycle positioning guidance, and drawdown mitigation advisory to serious long-term Bitcoin investors. We are not a trading service, exchange, custodian, or retail platform.",
  },
  {
    q: "What does 'non-custodial' mean?",
    a: "Non-custodial means MCG never takes possession of, control over, or custody of your Bitcoin or any other assets. Your private keys remain entirely in your control at all times. MCG provides strategic advisory guidance only — we have no ability to move, transact, or access your assets.",
  },
  {
    q: "Who is MCG designed for?",
    a: "MCG is designed exclusively for serious long-term Bitcoin investors — typically accredited investors with $250,000 or more in Bitcoin exposure. Our clients are business owners, entrepreneurs, professionals, and long-term allocators who believe in Bitcoin's long-term value but want institutional-grade discipline in managing its volatility.",
  },
  {
    q: "Is MCG a registered investment advisor?",
    a: "MCG operates as a strategic advisory firm. Nothing on our website or in our advisory materials constitutes financial, legal, or tax advice. We recommend all clients consult with their licensed financial, legal, and tax advisors before making any investment decisions.",
  },
  {
    q: "What is the MCG Bitcoin Wealth Management Playbook?",
    a: "The Playbook is MCG's foundational strategic framework document — an overview of our approach to Bitcoin risk management, market cycle positioning, drawdown mitigation, and long-term wealth compounding. It is available to qualified investors who complete our intake process.",
  },
  {
    q: "What is the minimum Bitcoin exposure to work with MCG?",
    a: "MCG generally works with investors who have a minimum of $250,000 in Bitcoin exposure. This threshold ensures that the advisory relationship is appropriate for the client's capital level and that our institutional-grade framework is most effectively applied.",
  },
  {
    q: "Does MCG provide trading signals or price predictions?",
    a: "No. MCG does not provide trading signals, price predictions, technical analysis alerts, or any form of speculative market commentary. Our advisory is entirely focused on long-term strategic positioning, risk management frameworks, and capital preservation — not short-term trading.",
  },
  {
    q: "How does MCG differ from a Bitcoin ETF or passive holding?",
    a: "Passive Bitcoin ETF ownership provides exposure to Bitcoin's price — but no strategic management of its volatility. MCG provides the disciplined framework for positioning around market cycles that ETF ownership cannot. Passive holders experience the full force of Bitcoin's 70–85% bear market drawdowns without any strategic mitigation.",
  },
  {
    q: "How do I begin the process?",
    a: "Request the MCG Bitcoin Wealth Management Playbook through our contact page. After reviewing the Playbook, qualified investors complete a brief intake form providing information about their investment objectives and Bitcoin exposure. MCG will then reach out to schedule a strategic discussion.",
  },
  {
    q: "Is this only for Bitcoin, or does MCG advise on other cryptocurrencies?",
    a: "MCG is exclusively focused on Bitcoin. We do not advise on other cryptocurrencies, tokens, altcoins, NFTs, or other digital assets. This intentional focus reflects our conviction that Bitcoin represents a distinct and singular asset class warranting dedicated institutional-grade management.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`border-b border-white/[0.06] group transition-colors duration-200 ${open ? "border-bitcoin/20" : "hover:border-white/10"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left"
      >
        <span className={`text-base font-semibold leading-snug transition-colors duration-200 ${open ? "text-white" : "text-white/75 group-hover:text-white"}`}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm transition-colors duration-200 ${
            open ? "border-bitcoin text-bitcoin" : "border-white/20 text-white/40"
          }`}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/50 leading-relaxed pb-7 text-[15px] max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <FadeIn><span className="tag-pill mb-8 inline-flex">FAQ</span></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6 max-w-3xl">
              Frequently Asked{" "}
              <span className="bitcoin-gradient">Questions</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
              Clarity on what MCG is, how it works, and who it's designed for.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-orange max-w-6xl mx-auto" />

      {/* FAQ list */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
            <p className="text-white/45 mb-8 max-w-xl mx-auto">
              The most effective way to understand the MCG advisory model is to
              request the Playbook and begin the qualification process.
            </p>
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
