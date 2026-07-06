"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { site } from "@/lib/site-config";
import { getPageDef } from "@/lib/pages-config";
import { logoutAction } from "@/app/login/actions";

// Mirrors the public site header's nav grouping (components/site-header.tsx)
// so the dashboard's page list matches what visitors actually see.
type PageTreeItem =
  | { type: "link"; slug: string }
  | { type: "group"; key: string; label: string; slugs: string[] };

const PAGE_TREE: PageTreeItem[] = [
  { type: "link", slug: "home" },
  { type: "link", slug: "about-us" },
  { type: "link", slug: "mot" },
  {
    type: "group",
    key: "servicing",
    label: "Servicing",
    slugs: ["car-servicing", "car-servicing-interim", "car-servicing-full", "car-servicing-major", "brake-fluid"],
  },
  {
    type: "group",
    key: "additional",
    label: "Additional Services",
    slugs: ["services", "diagnostics", "repairs-brakes", "repairs-tyres", "battery-check", "air-con", "ev-battery", "gearbox-service", "spark-plugs", "fuel-filter"],
  },
  {
    type: "group",
    key: "repairs",
    label: "Repairs",
    slugs: ["repairs", "repairs-clutch-gearbox", "repairs-suspension-steering", "repairs-exhaust-emissions", "repairs-engine-cooling", "repairs-electrical"],
  },
  { type: "link", slug: "prices" },
  { type: "link", slug: "faqs" },
  { type: "link", slug: "contact" },
];

// Simple line icons (matches the Overview nav item's style) — replaces the
// colorful emoji from pages-config.ts within this sidebar list specifically.
const LINE_ICON_PATHS: Record<string, string> = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "about-us": "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
  // Three-triangles MOT mark — same as the public site header's MOT icon
  mot: "M7.5 2 1.5 13h12L7.5 2ZM16.5 2l-6 11h12l-6-11ZM12 11.5 5 22h14L12 11.5Z",
  servicing: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 7 2 2 4-4m-6 5h4",
  "brake-fluid": "M12 2.25c-2.5 4.25-6 8.25-6 12a6 6 0 1 0 12 0c0-3.75-3.5-7.75-6-12Z",
  services: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
  diagnostics: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM1 19h22M7 11h1.5l1.5-2 2 4 1.5-2H17",
  "repairs-brakes": "M20.25 12a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0ZM12 12a3 3 0 1 0 0-.001M12 3v2M12 19v2M3 12h2M19 12h2",
  "repairs-tyres": "M20.25 12a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0ZM15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5l1.5-1.5M17 7l1.5-1.5",
  "battery-check": "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  "air-con": "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
  "ev-battery": "M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z",
  "gearbox-service": "M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12",
  "spark-plugs": "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z",
  "fuel-filter": "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z",
  repairs: "M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.585l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z",
  prices: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
  faqs: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M12 17.25h.007v.008H12v-.008Z",
  contact: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
};
// Sub-pages reuse their parent family's icon
LINE_ICON_PATHS["car-servicing"] = LINE_ICON_PATHS.servicing;
LINE_ICON_PATHS["car-servicing-interim"] = LINE_ICON_PATHS.servicing;
LINE_ICON_PATHS["car-servicing-full"] = LINE_ICON_PATHS.servicing;
LINE_ICON_PATHS["car-servicing-major"] = LINE_ICON_PATHS.servicing;
LINE_ICON_PATHS["repairs-clutch-gearbox"] = LINE_ICON_PATHS.repairs;
LINE_ICON_PATHS["repairs-suspension-steering"] = LINE_ICON_PATHS.repairs;
LINE_ICON_PATHS["repairs-exhaust-emissions"] = LINE_ICON_PATHS.repairs;
LINE_ICON_PATHS["repairs-engine-cooling"] = LINE_ICON_PATHS.repairs;
LINE_ICON_PATHS["repairs-electrical"] = LINE_ICON_PATHS.repairs;

const GROUP_ICON_PATHS: Record<string, string> = {
  servicing: LINE_ICON_PATHS.servicing,
  additional: LINE_ICON_PATHS.services,
  repairs: LINE_ICON_PATHS.repairs,
};

function LineIcon({ d, className = "h-4 w-4 shrink-0" }: { d?: string; className?: string }) {
  if (!d) return null;
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const NAV = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
] as const;

export function DashboardSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  // Auto-expand pages menu when on any /dashboard/pages/* route
  useEffect(() => {
    if (pathname.startsWith("/dashboard/pages")) {
      setPagesOpen(true);
    }
    // Auto-expand whichever group contains the current page
    const currentSlug = pathname.match(/^\/dashboard\/pages\/([^/]+)/)?.[1];
    if (!currentSlug) return;
    for (const item of PAGE_TREE) {
      if (item.type === "group" && item.slugs.includes(currentSlug)) {
        setOpenGroups((prev) => new Set(prev).add(item.key));
        break;
      }
    }
  }, [pathname]);

  function toggleGroup(key: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const isOnPagesRoute = pathname.startsWith("/dashboard/pages");
  // Current page slug works for both /dashboard/pages/[slug] and /dashboard/pages/[slug]/visual
  const currentSlug = pathname.match(/^\/dashboard\/pages\/([^/]+)/)?.[1];

  return (
    <div className="flex w-full shrink-0 flex-col lg:contents">
      {/* ── Mobile top bar (full-width row on small screens; not a side column) ── */}
      <div className="flex w-full items-center justify-between border-b border-[#e0ebff] bg-white px-4 py-3 lg:hidden">
        <Link href="/dashboard">
          <Image src="/updated-logo.png" alt={site.name} width={120} height={36} className="h-auto w-28 object-contain" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0ebff] text-slate-600 hover:bg-[#eef4ff]"
          aria-label="Toggle sidebar"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-[#e0ebff] bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-[#e0ebff] px-5">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <Image src="/updated-logo.png" alt={site.name} width={140} height={42} className="h-auto w-32 object-contain" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Menu
          </p>
          <ul className="space-y-1">
            {/* Regular nav items */}
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#020F3D] text-white"
                        : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* ── Edit Pages (expandable) ── */}
            <li>
              <button
                type="button"
                onClick={() => setPagesOpen((v) => !v)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isOnPagesRoute
                    ? "bg-[#eef4ff] text-[#020F3D]"
                    : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
                }`}
              >
                {/* Pages icon */}
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <span className="flex-1 text-left">Edit Pages</span>
                {/* Chevron */}
                <svg
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${pagesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Sub-items — grouped to match the public site header's nav */}
              {pagesOpen && (
                <ul className="ml-4 mt-1 space-y-0.5 border-l-2 border-[#e8effa] pl-3">
                  {PAGE_TREE.map((item) => {
                    if (item.type === "link") {
                      const page = getPageDef(item.slug);
                      if (!page) return null;
                      const activeSubItem = currentSlug === page.slug;
                      return (
                        <li key={page.slug}>
                          <Link
                            href={`/dashboard/pages/${page.slug}`}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                              activeSubItem
                                ? "bg-[#020F3D] font-semibold text-white"
                                : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
                            }`}
                          >
                            <LineIcon d={LINE_ICON_PATHS[page.slug]} />
                            {page.label}
                          </Link>
                        </li>
                      );
                    }

                    const groupOpen = openGroups.has(item.key);
                    const groupActive = currentSlug ? item.slugs.includes(currentSlug) : false;

                    return (
                      <li key={item.key}>
                        <button
                          type="button"
                          onClick={() => toggleGroup(item.key)}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            groupActive
                              ? "font-semibold text-[#020F3D]"
                              : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
                          }`}
                        >
                          <LineIcon d={GROUP_ICON_PATHS[item.key]} className="h-5 w-5 shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          <svg
                            className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${groupOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                        {groupOpen && (
                          <ul className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-[#e8effa] pl-3">
                            {item.slugs.map((slug) => {
                              const page = getPageDef(slug);
                              if (!page) return null;
                              const activeSubItem = currentSlug === slug;
                              return (
                                <li key={slug}>
                                  <Link
                                    href={`/dashboard/pages/${slug}`}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                                      activeSubItem
                                        ? "bg-[#020F3D] font-semibold text-white"
                                        : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
                                    }`}
                                  >
                                    <LineIcon d={LINE_ICON_PATHS[slug]} />
                                    {page.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* ── Blog ── */}
            <li>
              <Link
                href="/dashboard/blog"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard/blog")
                    ? "bg-[#020F3D] text-white"
                    : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#020F3D]"
                }`}
              >
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 18.549 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom: user + sign out */}
        <div className="border-t border-[#e0ebff] px-3 py-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f4f8ff] px-3 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#020F3D] text-xs font-bold text-white">
              {adminName.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#020F3D]">{adminName}</p>
              <p className="text-[10px] text-slate-400">Admin</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 hover:text-red-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
