"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useQualificationModal } from "@/components/QualificationModal";

export default function WhaleHero() {
  const { open } = useQualificationModal();

  return (
    <section className="whale-locked relative min-h-screen flex flex-col items-start justify-center overflow-hidden bg-charcoal-deep">
      {/* Background image — optimized via next/image */}
      <Image
        src="/images/whale-tail.jpg"
        alt="A whale's tail breaking the surface of the ocean"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient fade for text legibility (bottom-heavy) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.55) 60%, rgba(13,13,13,0.92) 100%)",
        }}
      />
      {/* 25% dark charcoal tint overlay per spec */}
      <div className="absolute inset-0 bg-charcoal-deep/25" />

      {/* Subtle bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-charcoal-deep to-transparent" />

      {/* whale-locked keeps this hero permanently dark — it sits on a dark photo
          and must stay legible no matter what theme the rest of the site is in */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Pre-header eyebrow hook */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow-mono text-burnt mb-8 max-w-2xl border-l-2 border-burnt pl-4"
        >
          Without a bitcoin risk management strategy, the biggest threat to
          your bitcoin portfolio is you…
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-[3.4rem] max-w-4xl mb-8"
        >
          Investors are the biggest risk to their own bitcoin portfolios.
        </motion.h1>

        {/* Sub-headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-burnt font-bold text-xl sm:text-2xl mb-3 max-w-2xl"
        >
          Bitcoin Risk Management for Serious Long-Term Bitcoin Investors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-silver text-lg max-w-2xl mb-6"
        >
          Helping Accredited Investors Protect and Grow Bitcoin Wealth Across
          Market Cycles
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-silver/80 text-base leading-relaxed max-w-xl mb-10"
        >
          Market Capital Group provides non-custodial Bitcoin risk management
          for investors with meaningful Bitcoin exposure who want a disciplined
          framework for navigating volatility and building generational wealth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button onClick={open} className="btn-burnt">
            Request the MCG Bitcoin Risk Management Playbook
          </button>
          <p className="text-silver/50 text-xs tracking-wide mt-4">
            Designed for investors with $250K+ Bitcoin exposure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
