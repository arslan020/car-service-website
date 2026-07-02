import { notFound } from "next/navigation";
import { getPageDef, getSections, PAGES_CONFIG } from "@/lib/pages-config";
import { getPageContent } from "@/lib/page-content";
import { PageContentEditor } from "@/components/page-content-editor";
import Link from "next/link";

const VISUAL_EDITOR_SLUGS = new Set(PAGES_CONFIG.map((p) => p.slug));

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPageDashboard({ params }: Props) {
  const { slug } = await params;
  const pageDef = getPageDef(slug);
  if (!pageDef) notFound();

  const saved = await getPageContent(slug);
  const sections = getSections(pageDef);
  const hasVisualEditor = VISUAL_EDITOR_SLUGS.has(slug);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/dashboard" className="hover:text-[#0F63FF]">Dashboard</Link>
            <span>/</span>
            <span className="font-medium text-slate-600">Edit Pages</span>
            <span>/</span>
            <span className="font-medium text-[#020F3D]">{pageDef.label}</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#020F3D]">
            {pageDef.icon} Edit — {pageDef.label}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {hasVisualEditor ? "Edit this page visually — click any text on the page to change it." : "Changes save instantly and go live on the public page."}
          </p>
        </div>
        {!hasVisualEditor && (
          <a
            href={pageDef.publicPath ?? `/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl border border-[#e0ebff] bg-white px-4 py-2 text-sm font-semibold text-[#0F63FF] shadow-sm transition hover:border-[#0F63FF] sm:flex"
          >
            View page
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>

      {/* Page tabs — other pages quick nav */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PAGES_CONFIG.map((page) => (
          <Link
            key={page.slug}
            href={`/dashboard/pages/${page.slug}`}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              page.slug === slug
                ? "bg-[#020F3D] text-white"
                : "border border-[#d0dcea] bg-white text-slate-600 hover:border-[#020F3D] hover:text-[#020F3D]"
            }`}
          >
            {page.icon} {page.label}
          </Link>
        ))}
      </div>

      {/* Editor sections */}
      {hasVisualEditor ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#e0ebff] bg-white px-6 py-16 text-center">
          <span className="text-4xl">✨</span>
          <p className="max-w-sm text-sm text-slate-500">
            This page is edited visually — see the real page design and click directly on the text you want to change.
          </p>
          <Link
            href={`/dashboard/pages/${slug}/visual`}
            className="mt-1 flex items-center gap-2 rounded-xl bg-[#0F63FF] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0a4fd6]"
          >
            ✨ Open Visual Editor
          </Link>
        </div>
      ) : (
        <PageContentEditor
          pageKey={slug}
          pageDef={pageDef}
          sections={sections}
          saved={saved}
        />
      )}
    </div>
  );
}
