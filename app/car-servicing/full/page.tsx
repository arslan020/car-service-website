import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { CarServicingFullPageClient } from "@/components/car-servicing-full-page-client";

export const metadata: Metadata = {
  title: "Full Car Service Hayes UB4 | Annual Service | Marieston",
  description: "Full annual car service in Hayes. Comprehensive 50-point inspection, oil, filters & safety checks. Transparent pricing and qualified mechanics. Book online.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/full" },
};

export default async function FullServicePage() {
  const content = await getPageContent("car-servicing-full");
  const resolved = {
    hero_title: f(content, "hero_title", "Full Service"),
    hero_subtitle: f(content, "hero_subtitle", "The UK standard annual service — comprehensive, warranty-safe, and stamped. Covers everything from oil and filters to a full 60-point vehicle health check."),
    faq_1_q: f(content, "faq_1_q", "What is a Full Service?"),
    faq_1_a: f(content, "faq_1_a", "A Full Service is the UK standard annual car service covering all the checks an Oil Service does, plus filter replacements, brake measurements, and a comprehensive 60-point health check of your vehicle."),
    faq_2_q: f(content, "faq_2_q", "How often should I have a Full Service?"),
    faq_2_a: f(content, "faq_2_a", "Every 12 months or 12,000 miles — whichever comes first. If you do high mileage, combine it with an Oil Service at 6 months."),
    faq_3_q: f(content, "faq_3_q", "Will it keep my manufacturer warranty valid?"),
    faq_3_a: f(content, "faq_3_a", "Yes. Under the UK Block Exemption Regulation, having your car serviced at an independent garage using the manufacturer-specified oil and parts does not void your warranty."),
    faq_4_q: f(content, "faq_4_q", "Do I get a service stamp?"),
    faq_4_a: f(content, "faq_4_a", "Yes — we stamp your service book and can update digital service histories (Volkswagen Group, Ford, BMW etc.) where the system allows."),
    faq_5_q: f(content, "faq_5_q", "How long does a Full Service take?"),
    faq_5_a: f(content, "faq_5_a", "Typically 2–3 hours. We text you when your car is ready for collection."),
  };

  return <CarServicingFullPageClient content={resolved} />;
}
