import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { CeramicCoatPageClient } from "@/components/ceramic-coat-page-client";

export const metadata: Metadata = {
  title: "Williams Ceramic Coat Paint Protection Hayes UB4 | Marieston",
  description: "Williams Ceramic Coat in Hayes UB4. Third-generation paint protection for paintwork, alloys, bumpers, glass & interiors — guaranteed for as long as you own the vehicle.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/ceramic-coat" },
  openGraph: {
    title: "Williams Ceramic Coat Paint Protection | Marieston Service Centre",
    description: "Williams Ceramic Coat in Hayes UB4. Third-generation paint protection for paintwork, alloys, bumpers, glass & interiors — guaranteed for as long as you own the vehicle.",
    url: "https://www.mariestonservicecentre.co.uk/ceramic-coat",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Williams Ceramic Coat Paint Protection | Marieston Service Centre",
    description: "Williams Ceramic Coat in Hayes UB4. Third-generation paint protection for paintwork, alloys, bumpers, glass & interiors — guaranteed for as long as you own the vehicle.",
  },
};

export default async function CeramicCoatPage() {
  const content = await getPageContentWithDefaults("ceramic-coat");
  return <CeramicCoatPageClient content={content} />;
}
