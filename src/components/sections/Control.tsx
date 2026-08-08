"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Bell, Check, Globe, Headset, LayoutDashboard, Lock } from "lucide-react";
import Image from "next/image";
import { intellix } from "@/lib/intellix";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

type Side = "operator" | "admin";

/* Variants estilo "spatial showcase": entrada con blur + spring, salida rápida. */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 20 },
  },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
};

const mockupVariants = (): Variants => ({
  initial: {
    opacity: 0,
    scale: 1.04,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    transition: { duration: 0.22 },
  },
});

const stateStyles: Record<string, string> = {
  waiting: "bg-brand-violet/10 text-brand-violet",
  active: "bg-brand-blue/10 text-brand-blue",
  bot: "bg-brand-green/10 text-brand-green",
};

export default function Control() {
  const [side, setSide] = useState<Side>("operator");
  const { control, channels } = intellix;
  const isOperator = side === "operator";
  const panel = isOperator ? control.operator : control.admin;
  const accent = isOperator ? "violet" : "blue";

  return (
    <section id="control" className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* Glow de fondo que migra de lado — crossfade de opacity (GPU, sin repaints) */}
      <div
        aria-hidden
        style={{
          background:
            "radial-gradient(700px circle at 18% 55%, rgb(124 77 234 / 0.10), transparent 65%)",
          opacity: isOperator ? 1 : 0,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
      />
      <div
        aria-hidden
        style={{
          background:
            "radial-gradient(700px circle at 82% 55%, rgb(47 107 240 / 0.10), transparent 65%)",
          opacity: isOperator ? 0 : 1,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-blue">
            {control.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {control.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-dim md:text-lg">
            {control.description}
          </p>
        </motion.div>

        {/* Switcher tipo isla */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-line/10 bg-bg p-1.5 shadow-soft">
            {(
              [
                { id: "operator" as Side, label: "Tu equipo", icon: Headset },
                { id: "admin" as Side, label: "Vos", icon: LayoutDashboard },
              ]
            ).map((opt) => (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => setSide(opt.id)}
                whileTap={{ scale: 0.96 }}
                className="relative flex h-11 w-32 items-center justify-center gap-2 rounded-full font-display text-sm font-semibold focus:outline-none"
              >
                {side === opt.id && (
                  <motion.span
                    layoutId="control-surface"
                    className={`absolute inset-0 rounded-full ${
                      opt.id === "operator" ? "bg-brand-violet" : "bg-brand-blue"
                    }`}
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                    side === opt.id ? "text-white" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  <opt.icon className="h-4 w-4" />
                  {opt.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contenido: mockup y copy intercambian de lado */}
        <motion.div
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          className={`mt-12 flex flex-col items-center justify-center gap-10 lg:gap-20 ${
            isOperator ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* Mockup */}
          <motion.div layout="position" className="w-full max-w-md shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                variants={mockupVariants()}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {isOperator ? <OperatorMockup /> : <AdminMockup />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Copy */}
          <motion.div layout="position" className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.span
                  variants={itemVariants}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                    accent === "violet"
                      ? "bg-brand-violet/10 text-brand-violet"
                      : "bg-brand-blue/10 text-brand-blue"
                  }`}
                >
                  {isOperator ? <Headset className="h-4 w-4" /> : <LayoutDashboard className="h-4 w-4" />}
                  {panel.tag}
                </motion.span>
                <motion.h3
                  variants={itemVariants}
                  className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl"
                >
                  {panel.title}
                </motion.h3>
                <ul className="mt-6 space-y-4">
                  {panel.bullets.map((b) => (
                    <motion.li key={b} variants={itemVariants} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                          accent === "violet"
                            ? "bg-brand-violet/10 text-brand-violet"
                            : "bg-brand-blue/10 text-brand-blue"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm leading-relaxed text-ink-dim md:text-base">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Remate: los dos canales que tu equipo maneja desde este panel */}
        <motion.div
          id="canales"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p className="font-display text-lg font-semibold">{channels.title}</p>
          <p className="mx-auto mt-1 max-w-xl text-sm text-ink-dim">
            {channels.description}
          </p>
          <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
            {channels.items.map((c) => (
              <div
                key={c.title}
                className="flex items-start gap-3 rounded-2xl border border-line/10 bg-bg-soft/60 p-4"
              >
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  {c.icon === "MessageSquare" ? (
                    <WhatsAppIcon className="h-4 w-4" />
                  ) : (
                    <Globe className="h-4 w-4" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-dim">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Barra de navegador compartida por los mockups del panel. */
function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-line/10 bg-bg-soft/70 px-3.5 py-2">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="mx-auto flex w-2/3 items-center justify-center gap-1 rounded bg-bg px-2 py-0.5 text-[10px] text-ink-dim">
        <Lock className="h-2.5 w-2.5" aria-hidden />
        {url}
      </span>
      <span className="w-8" />
    </div>
  );
}

/* ── Mockup: bandeja del operador (recreación sobre la base real) ──────── */
function OperatorMockup() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-brand-violet/10 via-transparent to-brand-cyan/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-line/10 bg-bg shadow-[0_28px_60px_-24px_rgba(30,36,52,0.35)]">
        <BrowserBar url="intellix.com.ar/operador" />
        <div className="relative">
          <video
            src="/media/operator-inbox.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="La bandeja del operador recibiendo una derivación del asistente en vivo"
            className="aspect-[1440/760] w-full bg-[#fafafa]"
          />
          {/* Sello */}
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-bg/95 px-3 py-1.5 text-[11px] font-medium text-ink shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-violet" />
            Así se ve una derivación en vivo
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: panel del administrador — CAPTURA REAL de producción ──────── */
function AdminMockup() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-brand-cyan/10 via-transparent to-brand-blue/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-line/10 bg-bg shadow-[0_28px_60px_-24px_rgba(30,36,52,0.35)]">
        <BrowserBar url="intellix.com.ar/admin" />
        <div className="relative">
          <Image
            src="/media/panel/metricas.jpg"
            alt="Panel real de métricas de Intellix: consultas del mes, resueltas por el bot y actividad"
            width={1568}
            height={772}
            className="w-full"
          />
          {/* Sello de autenticidad */}
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-bg/95 px-3 py-1.5 text-[11px] font-medium text-ink shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Captura real · datos en producción
          </span>
        </div>
      </div>
    </div>
  );
}
