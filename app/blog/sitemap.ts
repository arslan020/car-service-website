import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

const SITE_URL = "https://www.mariestonservicecentre.co.uk";

// Always generated fresh so posts published from the dashboard appear
// in the sitemap immediately, without needing a redeploy.
export const dynamic = "force-dynamic";

// Served at /blog/sitemap.xml — listed in robots.txt via next-sitemap.config.js
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts[0]?.updatedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
