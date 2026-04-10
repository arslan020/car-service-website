import { Suspense } from "react";
import { BookingWizard } from "@/components/booking-wizard";
import Link from "next/link";
import { site } from "@/lib/site-config";

function WizardFallback() {
  return (
    <div className="rounded-2xl border border-[#d9e4f2] bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
      Loading booking form…
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="w-full border-b border-[#d9e4f2] bg-[linear-gradient(180deg,#fafdff_0%,#eef7ff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3f63ff]">Book a service</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#101a56] sm:text-4xl">
          Schedule your visit
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Tell us about your vehicle and what you need. We will confirm your slot by phone or email. Questions? Call{" "}
          <a
            className="font-semibold text-[#3f63ff] underline-offset-2 hover:text-[#101a56] hover:underline"
            href={`tel:${site.phoneTel}`}
          >
            {site.phoneDisplay}
          </a>{" "}
          or{" "}
          <Link href="/quote" className="font-semibold text-[#3f63ff] underline-offset-2 hover:text-[#101a56] hover:underline">
            request a quote
          </Link>
          .
        </p>
        <div className="mt-6 rounded-[28px] border border-[#d9e4f2] bg-white p-4 shadow-[0_20px_50px_rgba(16,26,86,0.1)] sm:mt-10 sm:p-8">
          <Suspense fallback={<WizardFallback />}>
            <BookingWizard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
