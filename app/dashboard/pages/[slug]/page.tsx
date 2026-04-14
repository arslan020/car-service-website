import { notFound } from "next/navigation";
import { getPageDef, getSections } from "@/lib/pages-config";
import { getPageContent } from "@/lib/page-content";
import { PageContentEditor } from "@/components/page-content-editor";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPageDashboard({ params }: Props) {
  const { slug } = await params;
  const pageDef = getPageDef(slug);
  if (!pageDef) notFound();

  const saved = await getPageContent(slug);
  const sections = getSections(pageDef);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/dashboard" className="hover:text-[#3f63ff]">Dashboard</Link>
            <span>/</span>
            <span className="font-medium text-slate-600">Edit Pages</span>
            <span>/</span>
            <span className="font-medium text-[#101a56]">{pageDef.label}</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#101a56]">
            {pageDef.icon} Edit — {pageDef.label}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Changes save instantly and go live on the public page.
          </p>
        </div>
        <a
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-xl border border-[#e0ebff] bg-white px-4 py-2 text-sm font-semibold text-[#3f63ff] shadow-sm transition hover:border-[#3f63ff] sm:flex"
        >
          View page
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

      {/* Page tabs — other pages quick nav */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {["services", "mot", "car-servicing", "repairs", "contact"].map((s) => {
          const def = getPageDef(s);
          if (!def) return null;
          return (
            <Link
              key={s}
              href={`/dashboard/pages/${s}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                s === slug
                  ? "bg-[#101a56] text-white"
                  : "border border-[#d0dcea] bg-white text-slate-600 hover:border-[#101a56] hover:text-[#101a56]"
              }`}
            >
              {def.label}
            </Link>
          );
        })}
      </div>

      {/* Editor sections */}
      <PageContentEditor
        pageKey={slug}
        pageDef={pageDef}
        sections={sections}
        saved={saved}
      />
    </div>
  );
}
