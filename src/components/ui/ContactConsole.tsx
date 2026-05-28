"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Consola conversacional de contacto. Visualmente es una terminal cyber,
 * pero por debajo usa un <input> real (accesible con teclado y lectores).
 * Va preguntando campo por campo con efecto typing y, al terminar, arma el
 * mensaje y ofrece enviarlo por WhatsApp o mail (sin backend).
 */

type Answers = { name: string; email: string; message: string };

type Question = {
  key: keyof Answers;
  prompt: (a: Answers) => string;
  placeholder: string;
  validate: (value: string) => string | null; // devuelve error o null
};

const QUESTIONS: Question[] = [
  {
    key: "name",
    prompt: () => "Hola 👋 Soy la consola de Pixs. ¿Cómo te llamás?",
    placeholder: "tu nombre",
    validate: (v) => (v.trim().length < 2 ? "Necesito un nombre válido." : null),
  },
  {
    key: "email",
    prompt: (a) => `Genial, ${a.name}. ¿A qué email te respondemos?`,
    placeholder: "tu@email.com",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? null
        : "Ese email no parece válido.",
  },
  {
    key: "message",
    prompt: () => "¿Qué querés construir? Contanos la idea en una línea.",
    placeholder: "una app de reservas, un MVP, una integración...",
    validate: (v) =>
      v.trim().length < 5 ? "Contanos un poquito más." : null,
  },
];

type Line = { role: "bot" | "user" | "system"; text: string };

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function ContactConsole() {
  const [history, setHistory] = useState<Line[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    name: "",
    email: "",
    message: "",
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState(true);
  const [typed, setTyped] = useState(""); // texto del bot que se está tipeando
  const [started, setStarted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setInterval>>();

  const done = step >= QUESTIONS.length;

  // Arranca el flujo recién cuando la consola entra en viewport (así no
  // se pierde el efecto typing mientras el usuario está arriba en la página).
  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  // Tipea la pregunta del paso actual.
  useEffect(() => {
    if (!started || done) return;
    const full = QUESTIONS[step].prompt(answers);

    if (prefersReducedMotion()) {
      setTyped(full);
      setTyping(false);
      return;
    }

    setTyping(true);
    setTyped("");
    let i = 0;
    typingTimer.current = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(typingTimer.current);
        setTyping(false);
      }
    }, 22);

    return () => clearInterval(typingTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, started, done]);

  // Autoscroll del cuerpo de la consola.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history, typed, done]);

  // Foco al input cuando termina de tipear la pregunta.
  useEffect(() => {
    if (!typing && !done) inputRef.current?.focus();
  }, [typing, done]);

  const submit = useCallback(() => {
    if (typing || done) return;
    const q = QUESTIONS[step];
    const value = input.trim();
    const err = q.validate(value);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setHistory((h) => [
      ...h,
      { role: "bot", text: typed },
      { role: "user", text: value },
    ]);
    setAnswers((a) => ({ ...a, [q.key]: value }));
    setInput("");
    setStep((s) => s + 1);
  }, [typing, done, step, input, typed]);

  const reset = () => {
    setHistory([]);
    setAnswers({ name: "", email: "", message: "" });
    setStep(0);
    setInput("");
    setError(null);
    setStarted(true);
  };

  const summary = `Hola Pixs! Soy ${answers.name}.\nEmail: ${answers.email}\nProyecto: ${answers.message}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Nuevo proyecto — ${answers.name}`,
  )}&body=${encodeURIComponent(summary)}`;

  return (
    <div
      ref={rootRef}
      className="w-full overflow-hidden rounded-lg border border-neon-cyan/30 bg-bg-soft/80 text-left shadow-2xl backdrop-blur"
    >
      {/* Barra superior estilo terminal */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-neon-magenta/80" />
        <span className="h-3 w-3 rounded-full bg-neon-lime/70" />
        <span className="h-3 w-3 rounded-full bg-neon-cyan/80" />
        <span className="ml-3 font-mono text-xs text-ink-dim">
          pixs@contacto — ~/nuevo-proyecto
        </span>
      </div>

      {/* Cuerpo de la consola */}
      <div
        ref={bodyRef}
        className="h-72 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed md:h-80"
        aria-live="polite"
      >
        <p className="text-ink-dim">
          <span className="text-neon-lime">$</span> pixs init --consulta
        </p>

        {history.map((line, i) => (
          <p
            key={i}
            className={
              line.role === "user"
                ? "mt-1 text-ink"
                : line.role === "system"
                  ? "mt-2 text-neon-lime"
                  : "mt-3 text-neon-cyan"
            }
          >
            <span className="select-none opacity-60">
              {line.role === "user" ? "_ " : line.role === "system" ? "✓ " : "> "}
            </span>
            {line.role === "user" ? <span className="break-words">{line.text}</span> : line.text}
          </p>
        ))}

        {/* Pregunta en curso (tipeándose) */}
        {!done && (
          <p className="mt-3 text-neon-cyan">
            <span className="select-none opacity-60">{"> "}</span>
            {typed}
            {typing && (
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-neon-cyan" />
            )}
          </p>
        )}

        {/* Estado final */}
        {done && (
          <>
            <p className="mt-3 text-neon-cyan">
              <span className="select-none opacity-60">{"> "}</span>
              Listo, {answers.name}. Tu consulta está armada 👇
            </p>
            <p className="mt-3 whitespace-pre-wrap rounded border border-white/5 bg-white/5 p-3 text-ink-dim">
              {summary}
            </p>
            <p className="mt-3 text-neon-lime">
              <span className="select-none opacity-60">✓ </span>
              Elegí por dónde enviarla:
            </p>
          </>
        )}
      </div>

      {/* Zona de input / acciones */}
      <div className="border-t border-white/5 bg-white/[0.03] px-4 py-3">
        {!done ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex items-center gap-2"
          >
            <span aria-hidden className="font-mono text-neon-cyan">
              {"_"}
            </span>
            <label htmlFor="console-input" className="sr-only">
              {started && !typing ? QUESTIONS[step].prompt(answers) : "Respuesta"}
            </label>
            <input
              id="console-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={typing || !started}
              placeholder={
                started && !typing ? QUESTIONS[step].placeholder : "..."
              }
              autoComplete="off"
              className="flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-dim/50 disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={typing || !started}
              className="rounded border border-neon-cyan/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-colors hover:bg-neon-cyan/10 disabled:opacity-30"
            >
              enter ↵
            </button>
          </form>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl(summary)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-neon-lime/50 bg-neon-lime/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon-lime transition-colors hover:bg-neon-lime/20"
            >
              Enviar por WhatsApp →
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-colors hover:bg-neon-cyan/20"
            >
              Enviar por mail →
            </a>
            <button
              onClick={reset}
              className="ml-auto font-mono text-xs text-ink-dim underline-offset-4 hover:text-ink hover:underline"
            >
              reiniciar
            </button>
          </div>
        )}
        {error && (
          <p className="mt-2 font-mono text-xs text-neon-magenta">! {error}</p>
        )}
      </div>
    </div>
  );
}
