import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ServicesPageClient } from "@/components/services-page-client";

export const metadata: Metadata = {
  title: "Our Services | MOT, Servicing & Repairs Hayes UB4 | Marieston",
  description: "Full range of car services at Marieston Service Centre in Hayes UB4. MOT, servicing, repairs, diagnostics, oil change, air con and EV battery checks.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/services" },
};

export default async function ServicesPage() {
  const c = await getPageContentWithDefaults("services");

  return <ServicesPageClient content={c} />;
}
