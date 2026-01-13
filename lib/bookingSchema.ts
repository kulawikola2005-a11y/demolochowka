import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format daty: YYYY-MM-DD");

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię.").max(80),
  email: z.string().trim().email("Podaj poprawny email."),
  phone: z.string().trim().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),

  checkIn: isoDate,
  checkOut: isoDate,

  // ✅ brakowało tych pól (teraz istnieją, więc parsed.data.guests/pets nie wywali builda)
  guests: z.preprocess(
    (v) => {
      if (v === undefined || v === null || v === "") return undefined;
      const n = typeof v === "number" ? v : Number(v);
      return Number.isFinite(n) ? n : undefined;
    },
    z.number().int().min(1).max(20).optional()
  ),

  pets: z.preprocess(
    (v) => {
      if (v === undefined || v === null || v === "") return undefined;
      if (typeof v === "boolean") return v;
      if (typeof v === "number") return v === 1;
      if (typeof v === "string") {
        const s = v.toLowerCase();
        return s === "true" || s === "1" || s === "on" || s === "yes";
      }
      return undefined;
    },
    z.boolean().optional()
  ),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
