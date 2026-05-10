"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Texto con efecto glitch (capas cyan/magenta desfasadas).
 * Usa pseudo-elementos via data-text para las capas duplicadas.
 */
export default function GlitchText({ children, className = "" }: Props) {
  const text = typeof children === "string" ? children : "";

  return (
    <span
      data-text={text}
      className={`relative inline-block ${className}
        before:absolute before:inset-0 before:content-[attr(data-text)]
        before:text-neon-cyan before:translate-x-[2px] before:-translate-y-[1px]
        before:opacity-70 before:mix-blend-screen before:animate-glitch-1
        after:absolute after:inset-0 after:content-[attr(data-text)]
        after:text-neon-magenta after:-translate-x-[2px] after:translate-y-[1px]
        after:opacity-70 after:mix-blend-screen after:animate-glitch-2
      `}
    >
      {children}
    </span>
  );
}
