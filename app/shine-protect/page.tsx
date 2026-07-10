import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ShineProtectPageClient } from "@/components/shine-protect-page-client";

export const metadata: Metadata = {
  title: "Shine! Protect Cosmetic Maintenance Plan Hayes UB4 | Marieston",
  description: "Shine! Protect cosmetic maintenance plan in Hayes UB4. Repairs to minor dents, chips, scratches & scuffs without affecting your no claims bonus. Ask us today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/shine-protect" },
  openGraph: {
    title: "Shine! Protect Cosmetic Maintenance Plan | Marieston Service Centre",
    description: "Shine! Protect cosmetic maintenance plan in Hayes UB4. Repairs to minor dents, chips, scratches & scuffs without affecting your no claims bonus. Ask us today.",
    url: "https://www.mariestonservicecentre.co.uk/shine-protect",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shine! Protect Cosmetic Maintenance Plan | Marieston Service Centre",
    description: "Shine! Protect cosmetic maintenance plan in Hayes UB4. Repairs to minor dents, chips, scratches & scuffs without affecting your no claims bonus. Ask us today.",
  },
};

export default async function ShineProtectPage() {
  const content = await getPageContentWithDefaults("shine-protect");
  return <ShineProtectPageClient content={content} />;
}
