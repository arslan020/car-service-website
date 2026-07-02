import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { EvBatteryPageClient } from "@/components/ev-battery-page-client";

export const metadata: Metadata = {
  title: "EV Battery Health Check Hayes UB4 | Electric Car | Marieston",
  description: "Electric vehicle battery health check in Hayes UB4. Know the true capacity of your EV battery before buying or selling. Book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/ev-battery" },
};

export default async function EvBatteryPage() {
  const content = await getPageContentWithDefaults("ev-battery");
  return <EvBatteryPageClient content={content} />;
}
