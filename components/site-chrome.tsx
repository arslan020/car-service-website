"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const show = !pathname.startsWith("/dashboard") && pathname !== "/login";

  return (
    <>
      {show && <SiteHeader />}
      <main className={show ? "flex-1" : undefined}>{children}</main>
      {show && <SiteFooter />}
    </>
  );
}
