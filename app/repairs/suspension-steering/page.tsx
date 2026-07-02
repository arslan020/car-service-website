import type { Metadata } from "next";
import { getPageContent, f } from "@/lib/page-content";
import { RepairsSuspensionSteeringPageClient } from "@/components/repairs-suspension-steering-page-client";

export const metadata: Metadata = {
  title: "Suspension & Steering Repair Hayes UB4 | Marieston",
  description: "Suspension and steering repair in Hayes UB4. Springs, shock absorbers, bushes & wheel alignment. Book online for a fast, reliable fix.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/suspension-steering" },
};

export default async function SuspensionSteeringPage() {
  const content = await getPageContent("repairs-suspension-steering");
  const title = f(content, "hero_title", "Suspension & Steering");
  const subtitle = f(content, "hero_subtitle", "Knocking, pulling, or vague steering — we inspect, diagnose, and repair. Wheel alignment included after every relevant repair.");

  return <RepairsSuspensionSteeringPageClient content={{ hero_title: title, hero_subtitle: subtitle }} />;
}
