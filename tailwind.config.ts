import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          DEFAULT: "#F7931A",
          dark: "#D4780E",
          light: "#F9A84A",
        },
        obsidian: {
          950: "#080808",
          900: "#0D0D0D",
          800: "#111111",
          700: "#181818",
          600: "#1E1E1E",
          500: "#242424",
          400: "#2E2E2E",
          300: "#3A3A3A",
        },
        gold: {
          DEFAULT: "#C9A85C",
          light: "#E0C07A",
          muted: "#9A7A3E",
        },
        burnt: {
          DEFAULT: "#D35400",
          dark: "#B34700",
          light: "#E67E22",
        },
        silver: {
          DEFAULT: "#A3A3A3",
          dim: "#7A7A7A",
        },
        divider: "#2C2C2C",
        charcoal: {
          DEFAULT: "#121212",
          deep: "#0D0D0D",
          card: "#1A1A1A",
          black: "#050505",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "blur(40px)" },
          "50%": { opacity: "1", filter: "blur(60px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(247,147,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,26,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(247,147,26,0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
