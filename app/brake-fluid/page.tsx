import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { BrakeFluidPageClient } from "@/components/brake-fluid-page-client";

export const metadata: Metadata = {
  title: "Brake Fluid Service Hayes UB4 | £99 Fixed Price | Marieston",
  description: "Brake fluid flush and replacement in Hayes UB4. Fixed price £99, all makes and models. Book online or call 020 8178 8031.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/brake-fluid" },
};

export default async function BrakeFluidPage() {
  const content = await getPageContentWithDefaults("brake-fluid");
  return <BrakeFluidPageClient content={content} />;
}
