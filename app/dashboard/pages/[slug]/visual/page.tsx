import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageDef } from "@/lib/pages-config";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { buildCarServicingTiers, buildCarServicingBenefits } from "@/lib/car-servicing-content";
import { HomePageClient } from "@/components/home-page-client";
import { CarServicingPageClient } from "@/components/car-servicing-page-client";
import { ServicesPageClient } from "@/components/services-page-client";
import { MotPageClient } from "@/components/mot-page-client";
import { FaqsPageClient } from "@/components/faqs-page-client";
import { DiagnosticsPageClient } from "@/components/diagnostics-page-client";
import { RepairsPageClient } from "@/components/repairs-page-client";
import { ContactPageClient } from "@/components/contact-page-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VisualEditorPage({ params }: Props) {
  const { slug } = await params;
  const pageDef = getPageDef(slug);
  if (!pageDef) notFound();

  const content = await getPageContentWithDefaults(slug);

  let body: React.ReactNode;
  switch (slug) {
    case "home":
      body = <HomePageClient content={content} editable />;
      break;
    case "car-servicing":
      body = (
        <CarServicingPageClient
          content={content}
          tiers={buildCarServicingTiers(content)}
          benefits={buildCarServicingBenefits(content)}
          editable
        />
      );
      break;
    case "services":
      body = <ServicesPageClient content={content} editable />;
      break;
    case "mot":
      body = <MotPageClient content={content} editable />;
      break;
    case "faqs":
      body = <FaqsPageClient content={content} editable />;
      break;
    case "diagnostics":
      body = <DiagnosticsPageClient content={content} editable />;
      break;
    case "repairs":
      body = <RepairsPageClient content={content} editable />;
      break;
    case "contact":
      body = <ContactPageClient content={content} editable />;
      break;
    default:
      notFound();
  }

  return (
    <div className="-m-6 min-h-screen bg-white lg:-m-8">
      <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-[#e0ebff] bg-[#020F3D] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/pages/${slug}`} className="text-sm font-semibold text-white/70 hover:text-white">
            ← Back to editor
          </Link>
          <span className="hidden text-white/30 sm:inline">|</span>
          <span className="text-sm font-bold">
            {pageDef.icon} Visual Editor — {pageDef.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-white/60 sm:inline">Click any highlighted text to edit it</span>
          <a
            href={pageDef.publicPath ?? `/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
          >
            View live page ↗
          </a>
        </div>
      </div>
      {body}
    </div>
  );
}
