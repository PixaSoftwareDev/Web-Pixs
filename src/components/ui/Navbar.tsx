"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#services", label: "Servicios" },
  { href: "#stack", label: "Stack" },
  { href: "#process", label: "Proceso" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-2">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan glow-cyan">
            <span className="font-mono text-sm">P</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            {site.name}
          </span>
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

        <a
          href="#contact"
          className="hidden rounded-md border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan md:inline-block"
        >
          Hablemos
        </a>
      </nav>
    </header>
  );
}
