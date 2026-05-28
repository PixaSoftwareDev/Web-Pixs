import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";
import Reveal from "./Reveal";

export default function IntellixCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[680px] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-violet/15 blur-[120px]" />
      </div>

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center" y={26}>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {intellix.closing.title}
        </h2>
        <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink-dim md:text-base">
          {intellix.closing.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl(intellix.whatsapp.demo)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-neon-cyan/60 bg-neon-cyan/10 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan"
          >
            {intellix.closing.primaryCta}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={whatsappUrl(intellix.whatsapp.specialist)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line/15 bg-line/5 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-line/25 hover:bg-line/10"
          >
            {intellix.closing.secondaryCta}
            <span aria-hidden>→</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
