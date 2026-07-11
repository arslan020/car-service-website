import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, waUrl } from "@/lib/site-config";
import { getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return { title: `Blog | ${site.name}` };

  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt || `${post.title} — car care advice from ${site.name}.`,
    alternates: { canonical: `https://www.mariestonservicecentre.co.uk/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      ...(post.coverImageId
        ? { images: [{ url: `https://www.mariestonservicecentre.co.uk/api/blog-image/${post.coverImageId}` }] }
        : {}),
    },
  };
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Render article content. Posts written with the rich text editor are stored
 * as HTML; older posts are plain text ("## " headings + blank-line paragraphs).
 */
function ArticleBody({ content }: { content: string }) {
  if (/<\w+[^>]*>/.test(content)) {
    return (
      <div
        className="text-[15px] leading-relaxed text-slate-500 sm:text-base
          [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-[#020F3D] sm:[&_h2]:text-2xl
          [&_p]:mb-4
          [&_strong]:font-bold [&_strong]:text-[#020F3D] [&_b]:font-bold [&_b]:text-[#020F3D]
          [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_li]:mb-1.5
          [&_img]:my-5 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-[#e8effa] [&_img]:shadow-sm
          [&_a]:font-semibold [&_a]:text-[#0F63FF] [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const blocks = content.split(/\r?\n\s*\r?\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-2 text-xl font-extrabold tracking-tight text-[#020F3D] sm:text-2xl">
              {block.slice(3).trim()}
            </h2>
          );
        }
        return (
          <p key={i} className="text-[15px] leading-relaxed text-slate-500 sm:text-base">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="bg-white">
      {/* ── Hero — matches the home page gradient & centered style ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-8 pt-10 text-center sm:pb-10 sm:pt-14">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d0dcea] bg-white px-4 py-2 shadow-sm transition hover:border-[#0F63FF]/40 hover:shadow-md"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff]">
              <svg className="h-3.5 w-3.5 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-slate-600">All articles</span>
          </Link>

          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">{formatDate(post.createdAt)}</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#020F3D] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 sm:mt-4 sm:text-lg">{post.excerpt}</p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-14 sm:pb-16">
        {post.coverImageId && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-[#e8effa] shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/blog-image/${post.coverImageId}`}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <ArticleBody content={post.content} />

        {/* ── Bottom CTA — same dark navy panel used across service pages ── */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Book online</p>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Need help with your car?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Book your MOT, service or repair online in minutes — or message us and we&apos;ll sort it for you.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/online-booking"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto"
            >
              Book now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a
              href={waUrl("Hi, I've just read your blog and need some help with my car.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              WhatsApp us
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF] sm:w-auto"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
