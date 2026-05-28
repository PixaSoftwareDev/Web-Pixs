"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { intellix } from "@/lib/intellix";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function IntellixHeader() {
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
          ? "border-b border-line/10 bg-bg/70 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo Intellix (swap por tema) */}
        <Link
          href="/intellix"
          aria-label={intellix.name}
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src={intellix.logo.dark}
            alt={`${intellix.name} logo`}
            width={1500}
            height={470}
            priority
            className="logo-on-dark h-10 w-auto object-contain md:h-12"
          />
          <Image
            src={intellix.logo.light}
            alt={`${intellix.name} logo`}
            width={1500}
            height={470}
            priority
            className="logo-on-light h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-dim transition-colors hover:text-neon-cyan sm:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            por Pixs
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
