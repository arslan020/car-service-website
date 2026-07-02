"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { savePageField } from "@/app/dashboard/pages/[slug]/actions";

interface EditableTextProps {
  pageKey: string;
  fieldKey: string;
  value: string;
  type?: "text" | "textarea";
  editable?: boolean;
  className?: string;
}

/**
 * Renders text as plain content when `editable` is false (public site).
 * When `editable` is true (dashboard visual editor), clicking the text opens
 * an inline popup that saves straight to PageContent via `savePageField`.
 */
export function EditableText({
  pageKey,
  fieldKey,
  value,
  type = "text",
  editable = false,
  className,
}: EditableTextProps) {
  const [current, setCurrent] = useState(value);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  if (!editable) {
    return <span className={className}>{current}</span>;
  }

  function openEditor(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = 320;
      const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
      setPos({ top: rect.bottom + 8, left });
    }
    setDraft(current);
    setError(false);
    setOpen(true);
  }

  async function handleSave() {
    const trimmed = draft.trim();
    if (trimmed === current) {
      setOpen(false);
      return;
    }
    setSaving(true);
    const res = await savePageField(pageKey, fieldKey, trimmed);
    setSaving(false);
    if (res.ok) {
      setCurrent(trimmed);
      setOpen(false);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <span
        ref={triggerRef}
        onClick={openEditor}
        className={`${className ?? ""} cursor-text rounded outline-dashed outline-1 outline-transparent transition-colors hover:bg-[#0f63ff17] hover:outline-[#0F63FF]`}
      >
        {current}
      </span>
      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[100]" onClick={() => setOpen(false)} />
            <div
              className="fixed z-[101] w-80 rounded-xl border border-[#e0ebff] bg-white p-3 shadow-2xl"
              style={{ top: pos.top, left: pos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              {type === "textarea" ? (
                <textarea
                  autoFocus
                  rows={3}
                  className="w-full rounded-lg border border-[#d0dcea] p-2 text-sm text-[#020F3D] focus:border-[#0F63FF] focus:outline-none"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpen(false);
                  }}
                />
              ) : (
                <input
                  autoFocus
                  className="w-full rounded-lg border border-[#d0dcea] p-2 text-sm text-[#020F3D] focus:border-[#0F63FF] focus:outline-none"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") setOpen(false);
                  }}
                />
              )}
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-[11px] text-red-500">{error ? "Save failed" : ""}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-[#020F3D] px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
