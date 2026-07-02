import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsEngineCoolingPageClient } from "@/components/repairs-engine-cooling-page-client";

export const metadata: Metadata = {
  title: "Engine & Cooling System Repair Hayes UB4 | Marieston",
  description: "Engine and cooling system repair in Hayes UB4. Head gaskets, thermostats, radiators & coolant leaks. Experienced mechanics and transparent pricing.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/engine-cooling" },
};

export default async function EngineCoolingPage() {
  const content = await getPageContentWithDefaults("repairs-engine-cooling");
  return <RepairsEngineCoolingPageClient content={content} />;
}
