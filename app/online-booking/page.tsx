import type { Metadata } from "next";
import { OnlineBookingClient } from "@/components/online-booking-client";

export const metadata: Metadata = {
  title: "Book Online | MOT & Car Service Hayes UB4 | Marieston",
  description: "Book your MOT, car service or repair online at Marieston Service Centre in Hayes UB4. Choose your service, date and time. Easy online booking.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/online-booking" },
};

export default function OnlineBookingPage() {
  return <OnlineBookingClient />;
}
