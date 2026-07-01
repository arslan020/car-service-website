import { site } from "@/lib/site-config";

export const metadata = {
  title: `Terms and Conditions | ${site.name}`,
  description: "Terms and Conditions of Business for Marieston Service Centre Ltd — applicable to all quotations, estimates and invoices for workshop, servicing, repair, diagnostic and MOT testing services.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/terms-and-conditions" },
};

const SECTIONS = [
  {
    title: "1. Quotations and Estimates",
    clauses: [
      "Any figure described as a \"Quotation\" is a fixed price for the work specifically described, valid for 30 days from the date of issue unless stated otherwise.",
      "Any figure described as an \"Estimate\" is our best assessment of the likely cost based on the information available at the time and is not binding. The final invoiced amount may vary from an Estimate where further faults are identified once the vehicle is inspected or work is underway.",
      "Where additional work or parts are identified during the course of a job that were not included in the original Quotation or Estimate, we will contact you for authorisation before proceeding wherever reasonably practicable. If we are unable to make contact after reasonable attempts, we may carry out further work reasonably necessary to complete the job safely and to a roadworthy standard, up to a value of £100 above the original Quotation or Estimate, and will notify you as soon as possible.",
      "All prices are quoted in pounds sterling and, unless stated otherwise, include VAT at the prevailing rate.",
    ],
  },
  {
    title: "2. Authorisation to Proceed",
    clauses: [
      "Work will only commence once you have authorised the Quotation or Estimate, whether by signature, email confirmation, verbal agreement recorded by us, or by leaving the vehicle with us for the described work.",
      "We reserve the right to decline to carry out any work, or to suspend work already in progress, if in our reasonable opinion the vehicle presents a safety risk, the scope of work is unclear, or payment terms cannot be agreed.",
    ],
  },
  {
    title: "3. Parts and Materials",
    clauses: [
      "Unless otherwise agreed in writing, we supply parts of a quality that is reasonable having regard to the age, mileage and value of the vehicle, which may include original equipment (OE), original equipment manufacturer (OEM) or quality aftermarket parts.",
      "Where you supply your own parts for us to fit, we accept no liability for the quality, suitability or performance of those parts, including any consequential damage caused by those parts, and any labour warranty will not extend to parts-related failures. An inspection and handling charge may apply.",
      "Replaced parts will be made available for your collection on request at the time of collecting the vehicle. Parts not requested will be disposed of or recycled in accordance with applicable waste regulations.",
      "Title to any parts supplied by us shall remain with Marieston Service Centre Ltd until payment for those parts has been received in full.",
    ],
  },
  {
    title: "4. Diagnostic Work",
    clauses: [
      "Diagnostic investigation is chargeable according to the technician time reasonably spent investigating a fault, irrespective of whether a repair is subsequently authorised or the fault is successfully identified. The applicable diagnostic charge will be confirmed to you before work begins.",
    ],
  },
  {
    title: "5. Hidden Faults, Corrosion and Pre-Existing Conditions",
    clauses: [
      "Vehicles, particularly older or higher-mileage vehicles, may contain seized, corroded or deteriorated components that cannot reasonably be identified before a repair is dismantled or attempted. Where such conditions are discovered, additional labour and parts may become necessary, and we will contact you in accordance with clause 1.3 before proceeding wherever reasonably practicable.",
    ],
  },
  {
    title: "6. Payment Terms",
    clauses: [
      "Unless credit terms have been agreed with you in writing in advance, payment is due in full prior to or upon collection of the vehicle, and before the vehicle will be released.",
      "Where credit terms have been agreed, invoices are payable within 14 days of the invoice date unless a different period is stated on the invoice.",
      "We accept payment by bank transfer, debit/credit card and other methods as displayed at our premises. A surcharge may apply to certain payment methods.",
      "Interest on overdue invoices may be charged at 8% per annum above the Bank of England base rate, together with reasonable costs of recovery, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998 where applicable.",
      "We reserve a lien over your vehicle for any unpaid sums properly due to us in respect of work carried out or parts supplied, and may retain possession of the vehicle until payment is received in full.",
    ],
  },
  {
    title: "7. MOT Testing",
    clauses: [
      "MOT tests are carried out in accordance with the requirements of the Driver and Vehicle Standards Agency (DVSA). The test fee covers the test itself only and does not include any repair work required to achieve a pass.",
      "Where a vehicle fails its MOT test, we will provide you with a copy of the refusal of an MOT test certificate (VT30) or pass certificate as applicable, and a quotation for any remedial work required, which is subject to your separate authorisation.",
      "A partial retest fee or free retest may apply in accordance with DVSA rules, depending on the nature of repairs and the timeframe within which the vehicle is represented for retest.",
    ],
  },
  {
    title: "8. Warranty",
    clauses: [
      "We warrant that work carried out by us will be performed with reasonable care and skill, and that parts supplied by us will be of satisfactory quality, in accordance with the Consumer Rights Act 2015 (or, for business customers, the Supply of Goods and Services Act 1982).",
      "Unless otherwise stated on your invoice, parts and labour supplied by us are guaranteed for 12 months or 12,000 miles, whichever occurs first, from the date of the invoice. This does not cover fair wear and tear, misuse, accident damage, or faults unrelated to the original work carried out.",
      "Manufacturer warranties on individual parts may exceed this period and, where applicable, will be honoured in accordance with the relevant manufacturer's terms.",
      "This warranty is in addition to, and does not affect, your statutory rights.",
    ],
  },
  {
    title: "9. Technical Matters: Alignment, Software and Tyres",
    clauses: [
      "Repairs involving steering or suspension components (including but not limited to track rods, wishbones and suspension arms) may affect wheel alignment geometry. Wheel alignment checks and adjustment are chargeable separately unless specifically included in your Quotation.",
      "Certain modern vehicles require software updates, coding, programming or calibration to complete a repair correctly. Where required, this will be identified to you and charged separately unless included in your Quotation.",
      "Tyre pressures may be checked and adjusted as part of routine servicing and repair work.",
    ],
  },
  {
    title: "10. Customer Vehicles, Storage and Collection",
    clauses: [
      "Please remove all personal belongings and valuables from your vehicle before leaving it with us. We accept no responsibility for loss of, or damage to, personal property left in the vehicle.",
      "We will take reasonable care of your vehicle while it is in our possession. We are not liable for loss or damage arising from causes beyond our reasonable control, including but not limited to fire, theft or vandalism, save where such loss arises from our negligence.",
      "Vehicles not collected within 7 days of notification that work is complete may incur a storage charge of £25 plus VAT per day thereafter.",
      "If a vehicle remains uncollected 90 days after we have given written notice to the last known keeper or registered address, we reserve the right to recover any outstanding charges against the vehicle, including by way of sale, in accordance with the Torts (Interference with Goods) Act 1977 and other applicable law.",
      "Where, following inspection, a vehicle is found not to be safe or driveable and requires recovery to another location, the cost of that recovery will be your responsibility unless otherwise agreed with us in advance.",
      "We may road test your vehicle, including at a speed and over a duration appropriate to diagnosing or verifying the fault or repair, which may include use of public roads and motorways, and the use of diagnostic equipment during the test.",
    ],
  },
  {
    title: "11. Cancellation",
    clauses: [
      "You may cancel a booking or authorised Quotation at any time before work commences without charge, save that we reserve the right to charge for any parts specially ordered for your vehicle which cannot reasonably be returned to the supplier.",
      "Where work has already commenced, we may charge for work carried out and parts fitted or ordered up to the point of cancellation.",
    ],
  },
  {
    title: "12. Liability",
    clauses: [
      "Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud, or for any other liability which cannot lawfully be excluded or limited.",
      "Subject to clause 12.1, our liability shall be limited to losses that are reasonably foreseeable and directly attributable to our breach of contract or negligence.",
      "We are not liable for any indirect or consequential loss, including loss of use of the vehicle, loss of earnings, or costs of alternative transport, save where such loss arises from our negligence and was reasonably foreseeable.",
      "Nothing in these Terms affects your statutory rights as a consumer.",
    ],
  },
  {
    title: "13. Data Protection",
    clauses: [
      "Any personal data you provide to us will be processed in accordance with the UK General Data Protection Regulation and the Data Protection Act 2018, and used solely for the purposes of providing our services to you, contacting you regarding your vehicle, and complying with our legal and regulatory obligations. We do not share your data with third parties except where necessary to deliver the service requested (for example, parts suppliers or DVSA) or where required by law. Our Privacy Policy is available on request and at www.mariestonservicecentre.co.uk.",
    ],
  },
  {
    title: "14. Complaints",
    clauses: [
      "If you are unhappy with any aspect of our service, please contact us in the first instance so that we can seek to resolve the matter promptly. Complaints regarding MOT testing may also be referred to the DVSA.",
    ],
  },
  {
    title: "15. Governing Law",
    clauses: [
      "These Terms are governed by the laws of England and Wales, and any dispute arising in connection with them shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#eef4ff] via-[#f5f8ff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Legal</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
            Terms and Conditions of Business
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Applicable to all quotations, estimates and invoices for workshop, servicing, repair, diagnostic and MOT testing services.
          </p>
        </div>
      </section>

      {/* Business Info */}
      <section className="px-4 pb-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-500">
            <span>{site.phoneDisplay}</span>
            <span className="text-slate-300">|</span>
            <span>{site.email}</span>
            <span className="text-slate-300">|</span>
            <span>Mon–Sat 9 am–6 pm</span>
            <span className="text-slate-300">|</span>
            <span>Version 1.0 — July 2026</span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            These Terms and Conditions (&ldquo;Terms&rdquo;) apply to all quotations, estimates, work orders and invoices issued by Marieston Service Centre Ltd (&ldquo;the Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) in connection with vehicle servicing, repair, diagnostic, parts and MOT testing services provided to any customer (&ldquo;you&rdquo;, &ldquo;the Customer&rdquo;). By authorising work to proceed, whether verbally, in writing, electronically or by leaving your vehicle with us, you agree to be bound by these Terms.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-[#020F3D]">{s.title}</h2>
              <ol className="mt-3 space-y-2 list-none">
                {s.clauses.map((clause, i) => {
                  const sectionNum = s.title.split(".")[0];
                  return (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="shrink-0 font-semibold text-slate-400">{sectionNum}.{i + 1}</span>
                      <span>{clause}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] px-6 py-5 text-center text-xs text-slate-500">
          <strong className="text-[#020F3D]">Marieston Service Centre Ltd</strong> &nbsp;|&nbsp; 235 Yeading Lane, Hayes, Middlesex, UB4 9AD &nbsp;|&nbsp; Company No. 17159853
        </div>
      </section>

    </div>
  );
}
