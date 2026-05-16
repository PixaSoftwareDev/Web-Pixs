"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "#services", label: "Servicios" },
  { href: "#stack", label: "Stack" },
  { href: "#process", label: "Proceso" },
  { href: "#team", label: "Nosotros" },
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
        <a
          href="#"
          aria-label={site.name}
          className="group relative flex h-10 w-10 items-center justify-center"
        >
          <Image
            src={site.logo.dark}
            alt={`${site.name} logo`}
            width={72}
            height={72}
            priority
            className="logo-on-dark absolute -inset-4 h-[72px] w-[72px] max-w-none object-contain transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_10px_rgb(var(--c-neon-cyan)/0.7))]"
          />
          <Image
            src={site.logo.light}
            alt={`${site.name} logo`}
            width={72}
            height={72}
            priority
            className="logo-on-light absolute -inset-4 h-[72px] w-[72px] max-w-none object-contain transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_10px_rgb(var(--c-neon-cyan)/0.6))]"
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
        </div>
      </nav>
    </header>
  );
}
