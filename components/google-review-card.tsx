"use client";

import { useEffect, useState } from "react";

// Copied from Marieston Service Centre's public Google listing. Do not rewrite them.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Marieston+Service+Centre&rlz=1C1VDKB_enGB1029GB1030&oq=marieston+ser&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBggCEEUYOzIGCAMQRRg8MgYIBBBFGDwyBggFEEUYQTIGCAYQRRhB0gEINDY5NWowajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8&sei=kmDKat-3HbmL_fwP-tm-0As";

const REVIEWS = [
  {
    name: "Sunny Bhatia",
    body: "Excellent service from start to finish. The team was friendly, professional, and honest about the work needed on my car. completed the job on time, and provided great value for money. I’m very happy with the service and would definitely recommend this garage to anyone looking for reliable car repairs and excellent customer care.",
  },
  {
    name: "El",
    body: "Called in here about to leave London on a 6 hour drive for a diagnostic as something wasn’t right with a front wheel and we wanted to have it checked out. The lady we spoke with was absolutely lovely and so helpful, offered us refreshments whilst the mechanics took a look. Great service from them and right at the end of the day they still had time for us. We were very grateful for their honest help and wouldn’t hesitate to recommend them. Thank you!",
  },
  {
    name: "Lution Halilaj",
    body: "⭐⭐⭐⭐⭐ Outstanding service! I had my Mercedes ML serviced here, and I am absolutely delighted with the experience. The team was friendly, professional, and incredibly knowledgeable. They kept me informed throughout the process, completed the work on time, and my car now drives like new. Their attention to detail, honesty, and excellent customer service really stood out. It’s not easy to find a garage you can trust, but these guys exceeded all my expectations. I highly recommend them to anyone looking for top-quality service. I’ll definitely be returning for all my future servicing. Thank you for the fantastic work!",
  },
  {
    name: "Faisal Yousaf",
    body: "Great service for my oil and filter change! Quick, professional, and reliable service. The staff were friendly and made the whole process easy. Highly recommended! 👍🚗",
  },
  {
    name: "lily arapi",
    body: "Really impressed with the service from Marieston Service Centre. I just had my car serviced there, and they noticed an issue with the brakes that had been missed by another garage I had taken the car to, just the week before to have the brake pads replaced. They explained the problem clearly, and thankfully were able to fix it straight away. I really appreciate their attention to detail. It’s reassuring to know your car is being properly checked and looked after. Excellent service, professional and trustworthy. I would definitely recommend Marieston Service Centre to anyone looking for a reliable car service centre. Thank you! 🚗👍",
  },
];

function GoogleG() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function GoogleWordmark() {
  const letters: Array<[string, string]> = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span className="text-[34px] font-medium leading-none tracking-tight" role="img" aria-label="Google">
      {letters.map(([char, color], index) => (
        <span key={`${char}-${index}`} style={{ color }} aria-hidden="true">
          {char}
        </span>
      ))}
    </span>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-2 text-[#FBBC04]" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

const arrowClasses =
  "absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-sm transition hover:border-[#0F63FF] hover:text-[#0F63FF]";

export function GoogleReviewCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % REVIEWS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const review = REVIEWS[index];

  function go(delta: number) {
    setIndex((current) => (current + delta + REVIEWS.length) % REVIEWS.length);
  }

  return (
    <div
      className="mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative rounded-xl border border-[#e5e7eb] bg-white p-3"
        role="group"
        aria-roledescription="carousel"
        aria-label="Google reviews"
      >
        <div className="flex min-h-[19rem] flex-col items-center overflow-hidden rounded-lg bg-[#f9fafb] px-14 py-6 text-center">
          <div key={index} className="animate-review-swipe flex w-full flex-1 flex-col items-center">
            <p className="text-lg font-medium text-[#111827]">{review.name}</p>
            <div className="mt-3 flex items-center gap-4">
              <GoogleG />
              <Stars />
            </div>
            <p className="mt-4 text-[15px] italic leading-[1.7] text-[#111827] line-clamp-7" aria-live="polite">
              &ldquo;{review.body}&rdquo;
            </p>
          </div>
        </div>

        <button type="button" onClick={() => go(-1)} aria-label="Previous review" className={`${arrowClasses} left-4`}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next review" className={`${arrowClasses} right-4`}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View our reviews on Google"
        className="mt-5 flex flex-col items-center gap-2 transition hover:opacity-80"
      >
        <span className="text-[10px] text-[#111827]">View our reviews on</span>
        <GoogleWordmark />
      </a>
    </div>
  );
}
