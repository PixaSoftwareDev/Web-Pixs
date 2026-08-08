"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileCheck,
  ShieldCheck,
  GitCompare,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { intellix } from "@/lib/intellix";

const easeOut = [0.16, 1, 0.3, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  FileCheck,
  ShieldCheck,
  GitCompare,
  Lock,
};

type TrustItem = (typeof intellix.trust.items)[number];

/* Carta apilable: se queda pegada y la siguiente se desliza por encima;
   mientras la cubren, se hunde levemente (scale + fade). */
function StackCard({ item, index }: { item: TrustItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const Icon = iconMap[item.icon] ?? ShieldCheck;

  return (
    <div ref={ref} className="h-[46vh] min-h-[300px]">
      <div className="sticky" style={{ top: `${112 + index * 16}px` }}>
        <motion.div
          style={{ scale, opacity }}
          className="mx-auto flex max-w-3xl items-start gap-6 rounded-3xl border border-white/10 bg-[#131a30] p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm md:p-10"
        >
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-brand-cyan/15 text-brand-cyan">
            <Icon className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/60">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Banda oscura inmersiva: las 4 garantías se apilan como cartas al scrollear. */
export default function Trust() {
  const { trust } = intellix;
  return (
    // OJO: sin overflow-hidden en la sección — rompe el position:sticky del apilado.
    <section
      id="confianza"
      className="relative bg-[#0b0f1e] px-6 pb-28 pt-24 text-white md:pt-32"
    >
      {/* Luz violeta profunda de fondo (contenida verticalmente para no sangrar) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-brand-violet/[0.14] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-cyan">
            {trust.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {trust.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
            {trust.description}
          </p>
        </motion.div>

        {/* El mazo de cartas */}
        <div className="mt-16">
          {trust.items.map((t, i) => (
            <StackCard key={t.title} item={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
