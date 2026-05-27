"use client";

import { useEffect, useState } from "react";

/**
 * Mockup de terminal/IDE en el hero. Aparece al lado del titular y comunica
 * de un vistazo: "somos un estudio de desarrollo, escribimos código real".
 *
 * Las líneas se "tipean" una a una con stagger para simular un comando vivo.
 */

type Line = {
  text: string;
  kind: "prompt" | "comment" | "info" | "accent" | "blank";
};

const LINES: Line[] = [
  { text: "$ pixs --status", kind: "prompt" },
  { text: "", kind: "blank" },
  { text: "// software studio · argentina", kind: "comment" },
  { text: "● 3 founders", kind: "info" },
  { text: "● shipping promedio: 4 semanas", kind: "info" },
  { text: "● stack: web · mobile · ai · apis", kind: "info" },
  { text: "", kind: "blank" },
  { text: "→ ready to build", kind: "accent" },
];

const kindClass: Record<Line["kind"], string> = {
  prompt: "text-neon-cyan",
  comment: "text-ink-dim",
  info: "text-ink",
  accent: "text-neon-lime",
  blank: "",
};

export default function HeroTerminal() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= LINES.length) return;
    // Líneas vacías pasan rápido, líneas con texto un poco más lento
    const delay = LINES[revealed]?.text === "" ? 120 : 280;
    const t = setTimeout(() => setRevealed((r) => r + 1), delay);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line/15 bg-bg-soft/70 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur">
      {/* Chrome: traffic lights + título de archivo */}
      <div className="flex items-center gap-2 border-b border-line/10 bg-bg/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-dim">
          ~/pixs · zsh
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-5 font-mono text-[13px] leading-[1.7] md:px-6 md:py-6 md:text-sm">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${
              i < revealed ? "opacity-100" : "opacity-0"
            } ${kindClass[line.kind]}`}
            style={{ minHeight: line.text === "" ? "0.7em" : undefined }}
          >
            {line.text || " "}
          </div>
        ))}
        {/* Cursor parpadeante después de la última línea */}
        {revealed >= LINES.length && (
          <span className="inline-block h-[1em] w-[0.5em] -mb-[2px] translate-y-[3px] animate-pulse bg-neon-cyan/70" />
        )}
      </div>
    </div>
  );
}
