"use client";

import { useEffect, useState } from "react";

const DEFAULT_CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/{}";

type Props = {
  children: string;
  className?: string;
  /** Duración total de la animación de resolución. */
  durationMs?: number;
  /** Charset usado para las letras random durante el scramble. */
  charset?: string;
};

/**
 * Texto con efecto "scramble/decrypt": al montar, las letras pasan por
 * caracteres random y van resolviéndose progresivamente hasta llegar al texto
 * final. Una sola animación de entrada — no hay loop ni glow agresivo.
 *
 * Accesibilidad: el texto final se expone vía aria-label; el span interno
 * está aria-hidden para que el lector de pantalla no lea los caracteres random.
 */
export default function ScrambleText({
  children,
  className = "",
  durationMs = 900,
  charset = DEFAULT_CHARSET,
}: Props) {
  const target = children;
  const [text, setText] = useState(target);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const totalChars = target.length;

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / durationMs, 1);
      // 1.1 para que el último ~10% de la animación quede en texto final estable
      const resolvedCount = Math.floor(progress * totalChars * 1.1);

      const next = target
        .split("")
        .map((c, i) => {
          if (/\s/.test(c)) return c;
          if (i < resolvedCount) return c;
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join("");

      setText(next);

      if (progress >= 1) {
        setText(target);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, charset]);

  return (
    <span className={`inline-block ${className}`} aria-label={target}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
