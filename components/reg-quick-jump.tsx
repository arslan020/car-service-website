"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegQuickJump() {
  const [reg, setReg] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = reg.trim();
    if (q) router.push(`/book?reg=${encodeURIComponent(q)}`);
    else router.push("/book");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <label htmlFor="home-reg" className="text-sm font-medium text-slate-700">
          Registration number
        </label>
        <input
          id="home-reg"
          className="mt-1 w-full min-h-11 rounded-xl border border-[#bfd1ee] bg-white px-3 py-2.5 text-sm text-[#101a56] shadow-sm outline-none placeholder:text-slate-400 focus:border-[#3f63ff] focus:ring-4 focus:ring-[#3f63ff]/15"
          placeholder="e.g. AB12 CDE"
          value={reg}
          onChange={(e) => setReg(e.target.value)}
          autoComplete="off"
        />
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
