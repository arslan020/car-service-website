import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogDeleteButton } from "@/components/blog-delete-button";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function DashboardBlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#020F3D]">Blog</h1>
          <p className="mt-0.5 text-sm text-slate-500">Write and manage articles shown on your website&apos;s blog page.</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0F63FF] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-[#e0ebff] bg-white p-10 text-center shadow-sm">
          <svg className="mx-auto h-10 w-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 18.549 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <p className="mt-3 text-sm font-medium text-slate-500">No blog posts yet</p>
          <p className="mt-1 text-xs text-slate-400">Click &quot;New post&quot; to write your first article.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e0ebff] bg-white shadow-sm">
          <ul className="divide-y divide-[#eef4ff]">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center gap-4 px-5 py-4">
                {/* Thumbnail */}
                <div className="hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f4f8ff] sm:block">
                  {post.coverImageId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/api/blog-image/${post.coverImageId}`} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Title + meta */}
                <div className="min-w-0 flex-1">
                  <Link href={`/dashboard/blog/${post.id}`} className="block truncate text-sm font-semibold text-[#020F3D] hover:text-[#0F63FF]">
                    {post.title}
                  </Link>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                    <span>{formatDate(post.createdAt)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        post.published ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1.5">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="hidden rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#020F3D] sm:block"
                    >
                      View
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/blog/${post.id}`}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#0F63FF] transition hover:bg-[#eef4ff]"
                  >
                    Edit
                  </Link>
                  <BlogDeleteButton postId={post.id} title={post.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
