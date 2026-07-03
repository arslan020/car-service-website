import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/lib/site-config";
import { getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description: "Car care tips, MOT advice and news from our workshop in Hayes.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/blog" },
};

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="bg-white">
      {/* ── Hero — matches the home page gradient & centered style ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-10 pt-10 text-center sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Blog</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#020F3D] sm:text-5xl">
            Tips &amp; news <span className="text-[#0F63FF]">from the workshop</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 sm:mt-4 sm:text-lg">
            Practical car care advice, MOT tips and the latest updates from {site.name}.
          </p>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="px-4 pb-14 pt-2 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-[#e8effa] bg-white p-12 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-500">No articles published yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8effa] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F63FF]/30 hover:shadow-[0_6px_24px_rgba(15,99,255,0.1)]"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-[#eef4ff]">
                    {post.coverImageId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/blog-image/${post.coverImageId}`}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#0F63FF]/25">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                      {formatDate(post.createdAt)}
                    </p>
                    <h2 className="mt-2 text-lg font-extrabold leading-snug text-[#020F3D] transition-colors group-hover:text-[#0F63FF]">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
                    )}
                    <span className="mt-4 flex items-center justify-between border-t border-[#eef4ff] pt-4">
                      <span className="text-xs font-bold text-[#0F63FF]">Read article</span>
                      <svg className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
