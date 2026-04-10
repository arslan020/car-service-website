"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site-config";

export default function QuotePage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0071CE]">Quote request</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0e1555] sm:text-4xl">Describe the problem</h1>
        <p className="mt-4 text-slate-600">
          For non-standard jobs — noises, warning lights, damage — send details and we will come back with next steps.
          For routine servicing, use the{" "}
          <Link href="/book" className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline">
            booking form
          </Link>
          .
        </p>

        {sent ? (
          <p className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Thanks — this demo form does not send email yet. Wire an API route to Resend, SMTP, or your CRM, or call{" "}
            <a className="font-semibold underline" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
            .
          </p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="q-reg">
                Registration
              </label>
              <input
                id="q-reg"
                required
                className="mt-1 w-full min-h-11 rounded-lg border-2 border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#F1B500] focus:outline-none focus:ring-2 focus:ring-[#F1B500]/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="q-desc">
                What is happening?
              </label>
              <textarea
                id="q-desc"
                required
                rows={5}
                className="mt-1 w-full min-h-11 rounded-lg border-2 border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#F1B500] focus:outline-none focus:ring-2 focus:ring-[#F1B500]/30"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="q-name">
                  Name
                </label>
                <input
                  id="q-name"
                  required
                  className="mt-1 w-full min-h-11 rounded-lg border-2 border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#F1B500] focus:outline-none focus:ring-2 focus:ring-[#F1B500]/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="q-phone">
                  Phone
                </label>
                <input
                  id="q-phone"
                  type="tel"
                  required
                  className="mt-1 w-full min-h-11 rounded-lg border-2 border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#F1B500] focus:outline-none focus:ring-2 focus:ring-[#F1B500]/30"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Photo/video uploads: add Supabase Storage or similar when you need them.
            </p>
            <button
              type="submit"
              className="min-h-12 w-full rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000] sm:w-auto"
            >
              Send request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
