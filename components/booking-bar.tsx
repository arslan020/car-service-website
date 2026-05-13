import Link from "next/link";

export function BookingBar(_props?: { defaultService?: string; category?: string }) {
  return (
    <div className="mx-auto mt-7 max-w-2xl">
      <Link
        href="/online-booking"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-5 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]"
      >
        Book now
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}
