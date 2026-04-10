import { PageIntro } from "@/components/page-intro";
import { site, waUrl } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Get in touch">
        <p>Visit us during opening hours or message us — we respond as soon as we are off the ramp.</p>
        <ul className="space-y-3 text-slate-800">
          <li>
            <strong>Phone:</strong>{" "}
            <a className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <strong>WhatsApp:</strong>{" "}
            <a
              className="font-semibold text-[#0071CE] underline-offset-2 hover:text-[#0e1555] hover:underline"
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us
            </a>
          </li>
          <li>
            <strong>Address:</strong>
            <span className="mt-1 block not-italic">
              {site.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </span>
          </li>
          <li>
            <strong>Hours:</strong> {site.hours}
          </li>
        </ul>
      </PageIntro>
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          <iframe
            title="Map"
            className="h-full w-full border-0"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.435%2C51.505%2C-0.415%2C51.519&amp;layer=mapnik"
          />
        </div>
      </div>
    </>
  );
}
