import { PageIntro } from "@/components/page-intro";

const faqs = [
  {
    q: "What service does my car need?",
    a: "Use your manufacturer schedule and mileage. If unsure, book a health check or call us — we will recommend interim vs full vs major.",
  },
  {
    q: "How long does a full service take?",
    a: "Typically 1.5–3 hours depending on vehicle and findings. We will give a window when you book.",
  },
  {
    q: "Can I book MOT and service together?",
    a: "Yes — choose the MOT + service package in the booking flow.",
  },
  {
    q: "Do you use genuine parts?",
    a: "State your policy here: OE, OEM, or quality aftermarket with warranty.",
  },
  {
    q: "What if extra work is needed?",
    a: "We contact you with prices before proceeding. No surprises.",
  },
] as const;

export default function FaqsPage() {
  return (
    <PageIntro eyebrow="FAQs" title="Common questions">
      <dl className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-semibold text-slate-900">{f.q}</dt>
            <dd className="mt-2 text-slate-600">{f.a}</dd>
          </div>
        ))}
      </dl>
    </PageIntro>
  );
}
