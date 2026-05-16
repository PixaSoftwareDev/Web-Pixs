"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}
      aria-pressed={!isDark}
      title={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan transition-all hover:border-neon-cyan/60 hover:bg-neon-cyan/15 hover:glow-cyan"
    >
      {/* Sun (visible en dark, para invitar a pasar a light) */}
      <Sun
        size={16}
        strokeWidth={1.75}
        className={`absolute transition-all duration-300 ${
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      {/* Moon (visible en light) */}
      <Moon
        size={16}
        strokeWidth={1.75}
        className={`absolute transition-all duration-300 ${
          mounted && !isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
