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
 * Historia de venta, en orden:
 * promesa (Hero) → identificación (Escenarios) → solución (HowItWorks)
 * → objeción "¿inventa?" (Trust) → objeción "¿pierdo control?" (Control)
 * → dónde vive (Channels) → cuánto (Pricing) → sin riesgo (Launch)
 * → cercanía (Team) → cierre (CTA).
 * El producto se muestra con el video real del widget en el Hero: la landing
 * no embebe el widget (decisión de producto, 2026-08-08).
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
