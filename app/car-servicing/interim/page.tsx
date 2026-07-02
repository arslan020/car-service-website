import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { CarServicingInterimPageClient } from "@/components/car-servicing-interim-page-client";

export const metadata: Metadata = {
  title: "Oil Service Hayes UB4 | 6-Month Service | Marieston",
  description: "Oil service in Hayes UB4. Oil change, filter replacement & 30-point safety check. Book your 6-month service online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/interim" },
};

export default async function InterimServicePage() {
  const content = await getPageContent("car-servicing-interim");
  const resolved = {
    hero_title: f(content, "hero_title", "Oil Service"),
    hero_subtitle: f(content, "hero_subtitle", "Fresh engine oil and filter, plus a full multi-point safety check — keeps your engine protected and your warranty intact between full services. Ideal for high-mileage drivers."),
    faq_1_q: f(content, "faq_1_q", "Who is an oil service for?"),
    faq_1_a: f(content, "faq_1_a", "Drivers covering more than 12,000 miles a year benefit most — the extra oil change keeps the engine protected between annual full services."),
    faq_2_q: f(content, "faq_2_q", "Does it protect my warranty?"),
    faq_2_a: f(content, "faq_2_a", "Yes. UK law (Block Exemption Regulation) means manufacturer warranties remain valid when serviced at an independent garage using the correct oil grade and parts."),
    faq_3_q: f(content, "faq_3_q", "How long does it take?"),
    faq_3_a: f(content, "faq_3_a", "Usually 1.5–2 hours. Many customers drop off and collect the same morning."),
    faq_4_q: f(content, "faq_4_q", "Will I get a service stamp?"),
    faq_4_a: f(content, "faq_4_a", "Yes — we provide a stamped service record for your handbook and can update digital service records where supported."),
  };

  return <CarServicingInterimPageClient content={resolved} />;
}
