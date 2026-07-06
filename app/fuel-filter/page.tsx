import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ServiceDetailPageClient } from "@/components/service-detail-page-client";
import { FUEL_FILTER_META } from "@/lib/service-detail-meta";

export const metadata: Metadata = {
  title: "Fuel Filter Change Hayes UB4 | ~30 Minute Fitting | Marieston",
  description: "Fuel filter change in Hayes UB4 for petrol & diesel cars — correct-spec filter fitted in about 30 minutes. Fixes poor starting & sluggish performance.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/fuel-filter" },
  openGraph: {
    title: "Fuel Filter Change Hayes UB4 | Marieston Service Centre",
    description: "Correct-spec fuel filter fitted in about 30 minutes. Fixes poor starting & sluggish performance.",
    url: "https://www.mariestonservicecentre.co.uk/fuel-filter",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export default async function FuelFilterPage() {
  const content = await getPageContentWithDefaults("fuel-filter");
  return <ServiceDetailPageClient meta={FUEL_FILTER_META} content={content} />;
}
