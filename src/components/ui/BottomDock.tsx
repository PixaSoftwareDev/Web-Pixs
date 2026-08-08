"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { intellix } from "@/lib/intellix";
import { site, whatsappUrl } from "@/lib/site";

/* Secciones de la home que el dock va mostrando a medida que scrolleás. */
const sections = [
  { id: "hero", label: "Intellix" },
  { id: "viaje", label: "Así funciona, en vivo" },
  { id: "escenarios", label: "Escenarios" },
  { id: "confianza", label: "Confianza" },
  { id: "control", label: "Vos tenés el control" },
  { id: "calculadora", label: "Hacé la cuenta" },
  { id: "planes", label: "Planes" },
  { id: "equipo", label: "El equipo" },
  { id: "faq", label: "Preguntas frecuentes" },
];

export default function BottomDock() {
  const [active, setActive] = useState("Intellix");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Toma el relevo del navbar, con histéresis: entra pasando 200px, sale bajo 140px.
    // Y se retira al llegar al footer (no tapar el cierre de la página).
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.scrollHeight - 160;
      setVisible((v) =>
        nearBottom ? false : v ? window.scrollY > 140 : window.scrollY > 200,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll-spy: la sección más visible define el label.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) setActive(match.label);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-6"
        >
          <div className="glass-island flex items-center gap-2 rounded-full py-1.5 pl-2 pr-1.5">
            <a
              href="#hero"
              aria-label="Volver al inicio"
              title="Volver al inicio"
              className="group flex h-9 w-9 items-center justify-center rounded-full transition-[background-color,transform] hover:bg-bg-soft active:scale-95"
            >
              <Image
                src={intellix.logo.icon}
                alt={site.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain transition-transform group-hover:scale-110"
              />
            </a>
            <div className="relative h-5 w-36 overflow-hidden text-left">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 truncate text-sm font-medium text-ink"
                >
                  {active}
                </motion.span>
              </AnimatePresence>
            </div>
            <a
              href={whatsappUrl(intellix.whatsapp.demo)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand rounded-full px-5 py-2 font-display text-sm font-semibold"
            >
              Probar gratis
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
