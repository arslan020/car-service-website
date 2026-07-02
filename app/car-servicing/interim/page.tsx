import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { CarServicingInterimPageClient } from "@/components/car-servicing-interim-page-client";

export const metadata: Metadata = {
  title: "Oil Service Hayes UB4 | 6-Month Service | Marieston",
  description: "Oil service in Hayes UB4. Oil change, filter replacement & 30-point safety check. Book your 6-month service online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/interim" },
};

export default async function InterimServicePage() {
  const content = await getPageContentWithDefaults("car-servicing-interim");
  return <CarServicingInterimPageClient content={content} />;
}
