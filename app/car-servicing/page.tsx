import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function CarServicingPage() {
  return (
    <>
      <PageIntro eyebrow="Servicing" title="Car servicing">
        <p>
          Manufacturer-scheduled servicing helps reliability, fuel economy, and resale value. We tailor parts and
          labour to your make and model.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Interim service — oil, filters, safety checks.</li>
          <li>Full service — broader inspection and adjustments.</li>
          <li>Major service — larger items per schedule (e.g. plugs, belts where due).</li>
        </ul>
        <p>Typical duration: 1.5–3 hours depending on level and vehicle.</p>
        <Link
          href="/book"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000]"
        >
          Book servicing
        </Link>
      </PageIntro>
    </>
  );
}
