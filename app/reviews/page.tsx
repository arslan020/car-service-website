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
        Embed your Google reviews widget here, or paste a few testimonials with permission. Star summary and
        before/after photos (where relevant) lift conversion on booking pages.
      </p>
      <Link href="/online-booking" className="inline-flex font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline">
        Book a service →
      </Link>
    </PageIntro>
  );
}
