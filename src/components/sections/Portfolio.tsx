"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/lib/content";

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 75%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="portfolio"
      className="relative border-y border-white/5 bg-bg-soft/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
            // 04 — Portfolio
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Casos
          </h2>
          <p className="mt-4 font-mono text-sm text-ink-dim md:text-base">
            Productos que ayudamos a construir y escalar.
          </p>
        </header>

        <div className="portfolio-grid grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="project-card group relative overflow-hidden rounded-xl border border-white/5 bg-bg transition-all hover:border-neon-cyan/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft">
                {/* Placeholder visual — reemplazá con <Image> cuando cargues fotos en public/assets/portfolio/ */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/30 via-bg-soft to-neon-cyan/20" />
                <div className="absolute inset-0 bg-tech-grid opacity-40" />
                <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                  preview
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-neon-cyan">
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-ink-dim">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
