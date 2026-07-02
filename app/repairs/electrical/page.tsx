import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsElectricalPageClient } from "@/components/repairs-electrical-page-client";

export const metadata: Metadata = {
  title: "Car Electrical Repair Hayes UB4 | Diagnostics & Faults | Marieston",
  description: "Car electrical diagnostics and repair in Hayes. Battery, alternator, starter motor & fault code clearing. Book a diagnostic check online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/electrical" },
};

export default async function ElectricalPage() {
  const content = await getPageContentWithDefaults("repairs-electrical");
  return <RepairsElectricalPageClient content={content} />;
}
