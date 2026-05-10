import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bg-soft/40 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-1 font-mono text-xs text-ink-dim">
            © {new Date().getFullYear()} — todos los derechos reservados.
          </p>
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
