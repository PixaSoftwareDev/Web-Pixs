"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-inner > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-inner",
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
    <section ref={root} id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute inset-0 bg-tech-grid opacity-30" />

      <div className="contact-inner relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // 05 — Contacto
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-7xl">
          ¿Tenés un proyecto?
        </h2>
        <p className="mt-6 max-w-xl font-mono text-sm text-ink-dim md:text-base">
          Contanos qué querés construir. Te respondemos en menos de 24hs con
          una primera conversación sin compromiso.
        </p>

        <a
          href={`mailto:${site.email}?subject=Nuevo%20proyecto`}
          className="mt-10 inline-flex items-center gap-3 rounded-md border border-neon-cyan/60 bg-neon-cyan/10 px-8 py-4 font-mono text-sm uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan"
        >
          {site.email}
          <span aria-hidden>→</span>
        </a>

        <div className="mt-8 flex gap-6 font-mono text-xs uppercase tracking-widest text-ink-dim">
          <a href={site.socials.linkedin} className="hover:text-neon-cyan">
            LinkedIn
          </a>
          <a href={site.socials.instagram} className="hover:text-neon-cyan">
            Instagram
          </a>
          <a href={site.socials.github} className="hover:text-neon-cyan">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
