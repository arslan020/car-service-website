"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, waUrl } from "@/lib/site-config";


const SERVICE_OPTIONS = [
  "MOT Test", "Full Service", "Interim Service", "Major Service",
  "Oil Change", "Diagnostics", "Brakes & Tyres", "Air Conditioning",
  "Battery Check", "Clutch & Gearbox", "Suspension & Steering",
  "Exhaust & Emissions", "Engine & Cooling", "Electrical", "Other",
];

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [closingTime, setClosingTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");


  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    if (day === 0) {
      setIsOpen(false);
      setClosingTime("");
    } else {
      setIsOpen(mins >= 600 && mins < 1200);
      setClosingTime("20:00");
    }
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
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
      const res = await fetch("/api/contact", {
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

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">We&apos;re here to help</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Call us, WhatsApp, or book online. Visit us at {site.addressLines.join(", ")}.
            We respond as soon as we&apos;re off the ramp.
          </p>
          {isOpen !== null && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 shadow-sm">
              <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-400"}`} />
              <span className="text-sm font-semibold text-[#101a56]">
                {isOpen ? `Open now · closes ${closingTime}` : "Currently closed"}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Send a message</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Get in touch directly</h2>
          </div>

          <div className="rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <h3 className="text-xl font-extrabold text-[#101a56]">Message sent!</h3>
                <p className="max-w-sm text-sm text-slate-500">
                  Thanks for getting in touch. We&apos;ll get back to you as soon as possible — usually within a few hours during opening times.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                  className="mt-2 rounded-xl border-2 border-[#101a56] px-6 py-2.5 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="John Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`rounded-xl border px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20 ${errors.name ? "border-red-400 bg-red-50" : "border-[#e0ebff] bg-white"}`} />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`rounded-xl border px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20 ${errors.email ? "border-red-400 bg-red-50" : "border-[#e0ebff] bg-white"}`} />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                  <input type="tel" placeholder="07700 900000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="rounded-xl border border-[#e0ebff] bg-white px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Service Required</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="rounded-xl border border-[#e0ebff] bg-white px-4 py-3 text-sm text-[#101a56] outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20">
                    <option value="">Select a service...</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message <span className="text-red-500">*</span></label>
                  <textarea rows={5} placeholder="Tell us about your vehicle and what you need help with..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`resize-none rounded-xl border px-4 py-3 text-sm text-[#101a56] placeholder-slate-300 outline-none transition focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/20 ${errors.message ? "border-red-400 bg-red-50" : "border-[#e0ebff] bg-white"}`} />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>
                {submitError && (
                  <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</div>
                )}
                <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400"><span className="text-red-500">*</span> Required fields</p>
                  <button type="submit" disabled={submitting}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto w-full">
                    {submitting ? (
                      <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                    ) : (
                      <>Send message<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── HOW TO REACH US ── */}
      <section className="px-4 pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Contact us</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">How to reach us</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Left col — 2x2 contact cards (icon + label only) */}
            <div className="grid grid-cols-2 gap-3 content-start">
              {/* Phone */}
              <a href={`tel:${site.phoneTel}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-[#3f63ff]">Phone</p>
              </a>

              {/* WhatsApp */}
              <a href={waUrl()} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#25D366]/40 hover:shadow-[0_6px_24px_rgba(37,211,102,0.1)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#25D366] group-hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-[#25D366]">WhatsApp</p>
              </a>

              {/* Email */}
              <a href={`mailto:${site.email}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-[#3f63ff]">Email</p>
              </a>

              {/* Address */}
              <a href="https://www.google.com/maps/search/?api=1&query=235+Yeading+Lane+Hayes+UB4+9AD" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-[#3f63ff]">Address</p>
              </a>
            </div>

            {/* Right col — hours + book */}
            <div className="flex flex-col gap-5">
              {/* Opening hours card */}
              <div className="rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Opening hours</p>
                <ul className="mt-5 space-y-4">
                  {[
                    { day: "Monday – Saturday", hours: "10:00 – 20:00", closed: false },
                    { day: "Sunday", hours: "Closed", closed: true },
                  ].map((row) => (
                    <li key={row.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{row.day}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${row.closed ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-700"}`}>
                        {row.hours}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="my-5 border-t border-[#e8f0fb]" />
                <div className="flex flex-col gap-3">
                  <Link
                    href="/book"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]"
                  >
                    Book online now
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#101a56] py-3.5 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    Call {site.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Collection service — full width below both columns */}
          <div className="mt-6 rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Collection service</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Can&apos;t make it to us? We offer a <strong className="text-[#101a56]">free collection and delivery service</strong> for customers in the local area.
                  Drop us a WhatsApp or give us a call to arrange — we&apos;ll come to you, carry out the work, and bring it back when ready.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* ── MAP ── */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Find us</p>
          <div className="overflow-hidden rounded-2xl border border-[#e8effa] shadow-sm">
            <div className="aspect-video w-full overflow-hidden bg-slate-100">
              <iframe
                title="Heston Automotive — 235 Yeading Ln, Hayes UB4 9AD"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=235+Yeading+Lane,+Hayes,+UB4+9AD,+UK&output=embed&z=16"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">
            235 Yeading Ln, Hayes, UB4 9AD &mdash; free parking on site
          </p>
          <div className="mt-3 flex justify-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=235+Yeading+Lane+Hayes+UB4+9AD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0ebff] bg-white px-4 py-2 text-sm font-semibold text-[#3f63ff] shadow-sm transition hover:bg-[#eef4ff]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
