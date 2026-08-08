import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import IntellixHeader from "@/components/intellix/IntellixHeader";
import IntellixFeatures from "@/components/intellix/IntellixFeatures";
import IntellixStack from "@/components/intellix/IntellixStack";
import IntellixMetrics from "@/components/intellix/IntellixMetrics";
import IntellixDeliverables from "@/components/intellix/IntellixDeliverables";
import IntellixCTA from "@/components/intellix/IntellixCTA";
import { intellix } from "@/lib/intellix";

export const metadata: Metadata = {
  title: `${intellix.name} — Ficha técnica`,
  description:
    "Arquitectura, stack y métricas de Intellix: la ficha técnica para el equipo de sistemas.",
};

export default function TecnologiaPage() {
  return (
    <main className="relative">
      <IntellixHeader />
      <section className="px-6 pb-4 pt-36 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Por dentro
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
            {intellix.tech.intro}
          </p>
        </div>
      </section>
      <IntellixFeatures />
      <IntellixStack />
      <IntellixMetrics />
      <IntellixDeliverables />
      <IntellixCTA />
      <Footer />
    </main>
  );
}
