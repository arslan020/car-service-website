import { prisma } from "@/lib/prisma";
import { PricingEditor } from "@/components/pricing-editor";

async function getAllPrices() {
  const rows = await prisma.servicePrice.findMany();
  // Shape: { brand: { serviceType: price } }
  const map: Record<string, Record<string, number>> = {};
  for (const row of rows) {
    if (!map[row.brand]) map[row.brand] = {};
    map[row.brand][row.serviceType] = row.startingFrom;
  }
  return map;
}

export default async function PricingPage() {
  const prices = await getAllPrices();

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-extrabold text-[#101a56]">Pricing</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Set starting-from prices per brand and service. These are shown to customers when booking.
        </p>
      </div>
      <PricingEditor initialPrices={prices} />
    </div>
  );
}
