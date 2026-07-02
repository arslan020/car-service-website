import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { DiagnosticsPageClient } from "@/components/diagnostics-page-client";

export const metadata: Metadata = {
  title: "Car Diagnostics Hayes UB4 | Engine Light & Fault Codes | Marieston",
  description: "Professional car diagnostics in Hayes. Engine management light investigation, fault code reading & full system checks. Fast, accurate results. Book online.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/diagnostics" },
};

export default async function DiagnosticsPage() {
  const content = await getPageContentWithDefaults("diagnostics");
  return <DiagnosticsPageClient content={content} />;
}
