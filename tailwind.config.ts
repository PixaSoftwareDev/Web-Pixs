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
        // Acentos de marca (degradé del logo: cyan → azul → violeta).
        brand: {
          cyan: "rgb(var(--c-neon-cyan) / <alpha-value>)",
          blue: "rgb(var(--c-neon-magenta) / <alpha-value>)",
          violet: "rgb(var(--c-neon-violet) / <alpha-value>)",
          green: "rgb(var(--c-neon-lime) / <alpha-value>)",
        },
        // Alias histórico (componentes de /tecnologia todavía lo usan).
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
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
