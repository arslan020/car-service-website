import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";
import { AirConPageClient } from "@/components/air-con-page-client";

export const metadata: Metadata = {
  title: "Air Con Recharge & Repair Hayes UB4 | Marieston",
  description: "Air conditioning recharge and repair in Hayes UB4. Refrigerant regas, leak detection & compressor checks. Stay cool. Book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/air-con" },
  openGraph: {
    title: "Air Con Recharge & Repair Hayes UB4 | Marieston Service Centre",
    description: "Air conditioning recharge and repair in Hayes UB4. Refrigerant regas, leak detection & compressor checks. Stay cool. Book online today.",
    url: "https://www.mariestonservicecentre.co.uk/air-con",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Con Recharge & Repair Hayes UB4 | Marieston Service Centre",
    description: "Air conditioning recharge and repair in Hayes UB4. Refrigerant regas, leak detection & compressor checks. Stay cool. Book online today.",
  },
};

export default async function AirConPage() {
  const content = await getPageContent("air-con");
  const title = f(content, "hero_title", "Air Con Regas & Service");
  const subtitle = f(content, "hero_subtitle", "Full air conditioning regas and system health check. Get your cabin cool and fresh again — recommended every 2 years.");

  return <AirConPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
