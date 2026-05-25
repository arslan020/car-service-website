import type { Metadata } from "next";
import { QuotePageClient } from "@/components/quote-page-client";

export const metadata: Metadata = {
  title: "Get a Free Quote | Car Repairs Hayes UB4 | Marieston",
  description: "Request a free quote for car repairs at Marieston Service Centre in Hayes UB4. Describe the problem and we'll come back with next steps. Fast response.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/quote" },
};

export default function QuotePage() {
  return <QuotePageClient />;
}
