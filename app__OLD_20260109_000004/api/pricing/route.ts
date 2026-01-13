import { NextResponse } from "next/server";
import { z } from "zod";
import { calculatePrice } from "@/lib/pricing";

const schema = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().min(1).max(20).optional(),
  pets: z.boolean().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Niepoprawne dane." },
      { status: 400 }
    );
  }

  const quote = calculatePrice(parsed.data);

  if (!quote.ok) {
    return NextResponse.json(
      { ok: false, message: quote.message ?? "Nie udało się wyliczyć ceny." },
      { status: 400 }
    );
  }

  // quote może mieć ok: true, więc daj ok na końcu, żeby uniknąć duplikatu
  return NextResponse.json({ ...quote, ok: true });
}
