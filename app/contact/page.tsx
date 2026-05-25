import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ContactPageClient } from "@/components/contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us | Marieston Service Centre Hayes UB4",
  description: "Get in touch with Marieston Service Centre in Hayes UB4. Call 0208 564 8030, WhatsApp, or use our online contact form. Open Mon–Sat 9:00–18:00.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/contact" },
};

export default async function ContactPage() {
  const content = await getPageContentWithDefaults("contact");
  return <ContactPageClient content={content} />;
}
