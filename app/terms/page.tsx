import { site } from "@/lib/site-config";

export const metadata = {
  title: `Terms of Use | ${site.name}`,
  description: `Terms and conditions for using ${site.name} services and website.`,
};

const SECTIONS = [
  {
    title: "1. Introduction",
    body: `These terms of use govern your use of the ${site.name} website and services. By using our website or booking a service with us, you agree to these terms. ${site.name} is a DVSA-approved garage located at ${site.addressLines.join(", ")}.`,
  },
  {
    title: "2. Booking & Appointments",
    body: "All bookings are subject to availability. We will confirm your appointment via phone, email, or WhatsApp. Please arrive on time for your appointment. If you need to cancel or reschedule, please give us at least 24 hours' notice.",
  },
  {
    title: "3. Estimates & Pricing",
    body: "Any quote or estimate provided is based on a visual inspection or information supplied by you. Final costs may vary if additional faults are discovered during the work. We will always contact you for authorisation before carrying out any additional work beyond the agreed scope.",
  },
  {
    title: "4. Vehicle Condition",
    body: "You confirm that the vehicle brought to us is legally yours or that you have the owner's authorisation for repairs. We are not responsible for pre-existing damage or faults unrelated to the work carried out.",
  },
  {
    title: "5. Payment",
    body: "Payment is due in full upon completion of the work unless otherwise agreed in writing. We accept cash and major debit/credit cards. We reserve the right to retain the vehicle until payment is received in full.",
  },
  {
    title: "6. Warranty on Parts & Labour",
    body: "We provide a warranty on parts and labour in accordance with the manufacturer's warranty and standard industry practice. Warranty claims must be reported promptly. The warranty does not cover damage caused by misuse, accidents, or parts supplied by the customer.",
  },
  {
    title: "7. Limitation of Liability",
    body: `${site.name}'s liability is limited to the cost of the services provided. We are not liable for indirect or consequential losses, including loss of earnings or vehicle hire costs, except where required by law.`,
  },
  {
    title: "8. Website Use",
    body: "The content on this website is provided for general information only. We make no warranties about the accuracy or completeness of the information. Links to third-party websites are provided for convenience and we are not responsible for their content.",
  },
  {
    title: "9. Intellectual Property",
    body: `All content on this website, including text, images, and logos, is the property of ${site.name} and may not be reproduced without our written permission.`,
  },
  {
    title: "10. Governing Law",
    body: "These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    title: "11. Contact",
    body: `For any queries regarding these terms, please contact us at ${site.email} or call ${site.phoneDisplay}.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eef4ff] via-[#f5f8ff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Legal</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">Terms of Use</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Last updated: May 2026. Please read these terms carefully before using our website or booking a service.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-[#101a56]">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
