"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

/**
 * Botón flotante de WhatsApp. Aparece después de un pequeño delay para no
 * irrumpir en la carga inicial, y se mantiene visible en todas las páginas.
 */
export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={whatsappUrl("Hola Pixs! Tengo un proyecto en mente.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablemos por WhatsApp"
      className={`group fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Tooltip — solo desktop */}
      <span className="hidden translate-x-2 rounded-full border border-line/15 bg-bg/90 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:inline-block">
        Hablemos
      </span>

      {/* Botón circular con pulse ring */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_36px_rgba(37,211,102,0.7)]">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
