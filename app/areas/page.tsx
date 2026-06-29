import type { Metadata } from "next";
import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Areas We Serve | MOT & Car Service Near You | Marieston Service Centre",
  description: "Marieston Service Centre Hayes UB4 serves 70+ areas including Southall, Uxbridge, Slough, Hounslow, Harrow, Wembley, Richmond, Windsor, Egham, Bracknell, Ascot, Kingston upon Thames, Watford, Shepherd's Bush, Hammersmith and all of West London — within 1 hour drive.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/areas" },
};

const AREAS = [
  // ── Immediate Neighbourhood (5–15 min) ──
  { name: "Hayes Town",           postcode: "UB3 / UB4",        drive: "~5 min",  desc: "Right on our doorstep — local shops and Hayes railway station area. Drop in any time." },
  { name: "Yeading",              postcode: "UB4 / UB5",        drive: "~5 min",  desc: "Our local residential area — Yeading customers are always welcome for any service or repair." },
  { name: "Southall",             postcode: "UB1 / UB2",        drive: "~10 min", desc: "Just a short drive away — we regularly service and MOT cars from Southall." },
  { name: "Northolt",             postcode: "UB5",              drive: "~12 min", desc: "Brakes, clutch, diagnostics and full services — our most popular jobs for Northolt drivers." },
  { name: "Greenford",            postcode: "UB6",              drive: "~15 min", desc: "Greenford customers benefit from our same-day slots and easy online booking." },
  { name: "Uxbridge",             postcode: "UB8 / UB10",       drive: "~15 min", desc: "MOT tests, full servicing and repairs at transparent fixed prices for Uxbridge drivers." },
  { name: "Hillingdon",           postcode: "UB8 / UB10",       drive: "~12 min", desc: "Hillingdon residents choose Marieston for honest advice, quality parts and fair pricing." },
  { name: "Cowley",               postcode: "UB8",              drive: "~14 min", desc: "Cowley is a quiet drive from our Hayes workshop — book online for a same-day slot." },
  { name: "Ickenham",             postcode: "UB10",             drive: "~15 min", desc: "Ickenham's upscale residents trust us for quality car care and transparent pricing." },
  { name: "Ruislip",              postcode: "HA4",              drive: "~18 min", desc: "Ruislip drivers head to us for MOT tests, full services and reliable repairs." },
  { name: "Harmondsworth",        postcode: "UB7",              drive: "~8 min",  desc: "Right next to Heathrow — Harmondsworth is one of our closest areas, just minutes away." },
  { name: "Colnbrook",            postcode: "SL3",              drive: "~10 min", desc: "Near the M25 and Heathrow — Colnbrook drivers are just a short trip from our Hayes garage." },
  { name: "Hatton",               postcode: "TW14",             drive: "~12 min", desc: "Hatton sits between Hayes and Heathrow — quick and easy drive to our workshop." },
  { name: "Stanwell Moor",        postcode: "TW19",             drive: "~15 min", desc: "Small village near Heathrow — Stanwell Moor drivers welcome for MOT and servicing." },
  { name: "Iver",                 postcode: "SL0",              drive: "~14 min", desc: "Iver is a quiet village just off the M25 — easy drive in for MOT, service or repair." },

  // ── West London Hubs (15–30 min) ──
  { name: "Ealing",               postcode: "W5 / W13",         drive: "~20 min", desc: "Quick drive down the A40 — diagnostics, brakes and oil services for Ealing drivers." },
  { name: "Acton",                postcode: "W3",               drive: "~25 min", desc: "A straightforward drive from Acton brings you to our fully equipped Hayes workshop." },
  { name: "Hanwell",              postcode: "W7",               drive: "~20 min", desc: "Oil changes to major services and engine diagnostics — we cover it all for Hanwell motorists." },
  { name: "Brentford",            postcode: "TW8",              drive: "~25 min", desc: "Brentford drivers trust us for transparent pricing and quality workmanship on all makes." },
  { name: "Chiswick",             postcode: "W4",               drive: "~28 min", desc: "Chiswick customers find us worth the drive — quality work, honest prices, same-day slots." },
  { name: "Hounslow",             postcode: "TW3 / TW4",        drive: "~20 min", desc: "Easy drive along the A4 — Hounslow drivers use us for MOT, servicing and all repairs." },
  { name: "Feltham",              postcode: "TW13 / TW14",      drive: "~20 min", desc: "A short trip from Feltham gives you access to our DVSA-approved garage with online booking." },
  { name: "Twickenham",           postcode: "TW1 / TW2",        drive: "~25 min", desc: "Famous for rugby — Twickenham drivers trust us for reliable MOT and car servicing." },
  { name: "Richmond",             postcode: "TW9 / TW10",       drive: "~30 min", desc: "Richmond Park area — we welcome Richmond drivers for any service, repair or MOT." },
  { name: "Isleworth",            postcode: "TW7",              drive: "~22 min", desc: "Isleworth customers choose Marieston for competitive MOT and servicing with no hidden charges." },
  { name: "Teddington",           postcode: "TW11",             drive: "~28 min", desc: "Between Richmond and Hampton — Teddington drivers trust us for reliable MOT and servicing." },
  { name: "Kingston upon Thames", postcode: "KT1 / KT2",        drive: "~35 min", desc: "Major South West London town — Kingston drivers come to us for trusted car care and MOT." },
  { name: "Laleham",              postcode: "TW18",             drive: "~22 min", desc: "Quiet village near Staines — Laleham residents are a short drive from our Hayes garage." },
  { name: "Shepperton",           postcode: "TW17",             drive: "~30 min", desc: "Surrey riverside town — Shepperton drivers welcome for MOT, servicing and all repairs." },
  { name: "Chertsey",             postcode: "KT16",             drive: "~35 min", desc: "Historic Surrey town near the M25 — Chertsey customers trust us for quality car care." },
  { name: "Walton-on-Thames",     postcode: "KT12",             drive: "~38 min", desc: "Surrey commuter town — Walton-on-Thames drivers choose us for transparent, fair pricing." },
  { name: "Egham",                postcode: "TW20",             drive: "~25 min", desc: "Near Runnymede and the M25 — Egham customers reach our Hayes garage in under 30 minutes." },

  // ── North-West London (20–40 min) ──
  { name: "Harrow",               postcode: "HA1 / HA2 / HA3",  drive: "~25 min", desc: "Harrow-on-the-Hill area — honest, reliable car care for MOT, servicing and repairs." },
  { name: "Wembley",              postcode: "HA9",              drive: "~30 min", desc: "Stadium and arena area — Wembley drivers book online for MOT, service or any repair." },
  { name: "Pinner",               postcode: "HA5",              drive: "~28 min", desc: "Pinner's posh suburb — drivers choose Marieston for fair prices and trusted workmanship." },
  { name: "Stanmore",             postcode: "HA7",              drive: "~35 min", desc: "End of the Jubilee line — Stanmore customers drive to us for quality car care at honest prices." },
  { name: "Edgware",              postcode: "HA8",              drive: "~35 min", desc: "Edgware's busy residential zone — we handle MOT, servicing and all types of car repairs." },
  { name: "Hendon",               postcode: "NW4",              drive: "~35 min", desc: "Middlesex University and RAF Museum area — Hendon drivers trust us for reliable car care." },
  { name: "Colindale",            postcode: "NW9",              drive: "~32 min", desc: "Fast-growing Colindale — new and existing residents welcome for MOT, service and repairs." },
  { name: "Kingsbury",            postcode: "NW9",              drive: "~30 min", desc: "Desi shops and restaurants hub — Kingsbury drivers choose us for honest, quality car care." },
  { name: "Ruislip Manor",        postcode: "HA4",              drive: "~20 min", desc: "Ruislip Manor's local shopping area — just a short drive from our Hayes garage." },
  { name: "Northwood",            postcode: "HA6",              drive: "~25 min", desc: "Posh Hertfordshire border area — Northwood residents trust us for premium car servicing." },
  { name: "Eastcote",             postcode: "HA5",              drive: "~20 min", desc: "Between Ruislip and Pinner — Eastcote drivers are a quick drive from our Hayes workshop." },
  { name: "Denham",               postcode: "UB9",              drive: "~20 min", desc: "Quiet Buckinghamshire village near Uxbridge — Denham residents welcome for any car service." },
  { name: "Harefield",            postcode: "UB9",              drive: "~22 min", desc: "Village near Uxbridge with Harefield Hospital — we serve Harefield drivers for all car needs." },
  { name: "Willesden",            postcode: "NW10",             drive: "~35 min", desc: "North West London hub — Willesden customers trust Marieston for honest, reliable car care." },
  { name: "Neasden",              postcode: "NW10",             drive: "~32 min", desc: "Home of the famous Swaminarayan Temple — Neasden drivers come to us for MOT and servicing." },

  // ── Neighbouring Towns (25–50 min) ──
  { name: "Slough",               postcode: "SL1 / SL2 / SL3",  drive: "~15 min", desc: "Just across the M25 — Slough drivers find us the most convenient DVSA-approved garage nearby." },
  { name: "Windsor",              postcode: "SL4",              drive: "~25 min", desc: "Windsor Castle area — a short M4 drive brings you to our fully equipped Hayes workshop." },
  { name: "Eton",                 postcode: "SL4",              drive: "~28 min", desc: "Historic Eton College town — we welcome Eton drivers for MOT, servicing and all repairs." },
  { name: "Maidenhead",           postcode: "SL6",              drive: "~35 min", desc: "Riverside M4 town — Maidenhead customers come to us for trusted car care at fair prices." },
  { name: "High Wycombe",         postcode: "HP11 / HP12 / HP13", drive: "~40 min", desc: "Buckinghamshire hills town — High Wycombe drivers trust us for quality MOT and servicing." },
  { name: "Beaconsfield",         postcode: "HP9",              drive: "~30 min", desc: "One of the UK's most affluent towns — Beaconsfield residents choose us for premium car care." },
  { name: "Gerrards Cross",       postcode: "SL9",              drive: "~25 min", desc: "Posh commuter village — Gerrards Cross drivers book online for hassle-free MOT and servicing." },
  { name: "Amersham",             postcode: "HP6 / HP7",        drive: "~35 min", desc: "Historic market town — Amersham customers drive to us for honest, reliable car servicing." },
  { name: "Watford",              postcode: "WD17 / WD18",      drive: "~40 min", desc: "Harry Potter Studios area — Watford drivers welcome for MOT, service and all car repairs." },
  { name: "Rickmansworth",        postcode: "WD3",              drive: "~30 min", desc: "Lakes and nature parks area — Rickmansworth residents trust us for quality car care." },
  { name: "St Albans",            postcode: "AL1 / AL2 / AL3",  drive: "~50 min", desc: "Roman cathedral city — St Albans drivers come to us for trusted MOT and servicing." },
  { name: "Staines-upon-Thames",  postcode: "TW18",             drive: "~25 min", desc: "Near Heathrow and the M25 — Staines customers come for reliable MOT, servicing and repairs." },
  { name: "Weybridge",            postcode: "KT13",             drive: "~35 min", desc: "Mercedes-Benz World area — Weybridge's posh residents choose us for quality car servicing." },
  { name: "Datchet",              postcode: "SL3",              drive: "~22 min", desc: "Pretty village near Windsor and the M4 — Datchet drivers are a short trip from our garage." },
  { name: "Old Windsor",          postcode: "SL4",              drive: "~28 min", desc: "Historic village near Windsor Castle — Old Windsor residents welcome for MOT and servicing." },
  { name: "Wraysbury",            postcode: "TW19",             drive: "~25 min", desc: "Village near the Thames and reservoirs — Wraysbury drivers trust us for reliable car care." },
  { name: "Stoke Poges",          postcode: "SL2",              drive: "~20 min", desc: "Near Slough and the M4 — Stoke Poges residents can reach our Hayes garage in under 25 minutes." },
  { name: "Virginia Water",       postcode: "GU25",             drive: "~35 min", desc: "Posh Surrey village near the M25 — Virginia Water drivers choose us for premium car servicing." },
  { name: "Ascot",                postcode: "SL5",              drive: "~35 min", desc: "Famous for Royal Ascot racecourse — Ascot drivers trust Marieston for honest car servicing." },
  { name: "Sunningdale",          postcode: "SL5",              drive: "~35 min", desc: "Affluent Surrey golf village — Sunningdale residents welcome for MOT, service and repairs." },
  { name: "Bracknell",            postcode: "RG12",             drive: "~40 min", desc: "Berkshire new town — Bracknell drivers come to us for reliable MOT and car servicing." },

  // ── Central & Inner West London (40–60 min) ──
  { name: "Shepherd's Bush",      postcode: "W12",              drive: "~35 min", desc: "Westfield Shopping Centre area — Shepherd's Bush drivers trust us for MOT and servicing." },
  { name: "Hammersmith",          postcode: "W6",               drive: "~35 min", desc: "Riverside transport hub — Hammersmith customers choose us for honest, reliable car care." },
  { name: "Kensington",           postcode: "W8 / W14",         drive: "~45 min", desc: "High-end museums area — Kensington drivers welcome for MOT, servicing and all repairs." },
  { name: "Chelsea",              postcode: "SW3 / SW10",       drive: "~50 min", desc: "King's Road area — Chelsea drivers come to Marieston for trusted quality car servicing." },
  { name: "Paddington",           postcode: "W2",               drive: "~50 min", desc: "A40 runs straight to us — Paddington customers can reach our Hayes garage with ease." },
  { name: "Marylebone",           postcode: "W1 / NW1",         drive: "~55 min", desc: "Baker Street and Madame Tussauds area — Marylebone drivers trust us for quality car care." },
  { name: "Notting Hill",         postcode: "W11",              drive: "~45 min", desc: "Portobello Road area — Notting Hill drivers choose Marieston for honest, fair car servicing." },
];

const SERVICES = [
  { label: "MOT Test", href: "/mot" },
  { label: "Full Service", href: "/car-servicing/full" },
  { label: "Oil Service", href: "/car-servicing/interim" },
  { label: "Brakes", href: "/repairs/brakes" },
  { label: "Diagnostics", href: "/diagnostics" },
];

export default function AreasPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">West London</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
            Areas We Serve
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Based at 235 Yeading Lane, Hayes UB4, we're centrally located for drivers across West London.
            MOT tests, car servicing and repairs — all available online booking, same-day slots.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/online-booking"
              className="flex items-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
            >
              Book Online
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="flex items-center gap-2 rounded-xl border-2 border-[#020F3D] px-6 py-3.5 text-sm font-bold text-[#020F3D] transition hover:bg-[#020F3D] hover:text-white"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Coverage</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
              Serving All of West London
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              We cover Hayes and 50+ areas across West London, Berkshire, Buckinghamshire and beyond — all within 1 hour drive.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <div
                key={area.name}
                className="flex flex-col gap-2 rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F63FF]/30 hover:shadow-[0_6px_24px_rgba(15,99,255,0.1)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-[#020F3D]">{area.name}</p>
                      <p className="text-xs text-slate-400">{area.postcode}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#eef4ff] px-2.5 py-1 text-xs font-semibold text-[#0F63FF]">
                    {area.drive}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">What We Offer</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Popular Services</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-[#e0ebff] bg-white px-5 py-2.5 text-sm font-semibold text-[#020F3D] shadow-sm transition hover:border-[#0F63FF] hover:text-[#0F63FF]"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 pt-12 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Ready to Book?</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              Your local garage in Hayes, UB4
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Serving Hayes and all surrounding West London areas. Book online in minutes or call us on {site.phoneDisplay}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/online-booking"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto"
              >
                Book Online
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href={waUrl("Hi, I'd like to book a service please.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
