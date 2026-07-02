import Link from "next/link";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { HomePageClient } from "@/components/home-page-client";

export default async function HomeVisualEditorPage() {
  const content = await getPageContentWithDefaults("home");

  return (
    <div className="-m-6 min-h-screen bg-white lg:-m-8">
      <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-[#e0ebff] bg-[#020F3D] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/pages/home" className="text-sm font-semibold text-white/70 hover:text-white">
            ← Back to editor
          </Link>
          <span className="hidden text-white/30 sm:inline">|</span>
          <span className="text-sm font-bold">🏠 Visual Editor — Homepage</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-white/60 sm:inline">Click any highlighted text to edit it</span>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
          >
            View live page ↗
          </a>
        </div>
      </div>
      <HomePageClient content={content} editable />
    </div>
  );
}
