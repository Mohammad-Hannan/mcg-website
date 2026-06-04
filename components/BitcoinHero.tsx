"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import Link from "next/link";

/* ─── Particle system ──────────────────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#F7931A", "#C9A85C", "#E0C07A", "rgba(247,147,26,0.6)"];

    const spawnParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 160 + Math.random() * 80;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      particles.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.2 - Math.random() * 0.8,
        size: 0.8 + Math.random() * 2.2,
        alpha: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 120 + Math.random() * 180,
      });
    };

    let frame = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame++;
      if (frame % 3 === 0 && particles.length < 120) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.002; // slight upward drift

        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
          ? 1 - (progress - 0.7) / 0.3
          : 1;

        ctx.save();
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      // Draw orbit rings
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const t = frame * 0.003;

      for (let ring = 0; ring < 3; ring++) {
        const r = 150 + ring * 60;
        const alpha = 0.04 - ring * 0.01;
        ctx.save();
        ctx.strokeStyle = `rgba(247,147,26,${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -t * 30 * (ring % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw data-point trail along outer orbit
      for (let j = 0; j < 6; j++) {
        const angle = t * (j % 2 === 0 ? 0.8 : -0.5) + (j * Math.PI * 2) / 6;
        const r = 210 + Math.sin(t * 2 + j) * 20;
        const dotX = cx + Math.cos(angle) * r;
        const dotY = cy + Math.sin(angle) * r;
        const dotAlpha = 0.2 + 0.2 * Math.sin(t * 3 + j);

        ctx.save();
        ctx.globalAlpha = dotAlpha;
        ctx.fillStyle = "#F7931A";
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fill();
        // glow
        const grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
        grad.addColorStop(0, "rgba(247,147,26,0.3)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ─── Animated counter ─────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 2,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        node.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return controls.stop;
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Main Hero component ──────────────────────────────────────────── */
export default function BitcoinHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useParticleCanvas(canvasRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms
  const btcScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const btcY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const btcRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const btcOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.4], [1, 2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);

  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.4], [0, -20]);

  // Parallax layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const springScale = useSpring(btcScale, { stiffness: 80, damping: 20 });
  const springRotate = useSpring(btcRotate, { stiffness: 40, damping: 15 });

  // Mouse parallax on BTC symbol
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const btcMouseX = useTransform(mouseX, [-500, 500], [-12, 12]);
  const btcMouseY = useTransform(mouseY, [-500, 500], [-8, 8]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh]" // extra scroll room for animation
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Background layers */}
        <div className="absolute inset-0 bg-obsidian-900" />
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Radial glow */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(247,147,26,0.12) 0%, transparent 70%)" }}
          />
        </motion.div>

        {/* Particle canvas */}
        <motion.canvas
          ref={canvasRef}
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* ── Bitcoin symbol ── */}
        <motion.div
          style={{
            scale: springScale,
            y: btcY,
            rotate: springRotate,
            opacity: btcOpacity,
            x: btcMouseX,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10"
        >
          {/* Outer halo rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.04, 0.08] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bitcoin/20"
              style={{ width: 220 + i * 70, height: 220 + i * 70 }}
            />
          ))}

          {/* The Bitcoin coin */}
          <div className="relative w-56 h-56">
            {/* Coin body */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 180deg, #1A1000, #3D2200, #F7931A, #C9A85C, #F7931A, #3D2200, #1A1000)" }}
            />
            {/* Inner face */}
            <div className="absolute inset-[3px] rounded-full flex items-center justify-center"
              style={{ background: "radial-gradient(circle at 35% 35%, #2A1800, #0D0803)" }}
            >
              {/* Glow inner */}
              <div className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle at 40% 30%, rgba(247,147,26,0.15) 0%, transparent 60%)" }}
              />
              {/* ₿ symbol */}
              <span
                className="relative z-10 select-none font-black"
                style={{
                  fontSize: "7rem",
                  lineHeight: 1,
                  background: "linear-gradient(160deg, #F9D07A 0%, #F7931A 40%, #C9A85C 70%, #F7931A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 8px rgba(247,147,26,0.5))",
                  textShadow: "none",
                  fontFamily: "var(--font-inter)",
                }}
              >
                ₿
              </span>
            </div>
            {/* Edge shine */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)" }}
            />
          </div>
        </motion.div>

        {/* ── Headline & CTA ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 z-20 pointer-events-none">
          <motion.div
            style={{ y: textY }}
            className="text-center max-w-4xl mx-auto pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-6"
            >
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-bitcoin animate-pulse" />
                Bitcoin Risk Management Advisory
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            >
              <span className="block text-white">Bitcoin Creates</span>
              <span className="block bitcoin-gradient glow-text-orange">
                the Opportunity.
              </span>
              <span className="block text-white/90">Risk Management</span>
              <span className="block text-white">Protects It.</span>
            </motion.h1>

            <motion.p
              style={{ y: subtitleY }}
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
            >
              A non-custodial advisory firm helping serious long-term investors
              manage volatility, reduce drawdowns, and compound wealth across
              multiple Bitcoin market cycles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-bitcoin text-black font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden"
              >
                <span className="absolute inset-0 bg-bitcoin-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative">Request the MCG Playbook</span>
                <svg className="relative w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-4 text-sm text-white/60 hover:text-white font-medium tracking-wide transition-colors duration-200 border border-white/10 rounded-sm hover:border-white/20"
              >
                Learn Our Approach
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-bitcoin/50 to-transparent"
          />
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04] bg-obsidian-800/60 backdrop-blur-sm z-20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/[0.04] py-5">
              {[
                { label: "Client Asset Exposure", value: 250, suffix: "K+ Min." },
                { label: "Multi-Cycle Strategy", value: 4, suffix: " Cycles" },
                { label: "Non-Custodial Model", value: 100, suffix: "%" },
              ].map((stat) => (
                <div key={stat.label} className="px-6 text-center first:pl-0 last:pr-0">
                  <div className="text-2xl font-black text-bitcoin tabular-nums">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-white/30 mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
