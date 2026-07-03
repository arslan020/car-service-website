import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAllPosts } from "@/lib/blog";
import { PAGES_CONFIG } from "@/lib/pages-config";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

async function getSavedEditsCount(): Promise<number> {
  try {
    const rows = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) AS count FROM "PageContent"
    `;
    return Number(rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

export default async function DashboardPage() {
  const [posts, savedEdits] = await Promise.all([getAllPosts(), getSavedEditsCount()]);
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;
  const recentPosts = posts.slice(0, 4);

  const stats = [
    {
      label: "Website pages",
      value: PAGES_CONFIG.length,
      sub: "editable via Edit Pages",
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    },
    {
      label: "Blog posts",
      value: publishedCount,
      sub: draftCount > 0 ? `published · ${draftCount} draft${draftCount > 1 ? "s" : ""}` : "published",
      icon: "M16.862 4.487 18.549 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
    },
    {
      label: "Saved content edits",
      value: savedEdits,
      sub: "custom text on your pages",
      icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z",
    },
  ];

  const actions = [
    {
      href: "/dashboard/blog/new",
      title: "Write a blog post",
      desc: "Publish a new article with photos",
      icon: "M12 4.5v15m7.5-7.5h-15",
      primary: true,
    },
    {
      href: "/dashboard/pages/home",
      title: "Edit pages",
      desc: "Update text on any page of the site",
      icon: "M16.862 4.487 18.549 2.8a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125",
      primary: false,
    },
    {
      href: "/",
      title: "View live website",
      desc: "See what your visitors see",
      icon: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
      primary: false,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#020F3D]">Overview</h1>
        <p className="mt-0.5 text-sm text-slate-500">Welcome back — manage your website content below.</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </span>
              <div>
                <p className="text-2xl font-extrabold leading-none text-[#020F3D]">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400">
                  <span className="font-semibold text-slate-500">{s.label}</span> — {s.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick actions ── */}
      <p className="mb-2 mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick actions</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`group flex items-center gap-3.5 rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
              a.primary
                ? "border-[#0F63FF] bg-[#0F63FF] text-white hover:bg-[#1E6BFF]"
                : "border-[#e0ebff] bg-white hover:border-[#0F63FF]/30"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                a.primary ? "bg-white/15 text-white" : "bg-[#eef4ff] text-[#0F63FF] transition group-hover:bg-[#0F63FF] group-hover:text-white"
              }`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
              </svg>
            </span>
            <span>
              <span className={`block text-sm font-bold ${a.primary ? "text-white" : "text-[#020F3D]"}`}>{a.title}</span>
              <span className={`block text-xs ${a.primary ? "text-blue-100" : "text-slate-400"}`}>{a.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* ── Recent blog posts ── */}
      <div className="mb-2 mt-8 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recent blog posts</p>
        {posts.length > 0 && (
          <Link href="/dashboard/blog" className="text-xs font-semibold text-[#0F63FF] hover:text-[#020F3D]">
            View all
          </Link>
        )}
      </div>
      {recentPosts.length === 0 ? (
        <div className="rounded-2xl border border-[#e0ebff] bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">No blog posts yet</p>
          <Link
            href="/dashboard/blog/new"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0F63FF] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF]"
          >
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e0ebff] bg-white shadow-sm">
          <ul className="divide-y divide-[#eef4ff]">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/dashboard/blog/${post.id}`} className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-[#f8fbff]">
                  <div className="hidden h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f4f8ff] sm:block">
                    {post.coverImageId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/blog-image/${post.coverImageId}`} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#020F3D]">{post.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{formatDate(post.createdAt)}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      post.published ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Bookings note ── */}
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#e0ebff] bg-[#f8fbff] px-5 py-4">
        <svg className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-600">Bookings are managed through Motasoft</span> — this dashboard is for website content and the blog.
        </p>
      </div>
    </div>
  );
}
