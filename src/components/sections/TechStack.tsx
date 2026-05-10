"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "@/lib/content";

export default function TechStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".tech-pill", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 85%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="stack"
      className="relative border-y border-white/5 bg-bg-soft/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              // 02 — Stack
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Tecnologías
            </h2>
          </div>
          <p className="max-w-md font-mono text-sm text-ink-dim">
            Elegimos cada herramienta por una razón. Modernas, probadas,
            mantenibles.
          </p>
        </header>

        <div className="tech-grid flex flex-wrap gap-3">
          {stack.map((t) => (
            <span
              key={t.name}
              className="tech-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60" />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
