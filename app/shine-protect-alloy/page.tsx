import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ShineProtectAlloyPageClient } from "@/components/shine-protect-alloy-page-client";

export const metadata: Metadata = {
  title: "Shine! Protect Alloy Wheel Maintenance Plan Hayes UB4 | Marieston",
  description: "Shine! Protect Alloy maintenance plan in Hayes UB4. Mobile repairs to minor chips, scuffs & scratches on your alloy wheels — up to 5 requests a year. Ask us today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/shine-protect-alloy" },
  openGraph: {
    title: "Shine! Protect Alloy Wheel Maintenance Plan | Marieston Service Centre",
    description: "Shine! Protect Alloy maintenance plan in Hayes UB4. Mobile repairs to minor chips, scuffs & scratches on your alloy wheels — up to 5 requests a year. Ask us today.",
    url: "https://www.mariestonservicecentre.co.uk/shine-protect-alloy",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shine! Protect Alloy Wheel Maintenance Plan | Marieston Service Centre",
    description: "Shine! Protect Alloy maintenance plan in Hayes UB4. Mobile repairs to minor chips, scuffs & scratches on your alloy wheels — up to 5 requests a year. Ask us today.",
  },
};

export default async function ShineProtectAlloyPage() {
  const content = await getPageContentWithDefaults("shine-protect-alloy");
  return <ShineProtectAlloyPageClient content={content} />;
}
