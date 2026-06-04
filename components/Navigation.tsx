"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Advisory", href: "/advisory" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="relative w-9 h-9 flex items-center justify-center rounded-sm border border-white/10 hover:border-bitcoin/30 transition-colors duration-200 group overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Sun size={15} className="text-white/50 group-hover:text-bitcoin transition-colors duration-200" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Moon size={15} className="text-obsidian-900/50 group-hover:text-bitcoin transition-colors duration-200" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLight = theme === "light";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? `backdrop-blur-xl border-b ${isLight ? "bg-[#F5F2EE]/95 border-black/[0.06]" : "bg-obsidian-900/95 border-white/[0.04]"}`
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-sm bg-bitcoin flex items-center justify-center">
                  <span className="text-black font-black text-lg leading-none">₿</span>
                </div>
                <div className="absolute inset-0 rounded-sm bg-bitcoin opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
              </div>
              <div>
                <div className={`font-bold text-sm tracking-wider uppercase leading-none transition-colors duration-300 ${isLight ? "text-obsidian-900" : "text-white"}`}>
                  Market Capital
                </div>
                <div className="text-bitcoin/80 text-[9px] tracking-[0.25em] uppercase font-medium leading-none mt-0.5">
                  Group
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 animated-underline ${
                    pathname === link.href
                      ? "text-bitcoin"
                      : isLight
                      ? "text-obsidian-900/50 hover:text-obsidian-900"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide overflow-hidden rounded-sm border border-bitcoin/40 text-bitcoin hover:text-black transition-colors duration-300"
              >
                <span className="absolute inset-0 bg-bitcoin translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative">Request Playbook</span>
              </Link>
            </div>

            {/* Mobile: toggle + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 transition-colors ${isLight ? "text-obsidian-900/60 hover:text-obsidian-900" : "text-white/70 hover:text-white"}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-40 backdrop-blur-xl pt-20 md:hidden ${isLight ? "bg-[#F5F2EE]/98" : "bg-obsidian-900/98"}`}
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-4 text-xl font-medium border-b transition-colors ${
                      pathname === link.href
                        ? "text-bitcoin"
                        : isLight
                        ? "text-obsidian-900/60 hover:text-obsidian-900 border-black/[0.06]"
                        : "text-white/70 hover:text-white border-white/[0.06]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 bg-bitcoin text-black font-bold tracking-wide rounded-sm"
                >
                  Request Playbook
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
