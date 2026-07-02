import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { RepairsExhaustEmissionsPageClient } from "@/components/repairs-exhaust-emissions-page-client";

export const metadata: Metadata = {
  title: "Exhaust & Emissions Repair Hayes UB4 | Marieston",
  description: "Exhaust repair and emissions testing in Hayes. Catalytic converters, DPF cleaning, silencers & pipework. Competitive prices and same-day service available.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/exhaust-emissions" },
};

export default async function ExhaustEmissionsPage() {
  const content = await getPageContent("repairs-exhaust-emissions");
  const title = f(content, "hero_title", "Exhaust & Emissions");
  const subtitle = f(content, "hero_subtitle", "Blowing exhaust, failed emissions on MOT, or a DPF warning light — we diagnose and repair with quality parts and clear pricing.");

  return <RepairsExhaustEmissionsPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
