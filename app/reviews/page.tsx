import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function ReviewsPage() {
  return (
    <PageIntro eyebrow="Reviews" title="What customers say">
      <p>
        Embed your Google reviews widget here, or paste a few testimonials with permission. Star summary and
        before/after photos (where relevant) lift conversion on booking pages.
      </p>
      <Link href="/book" className="inline-flex font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline">
        Book a service →
      </Link>
    </PageIntro>
  );
}
