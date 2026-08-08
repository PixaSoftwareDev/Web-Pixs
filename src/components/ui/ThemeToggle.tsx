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
      className="group relative inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-dim/70 transition-colors hover:text-ink"
    >
      {/* Sun (visible en dark, para invitar a pasar a light) */}
      <Sun
        size={16}
        strokeWidth={1.75}
        className={`absolute transition-[transform,opacity] duration-300 ${
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      {/* Moon (visible en light) */}
      <Moon
        size={16}
        strokeWidth={1.75}
        className={`absolute transition-[transform,opacity] duration-300 ${
          mounted && !isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
