import { notFound } from "next/navigation";
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
import { AirConPageClient } from "@/components/air-con-page-client";
import { EvBatteryPageClient } from "@/components/ev-battery-page-client";
import { BatteryCheckPageClient } from "@/components/battery-check-page-client";
import { CarServicingInterimPageClient } from "@/components/car-servicing-interim-page-client";
import { CarServicingFullPageClient } from "@/components/car-servicing-full-page-client";
import { CarServicingMajorPageClient } from "@/components/car-servicing-major-page-client";
import { RepairsBrakesPageClient } from "@/components/repairs-brakes-page-client";
import { RepairsTyresPageClient } from "@/components/repairs-tyres-page-client";
import { RepairsClutchGearboxPageClient } from "@/components/repairs-clutch-gearbox-page-client";
import { RepairsSuspensionSteeringPageClient } from "@/components/repairs-suspension-steering-page-client";
import { RepairsExhaustEmissionsPageClient } from "@/components/repairs-exhaust-emissions-page-client";
import { RepairsEngineCoolingPageClient } from "@/components/repairs-engine-cooling-page-client";
import { RepairsElectricalPageClient } from "@/components/repairs-electrical-page-client";
import { AboutUsPageClient } from "@/components/about-us-page-client";
import { GearboxServicePageClient } from "@/components/gearbox-service-page-client";
import { ServiceDetailPageClient } from "@/components/service-detail-page-client";
import { SPARK_PLUGS_META, FUEL_FILTER_META } from "@/lib/service-detail-meta";
import { BrakeFluidPageClient } from "@/components/brake-fluid-page-client";
import { PricesPageClient } from "@/components/prices-page-client";

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
    case "air-con":
      body = <AirConPageClient content={content} editable />;
      break;
    case "ev-battery":
      body = <EvBatteryPageClient content={content} editable />;
      break;
    case "battery-check":
      body = <BatteryCheckPageClient content={content} editable />;
      break;
    case "car-servicing-interim":
      body = <CarServicingInterimPageClient content={content} editable />;
      break;
    case "car-servicing-full":
      body = <CarServicingFullPageClient content={content} editable />;
      break;
    case "car-servicing-major":
      body = <CarServicingMajorPageClient content={content} editable />;
      break;
    case "repairs-brakes":
      body = <RepairsBrakesPageClient content={content} editable />;
      break;
    case "repairs-tyres":
      body = <RepairsTyresPageClient content={content} editable />;
      break;
    case "repairs-clutch-gearbox":
      body = <RepairsClutchGearboxPageClient content={content} editable />;
      break;
    case "repairs-suspension-steering":
      body = <RepairsSuspensionSteeringPageClient content={content} editable />;
      break;
    case "repairs-exhaust-emissions":
      body = <RepairsExhaustEmissionsPageClient content={content} editable />;
      break;
    case "repairs-engine-cooling":
      body = <RepairsEngineCoolingPageClient content={content} editable />;
      break;
    case "repairs-electrical":
      body = <RepairsElectricalPageClient content={content} editable />;
      break;
    case "about-us":
      body = <AboutUsPageClient content={content} editable />;
      break;
    case "gearbox-service":
      body = <GearboxServicePageClient content={content} editable />;
      break;
    case "spark-plugs":
      body = <ServiceDetailPageClient meta={SPARK_PLUGS_META} content={content} editable />;
      break;
    case "fuel-filter":
      body = <ServiceDetailPageClient meta={FUEL_FILTER_META} content={content} editable />;
      break;
    case "brake-fluid":
      body = <BrakeFluidPageClient content={content} editable />;
      break;
    case "prices":
      body = <PricesPageClient content={content} editable />;
      break;
    default:
      notFound();
  }

  return (
    <div className="-m-6 min-h-screen bg-white lg:-m-8">
      <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-[#e0ebff] bg-[#020F3D] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
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
