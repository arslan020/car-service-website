import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { MotPageClient } from "@/components/mot-page-client";

export const metadata: Metadata = {
  title: "MOT Test Hayes UB4 | DVSA Approved | Marieston Service Centre",
  description: "Book an MOT test at our DVSA-approved garage in Hayes UB4. Official MOT testing from £29, same-day results. Book online or call 020 8178 8031.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/mot" },
};

export default async function MotPage() {
  const c = await getPageContentWithDefaults("mot");

  return <MotPageClient content={c} />;
}
