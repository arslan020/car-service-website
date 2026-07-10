import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { CustomerProtectComprehensivePageClient } from "@/components/customer-protect-comprehensive-page-client";

export const metadata: Metadata = {
  title: "Customer Protect Comprehensive Warranty Hayes UB4 | Marieston",
  description: "Customer Protect Comprehensive vehicle warranty in Hayes UB4. Cover for all mechanical & electrical components up to 10 years or 100,000 miles. Ask us today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/customer-protect-comprehensive" },
  openGraph: {
    title: "Customer Protect Comprehensive Warranty | Marieston Service Centre",
    description: "Customer Protect Comprehensive vehicle warranty in Hayes UB4. Cover for all mechanical & electrical components up to 10 years or 100,000 miles. Ask us today.",
    url: "https://www.mariestonservicecentre.co.uk/customer-protect-comprehensive",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Protect Comprehensive Warranty | Marieston Service Centre",
    description: "Customer Protect Comprehensive vehicle warranty in Hayes UB4. Cover for all mechanical & electrical components up to 10 years or 100,000 miles. Ask us today.",
  },
};

export default async function CustomerProtectComprehensivePage() {
  const content = await getPageContentWithDefaults("customer-protect-comprehensive");
  return <CustomerProtectComprehensivePageClient content={content} />;
}
