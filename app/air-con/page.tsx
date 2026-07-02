import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
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
  const content = await getPageContentWithDefaults("air-con");
  return <AirConPageClient content={content} />;
}
