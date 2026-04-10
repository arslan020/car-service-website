import { Suspense } from "react";
import { BookingWizard } from "@/components/booking-wizard";
import Link from "next/link";
import { site } from "@/lib/site-config";

function WizardFallback() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
      Loading booking form…
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="w-full border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0071CE]">Book a service</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0e1555] sm:text-4xl">
          Schedule your visit
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Tell us about your vehicle and what you need. We will confirm your slot by phone or email. Questions? Call{" "}
          <a
            className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline"
            href={`tel:${site.phoneTel}`}
          >
            {site.phoneDisplay}
          </a>{" "}
          or{" "}
          <Link href="/quote" className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline">
            request a quote
          </Link>
          .
        </p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-10 sm:p-8">
          <Suspense fallback={<WizardFallback />}>
            <BookingWizard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
