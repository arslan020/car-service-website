// Server-side helpers for reading/writing page content.
// Uses raw SQL to avoid Prisma client regeneration requirement.

import { prisma } from "./prisma";
import { getPageDef } from "./pages-config";

export type ContentMap = Record<string, string>;

/**
 * Fetch all field values for a page from the DB.
 * Returns a map of { fieldKey: value }.
 * Falls back to an empty object (callers use defaults from pages-config).
 */
export async function getPageContent(pageKey: string): Promise<ContentMap> {
  try {
    const rows = await prisma.$queryRaw<Array<{ fieldKey: string; value: string }>>`
      SELECT "fieldKey", "value"
      FROM "PageContent"
      WHERE "pageKey" = ${pageKey}
    `;
    return Object.fromEntries(rows.map((r) => [r.fieldKey, r.value]));
  } catch {
    return {};
  }
}

/**
 * Convenience: get a single field value with a fallback to the configured default.
 */
export function f(content: ContentMap, key: string, fallback: string): string {
  return content[key] !== undefined ? content[key] : fallback;
}

/**
 * Get content map for a page with defaults pre-filled.
 * Keys from pages-config will always be present.
 */
export async function getPageContentWithDefaults(pageKey: string): Promise<ContentMap> {
  const pageDef = getPageDef(pageKey);
  const saved = await getPageContent(pageKey);

  const result: ContentMap = {};
  for (const field of pageDef?.fields ?? []) {
    result[field.key] = saved[field.key] ?? field.default;
  }
  return result;
}
