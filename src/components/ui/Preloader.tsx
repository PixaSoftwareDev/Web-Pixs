"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const STAGES = [
  { label: "Preparando", duration: 250 },
  { label: "Cargando", duration: 350 },
  { label: "Conectando", duration: 320 },
  { label: "Listo", duration: 280 },
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
      {/* Halo muy sutil de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[42vw] w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/[0.04] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[28vw] w-[28vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/[0.05] blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-7">
        {/* Isotipo con leve respiración */}
        <div className="relative h-24 w-24 animate-pulse md:h-28 md:w-28">
          <Image
            src={site.logo.icon}
            alt={`${site.name} logo`}
            width={112}
            height={112}
            priority
            className="h-24 w-24 object-contain md:h-28 md:w-28"
          />
        </div>

        {/* Progress bar con degradé de marca */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-line/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status label — gira por las stages */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink-dim">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              stage >= TOTAL_STAGES ? "bg-brand-green" : "bg-brand-blue"
            } animate-pulse`}
          />
          <span className="min-w-[10ch] text-center transition-opacity duration-200">
            {currentLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
