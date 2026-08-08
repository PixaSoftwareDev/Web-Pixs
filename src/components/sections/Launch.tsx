import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";
import Reveal from "@/components/intellix/Reveal";

export default function Launch() {
  const { launch } = intellix;
  return (
    <section id="empezar" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-blue">
            {launch.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {launch.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-dim md:text-lg">
            {launch.description}
          </p>
          <a
            href={whatsappUrl(intellix.whatsapp.demo)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold"
          >
            {launch.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <Reveal className="space-y-4" y={24}>
          {launch.steps.map((s, i) => (
            <div key={s} className="card-soft flex items-start gap-4 p-6">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-violet/10 font-display text-sm font-bold text-brand-violet">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-ink md:text-base">{s}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
