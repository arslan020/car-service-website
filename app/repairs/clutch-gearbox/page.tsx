import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { RepairsClutchGearboxPageClient } from "@/components/repairs-clutch-gearbox-page-client";

export const metadata: Metadata = {
  title: "Clutch & Gearbox Repair Hayes UB4 | Marieston Service Centre",
  description: "Clutch and gearbox repair in Hayes UB4. Experienced mechanics, quality parts, accurate diagnosis. Get a free quote or book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/clutch-gearbox" },
};

export default async function ClutchGearboxPage() {
  const content = await getPageContent("repairs-clutch-gearbox");
  const title = f(content, "hero_title", "Clutch & Gearbox");
  const subtitle = f(content, "hero_subtitle", "Slipping clutch, stiff biting point, or grinding gears — we diagnose the root cause and give you a clear quote before any work starts.");

  return <RepairsClutchGearboxPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
