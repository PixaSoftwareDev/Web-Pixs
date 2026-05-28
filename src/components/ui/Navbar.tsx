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

      {/* Panel de navegación mobile */}
      <div
        className={`md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`mx-4 origin-top overflow-hidden rounded-xl border border-line/10 bg-bg/95 backdrop-blur-md transition-all duration-300 ${
            open
              ? "max-h-[420px] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 p-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-4 py-3 font-mono text-sm uppercase tracking-widest text-ink-dim transition-colors hover:bg-line/5 hover:text-neon-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-md border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-3 text-center font-mono text-sm uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20"
              >
                Hablemos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
