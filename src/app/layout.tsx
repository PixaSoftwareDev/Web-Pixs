import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
// import WhatsAppFab from "@/components/ui/WhatsAppFab"; // temporalmente desactivado para probar widget Intellix
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
        {/* Temporalmente comentado para probar el widget de Intellix (evitar dos widgets) */}
        {/* <WhatsAppFab /> */}
        {/* Widget de Intellix — desactivado de momento (la burbuja tapaba el dock flotante).
            Para reactivarlo, descomentar este Script. Ojo: la sección "Probalo" (TryIt)
            depende de esta burbuja (#ia-w-btn) para abrir el chat.
        <Script
          src="https://dev.intellix.com.ar/widget/widget.js"
          strategy="afterInteractive"
          data-api-url="https://dev.intellix.com.ar"
          data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJpbnRlbGxpeCIsInNjb3BlIjoid2lkZ2V0IiwiaWF0IjoxNzg0OTg5NDkzLCJleHAiOjE3OTI3NjU0OTN9.gmiL9vNgeKOfXpfih1VIlnX_kcgWna1lK4v459lUd5s"
          data-title="Intellix"
          data-placeholder="Hacé tu consulta..."
        />
        */}
      </body>
    </html>
  );
}
