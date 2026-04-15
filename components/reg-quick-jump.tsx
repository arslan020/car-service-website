"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function isValidUKReg(value: string): boolean {
  const clean = value.toUpperCase().replace(/\s/g, "");
  // UK plate formats:
  // Current (2001+):   AB12CDE
  // Prefix (1983-01):  A123BCD or A12BCD
  // Suffix (1963-83):  ABC123D or ABC12D
  // Dateless:          1234AB or AB1234
  return /^([A-Z]{2}[0-9]{2}[A-Z]{3}|[A-Z][0-9]{1,3}[A-Z]{3}|[A-Z]{3}[0-9]{1,3}[A-Z]|[0-9]{1,4}[A-Z]{1,3}|[A-Z]{1,3}[0-9]{1,4})$/.test(clean);
}

export function RegQuickJump() {
  const [reg, setReg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = reg.trim();
    if (!q) {
      setError("Please enter your registration number.");
      return;
    }
    if (!isValidUKReg(q)) {
      setError("Please enter a valid UK registration number (e.g. AB12 CDE).");
      return;
    }
    setError(null);
    router.push(`/book?reg=${encodeURIComponent(q)}&autoLookup=1`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <label htmlFor="home-reg" className="text-sm font-medium text-slate-700">
          Registration number
        </label>
        <input
          id="home-reg"
          className={`mt-1 w-full min-h-11 rounded-xl border bg-white px-3 py-2.5 text-sm text-[#101a56] shadow-sm outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-[#3f63ff]/15 ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-[#bfd1ee] focus:border-[#3f63ff]"
          }`}
          placeholder="e.g. AB12 CDE"
          value={reg}
          onChange={(e) => {
            setReg(e.target.value.toUpperCase());
            setError(null);
          }}
          autoComplete="off"
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-600">{error}</p>
        )}
      </div>
      <button
        type="submit"
        className="min-h-11 w-full rounded-xl bg-[#101a56] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto sm:shrink-0"
      >
        Start booking
      </button>
    </form>
  );
}
