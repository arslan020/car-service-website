import { notFound, redirect } from "next/navigation";
import { getPageDef, getSections, PAGES_CONFIG } from "@/lib/pages-config";
import { getPageContent } from "@/lib/page-content";
import { PageContentEditor } from "@/components/page-content-editor";

const VISUAL_EDITOR_SLUGS = new Set(PAGES_CONFIG.map((p) => p.slug));

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPageDashboard({ params }: Props) {
  const { slug } = await params;
  const pageDef = getPageDef(slug);
  if (!pageDef) notFound();

  // Visually-edited pages skip the intermediate screen and open the editor directly
  if (VISUAL_EDITOR_SLUGS.has(slug)) {
    redirect(`/dashboard/pages/${slug}/visual`);
  }

  const saved = await getPageContent(slug);
  const sections = getSections(pageDef);

  return (
    <div>
      <PageContentEditor
        pageKey={slug}
        pageDef={pageDef}
        sections={sections}
        saved={saved}
      />
    </div>
  );
}
