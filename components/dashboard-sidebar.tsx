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
  | { type: "group"; key: string; label: string; icon: string; slugs: string[] };

const PAGE_TREE: PageTreeItem[] = [
  { type: "link", slug: "home" },
  { type: "link", slug: "about-us" },
  { type: "link", slug: "mot" },
  {
    type: "group",
    key: "servicing",
    label: "Servicing",
    icon: "⚙️",
    slugs: ["car-servicing", "car-servicing-interim", "car-servicing-full", "car-servicing-major", "brake-fluid"],
  },
  {
    type: "group",
    key: "additional",
    label: "Additional Services",
    icon: "🔧",
    slugs: ["services", "diagnostics", "repairs-brakes", "repairs-tyres", "battery-check", "air-con", "ev-battery", "gearbox-service"],
  },
  {
    type: "group",
    key: "repairs",
    label: "Repairs",
    icon: "🔩",
    slugs: ["repairs", "repairs-clutch-gearbox", "repairs-suspension-steering", "repairs-exhaust-emissions", "repairs-engine-cooling", "repairs-electrical"],
  },
  { type: "link", slug: "faqs" },
  { type: "link", slug: "contact" },
];

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
                      const activeSubItem = pathname === `/dashboard/pages/${page.slug}`;
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
                            <span>{page.icon}</span>
                            {page.label}
                          </Link>
                        </li>
                      );
                    }

                    const groupOpen = openGroups.has(item.key);
                    const groupActive = item.slugs.includes(pathname.replace("/dashboard/pages/", ""));

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
                          <span>{item.icon}</span>
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
                              const activeSubItem = pathname === `/dashboard/pages/${slug}`;
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
                                    <span>{page.icon}</span>
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
