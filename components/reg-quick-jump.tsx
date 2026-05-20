import Link from "next/link";

export function RegQuickJump() {
  return (
    <div className="mt-6">
      <Link
        href="/online-booking"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#020F3D] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744] sm:w-auto sm:shrink-0"
      >
        Book now
      </Link>
    </div>
  );
}
