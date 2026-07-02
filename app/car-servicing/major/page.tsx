import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { CarServicingMajorPageClient } from "@/components/car-servicing-major-page-client";

export const metadata: Metadata = {
  title: "Major Car Service Hayes UB4 | Complete Service Package | Marieston",
  description: "Major car service in Hayes UB4. Our most comprehensive service — spark plugs, fuel filter, timing belt check & full inspection. Book online or call us.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/major" },
};

export default async function MajorServicePage() {
  const content = await getPageContentWithDefaults("car-servicing-major");
  return <CarServicingMajorPageClient content={content} />;
}
