"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Desplazamiento vertical inicial (px). */
  y?: number;
  /** Delay entre hijos directos. */
  stagger?: number;
};

/**
 * Envuelve un grupo de elementos y los revela con un fade-up al entrar en
 * viewport (anima los hijos DIRECTOS con stagger). Solo transform/opacity.
 */
export default function Reveal({
  children,
  className,
  y = 28,
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: mostrar todo de una, sin animar (GSAP ignora la media query CSS).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.children, { opacity: 1, y: 0, filter: "none" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
