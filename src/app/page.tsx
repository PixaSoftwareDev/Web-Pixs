import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BottomDock from "@/components/ui/BottomDock";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Scenarios from "@/components/sections/Scenarios";
import Trust from "@/components/sections/Trust";
import Control from "@/components/sections/Control";
import Calculator from "@/components/sections/Calculator";
import Pricing from "@/components/sections/Pricing";
import Team from "@/components/sections/Team";
import Faq from "@/components/sections/Faq";
import IntellixCTA from "@/components/intellix/IntellixCTA";

/*
 * Historia de venta, en el orden en que se renderiza abajo:
 *
 *   Hero        promesa + el producto en video
 *   Journey     cómo funciona, contado con el scroll
 *   Scenarios   identificación: "esto me pasa a mí"
 *   Trust       objeción "¿inventa cosas?"
 *   Control     objeción "¿pierdo el control?" (+ canales)
 *   Calculator  cuánto tiempo/plata se ahorra
 *   Pricing     cuánto cuesta
 *   Team        cercanía: quiénes somos
 *   Faq         últimas dudas
 *   CTA         cierre
 *
 * El producto se muestra con el video real del widget en el Hero: la landing
 * no embebe el widget (decisión de producto, 2026-08-08).
 *
 * Mantener este comentario en sync con el JSX. Hasta el 2026-08-09 describía
 * secciones que ya no existían (HowItWorks, Channels, Launch) y no mencionaba
 * la mitad de las que sí — por eso nadie sabía qué componía la página.
 */
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Journey />
      <Scenarios />
      <Trust />
      <Control />
      <Calculator />
      <Pricing />
      <Team />
      <Faq />
      <IntellixCTA />
      <Footer />
      <BottomDock />
    </main>
  );
}
