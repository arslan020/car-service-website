// Static metadata for the simple service detail pages rendered by
// components/service-detail-page-client.tsx — shared between the public
// page files and the dashboard visual editor.

import type { ServiceDetailMeta } from "@/components/service-detail-page-client";

export const SPARK_PLUGS_META: ServiceDetailMeta = {
  pageKey: "spark-plugs",
  serviceName: "Spark Plug Replacement",
  url: "https://www.mariestonservicecentre.co.uk/spark-plugs",
  schemaDescription:
    "Spark plug replacement in Hayes UB4. Manufacturer-spec plugs fitted in around an hour — fixes misfires, rough idling and poor fuel economy. Serving West London.",
  whatsappMessage: "Hi, I'd like a quote for spark plug replacement please.",
};

export const FUEL_FILTER_META: ServiceDetailMeta = {
  pageKey: "fuel-filter",
  serviceName: "Fuel Filter Change",
  url: "https://www.mariestonservicecentre.co.uk/fuel-filter",
  schemaDescription:
    "Fuel filter change in Hayes UB4 for petrol and diesel cars. Correct-spec filter fitted in about 30 minutes — fixes poor starting and sluggish performance. Serving West London.",
  whatsappMessage: "Hi, I'd like a quote for a fuel filter change please.",
};
