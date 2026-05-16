"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "@/lib/content";
import GlitchText from "@/components/ui/GlitchText";

type Accent = "cyan" | "violet" | "magenta";

const accentMap: Record<
  Accent,
  {
    ring: string;
    halo: string;
    text: string;
    bar: string;
    border: string;
    dot: string;
  }
> = {
  cyan: {
    ring: "conic-gradient(from 0deg, rgb(var(--c-neon-cyan)) 0%, rgb(var(--c-neon-violet)) 35%, transparent 55%, rgb(var(--c-neon-cyan)) 100%)",
    halo: "rgb(var(--c-neon-cyan) / 0.45)",
    text: "text-neon-cyan",
    bar: "from-neon-cyan via-neon-violet to-transparent",
    border: "border-neon-cyan/40",
    dot: "bg-neon-cyan",
  },
  violet: {
    ring: "conic-gradient(from 120deg, rgb(var(--c-neon-violet)) 0%, rgb(var(--c-neon-magenta)) 35%, transparent 55%, rgb(var(--c-neon-violet)) 100%)",
    halo: "rgb(var(--c-neon-violet) / 0.45)",
    text: "text-neon-violet",
    bar: "from-neon-violet via-neon-magenta to-transparent",
    border: "border-neon-violet/40",
    dot: "bg-neon-violet",
  },
  magenta: {
    ring: "conic-gradient(from 240deg, rgb(var(--c-neon-magenta)) 0%, rgb(var(--c-neon-cyan)) 35%, transparent 55%, rgb(var(--c-neon-magenta)) 100%)",
    halo: "rgb(var(--c-neon-magenta) / 0.45)",
    text: "text-neon-magenta",
    bar: "from-neon-magenta via-neon-cyan to-transparent",
    border: "border-neon-magenta/40",
    dot: "bg-neon-magenta",
  },
};

export default function Team() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".team-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: ".team-eyebrow", start: "top 85%" },
      });
      gsap.from(".team-title", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-title", start: "top 85%" },
      });

      // Entrada dramática: cada card con su propio timeline encadenado.
      const cards = gsap.utils.toArray<HTMLElement>(".team-card");
      const master = gsap.timeline({
        scrollTrigger: { trigger: ".team-grid", start: "top 78%" },
      });

      cards.forEach((card, i) => {
        const tl = gsap.timeline();
        tl.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.6,
          rotateY: -45,
          rotateX: 12,
          transformPerspective: 900,
          transformOrigin: "center center",
          duration: 0.9,
          ease: "power3.out",
        })
          .from(
            card.querySelector(".tc-ring"),
            {
              opacity: 0,
              scale: 0.3,
              rotate: -180,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .from(
            card.querySelector(".tc-halo"),
            { opacity: 0, scale: 0.4, duration: 0.7, ease: "power2.out" },
            "-=0.7"
          )
          .from(
            card.querySelector(".tc-portrait"),
            {
              opacity: 0,
              scale: 1.3,
              filter: "blur(14px)",
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          )
          .from(
            card.querySelector(".tc-tag"),
            { y: 14, opacity: 0, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          )
          .from(
            card.querySelector(".tc-name"),
            { y: 24, opacity: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          )
          .from(
            card.querySelector(".tc-bar"),
            { width: 0, duration: 0.45, ease: "power2.inOut" },
            "-=0.25"
          )
          .from(
            card.querySelector(".tc-role"),
            { y: 10, opacity: 0, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          );
        master.add(tl, i * 0.25);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="team"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* fondo: grid + halos radiales */}
      <div className="absolute inset-0 bg-tech-grid opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-neon-violet/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-neon-cyan/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-20 max-w-2xl">
          <p className="team-eyebrow font-mono text-xs uppercase tracking-widest text-neon-cyan">
            // 04 — Nosotros
          </p>
          <h2 className="team-title mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            El equipo detrás de{" "}
            <GlitchText className="text-glow-cyan">Pixs</GlitchText>
          </h2>
          <p className="mt-4 font-mono text-sm text-ink-dim md:text-base">
            {"// "} Tres founders, un objetivo: software que mueve la aguja.
          </p>
        </header>

        <div className="team-grid grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {team.map((member, i) => {
            const a = accentMap[member.accent as Accent];
            return (
              <article
                key={member.name}
                className="team-card group relative flex flex-col items-center text-center [transform-style:preserve-3d]"
              >
                {/* Wrapper del retrato */}
                <div className="relative">
                  {/* Halo externo pulsante */}
                  <div
                    className="tc-halo pointer-events-none absolute inset-0 -m-8 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: a.halo }}
                  />

                  {/* Anillo rotatorio (conic gradient) */}
                  <div
                    className="tc-ring absolute inset-0 -m-1 rounded-full animate-spin-slow"
                    style={{ background: a.ring }}
                  />

                  {/* Anillo exterior contra-rotatorio, fino */}
                  <div className="absolute inset-0 -m-5 rounded-full border border-dashed border-white/10 animate-spin-slower" />

                  {/* Contenedor del retrato (clip circular) */}
                  <div
                    className={`tc-portrait relative h-56 w-56 overflow-hidden rounded-full border ${a.border} bg-bg-soft transition-transform duration-500 group-hover:scale-[1.03] md:h-60 md:w-60`}
                  >
                    {/* halo interno radial detrás de la foto */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 50% 60%, ${a.halo}, transparent 70%)`,
                      }}
                    />

                    {/* scan line sutil */}
                    <div className="scanline pointer-events-none absolute inset-0 opacity-50" />

                    {/* Foto (transparente, levemente flotando) */}
                    <div className="animate-float-slow absolute inset-0 flex items-end justify-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={480}
                        height={480}
                        className="h-[110%] w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 60vw, 240px"
                      />
                    </div>
                  </div>

                  {/* Tag con índice cyber */}
                  <div
                    className={`tc-tag absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border ${a.border} bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] ${a.text}`}
                  >
                    0{i + 1} / {team.length}
                  </div>
                </div>

                {/* Nombre con glitch al hover */}
                <h3 className="tc-name mt-10 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  <span
                    data-text={member.name}
                    className="relative inline-block transition-all duration-300 group-hover:before:absolute group-hover:before:inset-0 group-hover:before:content-[attr(data-text)] group-hover:before:text-neon-cyan group-hover:before:translate-x-[2px] group-hover:before:-translate-y-[1px] group-hover:before:opacity-70 group-hover:after:absolute group-hover:after:inset-0 group-hover:after:content-[attr(data-text)] group-hover:after:text-neon-magenta group-hover:after:-translate-x-[2px] group-hover:after:translate-y-[1px] group-hover:after:opacity-70"
                  >
                    {member.name}
                  </span>
                </h3>

                {/* Barra de acento + rol */}
                <div
                  className={`tc-bar mt-3 h-px w-16 bg-gradient-to-r ${a.bar}`}
                />
                <p className="tc-role mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${a.dot} animate-pulse-neon`}
                    style={{ color: a.halo }}
                  />
                  {member.role}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
