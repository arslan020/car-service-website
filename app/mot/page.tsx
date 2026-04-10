import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function MotPage() {
  return (
    <>
      <PageIntro eyebrow="MOT" title="MOT testing">
        <p>
          Annual MOT inspections to keep your car legal and safe. If your vehicle fails, we explain advisories clearly
          and can quote for any work required.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>DVSA-approved testing (update this line to match your approval status).</li>
          <li>Retest options where applicable.</li>
          <li>Combine with a service package — see booking flow.</li>
        </ul>
        <p>
          <strong className="text-slate-800">From £X</strong> — replace with your MOT price.
        </p>
        <Link
          href="/book"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000]"
        >
          Book MOT
        </Link>
      </PageIntro>
    </>
  );
}
