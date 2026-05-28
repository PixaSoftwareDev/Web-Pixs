import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

export default function IntellixMetrics() {
  return (
    <section className="relative overflow-hidden bg-bg-soft/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // Performance &amp; SLA
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Números que sostienen producción
        </h2>

        <Reveal
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3"
          y={28}
          stagger={0.06}
        >
          {intellix.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-line/10 bg-bg/60 p-6 backdrop-blur"
            >
              <p className="font-display text-3xl font-bold text-neon-cyan md:text-4xl">
                {m.value}
              </p>
              <p className="mt-2 font-mono text-xs leading-relaxed text-ink-dim">
                {m.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
