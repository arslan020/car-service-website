import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { CarServicingMajorPageClient } from "@/components/car-servicing-major-page-client";

export const metadata: Metadata = {
  title: "Major Car Service Hayes UB4 | Complete Service Package | Marieston",
  description: "Major car service in Hayes UB4. Our most comprehensive service — spark plugs, fuel filter, timing belt check & full inspection. Book online or call us.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/major" },
};

export default async function MajorServicePage() {
  const content = await getPageContent("car-servicing-major");
  const resolved = {
    hero_title: f(content, "hero_title", "Major Service"),
    hero_subtitle: f(content, "hero_subtitle", "The most comprehensive service — everything in a Full Service plus spark plugs, coolant change, a multi-point check, and a full road test."),
    faq_1_q: f(content, "faq_1_q", "What is a Major Service?"),
    faq_1_a: f(content, "faq_1_a", "A Major Service is the most comprehensive annual service, following your car's manufacturer schedule. It includes everything in a Full Service plus spark plugs, coolant change, a comprehensive multi-point check, and a full road test — typically due every 2 years or 24,000 miles."),
    faq_2_q: f(content, "faq_2_q", "How is it different from a Full Service?"),
    faq_2_a: f(content, "faq_2_a", "A Full Service covers the standard 12-month checks. A Major Service adds component replacements that are due on a longer cycle — spark plugs, fluids that degrade over time, and a manufacturer-schedule compliance check."),
    faq_3_q: f(content, "faq_3_q", "Does this protect my manufacturer warranty?"),
    faq_3_a: f(content, "faq_3_a", "Yes. UK Block Exemption Regulation law means using a qualified independent garage with correct spec parts and oils keeps your warranty fully valid."),
    faq_4_q: f(content, "faq_4_q", "How long does a Major Service take?"),
    faq_4_a: f(content, "faq_4_a", "Typically 3–4 hours depending on the vehicle. We will always confirm timing when you book and text you when the car is ready."),
    faq_5_q: f(content, "faq_5_q", "Can I combine it with an MOT?"),
    faq_5_a: f(content, "faq_5_a", "Absolutely — many customers book both together. It saves a separate trip and we can usually fit both in one visit."),
  };

  return <CarServicingMajorPageClient content={resolved} />;
}
