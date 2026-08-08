import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import MotionProvider from "@/components/ui/MotionProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-theme="light"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg text-ink font-display antialiased selection:bg-neon-cyan/30 selection:text-white">
        {/* Atmósfera global: UNA sola capa fija detrás de toda la página — sin
            costuras entre secciones, pantalla infinita. El grano va por encima
            de todo (z-60) como textura de película. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="aurora-a drift-a absolute inset-0" />
          <div className="aurora-b drift-b absolute inset-0" />
          <div className="drift-a absolute -top-40 right-[-6%] h-[620px] w-[620px] rounded-full bg-brand-violet/[0.12] blur-3xl" />
          <div className="drift-b absolute bottom-[-260px] left-[-16%] h-[520px] w-[520px] rounded-full bg-brand-blue/[0.05] blur-3xl" />
        </div>
        <div
          aria-hidden
          className="bg-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.025]"
        />
        <div className="relative z-10">
          <MotionProvider>{children}</MotionProvider>
        </div>
        <WhatsAppFab />
      </body>
    </html>
  );
}
