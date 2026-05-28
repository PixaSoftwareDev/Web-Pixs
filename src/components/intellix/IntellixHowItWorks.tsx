import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

export default function IntellixHowItWorks() {
  return (
    <section className="relative overflow-hidden bg-bg-soft/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // Cómo funciona
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          De documento a respuesta, en cuatro pasos
        </h2>

        <Reveal className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2" y={36}>
          {intellix.howItWorks.map((s) => (
            <article
              key={s.step}
              className="group relative overflow-hidden rounded-xl border border-line/10 bg-bg/60 p-7 backdrop-blur transition-all hover:border-neon-cyan/40"
            >
              <span className="font-mono text-5xl font-bold text-neon-cyan/20 transition-colors group-hover:text-neon-cyan/40">
                {s.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 font-mono text-sm leading-relaxed text-ink-dim">
                {s.description}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
