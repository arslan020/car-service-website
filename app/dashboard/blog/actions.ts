"use server";

import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/app/login/actions";
import { getPostById, slugify } from "@/lib/blog";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB (images are compressed client-side first)
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function newId() {
  return randomBytes(12).toString("hex");
}

function revalidateBlogRoutes(slug?: string) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/dashboard/blog");
}

async function storeImage(file: File): Promise<string> {
  const buf = Buffer.from(await file.arrayBuffer());
  const id = newId();
  await prisma.$executeRaw`
    INSERT INTO "BlogImage" ("id", "mimeType", "data")
    VALUES (${id}, ${file.type}, ${buf})
  `;
  return id;
}

async function deleteImage(id: string) {
  await prisma.$executeRaw`DELETE FROM "BlogImage" WHERE "id" = ${id}`;
}

/** Image ids referenced inside article HTML (inserted via the editor toolbar). */
function contentImageIds(html: string): string[] {
  return [...html.matchAll(/\/api\/blog-image\/([a-zA-Z0-9]+)/g)].map((m) => m[1]);
}

/**
 * Light sanitisation of editor HTML. Content is only written by logged-in
 * admins, so this just strips the dangerous stuff and pasted-in styling junk.
 */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed|form)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:style|class)\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, "");
}

/** Find a slug that isn't taken yet (winter-tyres, winter-tyres-2, ...). */
async function uniqueSlug(title: string, excludePostId?: string): Promise<string> {
  const base = slugify(title);
  for (let i = 0; i < 20; i++) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const rows = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT "id" FROM "BlogPost" WHERE "slug" = ${candidate} LIMIT 1
    `;
    if (rows.length === 0 || rows[0].id === excludePostId) return candidate;
  }
  return `${base}-${newId().slice(0, 6)}`;
}

export interface SavePostResult {
  ok: boolean;
  message?: string;
  id?: string;
}

/** Create or update a blog post. Pass `id` in formData to update. */
export async function savePostAction(formData: FormData): Promise<SavePostResult> {
  const session = await getSession();
  if (!session) return { ok: false, message: "Not authorised." };

  const id = ((formData.get("id") as string) ?? "").trim();
  const title = ((formData.get("title") as string) ?? "").trim();
  const excerpt = ((formData.get("excerpt") as string) ?? "").trim();
  const content = sanitizeHtml(((formData.get("content") as string) ?? "").trim());
  const published = formData.get("published") === "on";
  const removeImage = formData.get("removeImage") === "true";
  const image = formData.get("image");

  if (!title) return { ok: false, message: "Please add a title." };
  if (!content) return { ok: false, message: "Please add some content." };

  let newImageId: string | null = null;
  if (image instanceof File && image.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return { ok: false, message: "Image must be a JPG, PNG or WebP." };
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return { ok: false, message: "Image is too large (max 4MB)." };
    }
  }

  try {
    if (image instanceof File && image.size > 0) {
      newImageId = await storeImage(image);
    }

    if (id) {
      // ── Update ──
      const existing = await getPostById(id);
      if (!existing) return { ok: false, message: "Post not found." };

      const coverImageId = newImageId ?? (removeImage ? null : existing.coverImageId);

      await prisma.$executeRaw`
        UPDATE "BlogPost"
        SET "title" = ${title}, "excerpt" = ${excerpt}, "content" = ${content},
            "coverImageId" = ${coverImageId}, "published" = ${published}, "updatedAt" = NOW()
        WHERE "id" = ${id}
      `;

      // Clean up the replaced/removed cover image
      if (existing.coverImageId && (newImageId || removeImage)) {
        await deleteImage(existing.coverImageId);
      }

      // Clean up article images that were removed from the content
      const keptIds = new Set(contentImageIds(content));
      for (const imgId of contentImageIds(existing.content)) {
        if (!keptIds.has(imgId)) {
          try { await deleteImage(imgId); } catch {}
        }
      }

      revalidateBlogRoutes(existing.slug);
      return { ok: true, id };
    }

    // ── Create ──
    const postId = newId();
    const slug = await uniqueSlug(title);
    await prisma.$executeRaw`
      INSERT INTO "BlogPost" ("id", "slug", "title", "excerpt", "content", "coverImageId", "published", "updatedAt")
      VALUES (${postId}, ${slug}, ${title}, ${excerpt}, ${content}, ${newImageId}, ${published}, NOW())
    `;

    revalidateBlogRoutes(slug);
    return { ok: true, id: postId };
  } catch (e) {
    console.error("savePostAction error:", e);
    // Don't leave an orphaned image behind if the post write failed
    if (newImageId) {
      try { await deleteImage(newImageId); } catch {}
    }
    return { ok: false, message: "Failed to save. Please try again." };
  }
}

/** Upload an image inserted inside the article content; returns its public URL. */
export async function uploadContentImageAction(
  formData: FormData
): Promise<{ ok: boolean; message?: string; url?: string }> {
  const session = await getSession();
  if (!session) return { ok: false, message: "Not authorised." };

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return { ok: false, message: "No image provided." };
  }
  if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
    return { ok: false, message: "Image must be a JPG, PNG or WebP." };
  }
  if (image.size > MAX_IMAGE_BYTES) {
    return { ok: false, message: "Image is too large (max 4MB)." };
  }

  try {
    const imageId = await storeImage(image);
    return { ok: true, url: `/api/blog-image/${imageId}` };
  } catch (e) {
    console.error("uploadContentImageAction error:", e);
    return { ok: false, message: "Failed to upload image." };
  }
}

export async function deletePostAction(id: string): Promise<{ ok: boolean }> {
  const session = await getSession();
  if (!session) return { ok: false };

  try {
    const existing = await getPostById(id);
    if (!existing) return { ok: true };

    await prisma.$executeRaw`DELETE FROM "BlogPost" WHERE "id" = ${id}`;
    if (existing.coverImageId) await deleteImage(existing.coverImageId);
    for (const imgId of contentImageIds(existing.content)) {
      try { await deleteImage(imgId); } catch {}
    }

    revalidateBlogRoutes(existing.slug);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
