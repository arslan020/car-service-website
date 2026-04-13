"use client";

import { useState } from "react";
import { deleteBooking } from "@/app/dashboard/actions";

export function DeleteBookingButton({ id, reference }: { id: string; reference: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setPending(true);
    setError(null);
    const res = await deleteBooking(id);
    if (!res.ok) {
      setError(res.message ?? "Delete failed.");
      setPending(false);
      setConfirming(false);
    }
    // On success the page revalidates and row disappears automatically
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1.5">
        <span className="text-xs text-slate-500">Delete {reference}?</span>
        <button
          onClick={handleDelete}
          disabled={pending}
          className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {pending ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          onClick={() => { setConfirming(false); setError(null); }}
          disabled={pending}
          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}
