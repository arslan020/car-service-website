import { getPageContentWithDefaults } from "@/lib/page-content";
import { ContactPageClient } from "@/components/contact-page-client";

export default async function ContactPage() {
  const content = await getPageContentWithDefaults("contact");
  return <ContactPageClient content={content} />;
}
