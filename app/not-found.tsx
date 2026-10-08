import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Marieston Service Centre",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] to-white px-4 py-20 text-center sm:py-28">
      <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#020F3D] sm:text-5xl">
        We can&apos;t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base text-slate-500">
        The link may be out of date. Head back to the garage homepage, or book a visit online.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-[#020F3D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#061744]"
        >
          Back to home
        </Link>
        <Link
          href="/online-booking"
          className="inline-flex rounded-xl border border-[#d0dcea] bg-white px-6 py-3 text-sm font-bold text-[#020F3D] transition hover:border-[#0F63FF]"
        >
          Book online
        </Link>
      </div>
    </section>
  );
}
