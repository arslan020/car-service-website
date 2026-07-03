// Server-side helpers for blog posts.
// Uses raw SQL to avoid Prisma client regeneration requirement (same as page-content.ts).

import { prisma } from "./prisma";

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageId: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** All posts, newest first — for the dashboard list. */
export async function getAllPosts(): Promise<BlogPostRow[]> {
  try {
    return await prisma.$queryRaw<BlogPostRow[]>`
      SELECT "id", "slug", "title", "excerpt", "content", "coverImageId", "published", "createdAt", "updatedAt"
      FROM "BlogPost"
      ORDER BY "createdAt" DESC
    `;
  } catch {
    return [];
  }
}

/** Published posts, newest first — for the public /blog page. */
export async function getPublishedPosts(): Promise<BlogPostRow[]> {
  try {
    return await prisma.$queryRaw<BlogPostRow[]>`
      SELECT "id", "slug", "title", "excerpt", "content", "coverImageId", "published", "createdAt", "updatedAt"
      FROM "BlogPost"
      WHERE "published" = true
      ORDER BY "createdAt" DESC
    `;
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostRow | null> {
  try {
    const rows = await prisma.$queryRaw<BlogPostRow[]>`
      SELECT "id", "slug", "title", "excerpt", "content", "coverImageId", "published", "createdAt", "updatedAt"
      FROM "BlogPost"
      WHERE "slug" = ${slug}
      LIMIT 1
    `;
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPostById(id: string): Promise<BlogPostRow | null> {
  try {
    const rows = await prisma.$queryRaw<BlogPostRow[]>`
      SELECT "id", "slug", "title", "excerpt", "content", "coverImageId", "published", "createdAt", "updatedAt"
      FROM "BlogPost"
      WHERE "id" = ${id}
      LIMIT 1
    `;
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

/** Turn a title into a URL slug, e.g. "Winter Tyre Tips!" -> "winter-tyre-tips". */
export function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 80) || "post";
}
