import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { HomePageClient } from "@/components/home-page-client";

export const metadata: Metadata = {
  title: "MOT, Servicing & Car Repairs in Hayes UB4 | Marieston Service Centre",
  description: "DVSA-approved garage in Hayes UB4. Book MOT tests, car servicing, brakes, diagnostics & repairs online. Transparent pricing, same-day bookings available.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk" },
};

export default async function HomePage() {
  const content = await getPageContentWithDefaults("home");
  return <HomePageClient content={content} />;
}
