import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsClutchGearboxPageClient } from "@/components/repairs-clutch-gearbox-page-client";

export const metadata: Metadata = {
  title: "Clutch & Gearbox Repair Hayes UB4 | Marieston Service Centre",
  description: "Clutch and gearbox repair in Hayes UB4. Experienced mechanics, quality parts, accurate diagnosis. Get a free quote or book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/clutch-gearbox" },
};

export default async function ClutchGearboxPage() {
  const content = await getPageContentWithDefaults("repairs-clutch-gearbox");
  return <RepairsClutchGearboxPageClient content={content} />;
}
