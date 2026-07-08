import { AnalyticsDashboard, AnalyticsNotice } from "@/components/analytics-dashboard";
import { fetchGaReport, gaConfigured, getGaConfigStatus } from "@/lib/ga";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  let report = null;
  let error: string | null = null;

  if (gaConfigured) {
    try {
      report = await fetchGaReport();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }

  const gaStatus = getGaConfigStatus();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#020F3D]">Analytics</h1>
        <p className="mt-0.5 text-sm text-slate-500">See how people find and use your website.</p>
      </div>

      {!gaConfigured ? (
        <AnalyticsNotice
          title="Analytics is not connected yet"
          body={
            gaStatus.missing.length
              ? `Missing in .env: ${gaStatus.missing.join(", ")}. ` +
                (gaStatus.missing.includes("GA_PROPERTY_ID")
                  ? "GA_PROPERTY_ID is the numeric ID from GA4 → Admin → Property settings (not the G-PFFK3WFMGF measurement ID). " +
                    "Also add your service account email as Viewer under GA4 → Property access management, then restart the dev server."
                  : "Add the values to .env and restart the dev server.")
              : "Check your Google Analytics environment variables and restart the dev server."
          }
        />
      ) : error ? (
        <AnalyticsNotice
          title="Couldn't load analytics data"
          body={`Google Analytics returned an error. If it mentions permissions, make sure the service account has Viewer access on the GA4 property. (${error})`}
        />
      ) : report ? (
        <AnalyticsDashboard report={report} />
      ) : null}
    </div>
  );
}
