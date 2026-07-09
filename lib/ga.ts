import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA_PROPERTY_ID;
const clientEmail = process.env.GA_CLIENT_EMAIL;
// Next's env loader may keep "\n" escapes literal depending on quoting
const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const gaConfigured = Boolean(propertyId && clientEmail && privateKey);

/** Which GA env vars are missing (for dashboard diagnostics). */
export function getGaConfigStatus() {
  const missing: string[] = [];
  if (!propertyId?.trim()) missing.push("GA_PROPERTY_ID");
  if (!clientEmail?.trim()) missing.push("GA_CLIENT_EMAIL");
  if (!privateKey?.trim()) missing.push("GA_PRIVATE_KEY");
  return { missing, configured: missing.length === 0 };
}

let client: BetaAnalyticsDataClient | null = null;
function getClient(): BetaAnalyticsDataClient {
  if (!client) {
    client = new BetaAnalyticsDataClient({
      credentials: { client_email: clientEmail, private_key: privateKey },
    });
  }
  return client;
}

export interface GaTotals {
  activeUsers: number;
  pageViews: number;
  sessions: number;
  prevActiveUsers: number;
  prevPageViews: number;
  prevSessions: number;
}

export interface GaDailyPoint {
  /** YYYYMMDD from GA */
  date: string;
  users: number;
}

export interface GaNameValue {
  name: string;
  value: number;
}

export interface GaAdsCampaign {
  name: string;
  clicks: number;
  impressions: number;
  cost: number;
}

export interface GaReport {
  totals: GaTotals;
  daily: GaDailyPoint[];
  topPages: GaNameValue[];
  channels: GaNameValue[];
  cities: GaNameValue[];
  /** Google Ads performance via the GA4↔Ads link; empty when no ads ran */
  adsCampaigns: GaAdsCampaign[];
}

const CURRENT = { startDate: "28daysAgo", endDate: "today" };
const PREVIOUS = { startDate: "56daysAgo", endDate: "29daysAgo" };

function metricNum(value: string | null | undefined): number {
  return Number(value ?? 0) || 0;
}

export async function fetchGaReport(): Promise<GaReport> {
  const ga = getClient();
  const property = `properties/${propertyId}`;

  const [[totalsRes], [dailyRes], [pagesRes], [channelsRes], [citiesRes]] = await Promise.all([
    ga.runReport({
      property,
      dateRanges: [CURRENT, PREVIOUS],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }, { name: "sessions" }],
    }),
    ga.runReport({
      property,
      dateRanges: [CURRENT],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    ga.runReport({
      property,
      dateRanges: [CURRENT],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    }),
    ga.runReport({
      property,
      dateRanges: [CURRENT],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 6,
    }),
    ga.runReport({
      property,
      dateRanges: [CURRENT],
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 6,
    }),
  ]);

  // With two date ranges GA appends a dateRange dimension; rows arrive per range
  const totalsByRange: Record<string, number[]> = {};
  for (const row of totalsRes.rows ?? []) {
    const range = row.dimensionValues?.[0]?.value ?? "date_range_0";
    totalsByRange[range] = (row.metricValues ?? []).map((m) => metricNum(m.value));
  }
  const cur = totalsByRange["date_range_0"] ?? [0, 0, 0];
  const prev = totalsByRange["date_range_1"] ?? [0, 0, 0];

  // Ads metrics come via the GA4↔Google Ads link; tolerate failure so the
  // rest of the dashboard still renders if the link ever breaks
  let adsCampaigns: GaAdsCampaign[] = [];
  try {
    const [adsRes] = await ga.runReport({
      property,
      dateRanges: [CURRENT],
      dimensions: [{ name: "sessionGoogleAdsCampaignName" }],
      metrics: [{ name: "advertiserAdClicks" }, { name: "advertiserAdImpressions" }, { name: "advertiserAdCost" }],
      orderBys: [{ metric: { metricName: "advertiserAdCost" }, desc: true }],
      limit: 10,
    });
    adsCampaigns = (adsRes.rows ?? [])
      .map((row) => ({
        name: row.dimensionValues?.[0]?.value ?? "",
        clicks: metricNum(row.metricValues?.[0]?.value),
        impressions: metricNum(row.metricValues?.[1]?.value),
        cost: metricNum(row.metricValues?.[2]?.value),
      }))
      .filter((c) => c.name && c.name !== "(not set)" && (c.clicks > 0 || c.cost > 0));
  } catch {
    // Ads link inactive or metrics unavailable — the panel simply hides itself
  }

  return {
    adsCampaigns,
    totals: {
      activeUsers: cur[0],
      pageViews: cur[1],
      sessions: cur[2],
      prevActiveUsers: prev[0],
      prevPageViews: prev[1],
      prevSessions: prev[2],
    },
    daily: (dailyRes.rows ?? []).map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? "",
      users: metricNum(row.metricValues?.[0]?.value),
    })),
    topPages: (pagesRes.rows ?? [])
      .map((row) => ({
        name: row.dimensionValues?.[0]?.value ?? "",
        value: metricNum(row.metricValues?.[0]?.value),
      }))
      // Admin/auth pages are the owner's own visits, not customer traffic
      .filter((p) => !p.name.startsWith("/dashboard") && !p.name.startsWith("/login") && !p.name.startsWith("/admin"))
      .slice(0, 8),
    channels: (channelsRes.rows ?? []).map((row) => ({
      name: row.dimensionValues?.[0]?.value ?? "",
      value: metricNum(row.metricValues?.[0]?.value),
    })),
    cities: (citiesRes.rows ?? [])
      .map((row) => ({
        name: row.dimensionValues?.[0]?.value ?? "",
        value: metricNum(row.metricValues?.[0]?.value),
      }))
      .filter((c) => c.name && c.name !== "(not set)"),
  };
}
