import { PageIntro } from "@/components/page-intro";

export default function AdminPage() {
  return (
    <PageIntro eyebrow="Admin" title="Garage dashboard (placeholder)">
      <p>
        Next step: protect this route with authentication (e.g. NextAuth or Clerk), list <code className="rounded bg-slate-100 px-1">Booking</code>{" "}
        records from Prisma, and add calendar status updates. Use Prisma Studio locally:{" "}
        <code className="rounded bg-slate-100 px-1">npx prisma studio</code>.
      </p>
    </PageIntro>
  );
}
