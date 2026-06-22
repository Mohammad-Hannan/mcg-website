"use client";

import Link from "next/link";

const designs = [
  { label: "Design 1", href: "/" },
  { label: "Design 2", href: "/design2" },
  { label: "Design 3", href: "/design3" },
  { label: "Design 4", href: "/design4" },
];

export default function DesignSwitcher({ active }: { active: "Design 1" | "Design 2" | "Design 3" | "Design 4" }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-1 p-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl">
      {designs.map((d) => (
        <Link
          key={d.label}
          href={d.href}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 ${
            d.label === active
              ? "bg-white text-black"
              : "text-white/60 hover:text-white"
          }`}
        >
          {d.label}
        </Link>
      ))}
    </div>
  );
}
