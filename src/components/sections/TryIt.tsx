"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { intellix } from "@/lib/intellix";

/** Abre el widget real de Intellix (el FAB que inyecta widget.js). */
function openWidget() {
  const btn = document.getElementById("ia-w-btn");
  if (btn instanceof HTMLElement) {
    btn.click();
  }
}

export default function TryIt() {
  const { tryIt } = intellix;
  const containerRef = useRef<HTMLDivElement>(null);

  // Estilo "container scroll": la tarjeta entra inclinada en 3D y se endereza.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center 0.45"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  return (
    <section id="probalo" className="relative px-6 py-20 md:py-28">
      <div ref={containerRef} className="mx-auto max-w-4xl" style={{ perspective: "1100px" }}>
        <motion.div
          style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }}
          className="card-soft relative overflow-hidden p-8 text-center will-change-transform md:p-14"
        >
          {/* Halo decorativo */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-violet/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl" />

          <p className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-bg px-4 py-1.5 text-sm font-medium text-brand-violet">
            <Sparkles className="h-4 w-4" />
            {tryIt.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {tryIt.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
            {tryIt.description}
          </p>

          <motion.button
            type="button"
            onClick={openWidget}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-brand group mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" />
            {tryIt.cta}
          </motion.button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tryIt.suggestions.map((q) => (
              <motion.button
                key={q}
                type="button"
                onClick={openWidget}
                whileHover={{ y: -2 }}
                className="rounded-full border border-line/10 bg-bg-soft px-4 py-2 text-xs text-ink-dim transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
              >
                &ldquo;{q}&rdquo;
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-xs text-ink-dim/80">{tryIt.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
