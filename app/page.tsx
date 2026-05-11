import { getPageContentWithDefaults } from "@/lib/page-content";
import { HomePageClient } from "@/components/home-page-client";

export default async function HomePage() {
  const content = await getPageContentWithDefaults("home");
  return <HomePageClient content={content} />;
}
