import Link from "next/link";

export function BookingBar(_props?: { defaultService?: string; category?: string }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-3 xl:flex-row xl:justify-center">
      <Link
        href="/quote"
        className="xl:hidden inline-flex items-center rounded-xl bg-[#0F63FF] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF]"
      >
        Request a Quote
      </Link>
      <Link
        href="/online-booking"
        className="inline-flex items-center rounded-xl bg-[#020F3D] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
      >
        Book now
      </Link>
    </div>
  );
}
