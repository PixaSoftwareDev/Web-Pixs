import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const navLinks = [
  { href: "/#viaje", label: "Cómo funciona" },
  { href: "/#confianza", label: "Confianza" },
  { href: "/#planes", label: "Planes" },
  { href: "/tecnologia", label: "Tecnología" },
];

/* Footer oscuro — continúa el acto final que abre el CTA de cierre. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0b0f1e] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent" />

      {/* Franja principal: marca + navegación + contacto en una sola fila */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-12 lg:flex-row lg:justify-between">
        <Link href="/#hero" aria-label={site.name} className="transition-opacity hover:opacity-80">
          {/* Wordmark en su variante para fondo oscuro (letras blancas) */}
          <Image
            src={site.logo.wordmark.dark}
            alt={`${site.name} logo`}
            width={1500}
            height={152}
            className="h-3.5 w-auto object-contain"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            title={site.email}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Microlínea legal */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mx-auto flex max-w-7xl justify-center px-6 py-5">
          <p className="text-xs text-white/40">
            © {year} {site.name} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
