"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

/* Título: cada palabra sube desde su propia máscara, en secuencia. */
function MaskedWords({
  text,
  className,
  baseDelay = 0.15,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  return (
    <span>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: baseDelay + i * 0.06 }}
            className={`inline-block ${className ?? ""}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* El producto en video: el widget real sobre un sitio, con su propio chrome. */
function VideoCard({ autoplay, rounded }: { autoplay: boolean; rounded: string }) {
  return (
    <div className={`relative overflow-hidden border border-line/10 bg-bg shadow-[var(--shadow-window)] ${rounded}`}>
      <video
        src="/media/hero-widget-loop.mp4"
        poster="/media/hero-widget-loop-poster.jpg"
        autoPlay={autoplay}
        muted
        loop
        playsInline
        aria-label="El widget de Intellix respondiendo y derivando a una persona en un sitio real"
        className="aspect-[1440/900] w-full bg-white object-cover"
      />
    </div>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { hero } = intellix;

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const cueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const windowY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 lg:pb-10"
    >
      {/* ── Capa derecha (desktop): el video con su formato de navegador ── */}
      <div className="absolute right-[max(1.5rem,calc((100vw-1360px)/2))] top-1/2 hidden w-[min(56vw,980px)] -translate-y-1/2 lg:block">
        <motion.div style={{ y: windowY }} className="will-change-transform">
        <motion.div
          initial={{ opacity: 0, transform: "translateX(90px)" }}
          animate={{ opacity: 1, transform: "translateX(0px)" }}
          transition={{ duration: 1.1, ease: easeOut, delay: 1.1 }}
          className="relative"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-violet/10 blur-2xl"
          />
          <VideoCard autoplay={!reducedMotion} rounded="rounded-2xl" />
        </motion.div>
        </motion.div>
      </div>

      {/* Velo base: suave, deja ver la barra del navegador arriba */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[62%] bg-gradient-to-r from-bg from-[54%] via-bg/55 via-[78%] to-transparent [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.12),black_34%)] lg:block"
      />
      {/* Velo reforzado en la franja del texto (medio y abajo), con bordes fundidos */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 top-[24%] z-[5] hidden w-[72%] bg-gradient-to-r from-bg from-[60%] via-bg/60 via-[84%] to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_100%)] lg:block"
      />

      {/* ── El copy, por encima del velo ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col px-6 lg:px-14">
        <motion.div
          style={{ y: copyY }}
          className="flex flex-col items-center text-center lg:max-w-[560px] lg:items-start lg:text-left"
        >
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight md:text-5xl xl:text-[3.6rem]">
            <MaskedWords text={hero.titleA} />
            <span className="block">
              <MaskedWords
                text={hero.titleAccent}
                className="text-gradient-animated"
                baseDelay={0.4}
              />
            </span>
            <span className="mt-3 block text-lg font-semibold text-ink-dim md:text-xl">
              <MaskedWords text={hero.highlight} baseDelay={0.62} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.85 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-dim"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 1.0 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href={whatsappUrl(intellix.whatsapp.demo)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand group inline-flex items-center gap-2.5 rounded-full py-2 pl-7 pr-2 font-display text-base font-semibold"
            >
              {hero.primaryCta}
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#viaje"
              className="glass-island btn-press inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-base font-semibold text-ink hover:text-brand-blue"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>

          {/* Anti-objeciones: fricción cero */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-ink-dim lg:justify-start"
          >
            {hero.ticks.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-green" strokeWidth={3} />
                {t}
              </span>
            ))}
          </motion.p>

          {/* Prueba real, discreta */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-ink-dim lg:justify-start"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              En producción
            </span>
            <span aria-hidden className="text-ink-dim/40">
              ·
            </span>
            <span>{hero.chat.proof[0].text}</span>
            <span aria-hidden className="text-ink-dim/40">
              ·
            </span>
            <span>{hero.chat.proof[1].text}</span>
          </motion.p>
        </motion.div>

        {/* Mobile: el video completo debajo del copy */}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(40px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.9, ease: easeOut, delay: 1.1 }}
          className="mt-10 lg:hidden"
        >
          <VideoCard autoplay={!reducedMotion} rounded="rounded-2xl" />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#viaje"
        aria-label="Ver el viaje de una consulta"
        style={{ opacity: cueOpacity }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-ink-dim/50 transition-colors hover:text-ink md:block"
      >
        <span className="animate-cue block">
          <ChevronDown className="h-5 w-5" />
        </span>
      </motion.a>
    </section>
  );
}
