import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-[#0071CE] sm:text-sm">{eyebrow}</p>}
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0e1555] sm:text-3xl lg:text-4xl">{title}</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:mt-6 sm:text-base">{children}</div>
      </div>
    </div>
  );
}
