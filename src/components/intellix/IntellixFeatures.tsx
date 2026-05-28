import {
  Zap,
  Code2,
  Building2,
  Palette,
  Users,
  LayoutDashboard,
  Globe,
  SearchCheck,
  TrendingUp,
  DatabaseBackup,
  MessageCircle,
  ShieldCheck,
  Check,
  type LucideIcon,
} from "lucide-react";
import { intellix } from "@/lib/intellix";
import Reveal from "./Reveal";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Code2,
  Building2,
  Palette,
  Users,
  LayoutDashboard,
  Globe,
  SearchCheck,
  TrendingUp,
  DatabaseBackup,
  MessageCircle,
  ShieldCheck,
};

export default function IntellixFeatures() {
  return (
    <section className="relative overflow-hidden bg-bg-soft/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
          // Funcionalidades
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Todo lo que trae de fábrica
        </h2>

        <Reveal
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
          y={24}
          stagger={0.05}
        >
          {intellix.features.map((f) => {
            const Icon = iconMap[f.icon] ?? Check;
            return (
              <div
                key={f.text}
                className="flex items-start gap-3 rounded-lg border border-line/10 bg-bg/50 p-4 backdrop-blur transition-colors hover:border-neon-cyan/30"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-md bg-neon-cyan/10 text-neon-cyan">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-sm leading-relaxed text-ink">
                  {f.text}
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
