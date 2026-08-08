import { FileUp, MessageCircle, Users, type LucideIcon } from "lucide-react";
import { intellix } from "@/lib/intellix";
import Reveal from "@/components/intellix/Reveal";

const iconMap: Record<string, LucideIcon> = { FileUp, MessageCircle, Users };

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Así de simple funciona
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-dim md:text-lg">
            Sin proyectos de sistemas, sin capacitaciones eternas. Tres pasos y tu
            empresa responde sola.
          </p>
        </div>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-3" y={28}>
          {intellix.steps.map((s) => {
            const Icon = iconMap[s.icon] ?? MessageCircle;
            return (
              <div key={s.step} className="card-soft relative p-7">
                <span className="absolute right-6 top-5 font-display text-5xl font-bold text-line/5">
                  {s.step}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                  {s.description}
                </p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
