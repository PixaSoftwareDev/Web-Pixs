import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
// import WhatsAppFab from "@/components/ui/WhatsAppFab"; // temporalmente desactivado para probar widget Intellix
import Preloader from "@/components/ui/Preloader";

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
  title: `${site.name} — Software studio`,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} — Software studio`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg text-ink font-display antialiased selection:bg-neon-cyan/30 selection:text-white">
        <Preloader />
        {children}
        {/* Temporalmente comentado para probar el widget de Intellix (evitar dos widgets) */}
        {/* <WhatsAppFab /> */}
        <Script
          src="https://intellix.com.ar/widget/widget.js"
          strategy="afterInteractive"
          data-api-url="https://intellix.com.ar"
          data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJpbnRlbGxpeCIsInNjb3BlIjoid2lkZ2V0IiwiaWF0IjoxNzgyMDg0MzIxLCJleHAiOjE3ODk4NjAzMjF9.JnqThGIoQoezxr22UlWtJBqoVmr-K2CrQ66kZwqcc5c"
          data-title="PixsBot"
          data-placeholder="Hacé tu consulta..."
        />
      </body>
    </html>
  );
}
