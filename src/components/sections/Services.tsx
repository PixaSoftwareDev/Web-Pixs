"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Smartphone,
  Rocket,
  Cable,
  Sparkles,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Rocket,
  Cable,
  Sparkles,
  ShoppingBag,
};

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
            // 01 — Servicios
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Qué hacemos
          </h2>
          <p className="mt-4 font-mono text-sm text-ink-dim md:text-base">
            Equipos chicos, ciclos cortos, deploys frecuentes. Construimos
            producto, no slides.
          </p>
        </header>

        <div className="services-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Globe;
            return (
              <article
                key={s.title}
                className="service-card group relative overflow-hidden rounded-xl border border-white/5 bg-bg-soft/60 p-6 backdrop-blur transition-all hover:border-neon-cyan/40 hover:bg-bg-soft"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-neon-violet/10 blur-3xl transition-opacity group-hover:opacity-80" />
                <Icon className="h-8 w-8 text-neon-cyan" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-ink-dim">
                  {s.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-cyan opacity-0 transition-opacity group-hover:opacity-100">
                  Saber más →
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
