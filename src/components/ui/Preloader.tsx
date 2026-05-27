"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const STAGES = [
  { label: "init", duration: 250 },
  { label: "loading runtime", duration: 350 },
  { label: "connecting", duration: 320 },
  { label: "ready", duration: 280 },
];

const TOTAL_STAGES = STAGES.length;

/**
 * Preloader fullscreen que se muestra al cargar la app. Recorre un mini boot
 * sequence ("init → loading runtime → connecting → ready"), avanza una barra
 * de progreso con gradient neón y luego hace fade-out + unmount.
 *
 * Mantiene la identidad terminal/IDE del hero desde la primera milésima.
 */
export default function Preloader() {
  const [stage, setStage] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Avance secuencial entre stages
  useEffect(() => {
    if (stage >= TOTAL_STAGES) {
      const t = setTimeout(() => setHidden(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage((s) => s + 1), STAGES[stage].duration);
    return () => clearTimeout(t);
  }, [stage]);

  // Después del fade-out, desmonto para liberar DOM
  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setUnmounted(true), 650);
    return () => clearTimeout(t);
  }, [hidden]);

  if (unmounted) return null;

  const progress = Math.min((stage / TOTAL_STAGES) * 100, 100);
  const currentLabel =
    stage < TOTAL_STAGES
      ? STAGES[stage].label
      : STAGES[TOTAL_STAGES - 1].label;

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Aurora muy sutil de fondo para que no sea un negro plano */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/[0.04] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-violet/[0.05] blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-7">
        {/* Logo con leve respiración */}
        <div className="relative h-24 w-24 animate-pulse-neon md:h-28 md:w-28">
          <Image
            src={site.logo.dark}
            alt={`${site.name} logo`}
            width={112}
            height={112}
            priority
            className="logo-on-dark h-24 w-24 object-contain md:h-28 md:w-28"
          />
          <Image
            src={site.logo.light}
            alt={`${site.name} logo`}
            width={112}
            height={112}
            priority
            className="logo-on-light absolute inset-0 h-24 w-24 object-contain md:h-28 md:w-28"
          />
        </div>

        {/* Progress bar con gradient neón */}
        <div className="h-px w-48 overflow-hidden bg-line/10">
          <div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status label en mono — gira por las stages */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink-dim">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              stage >= TOTAL_STAGES ? "bg-neon-lime" : "bg-neon-cyan"
            } animate-pulse-neon`}
          />
          <span className="min-w-[10ch] text-center transition-opacity duration-200">
            {currentLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
