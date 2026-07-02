import { site } from "@/lib/site-config";
import { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { FaqsPageClient } from "@/components/faqs-page-client";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${site.name}`,
  description: "Find answers to commonly asked questions about our car servicing, MOT testing, repairs, and our online booking process.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/faqs" },
};

export default async function FaqsPage() {
  const content = await getPageContentWithDefaults("faqs");
  return <FaqsPageClient content={content} />;
}
