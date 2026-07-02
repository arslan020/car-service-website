import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsExhaustEmissionsPageClient } from "@/components/repairs-exhaust-emissions-page-client";

export const metadata: Metadata = {
  title: "Exhaust & Emissions Repair Hayes UB4 | Marieston",
  description: "Exhaust repair and emissions testing in Hayes. Catalytic converters, DPF cleaning, silencers & pipework. Competitive prices and same-day service available.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/exhaust-emissions" },
};

export default async function ExhaustEmissionsPage() {
  const content = await getPageContentWithDefaults("repairs-exhaust-emissions");
  return <RepairsExhaustEmissionsPageClient content={content} />;
}
