"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import { intellix } from "@/lib/intellix";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "#viaje", label: "Cómo funciona" },
  { href: "#planes", label: "Planes" },
  { href: "#equipo", label: "Equipo" },
  { href: "/tecnologia", label: "Tecnología" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Visible solo cerca del tope: al scrollear sale con animación y el dock inferior toma el relevo.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Histéresis: oculta pasando 160px, reaparece recién volviendo bajo 100px
    // (evita el parpadeo si el scroll oscila alrededor de un umbral único).
    const onScroll = () =>
      setVisible((v) => (v ? window.scrollY < 160 : window.scrollY < 100));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del body mientras el menú mobile está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 md:top-4">
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-island mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-4 pr-2"
          >
        <a
          href="#hero"
          aria-label={site.name}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src={site.logo.icon}
            alt={`${site.name} logo`}
            width={28}
            height={28}
            priority
            className="h-7 w-7 object-contain"
          />
          <Image
            src={site.logo.wordmark.dark}
            alt={site.name}
            width={1500}
            height={152}
            priority
            className="logo-on-dark h-2.5 w-auto object-contain md:h-3"
          />
          <Image
            src={site.logo.wordmark.light}
            alt={site.name}
            width={1500}
            height={152}
            priority
            className="logo-on-light h-2.5 w-auto object-contain md:h-3"
          />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith("/") ? (
                <Link
                  href={l.href}
                  className="text-sm font-medium text-ink-dim transition-colors hover:text-brand-blue"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  className="text-sm font-medium text-ink-dim transition-colors hover:text-brand-blue"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://www.intellix.com.ar/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-display text-sm font-semibold text-ink-dim transition-colors hover:text-ink md:inline-block"
          >
            Ingresar
          </a>
          <a
            href={whatsappUrl(intellix.whatsapp.demo)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand hidden rounded-full px-5 py-2.5 font-display text-sm font-semibold md:inline-block"
          >
            Probar gratis
          </a>

          {/* Botón hamburguesa — solo mobile */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-ink transition-colors hover:border-brand-blue/40 hover:text-brand-blue md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay de navegación mobile — pantalla completa */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute right-6 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-ink transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
        >
          <X className="h-5 w-5" />
        </button>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold tracking-tight text-ink transition-colors hover:text-brand-blue"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold tracking-tight text-ink transition-colors hover:text-brand-blue"
              >
                {l.label}
              </a>
            ),
          )}
          <a
            href="https://www.intellix.com.ar/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="font-display text-xl font-semibold text-ink-dim transition-colors hover:text-ink"
          >
            Ingresar
          </a>
          <a
            href={whatsappUrl(intellix.whatsapp.demo)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-brand mt-2 rounded-full px-8 py-3.5 font-display text-base font-semibold"
          >
            Probar gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
