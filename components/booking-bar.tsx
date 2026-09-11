import Link from "next/link";

export function BookingBar({ defaultService }: { defaultService?: string; category?: string } = {}) {
  const href = defaultService ? `/online-booking?service=${defaultService}` : "/online-booking";

  return (
    <div className="mt-5 flex flex-col items-center gap-3 xl:flex-row xl:justify-center">
      <Link
        href={href}
        className="inline-flex items-center rounded-xl bg-[#020F3D] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
      >
        Book now
      </Link>
    </div>
  );
}
