"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import ContactConsole from "@/components/ui/ContactConsole";

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

      <div className="contact-inner relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // 05 — Contacto
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-7xl">
          ¿Tenés un proyecto?
        </h2>
        <p className="mt-6 max-w-xl font-mono text-sm text-ink-dim md:text-base">
          Abrí la consola y contanos qué querés construir. Te respondemos en
          menos de 24hs con una primera conversación sin compromiso.
        </p>

        <div className="mt-10 w-full">
          <ContactConsole />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-ink-dim">
          <a href={`mailto:${site.email}`} className="hover:text-neon-cyan">
            {site.email}
          </a>
          <a href={site.socials.linkedin} className="hover:text-neon-cyan">
            LinkedIn
          </a>
          <a href={site.socials.github} className="hover:text-neon-cyan">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
