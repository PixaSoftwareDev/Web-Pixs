"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "@/components/ui/ScrambleText";
import HeroTerminal from "@/components/ui/HeroTerminal";
import HeroParticles from "@/components/ui/HeroParticles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const spotlight = useRef<HTMLDivElement>(null);

  // Spotlight reactivo al cursor — actualiza CSS vars directo, sin re-renders.
  useEffect(() => {
    const el = spotlight.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Entrada
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
      gsap.from(".hero-terminal", {
        x: 30,
        opacity: 0,
        duration: 1.1,
        delay: 0.4,
        ease: "power3.out",
      });

      // Scroll: el contenido se aleja (fade + scale + lift)
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -90,
        opacity: 0.15,
        scale: 0.96,
        ease: "none",
      });

      // Parallax: la aurora drifta hacia abajo más lento que el scroll
      gsap.to(".aurora-blob", {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
        y: 140,
        ease: "none",
      });

      // Parallax inverso: el grid se mueve hacia arriba — sensación de profundidad
      gsap.to(".hero-grid", {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -60,
        opacity: 0.2,
        ease: "none",
      });

      // Indicador de scroll desaparece apenas el usuario empieza a scrollear
      gsap.to(".hero-scroll-indicator", {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
        opacity: 0,
        y: 20,
        ease: "none",
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
      {/* Aurora: blobs blureados drifteando lento */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="aurora-blob aurora-blob--cyan" />
        <div className="aurora-blob aurora-blob--magenta" />
        <div className="aurora-blob aurora-blob--violet" />
      </div>

      {/* Partículas / motas de data ascendiendo */}
      <HeroParticles />

      {/* Spotlight que sigue el cursor */}
      <div
        ref={spotlight}
        className="hero-spotlight pointer-events-none absolute inset-0 z-0"
      />

      {/* Grid técnico sutil */}
      <div className="hero-grid pointer-events-none absolute inset-0 z-0 bg-tech-grid opacity-50" />

      {/* Vignette para legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <div className="hero-content relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-12 md:gap-10 md:py-28 lg:gap-16">
        {/* Columna texto + CTAs */}
        <div className="flex flex-col items-start gap-6 md:col-span-7">
          <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-neon-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse-neon" />
            Software studio · Argentina
          </span>

          <h1 className="hero-title font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Construimos el{" "}
            <ScrambleText className="bg-gradient-to-r from-ink to-neon-cyan bg-clip-text font-mono text-transparent">
              software
            </ScrambleText>{" "}
            que tu negocio necesita.
          </h1>

          <p className="hero-sub max-w-xl font-mono text-sm leading-relaxed text-ink-dim md:text-base">
            {"// "} Web apps, mobile, MVPs, integraciones y agentes IA.
            <br />
            De la idea a producción en semanas, no en trimestres.
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
              href="#services"
              className="hero-cta inline-flex items-center gap-2 rounded-md border border-line/15 bg-line/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-line/25 hover:bg-line/10"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Columna terminal — identidad "somos código" */}
        <div className="hero-terminal w-full md:col-span-5">
          <HeroTerminal />
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim">
        <span>scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-neon-cyan/60 to-transparent" />
      </div>
    </section>
  );
}
