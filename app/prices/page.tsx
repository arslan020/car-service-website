import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { PricesPageClient } from "@/components/prices-page-client";

export const metadata: Metadata = {
  title: "Prices | MOT, Servicing & Repairs Hayes UB4 | Marieston",
  description:
    "Transparent pricing for MOT, car servicing, additional services and repairs at Marieston Service Centre, Hayes UB4. Prices by engine size, all inclusive of VAT.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/prices" },
};

export default async function PricesPage() {
  const content = await getPageContentWithDefaults("prices");
  return <PricesPageClient content={content} />;
}
