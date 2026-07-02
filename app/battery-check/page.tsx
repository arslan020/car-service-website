import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { BatteryCheckPageClient } from "@/components/battery-check-page-client";

export const metadata: Metadata = {
  title: "Car Battery Check & Replacement Hayes UB4 | Marieston",
  description: "Free battery health check and battery replacement in Hayes UB4. All makes and models. Book online or call 020 8178 8031.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/battery-check" },
};

export default async function BatteryCheckPage() {
  const content = await getPageContent("battery-check");
  const title = f(content, "hero_title", "Battery Check");
  const subtitle = f(content, "hero_subtitle", "A full battery and charging system test using professional diagnostic equipment. Know your battery's health before it leaves you stranded.");

  return <BatteryCheckPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
