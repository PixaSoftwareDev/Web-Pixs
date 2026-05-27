"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "@/lib/content";
import ScrambleText from "@/components/ui/ScrambleText";
import GhostNumber from "@/components/ui/GhostNumber";

type Accent = "cyan" | "violet" | "magenta";

/**
 * Mapa de colores de acento por miembro. Cada card usa el color para:
 *  - barra de accent superior de la foto
 *  - dot de estado
 *  - separator debajo del nombre
 *  - color del border y glow al hover
 */
const accentMap: Record<
  Accent,
  {
    text: string;
    dot: string;
    bar: string;
    border: string;
    glow: string;
  }
> = {
  cyan: {
    text: "text-neon-cyan",
    dot: "bg-neon-cyan",
    bar: "from-neon-cyan to-transparent",
    border: "group-hover:border-neon-cyan/50",
    glow: "group-hover:shadow-[0_24px_64px_-12px_rgb(var(--c-neon-cyan)/0.25)]",
  },
  violet: {
    text: "text-neon-violet",
    dot: "bg-neon-violet",
    bar: "from-neon-violet to-transparent",
    border: "group-hover:border-neon-violet/50",
    glow: "group-hover:shadow-[0_24px_64px_-12px_rgb(var(--c-neon-violet)/0.25)]",
  },
  magenta: {
    text: "text-neon-magenta",
    dot: "bg-neon-magenta",
    bar: "from-neon-magenta to-transparent",
    border: "group-hover:border-neon-magenta/50",
    glow: "group-hover:shadow-[0_24px_64px_-12px_rgb(var(--c-neon-magenta)/0.25)]",
  },
};

export default function Team() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-title",
            start: "top 85%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        ".team-meta",
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".team-meta",
            start: "top 85%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
      // Cards: clip-path reveal de arriba hacia abajo + slide + fade.
      // El conjunto se "destapa" como cortina cayendo, no como un simple fade.
      gsap.fromTo(
        ".team-card",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          y: 40,
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );

      // Foto interior con zoom-out (1.25 → 1) mientras el card se destapa.
      // Da sensación de que la imagen "se asienta" en su lugar.
      gsap.fromTo(
        ".team-card-photo",
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.4,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            once: true,
            toggleActions: "play none none none",
          },
          onComplete: () =>
            gsap.set(".team-card-photo", { clearProps: "transform" }),
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="team"
      className="relative overflow-hidden bg-bg-soft/50 py-24 md:py-32"
    >
      {/* Grid de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-25" />

      <GhostNumber number="04" side="left" />

      {/* Halos centradas */}
      <div className="pointer-events-none absolute left-[10%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-neon-violet/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-neon-cyan/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="team-meta md:col-span-5 md:flex md:items-end md:pb-3">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse-neon" />
                Founders · 03 · Pixs
              </div>
              <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-ink-dim">
                Tres founders. Una misma visión: software que mueve la aguja.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <h2 className="team-title font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
              Las mentes
              <br />
              detrás del{" "}
              <ScrambleText className="bg-gradient-to-r from-ink to-neon-cyan bg-clip-text font-mono text-transparent">
                código
              </ScrambleText>
              .
            </h2>
          </div>
        </header>

        {/* Grid de cards — 1 col mobile, 3 cols desktop, max ancho razonable */}
        <div className="team-grid mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {team.map((member, i) => {
            const a = accentMap[member.accent as Accent];
            const index = String(i + 1).padStart(2, "0");
            return (
              <article
                key={member.name}
                className={`team-card group relative flex flex-col overflow-hidden rounded-2xl border border-line/15 bg-bg/40 backdrop-blur-sm transition-all duration-500 ${a.border} ${a.glow}`}
              >
                {/* Bloque foto — cuadrada (1:1) para que el card no sea tan alto */}
                <div className="relative aspect-square overflow-hidden bg-bg-soft">
                  {/* Barra de accent en el top de la foto */}
                  <div
                    className={`absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r ${a.bar}`}
                  />

                  {/* Index + status en el top */}
                  <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim/80">
                      {index} / {String(team.length).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${a.dot} animate-pulse-neon`}
                    />
                  </div>

                  {/* Foto — la clase team-card-photo es el target del GSAP scale-out */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="team-card-photo object-cover object-top"
                  />

                  {/* Vignette inferior para que el texto del card abajo
                      respire desde la foto sin un corte duro */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
                </div>

                {/* Bloque info */}
                <div className="relative flex flex-col gap-3 p-6 md:p-7">
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {member.name}
                  </h3>
                  <div
                    className={`h-px w-12 bg-gradient-to-r ${a.bar}`}
                  />
                  <p
                    className={`font-mono text-xs uppercase tracking-[0.2em] text-ink-dim`}
                  >
                    {member.role}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
