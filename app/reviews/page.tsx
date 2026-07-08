import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Customer Reviews | Marieston Service Centre Hayes UB4",
  description: "Read what our customers say about Marieston Service Centre in Hayes UB4. Real reviews from real drivers. Trusted local garage.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/reviews" },
};

export default function ReviewsPage() {
  return (
    <PageIntro eyebrow="Reviews" title="What Customers Say">
      <p>
        We&apos;re proud of the reputation we&apos;ve built with drivers across Hayes and West London — honest
        advice, fair prices and work done right the first time. Don&apos;t just take our word for it: read what
        our customers say on Google.
      </p>
      <a
        href="https://www.google.com/search?q=Marieston+Service+Centre+Hayes+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline"
      >
        Read our Google reviews →
      </a>
      <Link href="/online-booking" className="inline-flex font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline">
        Book a service →
      </Link>
    </PageIntro>
  );
}
