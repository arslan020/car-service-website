import { site } from "@/lib/site-config";

export const metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your personal information.`,
};

type Section = {
  title: string;
  body: string;
  list?: string[];
  footer?: string;
};

const SECTIONS: Section[] = [
  {
    title: "1. Who We Are",
    body: `${site.name} is a DVSA-approved garage located at ${site.addressLines.join(", ")}. We provide MOT testing, vehicle servicing, repairs, and diagnostics. For any privacy-related queries, contact us at ${site.email}.`,
  },
  {
    title: "2. Information We Collect",
    body: "We collect personal information you provide when booking a service, contacting us via phone, email, or WhatsApp, or submitting an enquiry form. This may include your name, phone number, email address, vehicle registration, and service history.",
  },
  {
    title: "3. How We Use Your Information",
    body: "We use your information to process and confirm bookings, send appointment reminders, respond to enquiries, and improve our services. We do not use your data for unsolicited marketing without your consent.",
  },
  {
    title: "4. Data Sharing",
    body: `We do not sell or rent your personal data to third parties. We may share data with:`,
    list: [
      "Trusted service providers (e.g. booking software, payment processors) who are bound by confidentiality agreements and process data solely to deliver our services to you.",
      `Advertising partners, such as Google, for the purpose of showing you relevant ads about our services, measuring the performance of our advertising, and identifying similar potential customers who may be interested in our services (for example, through Google Customer Match). Where we do this, we only share limited contact details (such as your email address or phone number), which are matched securely and cannot be used by the advertising partner to identify you for any other purpose. You can opt out of this at any time by contacting us at ${site.email}, and we will remove your details from any such advertising lists.`,
    ],
    footer: "We may also disclose data if required by law.",
  },
  {
    title: "5. Legal Basis for Processing",
    body: "Where we use your contact details for the advertising purposes described in Section 4, we do so on the basis of our legitimate interests in promoting our services to existing and prospective customers, having balanced this against your rights and provided you with a clear means to opt out. Where required by law, we will instead seek your explicit consent before doing so.",
  },
  {
    title: "6. Data Retention",
    body: "We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Vehicle service records may be kept for up to 6 years for warranty and legal purposes. Contact details shared with advertising partners are retained only as long as your customer relationship with us remains active, and are removed on request.",
  },
  {
    title: "7. Cookies",
    body: "Our website uses essential cookies to ensure basic functionality. We may also use analytics cookies to understand how visitors use our site. You can control cookie preferences through your browser settings.",
  },
  {
    title: "8. Your Rights",
    body: `Under UK GDPR, you have the right to access, correct, or delete your personal data, object to processing (including objecting to your data being used for advertising purposes as described in Section 4), and request data portability. To exercise any of these rights, contact us at ${site.email}.`,
  },
  {
    title: "9. Security",
    body: "We take reasonable technical and organisational measures to protect your data against unauthorised access, loss, or disclosure. However, no internet transmission is completely secure.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this privacy policy from time to time. The latest version will always be available on this page. Continued use of our services after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    body: `If you have questions about this policy or how we handle your data, please contact us at ${site.email} or call ${site.phoneDisplay}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eef4ff] via-[#f5f8ff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Legal</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Last updated: May 2026. This policy explains how {site.name} collects, uses, and protects your personal information.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-[#020F3D]">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              {s.list && (
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.footer && <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.footer}</p>}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
