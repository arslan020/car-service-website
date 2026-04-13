"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { site } from "@/lib/site-config";
import type { BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/app/book/actions";

const BOOKING_SERVICES = [
  { id: "mot", label: "MOT" },
  { id: "full", label: "Full service" },
  { id: "interim", label: "Interim service" },
  { id: "brakes", label: "Brakes" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "tyres", label: "Tyres" },
  { id: "ac", label: "Air-con" },
  { id: "general", label: "Other" },
] as const;

const TIME_SLOTS = [
  { time: "09:00", period: "morning" as const },
  { time: "09:30", period: "morning" as const },
  { time: "10:00", period: "morning" as const },
  { time: "10:30", period: "morning" as const },
  { time: "11:00", period: "morning" as const },
  { time: "11:30", period: "morning" as const },
  { time: "12:00", period: "afternoon" as const },
  { time: "14:00", period: "afternoon" as const },
  { time: "14:40", period: "afternoon" as const },
];

const STEP_LABELS = ["Car Details", "Date & time", "Contact"];

function formatSlotHeader(dateStr: string): string {
  if (!dateStr) return "SELECT A DATE FIRST";
  const d = new Date(dateStr + "T00:00:00");
  const day = d.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
  const date = d.getDate();
  const month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  return `${day} ${date} ${month}`;
}

function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const initial: BookingFormValues = {
  reg: "",
  make: "",
  model: "",
  year: "",
  fuelType: "",
  engineSize: "",
  mileage: "",
  transmission: "",
  serviceType: "",
  addOns: [],
  appointmentDate: "",
  slotPeriod: "morning",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  address: "",
  notes: "",
  paymentChoice: "at_garage",
};

export function BookingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormValues>(() => ({
    ...initial,
    reg: searchParams.get("reg") ?? "",
    serviceType: searchParams.get("service") ?? "",
  }));
  const [selectedTime, setSelectedTime] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const minDate = useMemo(() => todayISODate(), []);

  function update<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validateStep(s: number): string | null {
    if (s === 1) {
      if (form.reg.trim().length < 2) return "Please enter your registration number.";
      if (!form.serviceType) return "Please select a service.";
    }
    if (s === 2) {
      if (!form.appointmentDate) return "Please pick a date.";
      if (!selectedTime) return "Please select a time slot.";
    }
    if (s === 3) {
      if (form.customerName.trim().length < 2) return "Please enter your full name.";
      if (form.customerPhone.replace(/\D/g, "").length < 10) return "Please enter a valid mobile number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) return "Please enter a valid email address.";
    }
    return null;
  }

  async function handleSubmit() {
    setError(null);
    const v = validateStep(3);
    if (v) { setError(v); return; }
    setPending(true);
    const res = await createBooking(form);
    setPending(false);
    if (!res.ok) { setError(res.message); return; }
    setReference(res.reference);
    setStep(4);
  }

  function goNext() {
    setError(null);
    const msg = validateStep(step);
    if (msg) { setError(msg); return; }
    setStep((s) => s + 1);
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5";
  const inputClass =
    "w-full rounded-xl border border-[#d0dcea] bg-white px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/15";

  /* ── Success screen ── */
  if (step === 4 && reference) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-emerald-800">Booking received</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-950">{reference}</p>
        <p className="mt-3 text-sm text-emerald-800">
          Keep this reference. We will confirm your slot by text or call shortly.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#101a56] px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-[#16236e]"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex border-b border-[#f0f4f8]">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={`flex-1 py-3 text-center text-xs font-semibold transition-colors ${
              step === i + 1
                ? "border-b-2 border-[#101a56] text-[#101a56]"
                : step > i + 1
                ? "text-slate-400"
                : "text-slate-300"
            }`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Step 1: Car Details ── */}
      {step === 1 && (
        <div className="mt-5 space-y-5">
          <div>
            <label className={labelClass}>Your reg plate</label>
            {/* UK plate */}
            <div className="relative overflow-hidden rounded-xl border-2 border-[#F5C518] bg-[#F5C518]">
              <div className="absolute inset-y-0 left-0 flex w-[3.25rem] flex-col items-center justify-center bg-[#003399] px-2">
                <span className="text-[9px] font-bold leading-none text-yellow-300">★</span>
                <span className="mt-0.5 text-[9px] font-extrabold leading-none text-white">UK</span>
              </div>
              <input
                type="text"
                placeholder="LK21 XFT"
                maxLength={8}
                value={form.reg}
                onChange={(e) => update("reg", e.target.value.toUpperCase())}
                className="w-full bg-transparent py-3.5 pl-[3.5rem] pr-4 text-center text-lg font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#a89000] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Select service</label>
            <div className="grid grid-cols-2 gap-2">
              {BOOKING_SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => update("serviceType", s.id)}
                  className={`min-h-11 rounded-xl border px-3 py-3 text-sm font-medium text-left transition ${
                    form.serviceType === s.id
                      ? "border-[#101a56] bg-white font-semibold text-[#101a56] ring-1 ring-[#101a56]"
                      : "border-[#d0dcea] bg-white text-slate-700 hover:border-[#9db4ff]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Date & time ── */}
      {step === 2 && (
        <div className="mt-5 space-y-5">
          <div>
            <label className={labelClass}>Pick a date</label>
            <input
              type="date"
              min={minDate}
              value={form.appointmentDate}
              onChange={(e) => {
                update("appointmentDate", e.target.value);
                setSelectedTime("");
              }}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Available slots{form.appointmentDate ? ` · ${formatSlotHeader(form.appointmentDate)}` : ""}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!form.appointmentDate}
                  onClick={() => {
                    setSelectedTime(slot.time);
                    update("slotPeriod", slot.period);
                  }}
                  className={`min-h-11 rounded-xl border py-2.5 text-sm font-semibold transition ${
                    selectedTime === slot.time
                      ? "border-[#101a56] bg-[#101a56] text-white"
                      : form.appointmentDate
                      ? "border-[#d0dcea] bg-white text-slate-700 hover:border-[#101a56]"
                      : "cursor-not-allowed border-[#ebebeb] bg-[#f8f8f8] text-slate-300"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                Taken
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Contact ── */}
      {step === 3 && (
        <div className="mt-5 space-y-4">
          <div>
            <label className={labelClass}>Your name</label>
            <input
              type="text"
              placeholder="Full name"
              autoComplete="name"
              value={form.customerName}
              onChange={(e) => update("customerName", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Mobile number</label>
            <input
              type="tel"
              placeholder="07"
              autoComplete="tel"
              value={form.customerPhone}
              onChange={(e) => update("customerPhone", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email address</label>
            <input
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              value={form.customerEmail}
              onChange={(e) => update("customerEmail", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <p className="text-xs text-emerald-800">
              No payment needed to book. We will confirm your slot and quote before any work starts.
            </p>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className={`mt-6 flex ${step > 1 ? "gap-3" : ""}`}>
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            disabled={pending}
            className="flex-1 rounded-xl border border-[#d0dcea] bg-white py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className={`rounded-xl bg-[#101a56] py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] ${step > 1 ? "flex-1" : "w-full"}`}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={pending}
            className="flex-1 rounded-xl bg-[#101a56] py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] disabled:opacity-50"
          >
            {pending ? "Submitting…" : "Continue"}
          </button>
        )}
      </div>

      {/* Contact info */}
      <p className="mt-5 text-center text-xs text-slate-400">
        Questions? Call{" "}
        <a href={`tel:${site.phoneTel}`} className="font-semibold text-[#3f63ff]">
          {site.phoneDisplay}
        </a>
      </p>
    </div>
  );
}
