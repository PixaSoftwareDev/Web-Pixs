"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import GlitchText from "@/components/ui/GlitchText";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        delay: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.45,
        ease: "power2.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative min-h-screen overflow-hidden pt-24"
    >
      {/* Grid de fondo */}
      <div className="absolute inset-0 bg-tech-grid opacity-60" />

      {/* Scena 3D */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Vignette para legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-20 md:py-32">
        <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-neon-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse-neon" />
          Software studio
        </span>

        <h1 className="hero-title max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          Construimos el{" "}
          <GlitchText className="text-glow-cyan">software</GlitchText>
          <br />
          que tu negocio necesita.
        </h1>

        <p className="hero-sub max-w-xl font-mono text-sm leading-relaxed text-ink-dim md:text-base">
          {"// "} Diseñamos y desarrollamos productos digitales:
          <br />
          web apps, mobile, MVPs e integraciones a medida.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="hero-cta group inline-flex items-center gap-2 rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan"
          >
            Iniciar proyecto
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#portfolio"
            className="hero-cta inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-white/20 hover:bg-white/10"
          >
            Ver portfolio
          </a>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim">
        scroll ↓
      </div>
    </section>
  );
}
