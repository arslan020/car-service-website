import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { BatteryCheckPageClient } from "@/components/battery-check-page-client";

export const metadata: Metadata = {
  title: "Car Battery Check & Replacement Hayes UB4 | Marieston",
  description: "Free battery health check and battery replacement in Hayes UB4. All makes and models. Book online or call 020 8178 8031.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/battery-check" },
};

export default async function BatteryCheckPage() {
  const content = await getPageContentWithDefaults("battery-check");
  return <BatteryCheckPageClient content={content} />;
}
