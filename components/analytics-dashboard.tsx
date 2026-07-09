import Link from "next/link";
import type { GaDailyPoint, GaNameValue, GaReport } from "@/lib/ga";

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("en-GB");
}

function formatDelta(current: number, previous: number): { text: string; tone: "up" | "down" | "new" | "flat" } | null {
  // No previous-period data yet — a badge would only confuse, so show nothing
  if (previous === 0) return null;
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) return null;
  return { text: `${pct > 0 ? "+" : ""}${pct}%`, tone: pct > 0 ? "up" : "down" };
}

function gaDateLabel(yyyymmdd: string): string {
  if (yyyymmdd.length !== 8) return yyyymmdd;
  const d = new Date(`${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function niceMax(max: number): number {
  if (max <= 5) return 5;
  const pow = 10 ** Math.floor(Math.log10(max));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (max <= m * pow) return m * pow;
  }
  return 10 * pow;
}

function formatPagePath(path: string): string {
  if (path === "/" || path === "") return "Homepage";
  return path.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const CHANNEL_COLORS: Record<string, string> = {
  "Organic Search": "#34d399",
  Direct: "#60a5fa",
  Referral: "#fbbf24",
  "Organic Social": "#a78bfa",
  "Paid Search": "#f87171",
  "Cross-network": "#fb923c",
  Email: "#22d3ee",
  Unassigned: "#94a3b8",
};

function channelColor(name: string): string {
  return CHANNEL_COLORS[name] ?? "#64748b";
}

// GA's channel jargon, translated for a garage owner
const CHANNEL_LABELS: Record<string, string> = {
  "Organic Search": "Google search (free)",
  "Paid Search": "Google Ads (paid)",
  "Cross-network": "Google Ads network",
  Direct: "Typed address / bookmark",
  Referral: "Links on other websites",
  "Organic Social": "Social media",
  Email: "Email links",
  Unassigned: "Other / unknown",
};

function channelLabel(name: string): string {
  return CHANNEL_LABELS[name] ?? name;
}

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function DeltaBadge({ delta, dark = false }: { delta: { text: string; tone: "up" | "down" | "new" | "flat" }; dark?: boolean }) {
  const styles = dark
    ? {
        new: "bg-white/15 text-white",
        up: "bg-emerald-400/20 text-emerald-200",
        down: "bg-red-400/20 text-red-200",
        flat: "bg-white/10 text-white/70",
      }
    : {
        new: "bg-blue-50 text-[#0F63FF]",
        up: "bg-emerald-50 text-emerald-600",
        down: "bg-red-50 text-red-500",
        flat: "bg-slate-100 text-slate-500",
      };

  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${styles[delta.tone]}`}>
      {delta.tone === "up" && "↑"}
      {delta.tone === "down" && "↓"}
      {delta.text}
    </span>
  );
}

function HeroMetric({
  label,
  value,
  delta,
  icon,
}: {
  label: string;
  value: number;
  delta: ReturnType<typeof formatDelta>;
  icon: string;
}) {
  return (
    <div className="relative rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
          <Icon d={icon} className="h-4 w-4" />
        </span>
        {delta && <DeltaBadge delta={delta} dark />}
      </div>
      <p className="mt-3 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-4xl">{formatCompact(value)}</p>
      <p className="mt-1.5 text-sm font-medium text-blue-100">{label}</p>
    </div>
  );
}

function HeroBanner({ report }: { report: GaReport }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#020F3D] via-[#0c2d6b] to-[#0F63FF] p-6 shadow-xl sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-[#3b82f6]/20" aria-hidden />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/[0.04]" aria-hidden />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-400/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" aria-hidden />
              Live from GA4
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/10">
              Last 28 days
            </span>
          </div>
          <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">Website performance</h2>
          <p className="mt-1 max-w-md text-sm text-blue-100/80">
            How many people visit Marieston Service Centre online and what they look at.
          </p>
        </div>
        <Link
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#020F3D] shadow-lg transition hover:bg-blue-50 lg:self-auto"
        >
          Open full reports
          <Icon d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        <HeroMetric
          label="Visitors"
          value={report.totals.activeUsers}
          delta={formatDelta(report.totals.activeUsers, report.totals.prevActiveUsers)}
          icon="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 0 1 6.75 0 3.375 3.375 0 0 1-6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
        <HeroMetric
          label="Page views"
          value={report.totals.pageViews}
          delta={formatDelta(report.totals.pageViews, report.totals.prevPageViews)}
          icon="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <HeroMetric
          label="Sessions"
          value={report.totals.sessions}
          delta={formatDelta(report.totals.sessions, report.totals.prevSessions)}
          icon="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </div>
    </div>
  );
}

function InsightStrip({ report }: { report: GaReport }) {
  const peak = report.daily.reduce<(GaDailyPoint & { idx: number }) | null>((best, d, idx) => {
    if (!best || d.users > best.users) return { ...d, idx };
    return best;
  }, null);

  const pagesPerSession =
    report.totals.sessions > 0 ? (report.totals.pageViews / report.totals.sessions).toFixed(1) : "—";
  const topSource = report.channels[0]?.name ?? "—";
  const topCity = report.cities[0]?.name ?? "—";

  const insights = [
    {
      label: "Busiest day",
      value: peak && peak.users > 0 ? `${gaDateLabel(peak.date)} · ${peak.users} visitors` : "No data yet",
      icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5",
    },
    {
      label: "Pages viewed per visit",
      value: pagesPerSession,
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    },
    {
      label: "How most people find you",
      value: channelLabel(topSource),
      icon: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86 2.54a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L4.5 12.636",
    },
    {
      label: "Most visitors from",
      value: topCity,
      icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {insights.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-2xl border border-[#e0ebff] bg-white px-4 py-3.5 shadow-sm"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
            <Icon d={item.icon} className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
            <p className="truncate text-sm font-bold text-[#020F3D]">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DailyAreaChart({ daily }: { daily: GaDailyPoint[] }) {
  const W = 720;
  const H = 280;
  const PAD = { top: 20, right: 16, bottom: 36, left: 48 };
  const iw = W - PAD.left - PAD.right;
  const ih = H - PAD.top - PAD.bottom;

  const max = niceMax(Math.max(1, ...daily.map((d) => d.users)));
  const x = (i: number) => PAD.left + (daily.length > 1 ? (i / (daily.length - 1)) * iw : iw / 2);
  const y = (v: number) => PAD.top + ih - (v / max) * ih;
  const yTicks = [0, max / 2, max];
  const labelEvery = Math.max(1, Math.ceil(daily.length / 6));
  const last = daily.length - 1;

  const points = daily.map((d, i) => ({ x: x(i), y: y(d.users), ...d }));
  const linePath = points.length ? `M${points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L")}` : "";
  const areaPath = points.length
    ? `${linePath} L${x(last).toFixed(1)},${(PAD.top + ih).toFixed(1)} L${x(0).toFixed(1)},${(PAD.top + ih).toFixed(1)} Z`
    : "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Daily visitors over the last 28 days">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F63FF" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#0F63FF" stopOpacity={0.02} />
        </linearGradient>
        <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0F63FF" />
        </linearGradient>
      </defs>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#e8effa" strokeWidth={1} strokeDasharray={t === 0 ? undefined : "4 4"} />
          <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" className="fill-slate-400 text-[10px]">
            {formatCompact(t)}
          </text>
        </g>
      ))}
      {daily.map((d, i) =>
        i % labelEvery === 0 || i === last ? (
          <text key={`lbl-${d.date}`} x={x(i)} y={H - 12} textAnchor="middle" className="fill-slate-400 text-[9px]">
            {gaDateLabel(d.date)}
          </text>
        ) : null
      )}
      {areaPath && <path d={areaPath} fill="url(#areaFill)" />}
      {linePath && (
        <path d={linePath} fill="none" stroke="url(#lineStroke)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      )}
      {points.map((p, i) => (
        <g key={p.date}>
          {p.users > 0 && (
            <circle cx={p.x} cy={p.y} r={4} fill="#0F63FF" stroke="#ffffff" strokeWidth={2}>
              <title>{`${gaDateLabel(p.date)}: ${p.users} visitor${p.users === 1 ? "" : "s"}`}</title>
            </circle>
          )}
          <circle cx={p.x} cy={p.y} r={10} fill="transparent">
            <title>{`${gaDateLabel(p.date)}: ${p.users} visitor${p.users === 1 ? "" : "s"}`}</title>
          </circle>
        </g>
      ))}
    </svg>
  );
}

function DonutChart({ items }: { items: GaNameValue[] }) {
  const total = items.reduce((s, i) => s + i.value, 0);
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="h-28 w-28 rounded-full bg-[#f4f8ff] ring-8 ring-[#eef4ff]" />
        <p className="mt-4 text-xs font-medium text-slate-400">No session data yet</p>
      </div>
    );
  }

  let cumulative = 0;
  const segments = items.map((item) => {
    const pct = (item.value / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return { ...item, pct, start, color: channelColor(item.name) };
  });

  const gradient = segments.map((s) => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(", ");

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <div className="relative shrink-0">
        <div
          className="h-32 w-32 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
          role="img"
          aria-label="Traffic sources breakdown"
        />
        <div className="absolute inset-0 m-auto flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <span className="text-lg font-extrabold text-[#020F3D]">{formatCompact(total)}</span>
          <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">Sessions</span>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((s) => (
          <li key={s.name} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-600">{channelLabel(s.name)}</span>
            <span className="shrink-0 text-xs font-bold tabular-nums text-[#020F3D]">{Math.round(s.pct)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopPagesTable({ items, totalViews }: { items: GaNameValue[]; totalViews: number }) {
  if (items.length === 0) {
    return <EmptyBlock message="No page views yet" />;
  }

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-[#eef4ff]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#f8fbff] text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <th className="px-4 py-2.5 font-bold">Page</th>
            <th className="hidden px-4 py-2.5 font-bold sm:table-cell">Path</th>
            <th className="px-4 py-2.5 text-right font-bold">Views</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef4ff]">
          {items.map((item, i) => {
            const share = totalViews > 0 ? Math.round((item.value / totalViews) * 100) : 0;
            return (
              <tr key={item.name} className="bg-white transition hover:bg-[#f8fbff]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eef4ff] text-[10px] font-bold text-[#0F63FF]">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-[#020F3D]">{formatPagePath(item.name)}</span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <code className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-500">{item.name || "/"}</code>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-bold tabular-nums text-[#020F3D]">{item.value.toLocaleString("en-GB")}</span>
                  <span className="ml-2 text-xs text-slate-400">{share}%</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CityList({ items }: { items: GaNameValue[] }) {
  if (items.length === 0) {
    return <EmptyBlock message="No location data yet" />;
  }

  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={item.name}
          className="flex items-center gap-3 rounded-xl border border-[#eef4ff] bg-[#f8fbff] px-4 py-3 transition hover:border-[#e0ebff] hover:bg-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F63FF] shadow-sm ring-1 ring-[#e8effa]">
            <Icon d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate font-semibold text-[#020F3D]">{item.name}</span>
              <span className="shrink-0 text-sm font-bold tabular-nums text-[#020F3D]">{item.value}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#eef4ff]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0F63FF] to-[#3b82f6]"
                style={{ width: `${Math.max(8, (item.value / max) * 100)}%` }}
              />
            </div>
          </div>
          {i === 0 && (
            <span className="hidden shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600 sm:inline">
              Top
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function EmptyBlock({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#e0ebff] bg-[#f8fbff] py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm ring-1 ring-[#eef4ff]">
        <Icon d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75Z" />
      </span>
      <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}

function Panel({ title, sub, children, className = "" }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm ${className}`}>
      <header className="mb-4">
        <h3 className="text-sm font-bold text-[#020F3D]">{title}</h3>
        {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
      </header>
      {children}
    </section>
  );
}

export function AnalyticsDashboard({ report }: { report: GaReport }) {
  const hasTraffic = report.totals.activeUsers > 0 || report.totals.pageViews > 0;

  return (
    <div className="space-y-6">
      <HeroBanner report={report} />
      <InsightStrip report={report} />

      <div className="grid gap-4 xl:grid-cols-5">
        <Panel title="Daily visitors" sub="How many people came to the site each day — hover a dot for the exact number" className="xl:col-span-3">
          {!hasTraffic || report.daily.length === 0 ? (
            <EmptyBlock message="Waiting for traffic — data usually appears within 24–48 hours" />
          ) : (
            <DailyAreaChart daily={report.daily} />
          )}
        </Panel>
        <Panel title="How people found you" sub="What brought visitors to the website" className="xl:col-span-2">
          <DonutChart items={report.channels} />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Most popular pages" sub="What visitors looked at (your own dashboard visits are not counted)">
          <TopPagesTable items={report.topPages} totalViews={report.totals.pageViews} />
        </Panel>
        <Panel title="Where visitors are" sub="Towns and cities your visitors browsed from">
          <CityList items={report.cities} />
        </Panel>
      </div>

      <Glossary />
    </div>
  );
}

function Glossary() {
  const terms = [
    { word: "Visitors", meaning: "individual people — one person counts once, even if they come back" },
    { word: "Sessions", meaning: "visits — the same person coming twice counts as 2 sessions" },
    { word: "Page views", meaning: "total pages opened — one visitor looking at 5 pages counts as 5" },
  ];
  return (
    <div className="rounded-2xl border border-[#e0ebff] bg-[#f8fbff] px-5 py-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">What do these words mean?</p>
      <ul className="mt-2 space-y-1.5">
        {terms.map((t) => (
          <li key={t.word} className="text-xs leading-relaxed text-slate-500">
            <span className="font-bold text-[#020F3D]">{t.word}</span> — {t.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsNotice({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-[#e0ebff] bg-white p-10 text-center shadow-sm">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eef4ff] to-[#dbeafe] text-[#0F63FF]">
        <Icon d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </span>
      <p className="mt-5 text-lg font-bold text-[#020F3D]">{title}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-500">{body}</p>
    </div>
  );
}
