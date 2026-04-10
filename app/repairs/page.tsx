import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function RepairsPage() {
  return (
    <>
      <PageIntro eyebrow="Repairs" title="Repairs">
        <p>
          From brakes and suspension to clutches, exhausts, and timing components — we diagnose first, quote clearly,
          and only proceed with your approval.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Brakes, tyres, steering, and suspension.</li>
          <li>Clutch and gearbox concerns.</li>
          <li>Exhaust and emissions-related repairs.</li>
        </ul>
        <Link
          href="/quote"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#0e1555] bg-white px-5 py-3 text-sm font-bold text-[#0e1555] shadow-sm hover:bg-slate-50"
        >
          Request a repair quote
        </Link>
      </PageIntro>
    </>
  );
}
