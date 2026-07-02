import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { CarServicingFullPageClient } from "@/components/car-servicing-full-page-client";

export const metadata: Metadata = {
  title: "Full Car Service Hayes UB4 | Annual Service | Marieston",
  description: "Full annual car service in Hayes. Comprehensive 50-point inspection, oil, filters & safety checks. Transparent pricing and qualified mechanics. Book online.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/full" },
};

export default async function FullServicePage() {
  const content = await getPageContentWithDefaults("car-servicing-full");
  return <CarServicingFullPageClient content={content} />;
}
