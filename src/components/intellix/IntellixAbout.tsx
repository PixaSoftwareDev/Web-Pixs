import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

export default function IntellixAbout() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // El producto
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Tu documentación, convertida en respuestas
        </h2>

        <Reveal className="mt-8 space-y-5">
          {intellix.about.map((p, i) => (
            <p
              key={i}
              className="font-mono text-sm leading-relaxed text-ink-dim md:text-base"
            >
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
