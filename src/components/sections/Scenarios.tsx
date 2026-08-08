"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { CheckCheck } from "lucide-react";
import { intellix } from "@/lib/intellix";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Scenario = (typeof intellix.scenarios)[number];

/* ────────────────────────────────────────────────────────────────────────
 * El teléfono (grande, con marco de calidad). La conversación del escenario
 * activo se reproduce sola: pregunta → escribiendo → respuesta.
 * ──────────────────────────────────────────────────────────────────────── */
function Phone({ scenario }: { scenario: Scenario }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0 pregunta · 1 tipeo · 2 respuesta

  useEffect(() => {
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [scenario]);

  return (
    <div className="flex h-[520px] w-[380px] flex-col overflow-hidden rounded-3xl bg-bg shadow-[0_32px_70px_-24px_rgba(30,36,52,0.35)] ring-1 ring-line/10">
      {/* Header WhatsApp */}
      <div className="bg-[#008069] px-5 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95">
            <WhatsAppIcon className="h-5 w-5 text-[#008069]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight">Tu empresa</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs leading-tight opacity-85">
              <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
              en línea
            </p>
          </div>
          <span className="text-xs opacity-75">{scenario.example.time}</span>
        </div>
      </div>

      {/* Conversación — ocupa todo el alto restante, se reinicia con cada escenario */}
      <div className="flex flex-1 flex-col justify-end gap-2.5 bg-[#efeae2] px-4 py-5">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={scenario.title + "-q"}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="ml-auto w-fit max-w-[88%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 shadow-sm"
              >
                <p className="text-[15px] leading-snug text-zinc-800">{scenario.example.q}</p>
                <p className="mt-0.5 flex items-center justify-end gap-1 text-[10.5px] text-zinc-500">
                  {scenario.example.time}
                  <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
                </p>
              </motion.div>

              {phase === 1 && (
                <motion.div
                  key={scenario.title + "-typing"}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="flex w-fit items-center gap-1 rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm"
                >
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
                </motion.div>
              )}

              {phase === 2 && (
                <motion.div
                  key={scenario.title + "-a"}
                  layout
                  initial={{ opacity: 0, y: 22, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className="w-fit max-w-[92%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm"
                >
                  <p className="text-[15px] leading-snug text-zinc-800">{scenario.example.a}</p>
                  <p className="mt-0.5 text-right text-[10.5px] text-zinc-400">
                    {scenario.example.time}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

      {/* Barra de entrada (como la real de WhatsApp) */}
      <div className="flex items-center gap-2.5 bg-[#efeae2] px-3 pb-4 pt-1">
        <span className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm text-zinc-400 shadow-sm">
          Escribí un mensaje
        </span>
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#008069]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Capítulo de la derecha: número gigante fantasma con parallax + texto grande.
 * Al llegar al centro, activa su conversación en el teléfono.
 * ──────────────────────────────────────────────────────────────────────── */
function Chapter({
  s,
  index,
  onActive,
}: {
  s: Scenario;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  // Parallax: el número fantasma se mueve más lento que el texto.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <div ref={ref} className="relative flex min-h-[80vh] items-center">
      {/* Número gigante fantasma, con parallax */}
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none font-display text-[13rem] font-bold leading-none text-ink/[0.04] md:text-[17rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.div
        initial={{ opacity: 0.25, y: 24 }}
        animate={{ opacity: inView ? 1 : 0.25, y: inView ? 0 : 24 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative"
      >
        <p className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-widest text-brand-violet">
          {String(index + 1).padStart(2, "0")}
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold normal-case tracking-normal ${
              s.tag === "Para tu equipo"
                ? "bg-brand-violet/10 text-brand-violet"
                : "bg-brand-blue/10 text-brand-blue"
            }`}
          >
            {s.tag}
          </span>
        </p>
        <h3 className="mt-3 max-w-lg font-display text-3xl font-bold leading-[1.12] tracking-tight md:text-[2.75rem]">
          {s.title}
        </h3>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-dim">
          {s.story}
        </p>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Escenarios: teléfono clavado a la izquierda + capítulos que pasan a la
 * derecha. Mobile: capítulo + teléfono apilados por escenario.
 * ──────────────────────────────────────────────────────────────────────── */
export default function Scenarios() {
  const [active, setActive] = useState(0);

  return (
    <section id="escenarios" className="relative px-6">
      {/* Header de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mx-auto max-w-2xl pt-20 text-center md:pt-28"
      >
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          ¿Te suena alguna de estas?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-dim md:text-lg">
          Intellix no es &ldquo;IA para empresas&rdquo; en abstracto. Es esto:
        </p>
      </motion.div>

      {/* ===== Desktop: teléfono sticky + capítulos ===== */}
      <div className="mx-auto hidden max-w-6xl gap-16 lg:grid lg:grid-cols-[1fr_1.1fr]">
        {/* Teléfono clavado mientras pasan los capítulos */}
        <div className="relative">
          <div className="sticky top-0 flex h-[100svh] items-center justify-center">
            {/* Halo suave detrás */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/[0.08] blur-3xl"
            />
            <Phone scenario={intellix.scenarios[active]} />
          </div>
        </div>

        {/* Capítulos */}
        <div className="pb-24">
          {intellix.scenarios.map((s, i) => (
            <Chapter key={s.title} s={s} index={i} onActive={setActive} />
          ))}
        </div>
      </div>

      {/* ===== Mobile: apilado por escenario ===== */}
      <div className="mx-auto mt-12 max-w-xl space-y-16 pb-20 lg:hidden">
        {intellix.scenarios.map((s, i) => (
          <div key={s.title}>
            <p className="flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-widest text-brand-violet">
              {String(i + 1).padStart(2, "0")}
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold normal-case tracking-normal ${
                  s.tag === "Para tu equipo"
                    ? "bg-brand-violet/10 text-brand-violet"
                    : "bg-brand-blue/10 text-brand-blue"
                }`}
              >
                {s.tag}
              </span>
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{s.story}</p>
            <div className="mt-6 flex justify-center">
              <Phone scenario={s} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
