import { Suspense } from "react";
import { BookingWizard } from "@/components/booking-wizard";
import Link from "next/link";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-5">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#101a56]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        <p className="mt-3 text-sm text-slate-500">
          Fill in 3 quick steps — takes under 2 minutes
        </p>

        <div className="mt-4">
          <Suspense fallback={
            <div className="py-8 text-center text-sm text-slate-400">Loading…</div>
          }>
            <BookingWizard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
