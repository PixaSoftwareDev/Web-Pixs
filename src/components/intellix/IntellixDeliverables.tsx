import { Check } from "lucide-react";
import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

export default function IntellixDeliverables() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // Lo que entregamos
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Con cada instancia de Intellix
        </h2>

        <Reveal
          className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2"
          y={22}
          stagger={0.05}
        >
          {intellix.deliverables.map((d) => (
            <div
              key={d}
              className="flex items-start gap-3 rounded-lg border border-line/10 bg-bg-soft/50 p-4 backdrop-blur"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-neon-lime/15 text-neon-lime">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="font-mono text-sm leading-relaxed text-ink">
                {d}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
