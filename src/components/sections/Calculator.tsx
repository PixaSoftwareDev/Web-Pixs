"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

/* Número que persigue su objetivo con un tween corto cada vez que cambia. */
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(0);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("es-AR");
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}

export default function Calculator() {
  const { calculator } = intellix;
  const [monthly, setMonthly] = useState(600);

  const resolved = Math.round(monthly * calculator.resolveRate);
  const hours = Math.round((resolved * calculator.minutesPerQuery) / 60);

  return (
    <section id="calculadora" className="section-band relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-blue">
            {calculator.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {calculator.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-dim md:text-lg">
            {calculator.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
          className="card-soft mt-12 p-8 md:p-10"
        >
          {/* Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor="consultas" className="text-sm font-medium text-ink-dim">
                {calculator.sliderLabel}
              </label>
              <span className="font-display text-2xl font-bold text-brand-blue">
                <AnimatedNumber value={monthly} />
              </span>
            </div>
            <input
              id="consultas"
              type="range"
              min={100}
              max={5000}
              step={50}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="range-brand mt-2 w-full"
            />
            <div className="flex justify-between text-xs text-ink-dim/60">
              <span>100</span>
              <span>5.000</span>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-bg-soft/70 p-6 text-center">
              <MessageCircle className="mx-auto h-6 w-6 text-brand-blue" />
              <p className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
                <AnimatedNumber value={resolved} />
              </p>
              <p className="mt-2 text-sm text-ink-dim">{calculator.resultResolved}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-violet/10 p-6 text-center">
              <Clock className="mx-auto h-6 w-6 text-brand-violet" />
              <p className="mt-3 font-display text-4xl font-bold md:text-5xl">
                <span className="text-gradient-animated">
                  <AnimatedNumber value={hours} />
                </span>
              </p>
              <p className="mt-2 text-sm text-ink-dim">{calculator.resultHours}</p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-ink-dim/70">
            {calculator.note}
          </p>

          <div className="mt-7 flex justify-center">
            <a
              href={whatsappUrl(intellix.whatsapp.demo)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold"
            >
              {calculator.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
