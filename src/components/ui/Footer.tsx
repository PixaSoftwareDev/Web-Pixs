import Image from "next/image";
import { Linkedin, Instagram, Github, Mail, MapPin } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const navLinks = [
  { href: "#services", label: "Servicios" },
  { href: "#stack", label: "Stack" },
  { href: "#process", label: "Proceso" },
  { href: "#team", label: "Nosotros" },
  { href: "#contact", label: "Contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-bg-soft/40">
      {/* Accent line neon arriba — corte único de marca, no un border gris */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
      {/* Fade superior para transición suave desde Contact */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />

      {/* Banda CTA */}
      <div className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 pb-12 pt-20 md:flex-row md:items-center md:justify-between md:pb-16 md:pt-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              // Hablemos
            </p>
            <h3 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              ¿Tenés un proyecto en mente?
            </h3>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:glow-cyan"
          >
            Iniciar proyecto
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Columnas */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={site.logo.dark}
                alt={`${site.name} logo`}
                width={40}
                height={40}
                className="logo-on-dark absolute inset-0 h-10 w-10 object-contain"
              />
              <Image
                src={site.logo.light}
                alt={`${site.name} logo`}
                width={40}
                height={40}
                className="logo-on-light absolute inset-0 h-10 w-10 object-contain"
              />
            </div>
            <p className="font-display text-xl font-semibold">{site.name}</p>
          </div>
          <p className="mt-5 max-w-sm font-mono text-sm leading-relaxed text-ink-dim">
            {site.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-neon-lime/30 bg-neon-lime/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse-neon" />
            Disponible para proyectos
          </div>
        </div>

        {/* Navegación */}
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-dim">
            // Navegar
          </p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-sm text-ink transition-colors hover:text-neon-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto + redes */}
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-dim">
            // Contacto
          </p>
          <ul className="mt-4 space-y-3 font-mono text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-neon-cyan"
              >
                <Mail className="h-4 w-4 text-neon-cyan/70 transition-colors group-hover:text-neon-cyan" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-neon-cyan"
              >
                <WhatsAppIcon className="h-4 w-4 text-neon-cyan/70 transition-colors group-hover:text-neon-cyan" />
                WhatsApp
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-ink-dim">
              <MapPin className="h-4 w-4 text-ink-dim/70" />
              {site.location}
            </li>
          </ul>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink-dim">
            // Redes
          </p>
          <div className="mt-3 flex items-center gap-2">
            <SocialIcon href={site.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.socials.instagram} label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.socials.github} label="GitHub">
              <Github className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* Línea inferior — sin border, separada por spacing y un divider sutil con neon */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-line/20 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row">
          <p className="font-mono text-xs text-ink-dim">
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            v1.0.0 · built with care
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-line/15 text-ink-dim transition-all hover:border-neon-cyan/60 hover:text-neon-cyan hover:glow-cyan"
    >
      <span className="transition-transform group-hover:scale-110">
        {children}
      </span>
    </a>
  );
}
