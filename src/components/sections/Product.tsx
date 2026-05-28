"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { intellix } from "@/lib/intellix";

export default function Product() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="product"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-12 max-w-2xl">
          <p className="product-reveal font-mono text-xs uppercase tracking-widest text-neon-violet">
            // Nuestro producto
          </p>
          <h2 className="product-reveal mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            No solo construimos. También creamos producto.
          </h2>
        </header>

        {/* Card destacada Intellix */}
        <Link
          href="/intellix"
          className="product-reveal group relative block overflow-hidden rounded-2xl border border-neon-violet/30 bg-bg-soft/60 p-8 backdrop-blur transition-all hover:border-neon-violet/60 md:p-12"
        >
          {/* Glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon-violet/20 blur-3xl transition-opacity group-hover:opacity-80" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-neon-cyan/10 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            {/* Texto */}
            <div className="md:col-span-8">
              {/* Logo Intellix (swap por tema) */}
              <div className="flex h-12 items-center">
                <Image
                  src={intellix.logo.dark}
                  alt={`${intellix.name} logo`}
                  width={1500}
                  height={470}
                  className="logo-on-dark h-10 w-auto object-contain md:h-12"
                />
                <Image
                  src={intellix.logo.light}
                  alt={`${intellix.name} logo`}
                  width={1500}
                  height={470}
                  className="logo-on-light h-10 w-auto object-contain md:h-12"
                />
              </div>

              <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink-dim md:text-base">
                {intellix.short.description}
              </p>

              <p className="mt-5 font-mono text-xs text-ink-dim/70">
                {intellix.short.stack}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-violet transition-colors group-hover:text-neon-cyan">
                Ver más
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>

            {/* Isotipo */}
            <div className="flex justify-center md:col-span-4">
              <div className="relative h-40 w-40 md:h-52 md:w-52">
                <div className="absolute inset-0 rounded-full bg-neon-violet/20 blur-3xl transition-opacity group-hover:opacity-90" />
                <Image
                  src={intellix.logo.icon}
                  alt={`${intellix.name} isotipo`}
                  width={400}
                  height={400}
                  className="relative h-full w-full animate-float-slow object-contain"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
