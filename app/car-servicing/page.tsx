import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { buildCarServicingTiers, buildCarServicingBenefits } from "@/lib/car-servicing-content";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CarServicingPageClient } from "@/components/car-servicing-page-client";

export const metadata: Metadata = {
  title: "Car Servicing Hayes UB4 | Oil, Full & Major Service | Marieston",
  description: "Expert car servicing in Hayes, Middlesex. Choose from oil, full or major service packages. Genuine parts, qualified mechanics, transparent pricing.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing" },
};

export default async function CarServicingPage() {
  const c = await getPageContentWithDefaults("car-servicing");

  const tiers = buildCarServicingTiers(c);
  const benefits = buildCarServicingBenefits(c);

  const servicingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Car Servicing",
    provider: {
      "@type": "AutoRepair",
      name: site.name,
      url: "https://www.mariestonservicecentre.co.uk",
    },
    areaServed: [
      "Hayes", "Southall", "Uxbridge", "Slough", "Hounslow", "Ealing", "Greenford",
      "Northolt", "Harrow", "Wembley", "Richmond", "Twickenham", "Windsor", "Feltham",
      "Isleworth", "Ruislip", "Acton", "Chiswick", "Brentford", "Hanwell",
      "West Drayton", "Hillingdon", "Watford", "Kingston upon Thames", "Staines-upon-Thames",
    ].map((name) => ({ "@type": "Place", name })),
    description: "Oil, full and major car servicing in Hayes UB4 by qualified mechanics — serving West London and surrounding areas.",
    url: "https://www.mariestonservicecentre.co.uk/car-servicing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Car Servicing Packages",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Oil Service" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Service" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Major Service" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brake Fluid Service" } },
      ],
    },
  };

  return (
    <>
      <JsonLd data={servicingSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Car Servicing", url: "https://www.mariestonservicecentre.co.uk/car-servicing" },
      ]} />
      <CarServicingPageClient content={c} tiers={tiers} benefits={benefits} />
    </>
  );
}
