"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePostAction } from "@/app/dashboard/blog/actions";

export function BlogDeleteButton({ postId, title }: { postId: string; title: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await deletePostAction(postId);
      setConfirming(false);
      router.refresh();
    });
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
        >
          {isPending ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="rounded-lg border border-[#e0ebff] px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-[#eef4ff]"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${title}`}
      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
    >
      Delete
    </button>
  );
}
