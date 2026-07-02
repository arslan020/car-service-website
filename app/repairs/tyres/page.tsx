import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsTyresPageClient } from "@/components/repairs-tyres-page-client";

export const metadata: Metadata = {
  title: "Tyre Fitting & Repair Hayes UB4 | Marieston Service Centre",
  description: "Tyre fitting, balancing and puncture repair in Hayes UB4. All major brands stocked. Free tread & pressure check on every visit. Book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/tyres" },
};

export default async function TyresPage() {
  const content = await getPageContentWithDefaults("repairs-tyres");
  return <RepairsTyresPageClient content={content} />;
}
