import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsBrakesPageClient } from "@/components/repairs-brakes-page-client";

export const metadata: Metadata = {
  title: "Brake Repair & Replacement Hayes UB4 | Marieston Service Centre",
  description: "Expert brake repair and replacement in Hayes. Pads, discs, callipers & brake fluid. Fast turnaround and competitive prices. Book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/brakes" },
};

export default async function BrakesPage() {
  const content = await getPageContentWithDefaults("repairs-brakes");
  return <RepairsBrakesPageClient content={content} />;
}
