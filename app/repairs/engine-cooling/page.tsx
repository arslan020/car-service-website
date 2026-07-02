import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { RepairsEngineCoolingPageClient } from "@/components/repairs-engine-cooling-page-client";

export const metadata: Metadata = {
  title: "Engine & Cooling System Repair Hayes UB4 | Marieston",
  description: "Engine and cooling system repair in Hayes UB4. Head gaskets, thermostats, radiators & coolant leaks. Experienced mechanics and transparent pricing.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/engine-cooling" },
};

export default async function EngineCoolingPage() {
  const content = await getPageContent("repairs-engine-cooling");
  const title = f(content, "hero_title", "Engine & Cooling");
  const subtitle = f(content, "hero_subtitle", "Overheating, oil leaks, warning lights — we trace the root cause with diagnostics before quoting. No guesswork, no unnecessary parts.");

  return <RepairsEngineCoolingPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
