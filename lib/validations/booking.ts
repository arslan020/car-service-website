import { z } from "zod";

const emptyToUndef = (s: unknown) =>
  typeof s === "string" && s.trim() === "" ? undefined : s;

export const bookingFormSchema = z.object({
  reg: z.string().min(2).max(12),
  make: z.preprocess(emptyToUndef, z.string().max(80).optional()),
  model: z.preprocess(emptyToUndef, z.string().max(80).optional()),
  year: z.preprocess(emptyToUndef, z.string().max(4).optional()),
  fuelType: z.preprocess(emptyToUndef, z.string().max(40).optional()),
  engineSize: z.preprocess(emptyToUndef, z.string().max(40).optional()),
  mileage: z.preprocess(emptyToUndef, z.string().max(20).optional()),
  transmission: z.preprocess(emptyToUndef, z.string().max(40).optional()),
  serviceType: z.string().min(1),
  addOns: z.array(z.string()),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slotPeriod: z.enum(["morning", "afternoon"]),
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10).max(30),
  address: z.preprocess(emptyToUndef, z.string().max(300).optional()),
  notes: z.preprocess(emptyToUndef, z.string().max(2000).optional()),
  paymentChoice: z.enum(["pay_now", "deposit", "at_garage"]),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
