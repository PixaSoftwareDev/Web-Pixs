import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import IntellixHeader from "@/components/intellix/IntellixHeader";
import IntellixHero from "@/components/intellix/IntellixHero";
import IntellixAbout from "@/components/intellix/IntellixAbout";
import IntellixHowItWorks from "@/components/intellix/IntellixHowItWorks";
import IntellixUseCases from "@/components/intellix/IntellixUseCases";
import IntellixFeatures from "@/components/intellix/IntellixFeatures";
import IntellixStack from "@/components/intellix/IntellixStack";
import IntellixMetrics from "@/components/intellix/IntellixMetrics";
import IntellixDeliverables from "@/components/intellix/IntellixDeliverables";
import IntellixCTA from "@/components/intellix/IntellixCTA";
import { intellix } from "@/lib/intellix";

export const metadata: Metadata = {
  title: `${intellix.name} — IA conversacional`,
  description: intellix.short.description,
  openGraph: {
    title: `${intellix.name} — IA conversacional para empresas`,
    description: intellix.short.description,
    type: "website",
  },
};

export default function IntellixPage() {
  return (
    <main className="relative">
      <IntellixHeader />
      <IntellixHero />
      <IntellixAbout />
      <IntellixHowItWorks />
      <IntellixUseCases />
      <IntellixFeatures />
      <IntellixStack />
      <IntellixMetrics />
      <IntellixDeliverables />
      <IntellixCTA />
      <Footer />
    </main>
  );
}
