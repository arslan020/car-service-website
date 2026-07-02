import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { RepairsBrakesPageClient } from "@/components/repairs-brakes-page-client";

export const metadata: Metadata = {
  title: "Brake Repair & Replacement Hayes UB4 | Marieston Service Centre",
  description: "Expert brake repair and replacement in Hayes. Pads, discs, callipers & brake fluid. Fast turnaround and competitive prices. Book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/brakes" },
};

export default async function BrakesPage() {
  const content = await getPageContent("repairs-brakes");
  const title = f(content, "hero_title", "Brakes");
  const subtitle = f(content, "hero_subtitle", "Brakes are your car's most important safety system. We diagnose, quote clearly, and only replace what genuinely needs doing — no upselling.");

  return <RepairsBrakesPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
