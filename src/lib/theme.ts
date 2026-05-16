"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "pixs-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = (document.documentElement.dataset.theme as Theme) || "dark";
    setThemeState(initial);
    setMounted(true);
  }, []);

  const setTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    setThemeState(next);
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, setTheme, toggle, mounted };
}

/** Script inline para evitar FOUC. Se inyecta en <head> del layout. */
export const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem('${THEME_STORAGE_KEY}');
    var t = (s === 'light' || s === 'dark') ? s : 'dark';
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;
