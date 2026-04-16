"use client";

import { useState } from "react";
import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

export default function QuotePage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", reg: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.description.trim()) e.description = "Please describe the problem.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eef4ff] via-[#f5f8ff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Quote request</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">
            Describe the problem
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            For non-standard jobs — noises, warning lights, damage — send details and we&apos;ll come back with next steps.
            For routine servicing, use the{" "}
            <Link href="/book" className="font-semibold text-[#3f63ff] underline-offset-2 hover:text-[#101a56] hover:underline">
              booking form
            </Link>.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <h3 className="text-xl font-extrabold text-[#101a56]">Request sent!</h3>
                <p className="max-w-sm text-sm text-slate-500">
                  We&apos;ve received your quote request and will get back to you as soon as possible — usually within a few hours during opening times.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", reg: "", description: "" }); }}
                    className="rounded-xl border-2 border-[#101a56] px-6 py-2.5 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white"
                  >
                    Send another request
                  </button>
                  <a
                    href={waUrl("Hi, I just sent a quote request via the website.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    Follow up on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Reg */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Vehicle Registration
                  </label>
                  <div className={`flex overflow-hidden rounded-xl border-2 shadow-sm ${errors.reg ? "border-red-400" : "border-[#F5C518]"}`}>
                    <div className="flex w-12 shrink-0 flex-col items-center justify-center bg-[#003399] py-3">
                      <span className="text-[9px] font-bold leading-none text-yellow-300">★</span>
                      <span className="mt-0.5 text-[9px] font-extrabold leading-none text-white">UK</span>
                    </div>
                    <input
                      type="text"
                      placeholder="YOUR REG"
                      maxLength={8}
                      value={form.reg}
                      onChange={(e) => setForm({ ...form, reg: e.target.value.toUpperCase() })}
                      className="min-w-0 flex-1 bg-[#F5C518] py-3 pr-3 text-center text-base font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#8b7200] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    What is happening? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe the problem, noise, warning light, or damage in as much detail as possible..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`resize-none rounded-xl border px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20 ${errors.description ? "border-red-400 bg-red-50" : "border-[#e0ebff] bg-white"}`}
                  />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>

                {/* Name + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`rounded-xl border px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20 ${errors.name ? "border-red-400 bg-red-50" : "border-[#e0ebff] bg-white"}`}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="07700 900000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`rounded-xl border px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20 ${errors.phone ? "border-red-400 bg-red-50" : "border-[#e0ebff] bg-white"}`}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-xl border border-[#e0ebff] bg-white px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20"
                  />
                </div>

                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <p className="text-xs text-slate-400"><span className="text-red-500">*</span> Required fields</p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {submitting ? (
                      <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                    ) : (
                      <>Send request<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] p-5">
            <p className="text-sm text-slate-500 text-center">
              Prefer to talk? Call us on{" "}
              <a href={`tel:${site.phoneTel}`} className="font-bold text-[#101a56] hover:text-[#3f63ff]">{site.phoneDisplay}</a>
              {" "}or{" "}
              <a href={waUrl("Hi, I'd like to get a quote please.")} target="_blank" rel="noopener noreferrer" className="font-bold text-[#25D366] hover:text-[#1ebe5d]">WhatsApp us</a>.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
