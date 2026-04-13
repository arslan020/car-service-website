"use client";

import { useState } from "react";
import type { PageDef, FieldDef } from "@/lib/pages-config";
import { savePageField, resetPageField } from "@/app/dashboard/pages/[slug]/actions";

type Status = "idle" | "saving" | "saved" | "error";

function FieldRow({
  pageKey,
  field,
  initialValue,
}: {
  pageKey: string;
  field: FieldDef;
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<Status>("idle");
  const hasChanged = value !== initialValue;
  const isSavedToDB = initialValue !== field.default;

  async function handleSave() {
    if (!value.trim()) return;
    setStatus("saving");
    const res = await savePageField(pageKey, field.key, value.trim());
    if (res.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  async function handleReset() {
    setStatus("saving");
    await resetPageField(pageKey, field.key);
    setValue(field.default);
    setStatus("idle");
  }

  return (
    <div className="border-b border-[#f0f5ff] py-5 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-[#101a56]">
              {field.label}
            </label>
            {isSavedToDB && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                Custom
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            Default: &ldquo;{field.default.slice(0, 80)}{field.default.length > 80 ? "…" : ""}&rdquo;
          </p>
        </div>
      </div>

      <div className="mt-3">
        {field.type === "textarea" ? (
          <textarea
            rows={3}
            value={value}
            onChange={(e) => { setValue(e.target.value); setStatus("idle"); }}
            className="w-full rounded-xl border border-[#d0dcea] bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/15"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setStatus("idle"); }}
            className="w-full rounded-xl border border-[#d0dcea] bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/15"
          />
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handleSave}
          disabled={status === "saving" || (!hasChanged && status === "idle")}
          className={`rounded-lg px-4 py-1.5 text-xs font-bold transition disabled:opacity-40 ${
            status === "saved"
              ? "bg-emerald-500 text-white"
              : status === "error"
              ? "bg-red-500 text-white"
              : "bg-[#101a56] text-white hover:bg-[#16236e]"
          }`}
        >
          {status === "saving"
            ? "Saving…"
            : status === "saved"
            ? "✓ Saved"
            : status === "error"
            ? "Failed — retry"
            : "Save"}
        </button>

        {isSavedToDB && (
          <button
            onClick={handleReset}
            disabled={status === "saving"}
            className="text-xs text-slate-400 underline underline-offset-2 hover:text-red-500 disabled:opacity-40"
          >
            Reset to default
          </button>
        )}
      </div>
    </div>
  );
}

export function PageContentEditor({
  pageKey,
  pageDef,
  sections,
  saved,
}: {
  pageKey: string;
  pageDef: PageDef;
  sections: string[];
  saved: Record<string, string>;
}) {
  return (
    <div className="space-y-5">
      {sections.map((section) => {
        const sectionFields = pageDef.fields.filter((f) => f.section === section);
        return (
          <div
            key={section}
            className="overflow-hidden rounded-2xl border border-[#e0ebff] bg-white shadow-sm"
          >
            {/* Section header */}
            <div className="border-b border-[#e0ebff] bg-[#f8faff] px-6 py-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">
                {section}
              </h2>
            </div>

            {/* Fields */}
            <div className="px-6">
              {sectionFields.map((field) => (
                <FieldRow
                  key={field.key}
                  pageKey={pageKey}
                  field={field}
                  initialValue={saved[field.key] ?? field.default}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Info footer */}
      <div className="rounded-2xl border border-[#e8f0fb] bg-[#f4f8ff] px-5 py-4">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-[#101a56]">How it works:</span> Click{" "}
          <strong>Save</strong> on any field to update it live on the public page.
          Click <strong>Reset to default</strong> to restore the original text.
          Fields marked <span className="font-bold text-emerald-600">Custom</span> have
          been overridden and are live.
        </p>
      </div>
    </div>
  );
}
