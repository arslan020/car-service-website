"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ADD_ONS, SERVICE_TYPES } from "@/lib/booking-data";
import { site, waUrl } from "@/lib/site-config";
import type { BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/app/book/actions";

const STEPS = 6;

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

function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function inputClass() {
  return "mt-1 w-full min-h-11 rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-[#F1B500] focus:ring-2 focus:ring-[#F1B500]/30";
}

function labelClass() {
  return "text-sm font-medium text-slate-700";
}

export function BookingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormValues>(initial);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const minDate = useMemo(() => todayISODate(), []);

  useEffect(() => {
    const r = searchParams.get("reg");
    if (r) {
      setForm((f) => ({ ...f, reg: f.reg || r }));
    }
  }, [searchParams]);

  function update<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleAddOn(id: string) {
    setForm((f) => {
      const has = f.addOns.includes(id);
      return {
        ...f,
        addOns: has ? f.addOns.filter((x) => x !== id) : [...f.addOns, id],
      };
    });
  }

  function validateStep(s: number): string | null {
    if (s === 1) {
      if (form.reg.trim().length < 2) return "Enter your registration number.";
    }
    if (s === 2) {
      if (!form.serviceType) return "Choose a service type.";
    }
    if (s === 4) {
      if (!form.appointmentDate) return "Choose a date.";
    }
    if (s === 5) {
      if (form.customerName.trim().length < 2) return "Enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) return "Enter a valid email.";
      if (form.customerPhone.replace(/\D/g, "").length < 10) return "Enter a valid phone number.";
    }
    return null;
  }

  async function handleSubmit() {
    setError(null);
    const v = validateStep(5);
    if (v) {
      setError(v);
      return;
    }
    setPending(true);
    const res = await createBooking(form);
    setPending(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setReference(res.reference);
    setStep(7);
  }

  return (
    <div className="mx-auto max-w-4xl">
      {step < 7 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-sm font-medium text-slate-700">
            Step {step} of {STEPS}
          </p>
          <div className="grid w-full grid-cols-6 gap-1.5 sm:max-w-[14rem] sm:justify-self-end">
            {Array.from({ length: STEPS }, (_, i) => (
              <span
                key={i}
                className={`h-2.5 rounded-full ${i + 1 <= step ? "bg-[#F1B500]" : "bg-slate-200"}`}
                aria-hidden
              />
            ))}
          </div>
        </div>
      )}

      {error && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      {step === 1 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0e1555]">Vehicle details</h2>
          <p className="text-sm text-slate-600">
            Enter your registration to start. You can add more details so we are ready when you arrive.
          </p>
          <div>
            <label className={labelClass()} htmlFor="reg">
              Registration <span className="text-red-600">*</span>
            </label>
            <input
              id="reg"
              className={inputClass()}
              placeholder="e.g. AB12 CDE"
              value={form.reg}
              onChange={(e) => update("reg", e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass()} htmlFor="make">
                Make
              </label>
              <input
                id="make"
                className={inputClass()}
                value={form.make}
                onChange={(e) => update("make", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="model">
                Model
              </label>
              <input
                id="model"
                className={inputClass()}
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="year">
                Year
              </label>
              <input
                id="year"
                className={inputClass()}
                inputMode="numeric"
                value={form.year}
                onChange={(e) => update("year", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="fuel">
                Fuel type
              </label>
              <select
                id="fuel"
                className={inputClass()}
                value={form.fuelType}
                onChange={(e) => update("fuelType", e.target.value)}
              >
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric (EV)</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid (PHEV)</option>
              </select>
            </div>
            <div>
              <label className={labelClass()} htmlFor="engine">
                Engine size
              </label>
              <input
                id="engine"
                className={inputClass()}
                placeholder="e.g. 1.6"
                value={form.engineSize}
                onChange={(e) => update("engineSize", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="mileage">
                Mileage
              </label>
              <input
                id="mileage"
                className={inputClass()}
                inputMode="numeric"
                value={form.mileage}
                onChange={(e) => update("mileage", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="trans">
                Transmission
              </label>
              <select
                id="trans"
                className={inputClass()}
                value={form.transmission}
                onChange={(e) => update("transmission", e.target.value)}
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Semi-automatic">Semi-automatic</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0e1555]">Choose service</h2>
          <p className="text-sm text-slate-600">Select the main reason for your visit.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICE_TYPES.map((s) => (
              <label
                key={s.id}
                className={`flex cursor-pointer flex-col rounded-xl border-2 px-3 py-3 text-sm shadow-sm transition hover:border-[#F1B500] ${
                  form.serviceType === s.id
                    ? "border-[#F1B500] bg-yellow-50 ring-2 ring-[#F1B500]/35"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="serviceType"
                    className="mt-1 accent-[#F1B500]"
                    checked={form.serviceType === s.id}
                    onChange={() => update("serviceType", s.id)}
                  />
                  <span>
                    <span className="font-medium text-slate-900">{s.label}</span>
                    {s.hint && <span className="mt-0.5 block text-slate-500">{s.hint}</span>}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0e1555]">Add-ons</h2>
          <p className="text-sm text-slate-600">Optional extras — we will confirm availability.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {ADD_ONS.map((a) => (
              <label
                key={a.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm hover:border-[#F1B500]"
              >
                <input
                  type="checkbox"
                  className="accent-[#F1B500]"
                  checked={form.addOns.includes(a.id)}
                  onChange={() => toggleAddOn(a.id)}
                />
                <span className="text-slate-800">{a.label}</span>
              </label>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0e1555]">Date and time</h2>
          <p className="text-sm text-slate-600">
            We will confirm your slot by phone or email. Urgent work?{" "}
            <a className="font-semibold text-[#0071CE] underline-offset-2 hover:underline" href={`tel:${site.phoneTel}`}>
              Call {site.phoneDisplay}
            </a>{" "}
            or{" "}
            <a
              className="font-semibold text-[#0071CE] underline-offset-2 hover:underline"
              href={waUrl("Urgent repair request")}
            >
              WhatsApp us
            </a>
            .
          </p>
          <div>
            <label className={labelClass()} htmlFor="date">
              Preferred date <span className="text-red-600">*</span>
            </label>
            <input
              id="date"
              type="date"
              min={minDate}
              className={inputClass()}
              value={form.appointmentDate}
              onChange={(e) => update("appointmentDate", e.target.value)}
            />
          </div>
          <fieldset>
            <legend className={labelClass()}>Preferred period</legend>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="slot"
                  className="accent-[#F1B500]"
                  checked={form.slotPeriod === "morning"}
                  onChange={() => update("slotPeriod", "morning")}
                />
                Morning (8:00–12:00)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="slot"
                  className="accent-[#F1B500]"
                  checked={form.slotPeriod === "afternoon"}
                  onChange={() => update("slotPeriod", "afternoon")}
                />
                Afternoon (12:00–17:30)
              </label>
            </div>
          </fieldset>
          <p className="text-xs text-slate-500">
            {site.addressLines.join(", ")} — {site.hours}
          </p>
        </section>
      )}

      {step === 5 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0e1555]">Your details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="name">
                Full name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                className={inputClass()}
                autoComplete="name"
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={inputClass()}
                autoComplete="email"
                value={form.customerEmail}
                onChange={(e) => update("customerEmail", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="phone">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={inputClass()}
                autoComplete="tel"
                value={form.customerPhone}
                onChange={(e) => update("customerPhone", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="address">
                Address (optional)
              </label>
              <input
                id="address"
                className={inputClass()}
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="notes">
                Notes for the mechanic
              </label>
              <textarea
                id="notes"
                rows={4}
                className={inputClass()}
                placeholder="Symptoms, warning lights, previous work…"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </div>
        </section>
      )}

      {step === 6 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0e1555]">Payment preference</h2>
          <p className="text-sm text-slate-600">
            How would you like to pay when the work is complete?
          </p>
          <fieldset className="space-y-3 text-sm">
            <label className="flex cursor-pointer gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-[#F1B500]">
              <input
                type="radio"
                name="pay"
                className="accent-[#F1B500]"
                checked={form.paymentChoice === "pay_now"}
                onChange={() => update("paymentChoice", "pay_now")}
              />
              <span>
                <span className="font-medium text-slate-900">Pay now</span>
                <span className="mt-1 block text-slate-600">Card checkout (connect Stripe to activate).</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-[#F1B500]">
              <input
                type="radio"
                name="pay"
                className="accent-[#F1B500]"
                checked={form.paymentChoice === "deposit"}
                onChange={() => update("paymentChoice", "deposit")}
              />
              <span>
                <span className="font-medium text-slate-900">Pay a deposit</span>
                <span className="mt-1 block text-slate-600">Hold your slot with a small deposit.</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-[#F1B500]">
              <input
                type="radio"
                name="pay"
                className="accent-[#F1B500]"
                checked={form.paymentChoice === "at_garage"}
                onChange={() => update("paymentChoice", "at_garage")}
              />
              <span>
                <span className="font-medium text-slate-900">Pay at the garage</span>
                <span className="mt-1 block text-slate-600">Pay after the work is agreed and completed.</span>
              </span>
            </label>
          </fieldset>
          <p className="text-xs text-slate-500">
            Final price depends on vehicle inspection. We confirm costs before starting work.
          </p>
        </section>
      )}

      {step === 7 && reference && (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-emerald-800">Booking received</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-950">{reference}</p>
          <p className="mt-4 text-sm text-emerald-900">
            Keep this reference. We will confirm your appointment by email or phone shortly.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0e1555] px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1c2a61] sm:w-auto"
            >
              Back to home
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 sm:w-auto"
            >
              Call us
            </a>
          </div>
        </section>
      )}

      {step < 7 && (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-4">
          <button
            type="button"
            className="min-h-12 w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 disabled:opacity-40 sm:w-auto sm:min-w-[8rem]"
            disabled={step === 1 || pending}
            onClick={() => {
              setError(null);
              setStep((s) => Math.max(1, s - 1));
            }}
          >
            Back
          </button>
          {step < STEPS ? (
            <button
              type="button"
              className="min-h-12 w-full rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000] disabled:opacity-50 sm:w-auto sm:min-w-[10rem]"
              disabled={pending}
              onClick={() => {
                setError(null);
                const msg = validateStep(step);
                if (msg) {
                  setError(msg);
                  return;
                }
                setStep((s) => s + 1);
              }}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="min-h-12 w-full rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000] disabled:opacity-50 sm:w-auto sm:min-w-[12rem]"
              disabled={pending}
              onClick={handleSubmit}
            >
              {pending ? "Submitting…" : "Confirm booking"}
            </button>
          )}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-slate-600">
        Not sure what you need?{" "}
        <Link href="/quote" className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline">
          Request a quote
        </Link>
      </p>
    </div>
  );
}
