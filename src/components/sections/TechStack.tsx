"use client";

import { stack } from "@/lib/content";
import GhostNumber from "@/components/ui/GhostNumber";

/**
 * Pill individual del marquee. Memoizable y reutilizable entre las dos
 * filas/duplicaciones que componen el loop infinito.
 */
function TechPill({ name }: { name: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line/15 bg-bg/60 px-7 py-4 font-mono text-sm uppercase tracking-widest text-ink backdrop-blur-sm md:px-8 md:py-5 md:text-base">
      <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/70" />
      {name}
    </span>
  );
}

/**
 * Fila marquee: el contenido se duplica para que la animación pueda hacer
 * loop continuo (translateX 0 → -50% repite el mismo set y se ve infinito).
 */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly { name: string }[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`flex w-max gap-3 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {/* Duplicado: el track contiene 2 copias del array, así la traslación
            -50% deja el segundo set en la misma posición que el primero. */}
        {[...items, ...items].map((t, i) => (
          <TechPill key={`${t.name}-${i}`} name={t.name} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  // Dividir el stack en dos mitades para crear dos filas con movimientos
  // opuestos — efecto "cinta cruzada", más vivo que una sola fila.
  const half = Math.ceil(stack.length / 2);
  const rowA = stack.slice(0, half);
  const rowB = stack.slice(half);

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-bg-soft/40 py-32 md:py-44"
    >
      <GhostNumber number="02" side="left" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-16 flex flex-col items-start gap-3 px-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Tecnologías
          </h2>
          <p className="max-w-md font-mono text-sm text-ink-dim">
            Elegimos cada herramienta por una razón. Modernas, probadas,
            mantenibles.
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
