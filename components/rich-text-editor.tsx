"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { uploadContentImageAction } from "@/app/dashboard/blog/actions";

/** Resize/compress an image in the browser so uploads stay small. */
export async function compressImage(file: File): Promise<File> {
  // Skip small files that are already fine
  if (file.size < 300 * 1024) return file;

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;

  const MAX_WIDTH = 1600;
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85)
  );
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

/** Convert legacy plain-text content ("## heading" + blank-line paragraphs) to HTML. */
export function plainTextToHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) =>
      block.startsWith("## ")
        ? `<h2>${esc(block.slice(3).trim())}</h2>`
        : `<p>${esc(block).replace(/\r?\n/g, "<br>")}</p>`
    )
    .join("");
}

function ToolbarButton({
  label,
  active,
  onAction,
  children,
}: {
  label: string;
  active?: boolean;
  onAction: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      // preventDefault keeps the text selection in the editor while clicking
      onMouseDown={(e) => e.preventDefault()}
      onClick={onAction}
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition ${
        active
          ? "bg-[#020F3D] text-white"
          : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  editorRef,
  initialHtml,
}: {
  editorRef: RefObject<HTMLDivElement | null>;
  initialHtml: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [states, setStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    ol: false,
    ul: false,
    h2: false,
  });

  // Make the div editable and load the initial content once on mount.
  // Done imperatively (not via props) so React never re-touches the DOM
  // while the user is typing.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.contentEditable = "true";
    if (editor.innerHTML !== initialHtml) editor.innerHTML = initialHtml;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track formatting state of the current selection to highlight toolbar buttons
  useEffect(() => {
    function update() {
      const editor = editorRef.current;
      const sel = window.getSelection();
      if (!editor || !sel || !sel.anchorNode || !editor.contains(sel.anchorNode)) return;
      savedRange.current = sel.rangeCount ? sel.getRangeAt(0) : null;
      try {
        setStates({
          bold: document.queryCommandState("bold"),
          italic: document.queryCommandState("italic"),
          underline: document.queryCommandState("underline"),
          ol: document.queryCommandState("insertOrderedList"),
          ul: document.queryCommandState("insertUnorderedList"),
          h2: /^h2$/i.test(document.queryCommandValue("formatBlock")),
        });
      } catch {
        /* queryCommandState can throw in some browsers */
      }
    }
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, [editorRef]);

  function exec(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  }

  function toggleHeading() {
    exec("formatBlock", states.h2 ? "<p>" : "<h2>");
  }

  function restoreSelection() {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    if (sel && savedRange.current && editor.contains(savedRange.current.startContainer)) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  }

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadError(null);
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.set("image", compressed);
      const res = await uploadContentImageAction(formData);
      if (!res.ok || !res.url) {
        setUploadError(res.message ?? "Failed to upload image.");
        return;
      }
      restoreSelection();
      document.execCommand("insertImage", false, res.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#e0ebff] transition focus-within:border-[#0F63FF] focus-within:ring-2 focus-within:ring-[#0F63FF]/15">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#e0ebff] bg-[#f8fbff] px-2 py-1.5">
        <ToolbarButton label="Bold" active={states.bold} onAction={() => exec("bold")}>
          <span className="font-extrabold">B</span>
        </ToolbarButton>
        <ToolbarButton label="Italic" active={states.italic} onAction={() => exec("italic")}>
          <span className="font-serif italic">I</span>
        </ToolbarButton>
        <ToolbarButton label="Underline" active={states.underline} onAction={() => exec("underline")}>
          <span className="underline">U</span>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#e0ebff]" />

        <ToolbarButton label="Heading" active={states.h2} onAction={toggleHeading}>
          <span className="text-xs font-extrabold">H2</span>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#e0ebff]" />

        <ToolbarButton label="Numbered list" active={states.ol} onAction={() => exec("insertOrderedList")}>
          <svg className="h-4.5 w-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6h12M8.25 12h12M8.25 18h12M3.75 6h.008v.008H3.75V6zm0-2.25h1.5v4.5m-1.5 5.25h2.25l-2.25 3h2.25" />
          </svg>
        </ToolbarButton>
        <ToolbarButton label="Bullet list" active={states.ul} onAction={() => exec("insertUnorderedList")}>
          <svg className="h-4.5 w-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#e0ebff]" />

        <ToolbarButton
          label="Insert picture"
          onAction={() => {
            // remember where the cursor was before the file dialog steals focus
            const sel = window.getSelection();
            if (sel && sel.rangeCount) savedRange.current = sel.getRangeAt(0);
            fileInputRef.current?.click();
          }}
        >
          {uploading ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="h-4.5 w-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Z" />
            </svg>
          )}
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#e0ebff]" />

        <ToolbarButton label="Undo" onAction={() => exec("undo")}>
          <svg className="h-4.5 w-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </ToolbarButton>
        <ToolbarButton label="Redo" onAction={() => exec("redo")}>
          <svg className="h-4.5 w-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
          </svg>
        </ToolbarButton>

        {uploadError && <span className="ml-2 text-xs font-medium text-red-500">{uploadError}</span>}
      </div>

      {/* ── Editable area — contentEditable + initial HTML are applied
             imperatively on mount so React never interferes with typing ── */}
      <div
        ref={editorRef}
        suppressHydrationWarning
        className="min-h-[380px] w-full bg-white px-4 py-3 text-sm leading-relaxed text-[#020F3D] outline-none
          [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[#020F3D]
          [&_p]:mb-3
          [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6
          [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6
          [&_li]:mb-1
          [&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-xl
          [&_a]:text-[#0F63FF] [&_a]:underline"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImagePick}
        className="hidden"
      />
    </div>
  );
}
