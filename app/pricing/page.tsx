import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

const rows = [
  { item: "Interim service", price: "from £X" },
  { item: "Full service", price: "from £X" },
  { item: "Major service", price: "from £X" },
  { item: "MOT", price: "from £X" },
  { item: "Diagnostics", price: "from £X" },
  { item: "Brake pads (front)", price: "from £X" },
  { item: "Oil change", price: "from £X" },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageIntro eyebrow="Pricing" title="Clear starting prices">
        <p>
          Final price depends on your vehicle specification and condition. We confirm the quote before any work begins.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Guide</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.item} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{r.item}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Online card payments can be added with Stripe Checkout when you are ready — your booking flow already records
          payment preference.
        </p>
        <Link
          href="/book"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000] sm:w-auto"
        >
          Book now
        </Link>
      </div>
    </>
  );
}
