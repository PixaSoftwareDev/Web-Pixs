import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Product from "@/components/sections/Product";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Product />
      <TechStack />
      <Process />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
