"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site-config";
import type { BookingFormValues } from "@/lib/validations/booking";
import { createBooking } from "@/app/book/actions";
import type { LookupVehicle } from "@/lib/dvla";

const BOOKING_SERVICES = [
  { id: "mot", label: "MOT" },
  { id: "full", label: "Full service" },
  { id: "interim", label: "Interim service" },
  { id: "major", label: "Major service" },
  { id: "oil", label: "Oil change" },
  { id: "brakes", label: "Brakes" },
  { id: "clutch", label: "Clutch & Gearbox" },
  { id: "suspension", label: "Suspension & Steering" },
  { id: "exhaust", label: "Exhaust & Emissions" },
  { id: "engine", label: "Engine & Cooling" },
  { id: "electrical", label: "Electrical" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "tyres", label: "Tyres" },
  { id: "ac", label: "Air-con" },
  { id: "battery", label: "Battery check" },
  { id: "general", label: "Other" },
] as const;

const TIME_SLOTS = [
  { time: "10:00", period: "morning" as const },
  { time: "11:00", period: "morning" as const },
  { time: "12:00", period: "afternoon" as const },
  { time: "13:00", period: "afternoon" as const },
  { time: "14:00", period: "afternoon" as const },
  { time: "15:00", period: "afternoon" as const },
  { time: "16:00", period: "afternoon" as const },
  { time: "17:00", period: "afternoon" as const },
  { time: "18:00", period: "afternoon" as const },
  { time: "19:00", period: "afternoon" as const },
];

const STEP_LABELS = ["Car Details", "Date & time", "Contact"];
const VEHAPI_LOGO_SLUGS: Record<string, string> = {
  alfaromeo: "alfa_romeo",
  audi: "audi",
  bmw: "bmw",
  chevrolet: "chevrolet",
  citroen: "citroen",
  cupra: "seat",
  dacia: "dacia",
  fiat: "fiat",
  ford: "ford",
  honda: "honda",
  hyundai: "hyundai",
  jaguar: "jaguar",
  jeep: "jeep",
  kia: "kia",
  landrover: "land_rover",
  lexus: "lexus",
  mazda: "mazda",
  mercedes: "mercedes",
  mercedesbenz: "mercedes",
  mini: "mini",
  mitsubishi: "mitsubishi",
  nissan: "nissan",
  peugeot: "peugeot",
  porsche: "porsche",
  renault: "renault",
  seat: "seat",
  skoda: "skoda",
  smart: "smart",
  subaru: "subaru",
  suzuki: "suzuki",
  tesla: "tesla",
  toyota: "toyota",
  vauxhall: "vauxhall",
  volkswagen: "volkswagen",
  volvo: "volvo",
};

const CARLOGOS_LOGO_URLS: Record<string, string> = {
  audi: "https://www.carlogos.org/car-logos/audi-logo-2016-download.png",
  bmw: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray-download.png",
  ford: "https://www.carlogos.org/car-logos/ford-logo-2017-download.png",
  honda: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
  hyundai: "https://www.carlogos.org/car-logos/hyundai-logo-2011-download.png",
  kia: "https://www.carlogos.org/car-logos/kia-logo-2021-download.png",
  mazda: "https://www.carlogos.org/car-logos/mazda-logo-1997-download.png",
  mercedes: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-download.png",
  mercedesbenz: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-download.png",
  mini: "https://www.carlogos.org/car-logos/mini-logo-2018-download.png",
  nissan: "https://www.carlogos.org/car-logos/nissan-logo-2020-download.png",
  peugeot: "https://www.carlogos.org/car-logos/peugeot-logo-2021-download.png",
  porsche: "https://www.carlogos.org/car-logos/porsche-logo-download.png",
  renault: "https://www.carlogos.org/car-logos/renault-logo-2021-download.png",
  skoda: "https://www.carlogos.org/car-logos/skoda-logo-2016-download.png",
  suzuki: "https://www.carlogos.org/car-logos/suzuki-logo-download.png",
  tesla: "https://www.carlogos.org/car-logos/tesla-logo-download.png",
  toyota: "https://www.carlogos.org/car-logos/toyota-logo-download.png",
  vauxhall: "https://www.carlogos.org/car-logos/vauxhall-logo-download.png",
  volkswagen: "https://www.carlogos.org/car-logos/volkswagen-logo-2019-download.png",
  volvo: "https://www.carlogos.org/car-logos/volvo-logo-2014-download.png",
};

const CLEARBIT_DOMAINS: Record<string, string> = {
  alfaromeo: "alfaromeo.com",
  audi: "audi.com",
  bmw: "bmw.com",
  chevrolet: "chevrolet.com",
  citroen: "citroen.com",
  dacia: "dacia.com",
  fiat: "fiat.com",
  ford: "ford.com",
  honda: "honda.com",
  hyundai: "hyundai.com",
  jaguar: "jaguar.com",
  jeep: "jeep.com",
  kia: "kia.com",
  landrover: "landrover.com",
  lexus: "lexus.com",
  mazda: "mazda.com",
  mercedes: "mercedes-benz.com",
  mercedesbenz: "mercedes-benz.com",
  mini: "mini.com",
  mitsubishi: "mitsubishi-motors.com",
  nissan: "nissan-global.com",
  peugeot: "peugeot.com",
  porsche: "porsche.com",
  renault: "renault.com",
  seat: "seat.com",
  skoda: "skoda-auto.com",
  smart: "smart.com",
  subaru: "subaru.com",
  suzuki: "globalsuzuki.com",
  tesla: "tesla.com",
  toyota: "toyota.com",
  vauxhall: "vauxhall.co.uk",
  volkswagen: "volkswagen.com",
  volvo: "volvocars.com",
};

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeMakeForLogo(make?: string) {
  if (!make) return "";
  return make.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getMakeLogoUrls(make?: string) {
  if (!make) return [];
  // Same URL pattern as car dealer software
  const dashed = make.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const nospace = dashed.replace(/-/g, "");
  const normalized = normalizeMakeForLogo(make);
  const clearbitDomain = CLEARBIT_DOMAINS[normalized];
  const urls = [
    `https://vehapi.com/apis/logo-api/img/logo/${dashed}.png`,
    `https://www.carlogos.org/car-logos/${nospace}-logo.png`,
    clearbitDomain ? `https://logo.clearbit.com/${clearbitDomain}` : null,
  ].filter((value): value is string => Boolean(value));

  return Array.from(new Set(urls));
}

function formatVehicleSummary(vehicle: LookupVehicle) {
  return [
    vehicle.make ? titleCase(vehicle.make) : null,
    vehicle.model ? titleCase(vehicle.model) : null,
    vehicle.firstRegistrationDate
      ? new Date(vehicle.firstRegistrationDate).getFullYear().toString()
      : null,
    vehicle.fuelType ? titleCase(vehicle.fuelType) : null,
    vehicle.colour ? titleCase(vehicle.colour) : null,
  ]
    .filter(Boolean)
    .join(" • ");
}

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

/** Returns true if this time slot is in the past (only relevant for today's date). */
function isPastSlot(dateStr: string, time: string): boolean {
  if (!dateStr || dateStr !== todayISODate()) return false;
  const now = new Date();
  const [h, m] = time.split(":").map(Number);
  return now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m);
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
  appointmentTime: "",
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
  const autoLookupFromHome = searchParams.get("autoLookup") === "1";
  const serviceParam = searchParams.get("service") ?? "";
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormValues>(() => ({
    ...initial,
    reg: searchParams.get("reg") ?? "",
    serviceType: searchParams.get("service") ?? "",
  }));
  const [lookupPending, setLookupPending] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupVehicle, setLookupVehicle] = useState<LookupVehicle | null>(null);
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [slotsFetching, setSlotsFetching] = useState(false);
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});

  const minDate = useMemo(() => todayISODate(), []);
  const makeLogoUrls = useMemo(
    () => getMakeLogoUrls(lookupVehicle?.make),
    [lookupVehicle?.make],
  );
  const activeMakeLogoUrl = makeLogoUrls[logoSourceIndex] ?? null;

  function update<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const handleVehicleLookup = useCallback(async (regOverride?: string) => {
    const raw = regOverride ?? form.reg;
    const registrationNumber = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (registrationNumber.length < 2) {
      setLookupVehicle(null);
      setLookupError("Please enter a valid registration number first.");
      return;
    }

    setLookupPending(true);
    setLookupError(null);

    try {
      const response = await fetch("/api/vehicle-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok: true; vehicle: LookupVehicle }
        | { ok: false; message?: string }
        | null;

      if (!response.ok || !payload || !payload.ok) {
        setLookupVehicle(null);
        setLookupError(
          (payload && !payload.ok ? payload.message : undefined) ??
            "Vehicle lookup failed. Please try again."
        );
        return;
      }

      setLookupVehicle(payload.vehicle);
      setLogoSourceIndex(0);
      setForm((current) => ({
        ...current,
        reg: payload.vehicle.registrationNumber || registrationNumber,
        make: payload.vehicle.make ? titleCase(payload.vehicle.make) : current.make,
        model: payload.vehicle.model ? titleCase(payload.vehicle.model) : current.model,
        year: payload.vehicle.firstRegistrationDate
          ? new Date(payload.vehicle.firstRegistrationDate).getFullYear().toString()
          : current.year,
        fuelType: payload.vehicle.fuelType
          ? titleCase(payload.vehicle.fuelType)
          : current.fuelType,
        engineSize: payload.vehicle.engineCapacity
          ? `${payload.vehicle.engineCapacity}cc`
          : current.engineSize,
      }));
    } catch {
      setLookupVehicle(null);
      setLookupError("Vehicle lookup failed. Please try again.");
    } finally {
      setLookupPending(false);
    }
  }, [form.reg]);

  // Stable ref so the one-time auto-lookup useEffect never goes stale
  const handleVehicleLookupRef = useRef(handleVehicleLookup);
  useEffect(() => { handleVehicleLookupRef.current = handleVehicleLookup; });

  // Auto-lookup when arriving from home page with ?autoLookup=1&reg=...
  const autoLookupFired = useRef(false);
  useEffect(() => {
    if (!autoLookupFromHome || autoLookupFired.current) return;
    const reg = searchParams.get("reg") ?? "";
    if (reg.trim().length < 2) return;
    autoLookupFired.current = true;
    void handleVehicleLookupRef.current(reg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all service prices for this vehicle's make (or defaults) when make becomes known
  useEffect(() => {
    const brand = lookupVehicle?.make
      ? lookupVehicle.make.toLowerCase().replace(/[^a-z0-9]/g, "")
      : "all";
    const SERVICES = BOOKING_SERVICES.map((s) => s.id);
    Promise.all(
      SERVICES.map((s) =>
        fetch(`/api/service-price?brand=${brand}&service=${s}`)
          .then((r) => r.json())
          .then((d: { ok: boolean; price?: number }) =>
            d.ok && d.price !== undefined ? { s, price: d.price } : null,
          )
          .catch(() => null),
      ),
    ).then((results) => {
      const map: Record<string, number> = {};
      for (const r of results) {
        if (r) map[r.s] = r.price;
      }
      setServicePrices(map);
    });
  }, [lookupVehicle?.make]);

  // Fetch booked slots whenever the date changes
  useEffect(() => {
    if (!form.appointmentDate) {
      setBookedTimes([]);
      return;
    }
    setSlotsFetching(true);
    fetch(`/api/booked-slots?date=${form.appointmentDate}`)
      .then((r) => r.json())
      .then((data: { ok: boolean; bookedTimes?: string[] }) => {
        if (data.ok && data.bookedTimes) setBookedTimes(data.bookedTimes);
        else setBookedTimes([]);
      })
      .catch(() => setBookedTimes([]))
      .finally(() => setSlotsFetching(false));
  }, [form.appointmentDate]);

  function validateStep(s: number): string | null {
    if (s === 1) {
      if (form.reg.trim().length < 2) return "Please enter your registration number.";
      if (!form.serviceType) return "Please select a service.";
    }
    if (s === 2) {
      if (!form.appointmentDate) return "Please pick a date.";
      if (!form.appointmentTime) return "Please select a time slot.";
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
                onChange={(e) => {
                  update("reg", e.target.value.toUpperCase());
                  setLookupVehicle(null);
                  setLookupError(null);
                  setLogoSourceIndex(0);
                }}
                className="w-full bg-transparent py-3.5 pl-[3.5rem] pr-4 text-center text-lg font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#a89000] focus:outline-none"
              />
            </div>

            {/* Show lookup button always — hide only while auto-lookup is actively running */}
            {!(autoLookupFromHome && lookupPending) && (
              <button
                type="button"
                onClick={() => void handleVehicleLookup()}
                disabled={lookupPending}
                className="mt-3 w-full rounded-xl border border-[#101a56] bg-white px-4 py-3 text-sm font-semibold text-[#101a56] transition hover:bg-[#101a56] hover:text-white disabled:opacity-50"
              >
                {lookupPending ? "Looking up vehicle..." : "Find vehicle from reg"}
              </button>
            )}
            {autoLookupFromHome && lookupPending && (
              <p className="mt-3 text-sm text-slate-500">Looking up vehicle details...</p>
            )}
            {lookupError && (
              <p className="mt-2 text-sm text-red-600">{lookupError}</p>
            )}
            {lookupVehicle && (
              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  {activeMakeLogoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeMakeLogoUrl}
                      alt={`${lookupVehicle.make ?? "Vehicle"} logo`}
                      className="h-11 w-11 rounded-xl bg-white p-2 shadow-sm"
                      onError={() => {
                        if (logoSourceIndex < makeLogoUrls.length - 1) {
                          setLogoSourceIndex((current) => current + 1);
                        } else {
                          setLogoSourceIndex(makeLogoUrls.length);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xs font-bold uppercase text-[#101a56] shadow-sm">
                      {lookupVehicle.make?.slice(0, 2) ?? "Car"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                      Vehicle found
                    </p>
                    <p className="mt-1 text-sm font-semibold text-emerald-950">
                      {formatVehicleSummary(lookupVehicle) || lookupVehicle.registrationNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Select service</label>
            {serviceParam ? (
              <div className="rounded-xl border border-[#101a56] bg-white px-4 py-3 ring-1 ring-[#101a56]">
                <span className="text-sm font-semibold text-[#101a56]">
                  {BOOKING_SERVICES.find((s) => s.id === serviceParam)?.label ?? serviceParam}
                </span>
                {servicePrices[serviceParam] !== undefined && (
                  <span className="ml-2 text-[11px] font-semibold text-[#3f63ff]">
                    From £{servicePrices[serviceParam]}
                  </span>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {BOOKING_SERVICES.map((s) => {
                  const price = servicePrices[s.id];
                  const isSelected = form.serviceType === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update("serviceType", s.id)}
                      className={`min-h-11 rounded-xl border px-3 py-3 text-sm font-medium text-left transition ${
                        isSelected
                          ? "border-[#101a56] bg-white font-semibold text-[#101a56] ring-1 ring-[#101a56]"
                          : "border-[#d0dcea] bg-white text-slate-700 hover:border-[#9db4ff]"
                      }`}
                    >
                      <span className="block">{s.label}</span>
                      {price !== undefined && (
                        <span className={`mt-0.5 block text-[11px] font-semibold ${isSelected ? "text-[#3f63ff]" : "text-slate-400"}`}>
                          From £{price}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
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
                update("appointmentTime", "");
              }}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {slotsFetching
                ? "Checking availability…"
                : `Available slots${form.appointmentDate ? ` · ${formatSlotHeader(form.appointmentDate)}` : ""}`}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedTimes.includes(slot.time);
                const isPast = isPastSlot(form.appointmentDate, slot.time);
                const isUnavailable = !form.appointmentDate || isBooked || isPast;
                const isSelected = form.appointmentTime === slot.time;

                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={isUnavailable}
                    onClick={() => {
                      update("appointmentTime", slot.time);
                      update("slotPeriod", slot.period);
                    }}
                    className={`min-h-11 rounded-xl border py-2.5 text-sm font-semibold transition ${
                      isSelected
                        ? "border-[#101a56] bg-[#101a56] text-white"
                        : isUnavailable
                        ? "cursor-not-allowed border-[#ebebeb] bg-[#f8f8f8] text-slate-300 line-through"
                        : "border-[#d0dcea] bg-white text-slate-700 hover:border-[#101a56]"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
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

          {/* Booking summary */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 space-y-1">
            <p className="font-bold uppercase tracking-widest text-slate-400 mb-2">Your booking</p>
            <p><span className="font-semibold">Reg:</span> {form.reg}</p>
            <p><span className="font-semibold">Service:</span> {BOOKING_SERVICES.find(s => s.id === form.serviceType)?.label ?? form.serviceType}</p>
            <p><span className="font-semibold">Date:</span> {formatSlotHeader(form.appointmentDate)}</p>
            <p><span className="font-semibold">Time:</span> {form.appointmentTime}</p>
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
            {pending ? "Submitting…" : "Confirm Booking"}
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
