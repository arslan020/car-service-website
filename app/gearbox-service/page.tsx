import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { GearboxServicePageClient } from "@/components/gearbox-service-page-client";

export const metadata: Metadata = {
  title: "Gearbox Service Hayes UB4 | Manual & Automatic | Marieston",
  description: "Professional gearbox service in Hayes UB4 — manual, automatic, DSG and CVT. Oil change, inspection & fault diagnosis for all makes. Serving West London.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/gearbox-service" },
  openGraph: {
    title: "Gearbox Service Hayes UB4 | Marieston Service Centre",
    description: "Professional gearbox service in Hayes UB4 — manual, automatic, DSG and CVT. Oil change, inspection & fault diagnosis for all makes. Serving West London.",
    url: "https://www.mariestonservicecentre.co.uk/gearbox-service",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export default async function GearboxServicePage() {
  const content = await getPageContentWithDefaults("gearbox-service");
  return <GearboxServicePageClient content={content} />;
}
