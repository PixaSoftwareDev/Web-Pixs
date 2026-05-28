import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

export default function IntellixStack() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // Stack tecnológico
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Construido para producción
        </h2>

        <Reveal className="mt-12 space-y-4" y={28}>
          {intellix.stack.map((cat) => (
            <div
              key={cat.group}
              className="grid grid-cols-1 gap-4 rounded-xl border border-line/10 bg-bg-soft/50 p-6 backdrop-blur md:grid-cols-4"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-neon-violet">
                {cat.group}
              </h3>
              <div className="flex flex-wrap gap-2 md:col-span-3">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-line/10 bg-bg/60 px-3 py-1.5 font-mono text-xs text-ink-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
