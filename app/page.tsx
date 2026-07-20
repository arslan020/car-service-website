import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { HomePageClient } from "@/components/home-page-client";

export const metadata: Metadata = {
  title: "West London Service Centre | MOT, Servicing & Car Repairs – Marieston, Hayes UB4",
  description: "Marieston Service Centre — a DVSA-approved garage in Hayes UB4 serving West London. Book MOT tests, car servicing, brakes, diagnostics & repairs online. Transparent pricing, same-day bookings available.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk" },
};

export default async function HomePage() {
  const content = await getPageContentWithDefaults("home");
  return <HomePageClient content={content} />;
}
