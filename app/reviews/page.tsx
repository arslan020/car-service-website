import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Customer Reviews | Marieston Service Centre Hayes UB4",
  description: "Read Google reviews for Marieston Service Centre in Hayes UB4. DVSA-approved MOT, servicing and repairs.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/reviews" },
};

const GOOGLE_PLACE =
  "https://www.google.com/maps/place/Marieston+Service+Centre/@51.5268571,-0.4022969,586m/data=!3m2!1e3!4b1!4m6!3m5!1s0x48766dd076f12283:0x9b182de007f87a84!8m2!3d51.5268571!4d-0.399722!16s%2Fg%2F11njnzzcdd";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586!2d-0.399722!3d51.5268571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766dd076f12283%3A0x9b182de007f87a84!2sMarieston%20Service%20Centre!5e0!3m2!1sen!2suk!4v1715769600000!5m2!1sen!2suk";

export default function ReviewsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] to-white px-4 pb-10 pt-10 text-center sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Reviews</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#020F3D] sm:text-5xl">
            What drivers say on Google
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 sm:mt-4 sm:text-lg">
            Reviews for {site.name} are published on Google, so you can read them in the reviewers&apos; own words.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={GOOGLE_PLACE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-[#020F3D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#061744]"
            >
              Read our Google reviews
            </a>
            <Link
              href="/online-booking"
              className="inline-flex rounded-xl border border-[#d0dcea] bg-white px-6 py-3 text-sm font-bold text-[#020F3D] transition hover:border-[#0F63FF]"
            >
              Book a service
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-[#e8effa] shadow-sm">
            <iframe
              title="Marieston Service Centre on Google Maps"
              src={MAP_EMBED}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-extrabold text-[#020F3D]">Hayes workshop, reviewed on Google</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Open the Google listing to see the current star rating and the latest comments from drivers who have used the garage.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>DVSA-approved MOT testing</li>
              <li>{site.addressLines.join(", ")}</li>
              <li>{site.hours}</li>
            </ul>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-6 inline-flex font-bold text-[#0F63FF] hover:underline"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
