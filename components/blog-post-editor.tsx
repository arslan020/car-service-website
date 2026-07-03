"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { savePostAction } from "@/app/dashboard/blog/actions";
import { RichTextEditor, compressImage, plainTextToHtml } from "@/components/rich-text-editor";

interface EditorPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageId: string | null;
  published: boolean;
}

export function BlogPostEditor({ post }: { post?: EditorPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Rich text content — older posts were stored as plain text, convert on load
  const contentRef = useRef<HTMLDivElement>(null);
  const initialHtml =
    post?.content && !/<\w+[^>]*>/.test(post.content)
      ? plainTextToHtml(post.content)
      : post?.content ?? "";

  // Cover image state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    post?.coverImageId ? `/api/blog-image/${post.coverImageId}` : null
  );
  const [removeImage, setRemoveImage] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setProcessingImage(true);
    try {
      const compressed = await compressImage(file);
      setImageFile(compressed);
      setPreview(URL.createObjectURL(compressed));
      setRemoveImage(false);
    } finally {
      setProcessingImage(false);
    }
  }

  function clearImage() {
    setImageFile(null);
    setPreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const formData = new FormData(e.currentTarget);
    if (post) formData.set("id", post.id);
    formData.set("removeImage", removeImage ? "true" : "false");
    formData.delete("image");
    if (imageFile) formData.set("image", imageFile);

    // Pull the article HTML out of the rich text editor
    const html = contentRef.current?.innerHTML ?? "";
    const hasText = (contentRef.current?.textContent ?? "").trim().length > 0;
    const hasImage = /<img\s/i.test(html);
    if (!hasText && !hasImage) {
      setError("Please add some content.");
      return;
    }
    formData.set("content", html);

    startTransition(async () => {
      const res = await savePostAction(formData);
      if (!res.ok) {
        setError(res.message ?? "Failed to save.");
        return;
      }
      if (post) {
        setSaved(true);
        router.refresh();
      } else {
        router.push("/dashboard/blog");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
        <label htmlFor="post-title" className="mb-1.5 block text-sm font-semibold text-[#020F3D]">
          Title
        </label>
        <input
          id="post-title"
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ""}
          placeholder="e.g. 5 signs your brakes need checking"
          className="w-full rounded-xl border border-[#e0ebff] px-4 py-2.5 text-sm text-[#020F3D] outline-none transition focus:border-[#0F63FF] focus:ring-2 focus:ring-[#0F63FF]/15"
        />
      </div>

      {/* Cover image */}
      <div className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
        <label className="mb-1.5 block text-sm font-semibold text-[#020F3D]">Cover image</label>
        <p className="mb-3 text-xs text-slate-400">Shown at the top of the post and on the blog page. JPG, PNG or WebP.</p>

        {preview ? (
          <div className="relative overflow-hidden rounded-xl border border-[#e0ebff]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Cover preview" className="h-56 w-full object-cover" />
            <div className="absolute right-3 top-3 flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#020F3D] shadow transition hover:bg-white"
              >
                Change
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-red-500 shadow transition hover:bg-white"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#cfe0ff] bg-[#f8fbff] text-slate-400 transition hover:border-[#0F63FF] hover:text-[#0F63FF]"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="text-sm font-medium">
              {processingImage ? "Processing image…" : "Click to upload an image"}
            </span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Excerpt */}
      <div className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
        <label htmlFor="post-excerpt" className="mb-1.5 block text-sm font-semibold text-[#020F3D]">
          Short summary <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <p className="mb-3 text-xs text-slate-400">A sentence or two shown on the blog listing page under the title.</p>
        <textarea
          id="post-excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          placeholder="e.g. Squeaking, grinding or a soft pedal? Here's what your car is trying to tell you."
          className="w-full resize-y rounded-xl border border-[#e0ebff] px-4 py-2.5 text-sm text-[#020F3D] outline-none transition focus:border-[#0F63FF] focus:ring-2 focus:ring-[#0F63FF]/15"
        />
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
        <label className="mb-1.5 block text-sm font-semibold text-[#020F3D]">Content</label>
        <p className="mb-3 text-xs text-slate-400">
          Select text and use the toolbar to format it — bold, headings, lists — or insert pictures between paragraphs.
        </p>
        <RichTextEditor editorRef={contentRef} initialHtml={initialHtml} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#020F3D]">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 rounded border-[#cfe0ff] accent-[#0F63FF]"
          />
          Published (visible on the website)
        </label>

        <div className="ml-auto flex items-center gap-3">
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          {saved && !error && <p className="text-sm font-medium text-emerald-600">Saved ✓</p>}
          <Link
            href="/dashboard/blog"
            className="rounded-xl border border-[#e0ebff] px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-[#eef4ff]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending || processingImage}
            className="rounded-xl bg-[#0F63FF] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving…" : post ? "Save changes" : "Publish post"}
          </button>
        </div>
      </div>
    </form>
  );
}
