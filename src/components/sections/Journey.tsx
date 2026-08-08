"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Check, FileText, Zap } from "lucide-react";
import { intellix } from "@/lib/intellix";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
 * "De tus documentos a tu asistente" — pantalla clavada, el scroll dirige.
 * La historia del DUEÑO (el hero ya muestra la conversación del cliente):
 *   Escena 1: tus documentos (abanico que se abre)
 *   Escena 2: se funden en el núcleo — Intellix los aprende
 *   Escena 3: la respuesta con su cita de fuente (el diferencial)
 *   Escena 4: "48 hs" — de los archivos al asistente andando
 * Puesta en escena CENTRADA: un protagonista por escena. Sin choques.
 * Mobile / reduced-motion: versión estática en flujo.
 */
export default function Journey() {
  const rootRef = useRef<HTMLElement>(null);
  const { journey } = intellix;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=340%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Helpers: escenas estrictamente secuenciales (nunca dos a la vez).
        const showCaption = (i: number, at: number) =>
          tl.fromTo(
            `[data-j-caption='${i}']`,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.04, ease: "power1.out" },
            at,
          );
        const hideCaption = (i: number, at: number) =>
          tl.to(`[data-j-caption='${i}']`, { opacity: 0, y: -18, duration: 0.04 }, at);
        const dot = (i: number, at: number) => {
          tl.to(`[data-j-dot='${i}']`, { opacity: 1, scale: 1.25, duration: 0.02 }, at);
          if (i > 0)
            tl.to(`[data-j-dot='${i - 1}']`, { opacity: 0.3, scale: 1, duration: 0.02 }, at);
        };

        // ── Entrada dentro del pin: un instante en blanco y la escena llega
        //    desde lejos CON el scroll (zoom-in que se resuelve nítido) ──
        tl.fromTo(
          "[data-j-scene='docs']",
          { opacity: 0, scale: 1.45, y: 90 },
          { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.0,
        );
        tl.fromTo(
          "[data-j-caption='0']",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.06, ease: "power1.out" },
          0.02,
        );

        // ── Escena 1: los documentos — el abanico se abre ──
        gsap.utils.toArray<HTMLElement>("[data-j-doc]").forEach((doc, i) => {
          tl.fromTo(
            doc,
            { rotate: 0, y: 0 },
            { rotate: [-7, 0, 7][i], y: [6, 0, 6][i], duration: 0.05, ease: "power1.out" },
            0.09,
          );
          tl.fromTo(
            doc,
            {
              boxShadow: "0 8px 24px -12px rgba(30,36,52,0.15)",
              borderColor: "rgba(30,36,52,0.08)",
            },
            {
              boxShadow: "0 12px 40px -8px rgba(47,107,240,0.45)",
              borderColor: "rgba(47,107,240,0.5)",
              duration: 0.045,
              yoyo: true,
              repeat: 1,
            },
            0.11 + i * 0.035,
          );
        });
        hideCaption(0, 0.2);
        // los docs no desaparecen: VIAJAN hacia el centro y se encogen (se funden)
        gsap.utils.toArray<HTMLElement>("[data-j-doc]").forEach((doc, i) => {
          tl.to(
            doc,
            {
              x: [170, 0, -170][i],
              y: -10,
              scale: 0.25,
              opacity: 0,
              rotate: 0,
              duration: 0.08,
              ease: "power2.in",
            },
            0.22 + i * 0.01,
          );
        });
        tl.to("[data-j-scene='docs']", { opacity: 0, duration: 0.02 }, 0.31);

        // ── Escena 2: el núcleo los aprende ──
        showCaption(1, 0.28);
        dot(1, 0.28);
        tl.fromTo(
          "[data-j-scene='core']",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.06, ease: "power2.out" },
          0.29,
        );
        // pulsos del núcleo mientras "digiere"
        tl.fromTo(
          "[data-j-core-ring='0']",
          { scale: 0.7, opacity: 0.8 },
          { scale: 2.1, opacity: 0, duration: 0.1 },
          0.35,
        );
        tl.fromTo(
          "[data-j-core-ring='1']",
          { scale: 0.7, opacity: 0.8 },
          { scale: 2.1, opacity: 0, duration: 0.1 },
          0.41,
        );
        // Los archivos pasan a "Listo ✓" uno por uno (como en el panel real)
        for (let i = 0; i < 3; i++) {
          tl.to(`[data-j-row-status='${i}']`, { opacity: 0, duration: 0.02 }, 0.33 + i * 0.04);
          tl.fromTo(
            `[data-j-row-check='${i}']`,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.03, ease: "back.out(2)" },
            0.34 + i * 0.04,
          );
        }
        tl.fromTo(
          "[data-j-learn]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.045, ease: "power1.out" },
          0.45,
        );
        hideCaption(1, 0.5);
        tl.to(
          "[data-j-scene='core']",
          { opacity: 0, scale: 0.85, y: -40, duration: 0.06, ease: "power1.in" },
          0.51,
        );

        // ── Escena 3: la respuesta con su cita (el diferencial) ──
        showCaption(2, 0.56);
        dot(2, 0.56);
        tl.fromTo(
          "[data-j-scene='answer']",
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.06, ease: "power1.out" },
          0.57,
        ).fromTo(
          "[data-j-source]",
          { opacity: 0, y: 12, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.05, ease: "power1.out" },
          0.65,
        );
        hideCaption(2, 0.71);
        tl.to(
          "[data-j-scene='answer']",
          { opacity: 0, scale: 0.9, y: -40, duration: 0.06, ease: "power1.in" },
          0.72,
        );

        // ── Escena 4: 48 hs, andando ──
        showCaption(3, 0.76);
        dot(3, 0.76);
        tl.fromTo(
          "[data-j-scene='final']",
          { opacity: 0, scale: 0.88, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.06, ease: "power1.out" },
          0.77,
        );
        tl.fromTo(
          "[data-j-tick]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.045 },
          0.86,
        );
        // Puente hacia Escenarios: aparece al final, invita a seguir.
        tl.fromTo(
          "[data-j-bridge]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.05 },
          0.92,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="viaje" ref={rootRef} className="relative">
      {/* ===== Desktop: escenario clavado y centrado ===== */}
      <div className="hidden h-[100svh] flex-col items-center justify-center overflow-hidden lg:flex">
        <div className="relative flex h-[560px] w-full max-w-4xl flex-col items-center px-6">
          {/* Marco de sección: siempre visible durante el pin */}
          <p className="pointer-events-none mb-5 font-display text-sm font-semibold uppercase tracking-widest text-brand-blue">
            {journey.eyebrow}
          </p>

          {/* Caption de escena, arriba */}
          <div className="pointer-events-none relative h-24 w-full">
            {journey.scenes.map((s, i) => (
              <p
                key={s}
                data-j-caption={i}
                style={{ opacity: i === 0 ? 1 : 0 }}
                className="absolute inset-x-0 top-0 mx-auto max-w-3xl text-center font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                {s}
              </p>
            ))}
          </div>

          {/* Riel de progreso */}
          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
            {journey.scenes.map((_, i) => (
              <span
                key={i}
                data-j-dot={i}
                style={{ opacity: i === 0 ? 1 : 0.3 }}
                className="h-2 w-2 rounded-full bg-brand-violet"
              />
            ))}
          </div>

          {/* Centro del escenario: todas las escenas apiladas en la misma celda */}
          <div className="relative grid w-full flex-1 place-items-center">
            {/* Escena 1: tus documentos — mini-páginas reales, no wireframes */}
            <div data-j-scene="docs" className="col-start-1 row-start-1 flex gap-6">
              {journey.docsDetail.map((doc) => (
                <div
                  key={doc.title}
                  data-j-doc
                  className="w-48 rounded-xl border border-line/10 bg-white p-4 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        doc.kind === "PDF"
                          ? "bg-red-500/10 text-red-600"
                          : doc.kind === "DOCX"
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "bg-brand-green/10 text-brand-green"
                      }`}
                    >
                      {doc.kind}
                    </span>
                    <FileText className="h-4 w-4 text-ink-dim/30" />
                  </div>
                  <p className="mt-2.5 text-[13.5px] font-bold leading-tight text-ink">
                    {doc.title}
                  </p>
                  <div className="mt-2.5 space-y-1.5">
                    {doc.lines.map((line, li) => (
                      <p
                        key={line}
                        className={`truncate text-[11px] leading-snug ${
                          li === doc.highlight
                            ? "-mx-1 rounded bg-brand-blue/10 px-1 font-semibold text-ink"
                            : "text-ink-dim"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Escena 2: el núcleo aprende + la card real del panel */}
            <div
              data-j-scene="core"
              style={{ opacity: 0 }}
              className="col-start-1 row-start-1 flex flex-col items-center gap-7"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet text-white shadow-[0_20px_50px_-14px_rgb(47_107_240/0.6)]">
                <span
                  data-j-core-ring="0"
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-brand-blue/50 opacity-0"
                />
                <span
                  data-j-core-ring="1"
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-brand-violet/50 opacity-0"
                />
                <Bot className="h-9 w-9" />
              </span>

              {/* Base de conocimiento: como se ve en el panel real */}
              <div className="w-[380px] rounded-2xl border border-line/10 bg-bg p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
                  Base de conocimiento
                </p>
                <div className="mt-3 space-y-2.5">
                  {journey.docs.map((d, i) => (
                    <div key={d} className="flex items-center gap-3">
                      <FileText className="h-4 w-4 flex-none text-brand-blue" />
                      <span className="flex-1 truncate text-[13px] font-medium text-ink">{d}</span>
                      <span
                        data-j-row-status={i}
                        className="text-[11.5px] text-ink-dim"
                      >
                        Procesando…
                      </span>
                      <span
                        data-j-row-check={i}
                        style={{ opacity: 0 }}
                        className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-green/10"
                      >
                        <Check className="h-3 w-3 text-brand-green" strokeWidth={3.5} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <span
                data-j-learn
                style={{ opacity: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-bg px-4 py-2.5 text-sm font-medium text-ink-dim shadow-soft"
              >
                <Check className="h-4 w-4 text-brand-green" strokeWidth={3} />
                {journey.learning}
              </span>
            </div>

            {/* Escena 3: la respuesta — la burbuja EXACTA del widget real */}
            <div
              data-j-scene="answer"
              style={{ opacity: 0 }}
              className="col-start-1 row-start-1 flex max-w-lg flex-col items-start"
            >
              <div className="flex items-end gap-2.5">
                <span className="relative flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#c084fc] to-[#9333ea] text-white">
                  <Bot className="h-[18px] w-[18px]" />
                  <span className="absolute -bottom-px -right-px h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
                </span>
                <p className="rounded-2xl rounded-bl-[5px] bg-[#f4f5f7] px-5 py-3.5 text-[16px] leading-relaxed text-[#1e293b] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  {journey.answer}
                </p>
              </div>
              <span
                data-j-source
                style={{ opacity: 0 }}
                className="ml-12 mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 px-3.5 py-2 text-sm font-medium text-brand-blue shadow-soft"
              >
                <FileText className="h-4 w-4" />
                {journey.source}
              </span>
            </div>

            {/* Escena 4: 48 hs andando */}
            <div
              data-j-scene="final"
              style={{ opacity: 0 }}
              className="col-start-1 row-start-1 flex flex-col items-center gap-4"
            >
              <span className="flex items-center gap-3">
                <Zap className="h-9 w-9 text-brand-blue" />
                <span className="font-display text-7xl font-bold tracking-tight text-brand-gradient bg-clip-text">
                  {journey.final.stat}
                </span>
              </span>
              <p className="max-w-sm text-center text-lg text-ink-dim">{journey.final.line}</p>
              <span
                data-j-tick
                style={{ opacity: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-bg px-4 py-2.5 text-sm font-medium text-ink-dim shadow-soft"
              >
                <Check className="h-4 w-4 text-brand-green" strokeWidth={3} />
                {journey.final.tick}
              </span>
              <a
                data-j-bridge
                href="#escenarios"
                style={{ opacity: 0 }}
                className="btn-press mt-2 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-blue hover:text-brand-violet"
              >
                {journey.bridge}
                <span aria-hidden className="translate-y-[1px]">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile / reduced-motion: la misma historia, en flujo ===== */}
      <div className="mx-auto max-w-xl px-6 py-20 lg:hidden">
        <p className="text-center font-display text-sm font-semibold uppercase tracking-widest text-brand-blue">
          {journey.eyebrow}
        </p>
        <div className="mt-10 space-y-10">
          <div>
            <p className="font-display text-lg font-bold">{journey.scenes[0]}</p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {journey.docs.map((d) => (
                <div key={d} className="w-32 flex-none rounded-xl border border-line/10 bg-bg p-3 shadow-soft">
                  <FileText className="h-5 w-5 text-brand-blue" />
                  <p className="mt-2 text-xs font-medium leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-bold">{journey.scenes[1]}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet text-white">
                <Bot className="h-6 w-6" />
              </span>
              <span className="text-sm text-ink-dim">{journey.learning}</span>
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-bold">{journey.scenes[2]}</p>
            <p className="mt-3 rounded-3xl rounded-bl-lg bg-bg px-5 py-3 text-[15px] leading-relaxed shadow-soft">
              {journey.answer}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 px-3 py-1.5 text-xs font-medium text-brand-blue">
              <FileText className="h-3.5 w-3.5" />
              {journey.source}
            </span>
          </div>
          <div>
            <p className="font-display text-lg font-bold">{journey.scenes[3]}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-display text-4xl font-bold text-brand-gradient">
                {journey.final.stat}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-bg px-3.5 py-2 text-xs font-medium text-ink-dim">
                <Check className="h-3.5 w-3.5 text-brand-green" strokeWidth={3} />
                {journey.final.tick}
              </span>
            </div>
            <a
              href="#escenarios"
              className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-blue"
            >
              {journey.bridge}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
