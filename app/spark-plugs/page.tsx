import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { ServiceDetailPageClient } from "@/components/service-detail-page-client";
import { SPARK_PLUGS_META } from "@/lib/service-detail-meta";

export const metadata: Metadata = {
  title: "Spark Plug Replacement Hayes UB4 | ~1 Hour Fitting | Marieston",
  description: "Spark plug replacement in Hayes UB4 — manufacturer-spec plugs fitted in around an hour. Fixes misfires, rough idling & poor fuel economy. Serving West London.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/spark-plugs" },
  openGraph: {
    title: "Spark Plug Replacement Hayes UB4 | Marieston Service Centre",
    description: "Manufacturer-spec spark plugs fitted in around an hour. Fixes misfires, rough idling & poor fuel economy.",
    url: "https://www.mariestonservicecentre.co.uk/spark-plugs",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export default async function SparkPlugsPage() {
  const content = await getPageContentWithDefaults("spark-plugs");
  return <ServiceDetailPageClient meta={SPARK_PLUGS_META} content={content} />;
}
