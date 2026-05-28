import {
  Headset,
  Users,
  GraduationCap,
  ScrollText,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

const iconMap: Record<string, LucideIcon> = {
  Headset,
  Users,
  GraduationCap,
  ScrollText,
  HeartHandshake,
};

export default function IntellixUseCases() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // Casos de uso
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Dónde encaja Intellix
        </h2>

        <Reveal
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          y={32}
        >
          {intellix.useCases.map((c) => {
            const Icon = iconMap[c.icon] ?? Sparkles;
            return (
              <article
                key={c.title}
                className="group rounded-xl border border-line/10 bg-bg-soft/60 p-6 backdrop-blur transition-all hover:border-neon-violet/40 hover:bg-bg-soft"
              >
                <Icon
                  className="h-7 w-7 text-neon-violet"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {c.title}
                </h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-ink-dim">
                  {c.description}
                </p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
