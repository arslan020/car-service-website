import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { BookingBar } from "@/components/booking-bar";

export default function DiagnosticsPage() {
  return (
    <>
      <PageIntro eyebrow="Diagnostics" title="Diagnostics">
        <p>
          Warning lights, limp mode, odd noises, or poor running — we use serial diagnostics and measured tests to find
          the root cause before replacing parts.
        </p>
        <p>
          <strong className="text-slate-800">From £X</strong> diagnostic fee — credit toward repair where agreed (set your
          policy on this page).
        </p>
        <Link
          href="/book"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000]"
        >
          Book diagnostics
        </Link>
        <div className="pt-4">
          <BookingBar defaultService="diagnostics" />
        </div>
      </PageIntro>
    </>
  );
}
