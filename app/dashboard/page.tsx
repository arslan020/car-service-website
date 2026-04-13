import { prisma } from "@/lib/prisma";
import { DeleteBookingButton } from "@/components/delete-booking-button";

async function getStats() {
  const [total, pending, confirmed, completed] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.booking.count({ where: { status: "confirmed" } }),
    prisma.booking.count({ where: { status: "completed" } }),
  ]);
  return { total, pending, confirmed, completed };
}

async function getRecentBookings() {
  return prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      reference: true,
      customerName: true,
      reg: true,
      make: true,
      model: true,
      serviceType: true,
      appointmentDate: true,
      appointmentTime: true,
      status: true,
      createdAt: true,
    },
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default async function DashboardPage() {
  const [stats, bookings] = await Promise.all([getStats(), getRecentBookings()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#101a56]">Overview</h1>
        <p className="mt-0.5 text-sm text-slate-500">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total bookings", value: stats.total,     color: "text-[#101a56]" },
          { label: "Pending",        value: stats.pending,   color: "text-yellow-600" },
          { label: "Confirmed",      value: stats.confirmed, color: "text-blue-600" },
          { label: "Completed",      value: stats.completed, color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className={`mt-2 text-3xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="mt-8 rounded-2xl border border-[#e0ebff] bg-white shadow-sm">
        <div className="border-b border-[#e0ebff] px-6 py-4">
          <h2 className="font-bold text-[#101a56]">Recent bookings</h2>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="h-10 w-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <p className="mt-3 text-sm font-medium text-slate-400">No bookings yet</p>
            <p className="mt-1 text-xs text-slate-300">Bookings will appear here once customers start booking</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8faff] text-xs font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-3">Reference</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Vehicle</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f5ff]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#fafcff]">
                    <td className="px-6 py-3 font-mono text-xs text-slate-500">{b.reference}</td>
                    <td className="px-6 py-3 font-medium text-slate-800">{b.customerName}</td>
                    <td className="px-6 py-3 text-slate-600">
                      <span className="font-medium capitalize">
                        {[b.make, b.model].filter(Boolean).join(" ") || b.reg}
                      </span>
                      {(b.make || b.model) && (
                        <span className="ml-1.5 font-mono text-xs text-slate-400">{b.reg}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 capitalize text-slate-600">{b.serviceType}</td>
                    <td className="px-6 py-3 text-slate-600">{formatDate(b.appointmentDate)}</td>
                    <td className="px-6 py-3 font-mono text-slate-700">
                      {b.appointmentTime ?? <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[b.status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <DeleteBookingButton id={b.id} reference={b.reference} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
