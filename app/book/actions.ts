"use server";

import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { bookingFormSchema } from "@/lib/validations/booking";

function makeReference() {
  return `BK-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export type CreateBookingResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function createBooking(input: unknown): Promise<CreateBookingResult> {
  const parsed = bookingFormSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".") || "_root";
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    return { ok: false, message: "Check the form and try again.", fieldErrors };
  }

  const data = parsed.data;
  const reference = makeReference();

  try {
    await prisma.booking.create({
      data: {
        reference,
        reg: data.reg.toUpperCase().replace(/\s/g, ""),
        make: data.make ?? null,
        model: data.model ?? null,
        year: data.year ?? null,
        fuelType: data.fuelType ?? null,
        engineSize: data.engineSize ?? null,
        mileage: data.mileage ?? null,
        transmission: data.transmission ?? null,
        serviceType: data.serviceType,
        addOns: data.addOns,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        slotPeriod: data.slotPeriod,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        address: data.address ?? null,
        notes: data.notes ?? null,
        paymentChoice: data.paymentChoice,
      },
    });

    return { ok: true, reference };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      message:
        "We could not save your booking. Check your database connection (DATABASE_URL) or call us to book.",
    };
  }
}