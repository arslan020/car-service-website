import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { AboutUsPageClient } from "@/components/about-us-page-client";

export const metadata: Metadata = {
  title: "About Us | Marieston Service Centre Hayes UB4",
  description: "DVSA-approved garage in Hayes UB4 serving West London. Meet the team behind Marieston Service Centre — honest, expert car care you can trust.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/about-us" },
  openGraph: {
    title: "About Us | Marieston Service Centre Hayes UB4",
    description: "DVSA-approved garage in Hayes UB4 serving West London. Honest, expert car care you can trust.",
    url: "https://www.mariestonservicecentre.co.uk/about-us",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Marieston Service Centre Hayes UB4",
    description: "DVSA-approved garage in Hayes UB4 serving West London. Honest, expert car care you can trust.",
  },
};

export default async function AboutPage() {
  const content = await getPageContentWithDefaults("about-us");
  return <AboutUsPageClient content={content} />;
}
