"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";

export default function IntellixHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".ix-hero-el", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".ix-hero-iso", {
        scale: 0.8,
        opacity: 0,
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-28 md:pt-44"
    >
      {/* Aurora de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[-15%] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full bg-neon-cyan/20 blur-[120px]" />
        <div className="absolute -right-[12%] top-[5%] h-[50vw] w-[50vw] max-h-[640px] max-w-[640px] rounded-full bg-neon-violet/25 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-40" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-12">
        {/* Texto */}
        <div className="flex flex-col items-start gap-6 md:col-span-7">
          <span className="ix-hero-el inline-flex items-center gap-2 rounded-full border border-neon-violet/30 bg-neon-violet/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-neon-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-violet animate-pulse-neon" />
            {intellix.hero.eyebrow}
          </span>

          <h1 className="ix-hero-el font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {intellix.hero.tagline}
          </h1>

          <p className="ix-hero-el max-w-xl font-mono text-sm leading-relaxed text-ink-dim md:text-base">
            {intellix.hero.description}
          </p>

          <div className="ix-hero-el flex flex-wrap gap-3">
            <a
              href={whatsappUrl(intellix.whatsapp.demo)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan"
            >
              {intellix.hero.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Isotipo flotante */}
        <div className="ix-hero-iso flex justify-center md:col-span-5">
          <div className="relative h-56 w-56 md:h-72 md:w-72 lg:h-80 lg:w-80">
            <div className="absolute inset-0 rounded-full bg-neon-violet/20 blur-3xl" />
            <Image
              src={intellix.logo.icon}
              alt={`${intellix.name} isotipo`}
              width={400}
              height={400}
              priority
              className="relative h-full w-full animate-float-slow object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.35)]"
            />
          </div>
        </div>
      </div>

      {/* Sub-headline */}
      <div className="ix-hero-el relative mx-auto mt-16 max-w-3xl border-l-2 border-neon-cyan/40 pl-5 text-left md:mt-24">
        <p className="font-display text-xl font-medium leading-snug text-ink md:text-2xl">
          {intellix.hero.subheadline}
        </p>
      </div>
    </section>
  );
}
