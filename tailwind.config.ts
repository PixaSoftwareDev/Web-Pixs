import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--c-bg) / <alpha-value>)",
          soft: "rgb(var(--c-bg-soft) / <alpha-value>)",
        },
        neon: {
          cyan: "rgb(var(--c-neon-cyan) / <alpha-value>)",
          magenta: "rgb(var(--c-neon-magenta) / <alpha-value>)",
          violet: "rgb(var(--c-neon-violet) / <alpha-value>)",
          lime: "rgb(var(--c-neon-lime) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          dim: "rgb(var(--c-ink-dim) / <alpha-value>)",
        },
        line: "rgb(var(--c-line) / <alpha-value>)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      animation: {
        scan: "scan 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
        "spin-slower": "spin 18s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseNeon: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px currentColor)" },
          "50%": { opacity: "0.7", filter: "drop-shadow(0 0 16px currentColor)" },
        },
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(0,240,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.07) 1px, transparent 1px)",
        "radial-fade": "radial-gradient(ellipse at center, rgba(139,92,246,0.15), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
