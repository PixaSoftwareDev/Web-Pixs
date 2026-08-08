"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

/*
 * Acto final oscuro con "telón que sube": el bloque entra escalado al 94% con
 * esquinas muy redondas y, ligado al scroll, se expande hasta el ancho total.
 */
export default function IntellixCTA() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [72, 40]);
  const contentY = useTransform(scrollYProgress, [0.3, 1], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section ref={ref} className="relative">
      <motion.div
        style={{
          scale,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          transformOrigin: "center bottom",
        }}
        className="relative overflow-hidden bg-[#0b0f1e] px-6 py-24 text-white will-change-transform md:py-32"
      >
        {/* Glow de fondo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[680px] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/[0.16] blur-[120px]" />
        </div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-cyan">
            {intellix.launch.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {intellix.closing.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            {intellix.closing.description}
          </p>

          {/* Los 3 pasos de la puesta en marcha, compactos */}
          <div id="empezar" className="mt-10 grid w-full gap-3 text-left sm:grid-cols-3">
            {intellix.launch.steps.map((s, i) => (
              <div
                key={s}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-violet/25 font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl(intellix.whatsapp.demo)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold"
            >
              {intellix.closing.primaryCta}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={whatsappUrl(intellix.whatsapp.specialist)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-display text-sm font-semibold text-white hover:border-white/30 hover:bg-white/10"
            >
              {intellix.closing.secondaryCta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
