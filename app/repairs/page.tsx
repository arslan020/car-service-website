import type { Metadata } from "next";
import { BUSINESS_JSONLD } from "@/lib/business-jsonld";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { RepairsPageClient } from "@/components/repairs-page-client";

export const metadata: Metadata = {
  title: "Car Repairs Hayes UB4 | Brakes, Clutch & More | Marieston",
  description: "Reliable car repairs in Hayes. Expert mechanics for brakes, clutch, suspension, exhaust, engine & electrical faults. Transparent pricing. Get a quote online.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs" },
};

const repairsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Car Repairs",
  provider: BUSINESS_JSONLD,
  areaServed: [
    "Hayes", "Southall", "Uxbridge", "Slough", "Hounslow", "Ealing", "Greenford",
    "Northolt", "Harrow", "Wembley", "Richmond", "Twickenham", "Windsor", "Feltham",
    "Isleworth", "Ruislip", "Acton", "Chiswick", "Brentford", "Hanwell",
    "West Drayton", "Hillingdon", "Watford", "Kingston upon Thames", "Staines-upon-Thames",
  ].map((name) => ({ "@type": "Place", name })),
  description: "Expert car repairs in Hayes UB4 — brakes, clutch, suspension, exhaust, engine and electrical. Serving West London and surrounding areas.",
  url: "https://www.mariestonservicecentre.co.uk/repairs",
};

export default async function RepairsPage() {
  const content = await getPageContentWithDefaults("repairs");

  return (
    <>
      <JsonLd data={repairsSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Repairs", url: "https://www.mariestonservicecentre.co.uk/repairs" },
      ]} />
      <RepairsPageClient content={content} />
    </>
  );
}
