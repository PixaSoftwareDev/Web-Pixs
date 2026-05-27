"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/lib/content";
import GhostNumber from "@/components/ui/GhostNumber";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-list",
            start: "top 80%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-list",
            start: "top 80%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <GhostNumber number="03" side="right" />
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Cómo trabajamos
          </h2>
          <p className="mt-4 font-mono text-sm text-ink-dim md:text-base">
            Cinco pasos, ciclos cortos, foco en producto.
          </p>
        </header>

        <ol className="process-list relative ml-4 space-y-10 border-l border-line/10 pl-8 md:ml-8">
          <span className="process-line absolute left-0 top-0 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-transparent" />
          {process.map((p) => (
            <li key={p.step} className="process-step relative">
              <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/40 bg-bg font-mono text-xs text-neon-cyan glow-cyan md:-left-[46px]">
                {p.step}
              </span>
              <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-ink-dim">
                {p.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
