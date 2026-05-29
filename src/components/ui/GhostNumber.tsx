"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  /** Número a mostrar — string para soportar "01", "02", etc. */
  number: string;
  /** Posición del número dentro de la sección. */
  side?: "left" | "right";
};

/**
 * Número gigante translúcido posicionado en el fondo de una sección, con
 * parallax al scroll: se desplaza más despacio que el contenido, generando
 * sensación de profundidad. La sección padre debe ser `relative overflow-hidden`.
 */
export default function GhostNumber({ number, side = "right" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isRight = side === "right";
    // Solo en desktop (≥768px): en móvil el número se oculta y NO creamos el
    // ScrollTrigger, para evitar el jank de recalcular el parallax en cada scroll.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Movimiento diagonal con scrub: el número se desplaza HACIA ABAJO dentro
      // de la sección y a la vez se drifta horizontalmente HACIA EL CENTRO.
      // El cerebro lee ese movimiento diagonal como contramovimiento al scroll
      // vertical normal → sensación de "el contenido pasa por encima de algo
      // que no se mueve igual".
      gsap.fromTo(
        el,
        {
          yPercent: -25,
          xPercent: isRight ? -25 : 25,
          rotate: isRight ? -2 : 2,
        },
        {
          yPercent: 70,
          xPercent: isRight ? 25 : -25,
          rotate: isRight ? 2 : -2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        },
      );
    });
    return () => mm.revert();
  }, [side]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 hidden select-none font-display text-[16rem] font-bold leading-none text-ink/[0.12] md:block md:text-[22rem] lg:text-[28rem] ${
        side === "right" ? "-right-8 md:-right-16" : "-left-8 md:-left-16"
      }`}
    >
      {number}
    </span>
  );
}
