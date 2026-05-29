"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "#services", label: "Servicios" },
  { href: "/intellix", label: "Intellix" },
  { href: "#stack", label: "Stack" },
  { href: "#process", label: "Proceso" },
  { href: "#team", label: "Nosotros" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/70 border-b border-line/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          aria-label={site.name}
          className="group relative flex h-10 w-10 items-center justify-center"
        >
          <Image
            src={site.logo.dark}
            alt={`${site.name} logo`}
            width={88}
            height={88}
            priority
            className="logo-on-dark absolute -inset-6 h-[88px] w-[88px] max-w-none object-contain transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_10px_rgb(var(--c-neon-cyan)/0.7))]"
          />
          <Image
            src={site.logo.light}
            alt={`${site.name} logo`}
            width={88}
            height={88}
            priority
            className="logo-on-light absolute -inset-6 h-[88px] w-[88px] max-w-none object-contain transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_10px_rgb(var(--c-neon-cyan)/0.6))]"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-ink-dim transition-colors hover:text-neon-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-md border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan md:inline-block"
          >
            Hablemos
          </a>

          {/* Botón hamburguesa — solo mobile */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line/15 text-ink transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

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
          className="absolute right-6 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-line/15 text-ink transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <X className="h-5 w-5" />
        </button>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-semibold tracking-tight text-ink transition-colors hover:text-neon-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
