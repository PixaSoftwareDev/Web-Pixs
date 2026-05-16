import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bg-soft/40 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
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
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-1 font-mono text-xs text-ink-dim">
              © {new Date().getFullYear()} — todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-ink-dim">
          <a href={site.socials.linkedin} className="hover:text-neon-cyan">
            LinkedIn
          </a>
          <a href={site.socials.instagram} className="hover:text-neon-cyan">
            Instagram
          </a>
          <a href={site.socials.github} className="hover:text-neon-cyan">
            GitHub
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-neon-cyan">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
