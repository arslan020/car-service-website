import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { RepairsElectricalPageClient } from "@/components/repairs-electrical-page-client";

export const metadata: Metadata = {
  title: "Car Electrical Repair Hayes UB4 | Diagnostics & Faults | Marieston",
  description: "Car electrical diagnostics and repair in Hayes. Battery, alternator, starter motor & fault code clearing. Book a diagnostic check online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/electrical" },
};

export default async function ElectricalPage() {
  const content = await getPageContent("repairs-electrical");
  const title = f(content, "hero_title", "Electrical Repairs");
  const subtitle = f(content, "hero_subtitle", "Warning lights, failed electrics, battery drain, or blown bulbs — diagnosed with professional equipment and repaired correctly.");

  return <RepairsElectricalPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
