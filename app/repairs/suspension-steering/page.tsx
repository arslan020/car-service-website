import type { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";
import { RepairsSuspensionSteeringPageClient } from "@/components/repairs-suspension-steering-page-client";

export const metadata: Metadata = {
  title: "Suspension & Steering Repair Hayes UB4 | Marieston",
  description: "Suspension and steering repair in Hayes UB4. Springs, shock absorbers, bushes & wheel alignment. Book online for a fast, reliable fix.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/suspension-steering" },
};

export default async function SuspensionSteeringPage() {
  const content = await getPageContentWithDefaults("repairs-suspension-steering");
  return <RepairsSuspensionSteeringPageClient content={content} />;
}
