import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ContactPageClient } from "@/components/contact-page-client";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Marieston Service Centre Hayes UB4",
  description: "Get in touch with Marieston Service Centre in Hayes UB4. Call 0208 564 8030, WhatsApp, or use our online contact form. Open Mon–Sat 9:00–18:00.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/contact" },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  url: "https://www.mariestonservicecentre.co.uk",
  telephone: site.phoneTel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressLines[0],
    addressLocality: site.addressLines[1],
    postalCode: site.addressLines[2],
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneTel,
    email: site.email,
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  },
};

export default async function ContactPage() {
  const content = await getPageContentWithDefaults("contact");
  return (
    <>
      <JsonLd data={contactSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Contact", url: "https://www.mariestonservicecentre.co.uk/contact" },
      ]} />
      <ContactPageClient content={content} />
    </>
  );
}
